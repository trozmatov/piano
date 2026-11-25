<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { Star, ArrowRight, RotateCcw, Trophy, Sparkles, CheckCircle2, Clock, Activity, X } from 'lucide-vue-next'
import VisualGuide from './VisualGuide.vue'
import PianoKeyboard from './PianoKeyboard.vue'
import LessonBriefModal from './LessonBriefModal.vue'
import { buildLessonTimeline } from '../data/lessons/index.js'
import {
  WHITE_KEYS,
  KEY_BY_NOTE,
  buildKeyboardMaps,
  formatNoteWithSolfege
} from '../utils/musicTheory.js'

const props = defineProps({
  lesson: { type: Object, required: true },
  levelInfo: { type: Object, default: null },
  hasNextLesson: { type: Boolean, default: true },
  mode: { type: String, required: true }, // 'lesson' | 'freeplay'
  learningMode: { type: String, default: 'wait' }, // 'wait' | 'flow'
  bpm: { type: Number, default: 80 },
  audioEngine: { type: Object, required: true },
  midiHandler: { type: Object, required: true },
  viewport: { type: Object, required: true },
  showNoteNames: { type: Boolean, default: true },
  showHotkeys: { type: Boolean, default: true },
  octaveOffset: { type: Number, default: 0 },
  isNewRecord: { type: Boolean, default: false }
})

const emit = defineEmits([
  'progress-change',
  'lesson-completed',
  'next-lesson',
  'switch-freeplay',
  'update:learningMode',
  'update:showNoteNames',
  'update:showHotkeys',
  'update:octaveOffset'
])

// Qo‘l tanlash rejimi (Ikki qo‘lli darslarda: 'both' | 'right' | 'left')
const practiceHand = ref(props.lesson.handMode === 'both' ? 'both' : props.lesson.handMode || 'right')

// Darsdan oldingi qisqa yo‘riqnoma (Lesson Brief) modali
const briefOpen = ref(props.mode === 'lesson')

// Dars vaqt shkalasi (qo‘l tanloviga moslashtirilgan)
const timeline = computed(() => buildLessonTimeline(props.lesson, practiceHand.value))
const playableSteps = computed(() => timeline.value.filter((s) => !s.isRestForActiveHand))
const totalSongBeats = computed(() => {
  if (timeline.value.length === 0) return 0
  const last = timeline.value[timeline.value.length - 1]
  return last.startBeat + last.duration
})

// Umumiy dars holati
const currentStepIndex = ref(0)
const completed = ref(false)
const completionModalOpen = ref(true)
const mistakes = ref(0)
const correctSteps = ref(0)
const streak = ref(0)
const bestStreak = ref(0)
const startTime = ref(null)
const durationSec = ref(0)
const lastFeedback = ref(null)

// Flow Mode (Ritm rejimi) holati
const flowRunning = ref(false)
const flowCountIn = ref(0)
const flowBeat = ref(0)
const stepJudgments = reactive({}) // { [stepIndex]: 'perfect' | 'good' | 'ok' | 'missed' }
const timingScores = ref([])
const flowStepHits = new Map() // stepIndex -> Set(canonicalNote)
const flowBackingPlayed = new Set()
let flowRafId = null
let flowLastTimestamp = 0
let flowLastWholeBeat = -99

// Namuna ijro (Demo) holati
const isPlayingDemo = ref(false)
const demoStepIndex = ref(-1)

// Mobil/Planshet suriluvchi klaviatura va Smart Auto-Scroll
const keybedViewportWidth = ref(0)
const panOffsetPx = ref(0)

// Kiritish manbalari
const inputSets = reactive({
  pointer: new Set(),
  keyboard: new Set(),
  midi: new Set(),
  demo: new Set()
})

const freshChordPresses = reactive(new Set())
const prevStepNotesKey = ref('')

const correctFlashSet = reactive(new Set())
const wrongFlashSet = reactive(new Set())
const flashTimers = new Map()

const keyboardMaps = computed(() => buildKeyboardMaps(props.octaveOffset))

// Moslashuvchan tugma kengligi (Laptop: to‘liq 3 oktava; Telefon: 10–12 oq tugma; Planshet: ~14 oq tugma)
const whiteKeyWidthPx = computed(() => {
  if (!props.viewport.isScrollableKeyboard || keybedViewportWidth.value <= 0) {
    return null
  }
  const viewW = keybedViewportWidth.value
  if (props.viewport.deviceMode === 'phone') {
    return Math.max(48, Math.min(68, Math.round(viewW / 11)))
  }
  return Math.max(50, Math.min(66, Math.round(viewW / 14)))
})

const trackWidthPx = computed(() => {
  if (!whiteKeyWidthPx.value) return null
  return Math.round(whiteKeyWidthPx.value * WHITE_KEYS.length)
})

const maxPanPx = computed(() => {
  if (!trackWidthPx.value || keybedViewportWidth.value <= 0) return 0
  return Math.max(0, trackWidthPx.value - keybedViewportWidth.value)
})

const visibleRangeLabel = computed(() => {
  if (!props.viewport.isScrollableKeyboard || !whiteKeyWidthPx.value || keybedViewportWidth.value <= 0) {
    return 'C3–C6'
  }
  const startIdx = Math.max(0, Math.min(WHITE_KEYS.length - 1, Math.floor(panOffsetPx.value / whiteKeyWidthPx.value)))
  const endIdx = Math.max(
    startIdx,
    Math.min(WHITE_KEYS.length - 1, Math.ceil((panOffsetPx.value + keybedViewportWidth.value) / whiteKeyWidthPx.value) - 1)
  )
  return `${WHITE_KEYS[startIdx].note}–${WHITE_KEYS[endIdx].note}`
})

function clampPan(val) {
  return Math.max(0, Math.min(maxPanPx.value, Math.round(val)))
}

function ensureNotesVisible(notes, { forceCenter = false } = {}) {
  if (
    !props.viewport.isScrollableKeyboard ||
    !trackWidthPx.value ||
    !whiteKeyWidthPx.value ||
    keybedViewportWidth.value <= 0 ||
    !notes ||
    notes.length === 0
  ) {
    return
  }

  const geos = notes.map((n) => KEY_BY_NOTE[n]).filter(Boolean)
  if (geos.length === 0) return

  const trackW = trackWidthPx.value
  const viewW = keybedViewportWidth.value
  const leftEdges = geos.map((g) => (g.leftPct / 100) * trackW)
  const rightEdges = geos.map((g) => ((g.leftPct + g.widthPct) / 100) * trackW)

  const minLeft = Math.min(...leftEdges)
  const maxRight = Math.max(...rightEdges)
  const centerPx = (minLeft + maxRight) / 2
  const safeMargin = whiteKeyWidthPx.value * 0.85

  const outOfSafeZone =
    minLeft < panOffsetPx.value + safeMargin ||
    maxRight > panOffsetPx.value + viewW - safeMargin

  if (forceCenter || outOfSafeZone) {
    panOffsetPx.value = clampPan(centerPx - viewW / 2)
  }
}

function handleViewportResize(width) {
  if (!width || width === keybedViewportWidth.value) return
  const wasUnmeasured = keybedViewportWidth.value === 0
  keybedViewportWidth.value = width

  if (!props.viewport.isScrollableKeyboard) {
    panOffsetPx.value = 0
    return
  }

  if (wasUnmeasured) {
    const initialNotes = currentStep.value?.notes?.length ? currentStep.value.notes : ['C4', 'G4']
    ensureNotesVisible(initialNotes, { forceCenter: true })
  } else {
    panOffsetPx.value = clampPan(panOffsetPx.value)
    if (props.mode === 'lesson' && currentStep.value?.notes?.length) {
      ensureNotesVisible(currentStep.value.notes)
    }
  }
}

function panLeft() {
  if (!whiteKeyWidthPx.value) return
  panOffsetPx.value = clampPan(panOffsetPx.value - whiteKeyWidthPx.value * 5)
}

function panRight() {
  if (!whiteKeyWidthPx.value) return
  panOffsetPx.value = clampPan(panOffsetPx.value + whiteKeyWidthPx.value * 5)
}

function panToRatio(ratio) {
  if (!trackWidthPx.value || keybedViewportWidth.value <= 0) return
  panOffsetPx.value = clampPan(ratio * trackWidthPx.value - keybedViewportWidth.value / 2)
}

const userActiveSet = computed(() => {
  const combined = new Set()
  for (const n of inputSets.pointer) combined.add(n)
  for (const n of inputSets.keyboard) combined.add(n)
  for (const n of inputSets.midi) combined.add(n)
  return combined
})

const activeNotes = computed(() => {
  const combined = new Set(userActiveSet.value)
  for (const n of inputSets.demo) combined.add(n)
  return [...combined]
})

const currentStep = computed(() => {
  if (props.mode !== 'lesson' || completed.value) return null
  return timeline.value[currentStepIndex.value] || null
})

// Hozirgi qadamda kutib turgan notalar, barmoq raqamlari va qo‘l ranglari
const targetNotes = computed(() => {
  if (props.mode !== 'lesson' || completed.value || isPlayingDemo.value) return []
  return currentStep.value ? currentStep.value.notes : []
})

const targetFingers = computed(() => {
  const map = {}
  if (!currentStep.value || props.mode !== 'lesson' || completed.value || isPlayingDemo.value) {
    return map
  }
  for (const entry of currentStep.value.requiredEntries) {
    if (entry.finger) {
      map[entry.note] = entry.finger
    }
  }
  return map
})

const targetHands = computed(() => {
  const map = {}
  if (!currentStep.value || props.mode !== 'lesson' || completed.value || isPlayingDemo.value) {
    return map
  }
  for (const entry of currentStep.value.requiredEntries) {
    map[entry.note] = entry.hand
  }
  return map
})

const matchedChordNotes = computed(() => {
  if (!currentStep.value || currentStep.value.notes.length <= 1) return []
  if (props.learningMode === 'flow') {
    return [...(flowStepHits.get(currentStep.value.index) || [])]
  }
  const needsFresh = prevStepNotesKey.value === getNotesSignature(currentStep.value.notes)
  return currentStep.value.notes.filter((n) => {
    if (!userActiveSet.value.has(n)) return false
    return needsFresh ? freshChordPresses.has(n) : true
  })
})

const correctNotes = computed(() => {
  const combined = new Set(correctFlashSet)
  for (const n of matchedChordNotes.value) combined.add(n)
  return [...combined]
})

const wrongNotes = computed(() => [...wrongFlashSet])

const accuracy = computed(() => {
  const total = correctSteps.value + mistakes.value
  if (total === 0) return 100
  return Math.round((correctSteps.value / total) * 100)
})

const timingAccuracy = computed(() => {
  if (timingScores.value.length === 0) return 100
  const sum = timingScores.value.reduce((acc, s) => acc + s, 0)
  return Math.round(sum / timingScores.value.length)
})

const earnedStars = computed(() => {
  const effectiveScore =
    props.learningMode === 'flow'
      ? Math.round((accuracy.value + timingAccuracy.value) / 2)
      : accuracy.value
  if (effectiveScore >= 94) return 3
  if (effectiveScore >= 78) return 2
  return 1
})

function findNextPlayableIndex(fromIndex) {
  for (let i = fromIndex; i < timeline.value.length; i++) {
    if (!timeline.value[i].isRestForActiveHand) {
      return i
    }
  }
  return timeline.value.length
}

function emitProgress() {
  const total = Math.max(1, playableSteps.value.length)
  let done = 0
  if (completed.value) {
    done = total
  } else if (props.learningMode === 'flow') {
    done = Object.keys(stepJudgments).length
  } else {
    done = playableSteps.value.filter((s) => s.index < currentStepIndex.value).length
  }
  emit('progress-change', { current: Math.min(done, total), total })
}

function getNotesSignature(notes) {
  return [...notes].sort().join('|')
}

function triggerFlash(targetSet, prefix, notes, durationMs = 340) {
  for (const note of notes) {
    const key = `${prefix}:${note}`
    if (flashTimers.has(key)) {
      window.clearTimeout(flashTimers.get(key))
    }
    targetSet.add(note)
    const timer = window.setTimeout(() => {
      targetSet.delete(note)
      flashTimers.delete(key)
    }, durationMs)
    flashTimers.set(key, timer)
  }
}

function stopFlowLoop() {
  flowRunning.value = false
  flowCountIn.value = 0
  if (flowRafId) {
    window.cancelAnimationFrame(flowRafId)
    flowRafId = null
  }
}

function clearJudgments() {
  for (const k of Object.keys(stepJudgments)) {
    delete stepJudgments[k]
  }
  timingScores.value = []
  flowStepHits.clear()
  flowBackingPlayed.clear()
}

function resetLesson({ showBrief = false } = {}) {
  stopDemo()
  stopFlowLoop()
  clearJudgments()

  const firstPlayable = findNextPlayableIndex(0)
  currentStepIndex.value = firstPlayable
  flowBeat.value = timeline.value[firstPlayable]?.startBeat ?? 0
  completed.value = false
  completionModalOpen.value = true
  mistakes.value = 0
  correctSteps.value = 0
  streak.value = 0
  bestStreak.value = 0
  startTime.value = null
  durationSec.value = 0
  lastFeedback.value = null
  prevStepNotesKey.value = ''
  freshChordPresses.clear()
  correctFlashSet.clear()
  wrongFlashSet.clear()

  if (showBrief && props.mode === 'lesson') {
    briefOpen.value = true
  }

  emitProgress()

  const firstStep = timeline.value[firstPlayable]
  if (firstStep) {
    ensureNotesVisible(firstStep.notes, { forceCenter: true })
  }
}

function completeLesson() {
  if (completed.value) return
  stopFlowLoop()
  completed.value = true
  completionModalOpen.value = true
  durationSec.value = startTime.value
    ? Math.max(1, Math.round((Date.now() - startTime.value) / 1000))
    : 1

  emitProgress()
  emit('lesson-completed', {
    lessonId: props.lesson.id,
    accuracy: accuracy.value,
    timingAccuracy: props.learningMode === 'flow' ? timingAccuracy.value : null,
    stars: earnedStars.value,
    mistakes: mistakes.value,
    durationSec: durationSec.value,
    learningMode: props.learningMode
  })

  window.setTimeout(() => {
    props.audioEngine.playCompletionChime()
  }, 240)
}

function advanceWaitStep() {
  const finishedStep = currentStep.value
  if (finishedStep) {
    // Bir qo‘lda mashq qilganda ikkinchi qo‘lning fon notalarini yumshoq jo‘r qilish
    if (finishedStep.backingEntries.length > 0) {
      const durSec = (finishedStep.duration || 1) * (60 / Math.max(40, props.bpm)) * 0.85
      props.audioEngine.playBackingNotes(
        finishedStep.backingEntries.map((e) => e.note),
        durSec,
        0.44
      )
    }
    prevStepNotesKey.value = getNotesSignature(finishedStep.notes)
  }

  freshChordPresses.clear()

  const nextIdx = findNextPlayableIndex(currentStepIndex.value + 1)
  currentStepIndex.value = nextIdx
  emitProgress()

  if (nextIdx >= timeline.value.length) {
    completeLesson()
  } else {
    const nextStep = timeline.value[nextIdx]
    if (nextStep) {
      ensureNotesVisible(nextStep.notes)
    }
  }
}

/**
 * FLOW MODE (Ritm rejimi) sikli — 4 zarbli sanoq + uzluksiz BPM harakati + ritm baholash
 */
async function startFlow() {
  if (completed.value) {
    resetLesson({ showBrief: false })
  }
  await props.audioEngine.ensureStarted()
  stopDemo()

  // Agar boshidan boshlanayotgan bo‘lsa 4 zarbli sanoq bilan (-4 dan) boshlaymiz
  const hasStartedPlay = Object.keys(stepJudgments).length > 0 || flowBeat.value > 0.05
  if (!hasStartedPlay) {
    flowBeat.value = -4
    flowCountIn.value = 4
    flowLastWholeBeat = -5
    startTime.value = Date.now()
  }

  flowRunning.value = true
  flowLastTimestamp = performance.now()
  flowRafId = window.requestAnimationFrame(tickFlow)
}

function toggleFlow() {
  if (flowRunning.value || flowCountIn.value > 0) {
    stopFlowLoop()
  } else {
    startFlow()
  }
}

function tickFlow(now) {
  if (!flowRunning.value) return

  const dt = Math.min(0.05, Math.max(0, (now - flowLastTimestamp) / 1000))
  flowLastTimestamp = now

  const beatsPerSec = Math.max(40, props.bpm) / 60
  flowBeat.value += dt * beatsPerSec

  // Metronom va 4-3-2-1 sanoq zarblari
  const wholeBeat = Math.floor(flowBeat.value)
  if (wholeBeat > flowLastWholeBeat) {
    flowLastWholeBeat = wholeBeat
    if (wholeBeat < 0) {
      flowCountIn.value = Math.abs(wholeBeat)
      props.audioEngine.playMetronomeClick(wholeBeat === -4)
    } else {
      flowCountIn.value = 0
      props.audioEngine.playMetronomeClick(wholeBeat % 4 === 0)
    }
  }

  // Bir qo‘lda mashq qilayotganda ikkinchi qo‘lni avtomatik jo‘r qilish
  for (const step of timeline.value) {
    if (
      step.backingEntries.length > 0 &&
      !flowBackingPlayed.has(step.index) &&
      flowBeat.value >= step.startBeat
    ) {
      flowBackingPlayed.add(step.index)
      const durSec = (step.duration || 1) * (60 / Math.max(40, props.bpm)) * 0.88
      props.audioEngine.playBackingNotes(
        step.backingEntries.map((e) => e.note),
        durSec,
        0.45
      )
    }
  }

  // O‘tkazib yuborilgan (missed) qadamlarni aniqlash
  let nextUnjudged = timeline.value.length
  for (const step of playableSteps.value) {
    if (!stepJudgments[step.index]) {
      if (flowBeat.value > step.startBeat + 0.65) {
        stepJudgments[step.index] = 'missed'
        timingScores.value.push(0)
        mistakes.value += 1
        streak.value = 0
        lastFeedback.value = { type: 'wrong', message: 'O‘tkazib yuborildi!' }
        emitProgress()
      } else if (nextUnjudged === timeline.value.length) {
        nextUnjudged = step.index
      }
    }
  }

  if (nextUnjudged !== currentStepIndex.value && nextUnjudged < timeline.value.length) {
    currentStepIndex.value = nextUnjudged
    const upcoming = timeline.value[nextUnjudged]
    if (upcoming) {
      ensureNotesVisible(upcoming.notes)
    }
  }

  // Dars oxiriga yetganda yakunlash
  const allJudged = playableSteps.value.every((s) => Boolean(stepJudgments[s.index]))
  if (allJudged || flowBeat.value >= totalSongBeats + 0.75) {
    completeLesson()
    return
  }

  flowRafId = window.requestAnimationFrame(tickFlow)
}

function evaluateFlowNotePress(note) {
  if (!flowRunning.value || flowCountIn.value > 0) return

  // Vaqt oynasiga (±0.65 zarb) tushadigan eng yaqin baholanmagan qadamni topish
  const WINDOW = 0.65
  const candidate = playableSteps.value.find(
    (step) =>
      !stepJudgments[step.index] &&
      Math.abs(step.startBeat - flowBeat.value) <= WINDOW &&
      step.notes.includes(note)
  )

  if (!candidate) {
    triggerFlash(wrongFlashSet, 'w', [note], 360)
    mistakes.value += 1
    streak.value = 0
    lastFeedback.value = { type: 'wrong', message: `Xato nota: ${note}` }
    return
  }

  let hitSet = flowStepHits.get(candidate.index)
  if (!hitSet) {
    hitSet = new Set()
    flowStepHits.set(candidate.index, hitSet)
  }
  hitSet.add(note)

  const allNotesHit = candidate.notes.every((n) => hitSet.has(n))
  if (!allNotesHit) {
    triggerFlash(correctFlashSet, 'c', [note], 260)
    return
  }

  const diff = flowBeat.value - candidate.startBeat
  const absDiff = Math.abs(diff)
  let grade = 'ok'
  let score = 55
  let label = diff < 0 ? 'Biroz erta' : 'Biroz kech'
  let fbType = 'warn'

  if (absDiff <= 0.22) {
    grade = 'perfect'
    score = 100
    label = 'Ideal ritm!'
    fbType = 'correct'
  } else if (absDiff <= 0.45) {
    grade = 'good'
    score = 80
    label = 'Yaxshi ritm!'
    fbType = 'correct'
  }

  stepJudgments[candidate.index] = grade
  timingScores.value.push(score)
  correctSteps.value += 1
  streak.value += 1
  bestStreak.value = Math.max(bestStreak.value, streak.value)
  triggerFlash(correctFlashSet, 'c', candidate.notes, 380)
  lastFeedback.value = { type: fbType, message: label }

  const nextUnjudged = playableSteps.value.find((s) => !stepJudgments[s.index])
  if (nextUnjudged) {
    currentStepIndex.value = nextUnjudged.index
    ensureNotesVisible(nextUnjudged.notes)
  }
  emitProgress()
}

function evaluateWaitNotePress(note) {
  if (!currentStep.value) return

  if (!startTime.value) {
    startTime.value = Date.now()
  }

  const requiredNotes = currentStep.value.notes

  if (requiredNotes.length === 1) {
    const expected = requiredNotes[0]
    if (note === expected) {
      triggerFlash(correctFlashSet, 'c', [note], 360)
      correctSteps.value += 1
      streak.value += 1
      bestStreak.value = Math.max(bestStreak.value, streak.value)
      lastFeedback.value = {
        type: 'correct',
        message: `To‘g‘ri! ${formatNoteWithSolfege(currentStep.value.requiredEntries[0]?.displayNote || note)}`
      }
      advanceWaitStep()
    } else {
      triggerFlash(wrongFlashSet, 'w', [note], 420)
      mistakes.value += 1
      streak.value = 0
      lastFeedback.value = {
        type: 'wrong',
        message: `Xato: ${note} bosildi (${expected} kerak)`
      }
    }
    return
  }

  // Ko‘p notali akkord yoki ikki qo‘lli qadam (Multi-note detection)
  if (requiredNotes.includes(note)) {
    freshChordPresses.add(note)

    const needsFreshPress = prevStepNotesKey.value === getNotesSignature(requiredNotes)
    const allHeld = requiredNotes.every((req) => {
      if (!userActiveSet.value.has(req)) return false
      return needsFreshPress ? freshChordPresses.has(req) : true
    })

    if (allHeld) {
      triggerFlash(correctFlashSet, 'c', requiredNotes, 460)
      correctSteps.value += 1
      streak.value += 1
      bestStreak.value = Math.max(bestStreak.value, streak.value)
      lastFeedback.value = {
        type: 'correct',
        message: `Ajoyib! ${currentStep.value.chordName || requiredNotes.join(' + ')}`
      }
      advanceWaitStep()
    } else {
      const heldCount = requiredNotes.filter((req) => {
        if (!userActiveSet.value.has(req)) return false
        return needsFreshPress ? freshChordPresses.has(req) : true
      }).length
      lastFeedback.value = {
        type: 'info',
        message: `${heldCount}/${requiredNotes.length} nota ushlandi — barchasini birga bosing`
      }
    }
  } else {
    triggerFlash(wrongFlashSet, 'w', [note], 420)
    mistakes.value += 1
    streak.value = 0
    lastFeedback.value = {
      type: 'wrong',
      message: `Xato: ${note} — ${currentStep.value.chordName || requiredNotes.join('+')} bosing`
    }
  }
}

function handleInputNoteOn(source, note, velocity = 0.85) {
  if (isPlayingDemo.value && source !== 'demo') {
    stopDemo()
  }

  const set = inputSets[source]
  if (set.has(note)) return
  set.add(note)

  props.audioEngine.playNote(note, velocity)

  if (source !== 'demo' && props.mode === 'lesson' && !completed.value && !briefOpen.value) {
    if (props.learningMode === 'flow') {
      evaluateFlowNotePress(note)
    } else {
      evaluateWaitNotePress(note)
    }
  }
}

function handleInputNoteOff(source, note) {
  const set = inputSets[source]
  if (!set.has(note)) return
  set.delete(note)

  const stillHeldElsewhere =
    inputSets.pointer.has(note) ||
    inputSets.keyboard.has(note) ||
    inputSets.midi.has(note) ||
    inputSets.demo.has(note)

  if (!stillHeldElsewhere) {
    props.audioEngine.releaseNote(note)
    freshChordPresses.delete(note)
  }
}

function releaseAllInputs() {
  inputSets.pointer.clear()
  inputSets.keyboard.clear()
  inputSets.midi.clear()
  inputSets.demo.clear()
  freshChordPresses.clear()
  props.audioEngine.releaseAll()
}

function toggleDemo() {
  if (isPlayingDemo.value) {
    stopDemo()
    return
  }

  stopFlowLoop()
  isPlayingDemo.value = true
  demoStepIndex.value = 0
  inputSets.demo.clear()

  props.audioEngine.playLessonDemo(timeline.value, props.bpm, {
    onStep: (idx, notes) => {
      demoStepIndex.value = idx
      inputSets.demo.clear()
      for (const n of notes) inputSets.demo.add(n)
      ensureNotesVisible(notes)
    },
    onEnd: () => {
      isPlayingDemo.value = false
      demoStepIndex.value = -1
      inputSets.demo.clear()
    }
  })
}

function stopDemo() {
  if (!isPlayingDemo.value) return
  props.audioEngine.stopDemo()
  isPlayingDemo.value = false
  demoStepIndex.value = -1
  inputSets.demo.clear()
}

function handleBriefStart() {
  briefOpen.value = false
  props.audioEngine.ensureStarted()
  if (props.learningMode === 'flow') {
    startFlow()
  }
}

function handleBriefDemo() {
  briefOpen.value = false
  toggleDemo()
}

function handlePracticeHandChange(nextHand) {
  practiceHand.value = nextHand
  resetLesson({ showBrief: false })
}

function handleLearningModeChange(nextMode) {
  emit('update:learningMode', nextMode)
}

// Kompyuter klaviaturasi hodisalari (Laptop Mode — to‘liq saqlangan)
function onWindowKeyDown(event) {
  if (event.metaKey || event.ctrlKey || event.altKey) return
  const tag = event.target?.tagName
  if (tag === 'INPUT' && event.target.type !== 'range') return
  if (tag === 'TEXTAREA') return
  if (event.repeat) return

  if (event.code === 'KeyZ') {
    emit('update:octaveOffset', Math.max(-1, props.octaveOffset - 1))
    return
  }
  if (event.code === 'KeyX') {
    emit('update:octaveOffset', Math.min(1, props.octaveOffset + 1))
    return
  }

  if (event.code === 'Space') {
    event.preventDefault()
    props.audioEngine.setSustainPedal(true)
    return
  }

  const note = keyboardMaps.value.codeToNote[event.code]
  if (note) {
    event.preventDefault()
    handleInputNoteOn('keyboard', note, 0.85)
  }
}

function onWindowKeyUp(event) {
  if (event.code === 'Space') {
    props.audioEngine.setSustainPedal(false)
    return
  }

  const note = keyboardMaps.value.codeToNote[event.code]
  if (note) {
    handleInputNoteOff('keyboard', note)
  }
}

function formatDuration(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return m > 0 ? `${m} daq ${s} son` : `${s} soniya`
}

watch(
  () => props.lesson.id,
  () => {
    practiceHand.value = props.lesson.handMode === 'both' ? 'both' : props.lesson.handMode || 'right'
    resetLesson({ showBrief: true })
  }
)

watch(
  () => props.learningMode,
  () => {
    resetLesson({ showBrief: false })
  }
)

watch(
  () => props.mode,
  (nextMode) => {
    stopDemo()
    stopFlowLoop()
    lastFeedback.value = null
    if (nextMode === 'freeplay') {
      briefOpen.value = false
      ensureNotesVisible(['C4', 'G4'], { forceCenter: true })
    } else if (currentStep.value) {
      ensureNotesVisible(currentStep.value.notes, { forceCenter: true })
    }
  }
)

watch(
  () => props.viewport.isScrollableKeyboard,
  (scrollable) => {
    if (!scrollable) {
      panOffsetPx.value = 0
    } else {
      const focusNotes = currentStep.value?.notes?.length ? currentStep.value.notes : ['C4', 'G4']
      ensureNotesVisible(focusNotes, { forceCenter: true })
    }
  }
)

watch(
  () => props.octaveOffset,
  () => {
    for (const note of [...inputSets.keyboard]) {
      handleInputNoteOff('keyboard', note)
    }
  }
)

onMounted(() => {
  window.addEventListener('keydown', onWindowKeyDown)
  window.addEventListener('keyup', onWindowKeyUp)
  window.addEventListener('blur', releaseAllInputs)

  props.midiHandler.init({
    onNoteOn: (note, velocity) => handleInputNoteOn('midi', note, velocity),
    onNoteOff: (note) => handleInputNoteOff('midi', note),
    onSustainChange: (active) => props.audioEngine.setSustainPedal(active)
  })

  emitProgress()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onWindowKeyDown)
  window.removeEventListener('keyup', onWindowKeyUp)
  window.removeEventListener('blur', releaseAllInputs)
  stopDemo()
  stopFlowLoop()
  for (const timer of flashTimers.values()) {
    window.clearTimeout(timer)
  }
  flashTimers.clear()
})
</script>

<template>
  <main
    :class="[
      'relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col min-h-0',
      viewport.isCompact
        ? 'safe-area-x safe-area-bottom gap-1.5 py-1.5'
        : 'justify-between gap-2.5 px-3 sm:px-5 py-2.5 sm:py-3'
    ]"
  >
    <!-- Markaziy vizual yo‘riqnoma -->
    <VisualGuide
      :mode="mode"
      :learning-mode="learningMode"
      :practice-hand="practiceHand"
      :lesson="lesson"
      :timeline="timeline"
      :current-step-index="currentStepIndex"
      :flow-beat="flowBeat"
      :flow-running="flowRunning"
      :flow-count-in="flowCountIn"
      :step-judgments="stepJudgments"
      :bpm="bpm"
      :active-notes="activeNotes"
      :matched-chord-notes="matchedChordNotes"
      :wrong-notes="wrongNotes"
      :correct-flash-notes="[...correctFlashSet]"
      :accuracy="accuracy"
      :timing-accuracy="timingAccuracy"
      :mistakes="mistakes"
      :streak="streak"
      :last-feedback="lastFeedback"
      :is-playing-demo="isPlayingDemo"
      :demo-step-index="demoStepIndex"
      :completed="completed"
      :is-compact="viewport.isCompact"
      :is-scrollable-keyboard="viewport.isScrollableKeyboard"
      :track-width-px="trackWidthPx"
      :pan-offset-px="panOffsetPx"
      @toggle-demo="toggleDemo"
      @restart-lesson="resetLesson({ showBrief: false })"
      @open-brief="briefOpen = true"
      @update:learning-mode="handleLearningModeChange"
      @update:practice-hand="handlePracticeHandChange"
      @toggle-flow="toggleFlow"
    />

    <!-- Pastki qism: Virtual pianino klaviaturasi -->
    <PianoKeyboard
      :active-notes="activeNotes"
      :target-notes="targetNotes"
      :target-fingers="targetFingers"
      :target-hands="targetHands"
      :correct-notes="correctNotes"
      :wrong-notes="wrongNotes"
      :note-to-hotkey="keyboardMaps.noteToHotkey"
      :show-note-names="showNoteNames"
      :show-hotkeys="showHotkeys"
      :octave-offset="octaveOffset"
      :sustain-active="audioEngine.state.sustainPedal"
      :audio-state="audioEngine.state"
      :is-compact="viewport.isCompact"
      :is-short-landscape="viewport.isShortLandscape"
      :is-scrollable-keyboard="viewport.isScrollableKeyboard"
      :track-width-px="trackWidthPx"
      :pan-offset-px="panOffsetPx"
      :max-pan-px="maxPanPx"
      :visible-range-label="visibleRangeLabel"
      @note-on="(note, vel) => handleInputNoteOn('pointer', note, vel)"
      @note-off="(note) => handleInputNoteOff('pointer', note)"
      @update:show-note-names="emit('update:showNoteNames', $event)"
      @update:show-hotkeys="emit('update:showHotkeys', $event)"
      @update:octave-offset="emit('update:octaveOffset', $event)"
      @toggle-sustain="audioEngine.setSustainPedal(!audioEngine.state.sustainPedal)"
      @update:volume="audioEngine.setVolume($event)"
      @toggle-mute="audioEngine.toggleMute()"
      @unlock-audio="audioEngine.ensureStarted()"
      @viewport-resize="handleViewportResize"
      @pan-left="panLeft"
      @pan-right="panRight"
      @pan-to-ratio="panToRatio"
    />

    <!-- DARSDAN OLDINGI QISQA YO‘RIQNOMA (Lesson Brief) -->
    <LessonBriefModal
      :open="briefOpen && mode === 'lesson' && !completed"
      :lesson="lesson"
      :level-info="levelInfo"
      :learning-mode="learningMode"
      :practice-hand="practiceHand"
      @start="handleBriefStart"
      @demo="handleBriefDemo"
      @close="briefOpen = false"
      @update:learning-mode="handleLearningModeChange"
      @update:practice-hand="handlePracticeHandChange"
    />

    <!-- DARS YAKUNI MODALI VA FLOATING NATIJA TUGMASI -->
    <Teleport to="body">
      <!-- Agar foydalanuvchi modalni yopsa, natijani qayta ochish uchun suzuvchi ixcham tugma -->
      <Transition
        enter-active-class="transition duration-250 ease-out"
        enter-from-class="opacity-0 scale-90 translate-y-3"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-90 translate-y-3"
      >
        <button
          v-if="completed && mode === 'lesson' && !completionModalOpen"
          type="button"
          @click="completionModalOpen = true"
          class="fixed bottom-3 right-3 z-40 inline-flex items-center gap-2 rounded-2xl border border-emerald-400/40 bg-[#0e1320]/95 backdrop-blur-xl px-3.5 py-2 text-xs font-bold text-emerald-300 shadow-2xl shadow-emerald-500/20 active:scale-95 transition cursor-pointer"
        >
          <div class="flex items-center gap-0.5">
            <Star
              v-for="s in earnedStars"
              :key="`floating-star-${s}`"
              class="h-3 w-3 fill-amber-400 text-amber-300"
            />
          </div>
          <span>Natijani ko‘rish</span>
          <ArrowRight class="h-3.5 w-3.5 text-emerald-400" />
        </button>
      </Transition>

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="completed && mode === 'lesson' && completionModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-2.5 sm:p-4 overflow-y-auto safe-area-x safe-area-bottom"
          @click.self="completionModalOpen = false"
        >
          <!-- LANDSCAPE / RESPONSIVE MODAL CONTAINER -->
          <div
            :class="[
              'glass-panel relative w-full overflow-hidden rounded-3xl border border-white/[0.12] bg-[#0c101b]/96 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] my-auto',
              viewport.isShortLandscape
                ? 'max-w-2xl p-3 sm:p-4 max-h-[94dvh]'
                : 'max-w-[440px] p-4.5 sm:p-6 text-center max-h-[90dvh]'
            ]"
          >
            <!-- Ambient Glow -->
            <div
              class="pointer-events-none absolute -top-24 left-1/2 h-44 w-72 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl"
            />

            <!-- Top Close button (X) -->
            <button
              type="button"
              @click="completionModalOpen = false"
              class="absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-zinc-400 hover:text-white transition cursor-pointer"
              title="Yopish (Pianinoni ko‘rish)"
              aria-label="Yopish"
            >
              <X class="h-4 w-4" />
            </button>

            <!-- ==================== SHORT LANDSCAPE LAYOUT (Smartfonlar gorizontal ekrani uchun) ==================== -->
            <div v-if="viewport.isShortLandscape" class="relative">
              <!-- Top Header Row -->
              <div class="flex items-center gap-2 pr-8 mb-2">
                <div
                  class="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300"
                >
                  <CheckCircle2 class="h-3 w-3" />
                  <span>Dars muvaffaqiyatli yakunlandi!</span>
                </div>
                <div
                  v-if="isNewRecord"
                  class="inline-flex items-center gap-1 rounded-full bg-amber-400/15 border border-amber-300/35 px-2 py-0.5 text-[10px] font-semibold text-amber-300"
                >
                  <Trophy class="h-3 w-3" />
                  <span>Yangi rekord!</span>
                </div>
              </div>

              <!-- 2-Column Grid -->
              <div class="grid grid-cols-[1.05fr_1.35fr] gap-3 items-center">
                <!-- Chap qism: Dars nomi, yulduzchalar -->
                <div class="text-left flex flex-col justify-center min-w-0 pr-1">
                  <h2 class="text-sm sm:text-base font-bold text-white tracking-tight line-clamp-2 leading-tight">
                    {{ lesson.title }}
                  </h2>
                  <p class="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                    {{ lesson.subtitle }}
                  </p>

                  <!-- Stars -->
                  <div class="my-2 flex items-center gap-2">
                    <div
                      v-for="s in 3"
                      :key="`ls-${s}`"
                      :style="{ animationDelay: `${(s - 1) * 120}ms` }"
                      :class="s <= earnedStars ? 'animate-pop-star' : 'opacity-25'"
                    >
                      <Star
                        :class="[
                          'h-7 w-7 transition-all',
                          s <= earnedStars
                            ? 'fill-amber-400 text-amber-300 drop-shadow-[0_0_14px_rgba(251,191,36,0.7)]'
                            : 'text-zinc-600'
                        ]"
                      />
                    </div>
                  </div>
                </div>

                <!-- O‘ng qism: Natijalar paneli + Amallar -->
                <div class="flex flex-col gap-2">
                  <!-- Ko‘rsatkichlar kartasi -->
                  <div
                    :class="[
                      'grid gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1.5 text-center',
                      learningMode === 'flow' ? 'grid-cols-4' : 'grid-cols-3'
                    ]"
                  >
                    <div>
                      <div class="text-[10px] text-zinc-400">Aniqlik</div>
                      <div class="font-mono-num text-sm sm:text-base font-bold text-emerald-400">
                        {{ accuracy }}%
                      </div>
                    </div>
                    <div v-if="learningMode === 'flow'" class="border-l border-white/[0.07]">
                      <div class="text-[10px] text-zinc-400 inline-flex items-center gap-0.5">
                        <Activity class="h-2.5 w-2.5 text-sky-400" /> Ritm
                      </div>
                      <div class="font-mono-num text-sm sm:text-base font-bold text-sky-300">
                        {{ timingAccuracy }}%
                      </div>
                    </div>
                    <div class="border-l border-white/[0.07]">
                      <div class="text-[10px] text-zinc-400">Xatolar</div>
                      <div
                        class="font-mono-num text-sm sm:text-base font-bold"
                        :class="mistakes === 0 ? 'text-sky-300' : 'text-red-400'"
                      >
                        {{ mistakes }}
                      </div>
                    </div>
                    <div class="border-l border-white/[0.07]">
                      <div class="text-[10px] text-zinc-400 inline-flex items-center gap-0.5">
                        <Clock class="h-2.5 w-2.5" /> Vaqt
                      </div>
                      <div class="font-mono-num text-[11px] font-semibold text-zinc-100 pt-0.5">
                        {{ formatDuration(durationSec) }}
                      </div>
                    </div>
                  </div>

                  <!-- Tugmalar -->
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      @click="resetLesson({ showBrief: false })"
                      class="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.05] active:bg-white/[0.1] py-2 px-2.5 text-xs font-semibold text-zinc-200 transition cursor-pointer"
                    >
                      <RotateCcw class="h-3.5 w-3.5 shrink-0" />
                      <span>Qayta</span>
                    </button>

                    <button
                      v-if="hasNextLesson"
                      type="button"
                      @click="emit('next-lesson')"
                      class="flex flex-[1.4] items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 active:scale-95 py-2 px-3 text-xs font-bold text-zinc-950 shadow-md shadow-sky-500/25 transition cursor-pointer"
                    >
                      <span>Keyingi dars</span>
                      <ArrowRight class="h-3.5 w-3.5 shrink-0" />
                    </button>

                    <button
                      v-else
                      type="button"
                      @click="emit('switch-freeplay')"
                      class="flex flex-[1.4] items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-sky-400 hover:from-emerald-300 hover:to-sky-300 active:scale-95 py-2 px-3 text-xs font-bold text-zinc-950 shadow-md shadow-emerald-500/25 transition cursor-pointer"
                    >
                      <Sparkles class="h-3.5 w-3.5 shrink-0" />
                      <span>Erkin chalish</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- ==================== VERTICAL / STANDARD LAYOUT (Portrait va Laptop uchun) ==================== -->
            <div v-else class="relative">
              <div
                class="mx-auto mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300"
              >
                <CheckCircle2 class="h-3.5 w-3.5" />
                Dars muvaffaqiyatli yakunlandi!
              </div>

              <h2 class="text-base sm:text-xl font-bold text-white tracking-tight">
                {{ lesson.title }}
              </h2>
              <p class="mt-0.5 text-xs text-zinc-400">{{ lesson.subtitle }}</p>

              <!-- Stars -->
              <div class="my-3 sm:my-4 flex items-center justify-center gap-3">
                <div
                  v-for="s in 3"
                  :key="`vs-${s}`"
                  :style="{ animationDelay: `${(s - 1) * 140}ms` }"
                  :class="s <= earnedStars ? 'animate-pop-star' : 'opacity-30'"
                >
                  <Star
                    :class="[
                      'h-8 w-8 sm:h-10 sm:w-10 transition-all',
                      s <= earnedStars
                        ? 'fill-amber-400 text-amber-300 drop-shadow-[0_0_18px_rgba(251,191,36,0.7)]'
                        : 'text-zinc-600'
                    ]"
                  />
                </div>
              </div>

              <div
                v-if="isNewRecord"
                class="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 border border-amber-300/35 px-3 py-1 text-xs font-semibold text-amber-300"
              >
                <Trophy class="h-3.5 w-3.5" />
                Yangi shaxsiy rekord!
              </div>

              <!-- Stats grid -->
              <div
                :class="[
                  'grid gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2.5 sm:p-3',
                  learningMode === 'flow' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'
                ]"
              >
                <div>
                  <div class="text-[11px] text-zinc-400">Aniqlik</div>
                  <div class="mt-0.5 font-mono-num text-base sm:text-xl font-bold text-emerald-400">
                    {{ accuracy }}%
                  </div>
                </div>
                <div v-if="learningMode === 'flow'" class="border-l border-white/[0.07]">
                  <div class="text-[11px] text-zinc-400 inline-flex items-center gap-1">
                    <Activity class="h-3 w-3 text-sky-400" /> Ritm
                  </div>
                  <div class="mt-0.5 font-mono-num text-base sm:text-xl font-bold text-sky-300">
                    {{ timingAccuracy }}%
                  </div>
                </div>
                <div class="border-l border-white/[0.07]">
                  <div class="text-[11px] text-zinc-400">Xatolar</div>
                  <div
                    class="mt-0.5 font-mono-num text-base sm:text-xl font-bold"
                    :class="mistakes === 0 ? 'text-sky-300' : 'text-red-400'"
                  >
                    {{ mistakes }}
                  </div>
                </div>
                <div class="border-l border-white/[0.07]">
                  <div class="text-[11px] text-zinc-400 inline-flex items-center gap-1">
                    <Clock class="h-3 w-3" /> Vaqt
                  </div>
                  <div class="mt-0.5 font-mono-num text-xs sm:text-sm font-semibold text-zinc-100 pt-0.5">
                    {{ formatDuration(durationSec) }}
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="mt-3.5 sm:mt-5 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="button"
                  @click="resetLesson({ showBrief: false })"
                  class="flex w-full sm:w-auto flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] active:scale-95 px-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-200 transition cursor-pointer"
                >
                  <RotateCcw class="h-4 w-4 shrink-0" />
                  Qayta mashq
                </button>

                <button
                  v-if="hasNextLesson"
                  type="button"
                  @click="emit('next-lesson')"
                  class="flex w-full sm:w-auto flex-[1.3] items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 active:scale-95 px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-950 shadow-lg shadow-sky-500/25 transition cursor-pointer"
                >
                  <span>Keyingi darsga o‘tish</span>
                  <ArrowRight class="h-4 w-4 shrink-0" />
                </button>

                <button
                  v-else
                  type="button"
                  @click="emit('switch-freeplay')"
                  class="flex w-full sm:w-auto flex-[1.3] items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-emerald-400 to-sky-400 hover:from-emerald-300 hover:to-sky-300 active:scale-95 px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition cursor-pointer"
                >
                  <Sparkles class="h-4 w-4 shrink-0" />
                  <span>Erkin chalishga o‘tish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>
