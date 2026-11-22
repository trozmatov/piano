<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Flame,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Hand,
  Music2,
  Clock,
  Activity,
  Info
} from 'lucide-vue-next'
import {
  WHITE_KEYS,
  BLACK_KEYS,
  KEY_BY_NOTE,
  FINGER_NAMES,
  formatNoteWithSolfege,
  formatDisplayPitch,
  detectChord
} from '../utils/musicTheory.js'

const props = defineProps({
  mode: { type: String, required: true }, // 'lesson' | 'freeplay'
  learningMode: { type: String, default: 'wait' }, // 'wait' | 'flow'
  practiceHand: { type: String, default: 'both' }, // 'both' | 'right' | 'left'
  lesson: { type: Object, required: true },
  timeline: { type: Array, required: true },
  currentStepIndex: { type: Number, default: 0 },
  flowBeat: { type: Number, default: 0 },
  flowRunning: { type: Boolean, default: false },
  flowCountIn: { type: Number, default: 0 },
  stepJudgments: { type: Object, default: () => ({}) }, // { [stepIndex]: 'perfect'|'good'|'ok'|'missed' }
  bpm: { type: Number, default: 80 },
  activeNotes: { type: Array, default: () => [] },
  matchedChordNotes: { type: Array, default: () => [] },
  wrongNotes: { type: Array, default: () => [] },
  correctFlashNotes: { type: Array, default: () => [] },
  accuracy: { type: Number, default: 100 },
  timingAccuracy: { type: Number, default: 100 },
  mistakes: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastFeedback: { type: Object, default: null },
  isPlayingDemo: { type: Boolean, default: false },
  demoStepIndex: { type: Number, default: -1 },
  completed: { type: Boolean, default: false },
  isCompact: { type: Boolean, default: false },
  isScrollableKeyboard: { type: Boolean, default: false },
  trackWidthPx: { type: Number, default: null },
  panOffsetPx: { type: Number, default: 0 }
})

const emit = defineEmits([
  'toggle-demo',
  'restart-lesson',
  'open-brief',
  'update:learningMode',
  'update:practiceHand',
  'toggle-flow'
])

const HIT_LINE_PCT = 12
const PCT_PER_BEAT = 16.5

const displayBeat = ref(0)
const ribbons = ref([])
let rafId = null
let lastFrameTime = 0
let ribbonSeq = 0
const activeRibbonByNote = new Map()

const activeStep = computed(() => {
  if (props.isPlayingDemo && props.demoStepIndex >= 0) {
    return props.timeline[props.demoStepIndex] || null
  }
  return props.timeline[props.currentStepIndex] || null
})

const targetBeat = computed(() => {
  if (props.learningMode === 'flow' && !props.isPlayingDemo) {
    return props.flowBeat
  }
  if (props.completed && props.timeline.length > 0) {
    const last = props.timeline[props.timeline.length - 1]
    return last.startBeat + last.duration + 0.8
  }
  return activeStep.value ? activeStep.value.startBeat : 0
})

// Hozirgi qadamda bosilishi kerak bo‘lgan barmoqlar (chap va o‘ng)
const activeDisplayEntries = computed(() => {
  if (!activeStep.value) return []
  return props.isPlayingDemo ? activeStep.value.allEntries : activeStep.value.requiredEntries
})

const activeFingersSet = computed(() => {
  return new Set(activeDisplayEntries.value.map((e) => e.finger).filter(Boolean))
})

const detectedFreeChord = computed(() => {
  if (props.mode !== 'freeplay') return null
  return detectChord(props.activeNotes)
})

const syncedTrackStyle = computed(() => {
  if (!props.isScrollableKeyboard || !props.trackWidthPx) {
    return { width: '100%' }
  }
  return {
    width: `${props.trackWidthPx}px`,
    transform: `translate3d(${-props.panOffsetPx}px, 0, 0)`,
    transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)'
  }
})

// Ekranda ko‘rinadigan tushuvchi bloklar (Ikki qo‘l rangli ajratish bilan)
const visibleBlocks = computed(() => {
  if (props.mode !== 'lesson') return []

  const isFlow = props.learningMode === 'flow' && !props.isPlayingDemo
  const curIdx = props.isPlayingDemo && props.demoStepIndex >= 0
    ? props.demoStepIndex
    : props.currentStepIndex
  const matchedSet = new Set(props.matchedChordNotes)
  const blocks = []

  for (const step of props.timeline) {
    const deltaBeat = step.startBeat - displayBeat.value
    if (deltaBeat < -2.2 || deltaBeat > 6.5) continue

    const bottomPct = HIT_LINE_PCT + deltaBeat * PCT_PER_BEAT
    const heightPct = Math.max(10.5, Math.min(34, step.duration * PCT_PER_BEAT - 2.2))

    const judgment = props.stepJudgments[step.index] || null
    const isHit = judgment === 'perfect' || judgment === 'good' || judgment === 'ok'
    const isMissed = judgment === 'missed'

    const isCurrent = isFlow
      ? !isHit && !isMissed && Math.abs(deltaBeat) <= 0.45
      : step.index === curIdx && !props.completed
    const isPast = isFlow
      ? isHit || isMissed || deltaBeat < -0.55
      : step.index < curIdx || props.completed

    const requiredKeySet = new Set(
      step.requiredEntries.map((e) => `${e.hand}:${e.note}`)
    )

    for (const entry of step.allEntries) {
      const keyGeo = KEY_BY_NOTE[entry.note]
      if (!keyGeo) continue

      const isActiveHand = props.isPlayingDemo || requiredKeySet.has(`${entry.hand}:${entry.note}`)
      const isMatched = isCurrent && isActiveHand && matchedSet.has(entry.note)

      blocks.push({
        id: `${step.index}-${entry.hand}-${entry.note}`,
        stepIndex: step.index,
        note: entry.note,
        displayNote: formatDisplayPitch(entry.displayNote || entry.note),
        finger: entry.finger,
        hand: entry.hand, // 'left' | 'right'
        isActiveHand,
        isBlack: keyGeo.isBlack,
        leftPct: keyGeo.leftPct,
        widthPct: keyGeo.widthPct,
        bottomPct,
        heightPct,
        isCurrent: isCurrent && isActiveHand,
        isPast,
        isHit,
        isMissed,
        isMatched
      })
    }
  }

  return blocks
})

function getBlockClasses(block) {
  if (!block.isActiveHand) {
    return block.hand === 'left'
      ? 'bg-violet-500/20 border-violet-300/20'
      : 'bg-sky-500/20 border-sky-300/20'
  }
  if (block.isMissed) {
    return 'bg-gradient-to-t from-red-500/75 to-rose-500/45 border-red-300/60'
  }
  if (block.isHit || block.isPast) {
    return 'bg-gradient-to-t from-emerald-500/80 to-emerald-400/50 border-emerald-300/60'
  }
  if (block.isMatched) {
    return 'bg-gradient-to-t from-emerald-500 to-teal-400 border-emerald-200 shadow-[0_0_22px_rgba(16,185,129,0.8)]'
  }
  if (block.isCurrent) {
    if (block.hand === 'left') {
      return 'bg-gradient-to-t from-violet-500 via-fuchsia-400 to-orange-300 border-orange-200/90 shadow-[0_0_26px_rgba(168,85,247,0.85)]'
    }
    return 'bg-gradient-to-t from-sky-400 via-cyan-300 to-emerald-300 border-white/85 shadow-[0_0_26px_rgba(56,189,248,0.85)]'
  }
  // Kelayotgan (upcoming) bloklar: Chap -> Binafsha/To‘q sariq, O‘ng -> Ko‘k/Yashil
  if (block.hand === 'left') {
    return block.isBlack
      ? 'bg-gradient-to-t from-purple-600/85 to-orange-500/55 border-orange-300/45'
      : 'bg-gradient-to-t from-violet-500/75 to-purple-500/45 border-violet-300/40'
  }
  return block.isBlack
    ? 'bg-gradient-to-t from-cyan-500/80 to-emerald-500/55 border-emerald-300/45'
    : 'bg-gradient-to-t from-sky-500/70 to-blue-500/45 border-sky-300/40'
}

watch(
  () => [props.lesson.id, props.currentStepIndex, props.learningMode],
  ([newLessonId, newStep, newLearning], [oldLessonId, oldStep, oldLearning]) => {
    if (
      newLessonId !== oldLessonId ||
      newLearning !== oldLearning ||
      (newStep === 0 && (oldStep || 0) > 1)
    ) {
      displayBeat.value = targetBeat.value
    }
  }
)

watch(
  () => [...props.activeNotes],
  (newNotes, oldNotes = []) => {
    if (props.mode !== 'freeplay') return
    const now = performance.now()
    const newSet = new Set(newNotes)
    const oldSet = new Set(oldNotes)

    for (const note of newNotes) {
      if (!oldSet.has(note)) {
        const keyGeo = KEY_BY_NOTE[note]
        if (!keyGeo) continue
        const ribbon = {
          id: ++ribbonSeq,
          note,
          leftPct: keyGeo.leftPct,
          widthPct: keyGeo.widthPct,
          isBlack: keyGeo.isBlack,
          startedAt: now,
          releasedAt: null,
          bottomPct: 0,
          heightPct: 2,
          opacity: 1
        }
        ribbons.value.push(ribbon)
        activeRibbonByNote.set(note, ribbon)
      }
    }

    for (const note of oldNotes) {
      if (!newSet.has(note)) {
        const ribbon = activeRibbonByNote.get(note)
        if (ribbon) {
          ribbon.releasedAt = now
          activeRibbonByNote.delete(note)
        }
      }
    }
  }
)

watch(
  () => props.mode,
  () => {
    ribbons.value = []
    activeRibbonByNote.clear()
  }
)

function animate(now) {
  if (!lastFrameTime) lastFrameTime = now
  const dt = Math.min(0.05, (now - lastFrameTime) / 1000)
  lastFrameTime = now

  if (props.mode === 'lesson') {
    if (props.learningMode === 'flow' && !props.isPlayingDemo) {
      // Ritm (Flow) rejimida kechikishsiz 1:1 vaqt sinxronizatsiyasi
      displayBeat.value = props.flowBeat
    } else {
      const diff = targetBeat.value - displayBeat.value
      if (Math.abs(diff) > 0.002) {
        const lerpRate = Math.max(7, (props.bpm / 60) * 6.5)
        displayBeat.value += diff * Math.min(1, dt * lerpRate)
      } else {
        displayBeat.value = targetBeat.value
      }
    }
  }

  if (props.mode === 'freeplay' && ribbons.value.length > 0) {
    const riseSpeed = 42
    const nextRibbons = []
    for (const r of ribbons.value) {
      if (r.releasedAt === null) {
        r.bottomPct = 0
        r.heightPct = Math.min(100, Math.max(4, ((now - r.startedAt) / 1000) * riseSpeed))
        r.opacity = 1
      } else {
        const holdDuration = (r.releasedAt - r.startedAt) / 1000
        const sinceRelease = (now - r.releasedAt) / 1000
        r.heightPct = Math.max(4, Math.min(60, holdDuration * riseSpeed))
        r.bottomPct = sinceRelease * riseSpeed
        r.opacity = Math.max(0, 1 - r.bottomPct / 105)
      }
      if (r.bottomPct < 108) {
        nextRibbons.push(r)
      }
    }
    ribbons.value = nextRibbons
  }

  rafId = window.requestAnimationFrame(animate)
}

onMounted(() => {
  displayBeat.value = targetBeat.value
  rafId = window.requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (rafId) window.cancelAnimationFrame(rafId)
})
</script>

<template>
  <section
    :class="[
      'w-full flex flex-col flex-1 min-h-0',
      isCompact ? 'gap-1.5' : 'gap-2.5'
    ]"
  >
    <!-- ==================== LAPTOP / KATTA EKRAN HUD ==================== -->
    <div v-if="!isCompact" class="glass-panel rounded-2xl px-4 py-2.5 sm:px-5">
      <div
        v-if="mode === 'lesson'"
        class="flex flex-col gap-2"
      >
        <!-- 1-qator: Joriy nota(lar), Barmoqlar, Ko‘rsatma, Statistika -->
        <div class="flex flex-wrap lg:flex-nowrap items-center justify-between gap-2.5">
          <!-- Chap: Joriy nota(lar) va qo‘l ranglari -->
          <div class="flex flex-wrap items-center gap-2.5 shrink-0">
            <div
              class="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 shadow-inner"
            >
              <div>
                <div class="text-[10px] font-semibold uppercase tracking-wider text-sky-300/90">
                  {{
                    isPlayingDemo
                      ? 'Namuna ijro'
                      : activeStep?.chordName
                        ? `Akkord · ${activeStep.chordName}`
                        : learningMode === 'flow'
                          ? 'Ritm (Flow)'
                          : 'Hozir bosing'
                  }}
                </div>
                <div v-if="activeDisplayEntries.length > 0" class="mt-0.5 flex items-center flex-wrap gap-1.5">
                  <span
                    v-for="entry in activeDisplayEntries"
                    :key="`${activeStep?.index}-${entry.hand}-${entry.note}`"
                    :class="[
                      'inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-xs sm:text-sm font-bold tracking-tight transition-colors ring-1',
                      matchedChordNotes.includes(entry.note)
                        ? 'bg-emerald-500/25 text-emerald-200 ring-emerald-400/60'
                        : entry.hand === 'left'
                          ? 'bg-violet-500/20 text-violet-100 ring-violet-400/45'
                          : 'bg-sky-500/20 text-sky-100 ring-sky-400/45'
                    ]"
                  >
                    <span
                      class="h-1.5 w-1.5 rounded-full"
                      :class="entry.hand === 'left' ? 'bg-orange-400' : 'bg-emerald-400'"
                    />
                    <span>{{ formatNoteWithSolfege(entry.displayNote || entry.note) }}</span>
                    <span
                      v-if="entry.finger"
                      :class="[
                        'inline-flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] font-extrabold text-zinc-950',
                        entry.hand === 'left' ? 'bg-orange-400' : 'bg-sky-300'
                      ]"
                      :title="`${entry.hand === 'left' ? 'Chap' : 'O‘ng'} ${entry.finger}-barmoq (${FINGER_NAMES[entry.finger]})`"
                    >
                      {{ entry.finger }}
                    </span>
                  </span>
                </div>
                <div v-else class="text-xs font-semibold text-emerald-300">
                  {{ completed ? 'Dars yakunlandi!' : 'Keyingi notaga tayyorlaning' }}
                </div>
              </div>
            </div>

            <!-- 5-barmoq ko‘rsatkichi -->
            <div
              v-if="activeDisplayEntries.length > 0"
              class="hidden xl:flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5"
            >
              <Hand class="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <div>
                <div class="text-[9px] uppercase tracking-wider text-zinc-400">Barmoq (1–5)</div>
                <div class="mt-0.5 flex items-center gap-1">
                  <span
                    v-for="fingerNum in 5"
                    :key="fingerNum"
                    :class="[
                      'flex h-4.5 w-4.5 items-center justify-center rounded-md text-[10px] font-bold transition-all',
                      activeFingersSet.has(fingerNum)
                        ? 'bg-amber-400 text-zinc-950 scale-105'
                        : 'bg-white/[0.06] text-zinc-500'
                    ]"
                    :title="`${fingerNum}: ${FINGER_NAMES[fingerNum]}`"
                  >
                    {{ fingerNum }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Markaz: Feedback va Qadam ko‘rsatmasi -->
          <div class="flex-1 min-w-0 px-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span
                v-if="lastFeedback?.type === 'wrong'"
                class="inline-flex items-center gap-1 rounded-full bg-red-500/20 border border-red-400/35 px-2 py-0.5 text-[11px] font-semibold text-red-300"
              >
                <AlertCircle class="h-3 w-3" />
                {{ lastFeedback.message }}
              </span>
              <span
                v-else-if="lastFeedback?.type === 'correct'"
                class="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/35 px-2 py-0.5 text-[11px] font-semibold text-emerald-300"
              >
                <CheckCircle2 class="h-3 w-3" />
                {{ lastFeedback.message }}
              </span>
              <span
                v-else-if="lastFeedback?.type === 'warn'"
                class="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-400/35 px-2 py-0.5 text-[11px] font-semibold text-amber-200"
              >
                {{ lastFeedback.message }}
              </span>
              <span
                v-else
                class="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium"
                :class="
                  learningMode === 'flow'
                    ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
                    : 'bg-sky-500/15 border-sky-400/25 text-sky-300'
                "
              >
                <span
                  class="h-1.5 w-1.5 rounded-full animate-ping"
                  :class="learningMode === 'flow' ? 'bg-emerald-400' : 'bg-sky-400'"
                />
                {{ learningMode === 'flow' ? 'Ritm (Flow) rejimi' : 'Kutish rejimi' }}
              </span>
            </div>
            <p class="mt-0.5 text-xs text-zinc-300 leading-snug truncate">
              {{ activeStep?.hint || lesson.description }}
            </p>
          </div>

          <!-- O‘ng: Statistika + Amallar -->
          <div class="flex items-center gap-2 shrink-0">
            <div class="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs">
              <div class="text-center">
                <div class="text-[9px] text-zinc-500">Aniqlik</div>
                <div class="font-mono-num font-semibold text-emerald-400">{{ accuracy }}%</div>
              </div>
              <template v-if="learningMode === 'flow'">
                <div class="h-5 w-px bg-white/[0.08]" />
                <div class="text-center">
                  <div class="text-[9px] text-zinc-500">Ritm</div>
                  <div class="font-mono-num font-semibold text-sky-300">{{ timingAccuracy }}%</div>
                </div>
              </template>
              <div class="h-5 w-px bg-white/[0.08]" />
              <div class="text-center">
                <div class="text-[9px] text-zinc-500">Xato</div>
                <div class="font-mono-num font-semibold" :class="mistakes > 0 ? 'text-red-400' : 'text-zinc-300'">
                  {{ mistakes }}
                </div>
              </div>
              <div class="h-5 w-px bg-white/[0.08]" />
              <div class="text-center">
                <div class="text-[9px] text-zinc-500">Seriya</div>
                <div class="font-mono-num inline-flex items-center gap-0.5 font-semibold text-amber-300">
                  <Flame v-if="streak >= 3" class="h-3 w-3 text-amber-400" />
                  {{ streak }}
                </div>
              </div>
            </div>

            <!-- Flow Mode Play/Pause -->
            <button
              v-if="learningMode === 'flow'"
              type="button"
              @click="emit('toggle-flow')"
              :class="[
                'inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold border transition cursor-pointer',
                flowRunning || flowCountIn > 0
                  ? 'border-amber-400/45 bg-amber-500/20 text-amber-200'
                  : 'border-emerald-400/45 bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30'
              ]"
            >
              <Pause v-if="flowRunning || flowCountIn > 0" class="h-3.5 w-3.5" />
              <Play v-else class="h-3.5 w-3.5 fill-current" />
              <span>{{ flowRunning || flowCountIn > 0 ? 'Pauza' : 'Boshlash' }}</span>
            </button>

            <button
              type="button"
              @click="emit('toggle-demo')"
              :class="[
                'inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium border transition cursor-pointer',
                isPlayingDemo
                  ? 'border-amber-400/40 bg-amber-500/20 text-amber-200'
                  : 'border-white/[0.09] bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200'
              ]"
              title="Dars kuyini namunaviy tinglash"
            >
              <Square v-if="isPlayingDemo" class="h-3.5 w-3.5 fill-current" />
              <Play v-else class="h-3.5 w-3.5 fill-current" />
              <span class="hidden sm:inline">{{ isPlayingDemo ? 'To‘xtat' : 'Tinglash' }}</span>
            </button>

            <button
              type="button"
              @click="emit('open-brief')"
              class="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition cursor-pointer"
              title="Dars yo‘riqnomasini ko‘rish"
            >
              <Info class="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              @click="emit('restart-lesson')"
              class="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition cursor-pointer"
              title="Darsni boshidan boshlash"
            >
              <RotateCcw class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <!-- 2-qator: Learning Mode (Wait / Flow) + Practice Hand Selector + Ikki qo‘l rang legendasi -->
        <div class="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-2 text-xs">
          <div class="flex items-center flex-wrap gap-2">
            <!-- Learning Mode switcher -->
            <div class="inline-flex items-center rounded-lg border border-white/[0.08] bg-black/25 p-0.5">
              <button
                type="button"
                @click="emit('update:learningMode', 'wait')"
                :class="[
                  'inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition cursor-pointer',
                  learningMode === 'wait'
                    ? 'bg-sky-400 text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-200'
                ]"
              >
                <Clock class="h-3 w-3" />
                O‘rganish (Kutish)
              </button>
              <button
                type="button"
                @click="emit('update:learningMode', 'flow')"
                :class="[
                  'inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition cursor-pointer',
                  learningMode === 'flow'
                    ? 'bg-emerald-400 text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-200'
                ]"
              >
                <Activity class="h-3 w-3" />
                Ritm (Flow)
              </button>
            </div>

            <!-- Practice Hand Selector (ikki qo‘lli darslarda) -->
            <div
              v-if="lesson.handMode === 'both'"
              class="inline-flex items-center rounded-lg border border-white/[0.08] bg-black/25 p-0.5"
            >
              <button
                type="button"
                @click="emit('update:practiceHand', 'right')"
                :class="[
                  'rounded-md px-2 py-1 text-[11px] font-semibold transition cursor-pointer',
                  practiceHand === 'right'
                    ? 'bg-sky-400 text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-200'
                ]"
              >
                Faqat o‘ng qo‘l
              </button>
              <button
                type="button"
                @click="emit('update:practiceHand', 'left')"
                :class="[
                  'rounded-md px-2 py-1 text-[11px] font-semibold transition cursor-pointer',
                  practiceHand === 'left'
                    ? 'bg-violet-400 text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-200'
                ]"
              >
                Faqat chap qo‘l
              </button>
              <button
                type="button"
                @click="emit('update:practiceHand', 'both')"
                :class="[
                  'rounded-md px-2 py-1 text-[11px] font-semibold transition cursor-pointer',
                  practiceHand === 'both'
                    ? 'bg-white text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-200'
                ]"
              >
                Ikki qo‘l birga
              </button>
            </div>
          </div>

          <!-- Ikki qo‘l rang belgisi -->
          <div class="flex items-center gap-3 text-[11px] text-zinc-400">
            <span
              v-if="lesson.handMode === 'left' || lesson.handMode === 'both'"
              class="inline-flex items-center gap-1.5"
            >
              <span class="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-orange-400" />
              Chap qo‘l
            </span>
            <span
              v-if="lesson.handMode === 'right' || lesson.handMode === 'both'"
              class="inline-flex items-center gap-1.5"
            >
              <span class="h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
              O‘ng qo‘l
            </span>
          </div>
        </div>
      </div>

      <!-- ERKIN CHALISH (FREE PLAY) HUD -->
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div class="flex items-center flex-wrap gap-2.5">
          <div class="flex items-center gap-2 rounded-xl border border-indigo-400/25 bg-indigo-500/10 px-3 py-1.5">
            <Sparkles class="h-4 w-4 text-indigo-300" />
            <span class="text-xs font-semibold text-indigo-200">Erkin chalish</span>
          </div>

          <div v-if="activeNotes.length > 0" class="flex items-center flex-wrap gap-1.5">
            <span
              v-for="note in activeNotes"
              :key="note"
              class="rounded-lg bg-sky-500/20 border border-sky-400/35 px-2.5 py-1 text-xs sm:text-sm font-bold text-sky-100"
            >
              {{ formatNoteWithSolfege(note) }}
            </span>
          </div>
          <span v-else class="text-xs sm:text-sm text-zinc-400">
            Istalgan tugmani bosing — klaviatura, sichqoncha, sensorli ekran yoki MIDI orqali erkin ijro eting.
          </span>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <div
            v-if="detectedFreeChord"
            class="inline-flex items-center gap-2 rounded-xl border border-emerald-400/35 bg-emerald-500/15 px-3 py-1.5"
          >
            <Music2 class="h-3.5 w-3.5 text-emerald-300" />
            <span class="text-xs font-bold text-emerald-200">{{ detectedFreeChord.symbol }}</span>
            <span class="text-[11px] text-emerald-300/80">({{ detectedFreeChord.uzLabel }})</span>
          </div>
          <span
            v-else
            class="desktop-hotkey-only hidden md:inline-block rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-400"
          >
            Z / X: Oktava · Space: Sustain
          </span>
        </div>
      </div>
    </div>

    <!-- ==================== MARKAZIY VIZUALIZATOR: Falling Notes / Synthesia sahnasi ==================== -->
    <div
      :class="[
        'relative w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0a0d16] via-[#0c101b] to-[#080a10] shadow-inner select-none',
        isCompact
          ? 'flex-1 min-h-[112px] p-1.5 flex items-stretch gap-1.5'
          : isScrollableKeyboard
            ? 'flex-1 min-h-[168px] max-h-[250px] p-1.5 flex items-stretch gap-1.5'
            : 'flex-1 min-h-[195px] max-h-[290px] px-2 sm:px-2.5'
      ]"
    >
      <!-- COMPACT HUD (Telefon / Kichik ekran: shaffof ustki panel) -->
      <div
        v-if="isCompact"
        class="absolute inset-x-2 top-1.5 z-35 flex items-center justify-between gap-1.5 pointer-events-none"
      >
        <template v-if="mode === 'lesson'">
          <div class="pointer-events-auto flex items-center gap-1 rounded-xl border border-white/[0.1] bg-[#0b101d]/88 backdrop-blur-md px-2 py-1 shadow-lg max-w-[46%] overflow-x-auto">
            <template v-if="activeDisplayEntries.length > 0">
              <span
                v-for="entry in activeDisplayEntries"
                :key="`cmp-${activeStep?.index}-${entry.hand}-${entry.note}`"
                :class="[
                  'inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-bold',
                  matchedChordNotes.includes(entry.note)
                    ? 'bg-emerald-500/30 text-emerald-200'
                    : entry.hand === 'left'
                      ? 'bg-violet-500/25 text-violet-100'
                      : 'bg-sky-500/25 text-sky-100'
                ]"
              >
                <span>{{ formatDisplayPitch(entry.displayNote || entry.note) }}</span>
                <span
                  v-if="entry.finger"
                  :class="[
                    'inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] font-extrabold text-zinc-950',
                    entry.hand === 'left' ? 'bg-orange-400' : 'bg-sky-300'
                  ]"
                >
                  {{ entry.finger }}
                </span>
              </span>
            </template>
            <span v-else class="text-[11px] font-semibold text-emerald-300">Tugadi!</span>
          </div>

          <!-- Compact Learning Mode + Hand Selector + Amallar -->
          <div class="pointer-events-auto flex items-center gap-1">
            <!-- Wait / Flow ixcham almashtirgich -->
            <button
              type="button"
              @click="emit('update:learningMode', learningMode === 'wait' ? 'flow' : 'wait')"
              :class="[
                'rounded-lg border px-2 py-1 text-[10px] font-bold backdrop-blur-md cursor-pointer',
                learningMode === 'flow'
                  ? 'border-emerald-400/45 bg-emerald-500/25 text-emerald-200'
                  : 'border-sky-400/35 bg-[#0b101d]/85 text-sky-200'
              ]"
              title="Rejimni almashtirish: Kutish / Ritm"
            >
              {{ learningMode === 'flow' ? 'Ritm' : 'Kutish' }}
            </button>

            <!-- Ikki qo‘l tanlash (ixcham aylanma tugma) -->
            <button
              v-if="lesson.handMode === 'both'"
              type="button"
              @click="
                emit(
                  'update:practiceHand',
                  practiceHand === 'both' ? 'right' : practiceHand === 'right' ? 'left' : 'both'
                )
              "
              class="rounded-lg border border-violet-400/35 bg-[#0b101d]/85 backdrop-blur-md px-2 py-1 text-[10px] font-bold text-violet-200 cursor-pointer"
              title="Qo‘l tanlash: Ikki qo‘l / O‘ng / Chap"
            >
              {{ practiceHand === 'both' ? '2 qo‘l' : practiceHand === 'right' ? 'O‘ng' : 'Chap' }}
            </button>

            <!-- Flow Play/Pause -->
            <button
              v-if="learningMode === 'flow'"
              type="button"
              @click="emit('toggle-flow')"
              class="flex h-6.5 w-6.5 items-center justify-center rounded-lg border border-emerald-400/45 bg-emerald-500/25 text-emerald-200 cursor-pointer"
            >
              <Pause v-if="flowRunning || flowCountIn > 0" class="h-3 w-3" />
              <Play v-else class="h-3 w-3 fill-current" />
            </button>

            <span class="hidden sm:inline-block rounded-lg border border-white/[0.09] bg-[#0b101d]/85 px-2 py-1 font-mono-num text-[10px] font-semibold text-emerald-400">
              {{ accuracy }}%
            </span>

            <button
              type="button"
              @click="emit('open-brief')"
              class="flex h-6.5 w-6.5 items-center justify-center rounded-lg border border-white/[0.1] bg-[#0b101d]/85 text-zinc-200 cursor-pointer"
              title="Yo‘riqnoma"
            >
              <Info class="h-3 w-3" />
            </button>

            <button
              type="button"
              @click="emit('toggle-demo')"
              :class="[
                'flex h-6.5 w-6.5 items-center justify-center rounded-lg border backdrop-blur-md cursor-pointer',
                isPlayingDemo
                  ? 'border-amber-400/45 bg-amber-500/25 text-amber-200'
                  : 'border-white/[0.1] bg-[#0b101d]/85 text-zinc-200'
              ]"
              title="Tinglash"
            >
              <Square v-if="isPlayingDemo" class="h-3 w-3 fill-current" />
              <Play v-else class="h-3 w-3 fill-current" />
            </button>

            <button
              type="button"
              @click="emit('restart-lesson')"
              class="flex h-6.5 w-6.5 items-center justify-center rounded-lg border border-white/[0.1] bg-[#0b101d]/85 text-zinc-200 cursor-pointer"
              title="Boshidan"
            >
              <RotateCcw class="h-3 w-3" />
            </button>
          </div>
        </template>

        <template v-else>
          <div class="flex items-center gap-1.5 flex-wrap">
            <span
              v-for="note in activeNotes"
              :key="`cfp-${note}`"
              class="rounded-lg bg-sky-500/25 border border-sky-400/40 backdrop-blur-md px-2 py-0.5 text-xs font-bold text-sky-100"
            >
              {{ formatNoteWithSolfege(note) }}
            </span>
            <span
              v-if="activeNotes.length === 0"
              class="rounded-lg bg-[#0b101d]/80 border border-white/[0.08] px-2.5 py-0.5 text-[11px] text-zinc-400"
            >
              Erkin chalish — bir nechta barmoq bilan akkord bosing
            </span>
          </div>

          <div
            v-if="detectedFreeChord"
            class="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/40 bg-emerald-500/20 backdrop-blur-md px-2.5 py-1"
          >
            <Music2 class="h-3 w-3 text-emerald-300" />
            <span class="text-xs font-bold text-emerald-100">{{ detectedFreeChord.symbol }}</span>
          </div>
        </template>
      </div>

      <!-- Flow Mode: 4-3-2-1 Sanoq (Count-In) yoki Boshlash tugmasi -->
      <div
        v-if="mode === 'lesson' && learningMode === 'flow' && !isPlayingDemo && !completed && (flowCountIn > 0 || !flowRunning)"
        class="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
      >
        <div
          v-if="flowCountIn > 0"
          class="flex flex-col items-center justify-center rounded-3xl border border-emerald-400/40 bg-[#0a0f1c]/90 backdrop-blur-xl px-8 py-4 shadow-2xl"
        >
          <span class="text-[11px] font-semibold uppercase tracking-widest text-emerald-300">
            Ritmga tayyorlaning
          </span>
          <span class="font-mono-num mt-1 text-5xl font-black text-white drop-shadow-[0_0_24px_rgba(52,211,153,0.7)]">
            {{ flowCountIn }}
          </span>
        </div>

        <button
          v-else
          type="button"
          @click="emit('toggle-flow')"
          class="pointer-events-auto inline-flex items-center gap-2 rounded-2xl border border-emerald-400/45 bg-[#0a121f]/90 hover:bg-emerald-500/25 backdrop-blur-xl px-5 py-2.5 text-sm font-bold text-emerald-200 shadow-2xl transition active:scale-95 cursor-pointer"
        >
          <Play class="h-4 w-4 fill-current" />
          <span>Ritm rejimini boshlash ({{ bpm }} BPM)</span>
        </button>
      </div>

      <!-- Chap bo‘shliq (`<` oktava tugmasi kengligiga 100% mos) -->
      <div v-if="isScrollableKeyboard" class="w-8 shrink-0 pointer-events-none" />

      <!-- Sinxronlangan qirqilgan (clipped) tushuvchi notalar oynasi -->
      <div class="relative flex-1 h-full overflow-hidden">
        <div class="relative h-full will-change-transform" :style="syncedTrackStyle">
          <!-- Orqa fon vertikal yo‘laklar -->
          <div class="absolute inset-0 pointer-events-none">
            <div
              v-for="key in WHITE_KEYS"
              :key="`lane-${key.note}`"
              class="absolute top-0 bottom-0 border-r border-white/[0.035]"
              :class="key.note === 'C4' ? 'bg-sky-400/[0.04]' : ''"
              :style="{ left: `${key.leftPct}%`, width: `${key.widthPct}%` }"
            />
            <div
              v-for="key in BLACK_KEYS"
              :key="`blane-${key.note}`"
              class="absolute top-0 bottom-0 bg-black/30"
              :style="{ left: `${key.leftPct}%`, width: `${key.widthPct}%` }"
            />
          </div>

          <div
            v-if="KEY_BY_NOTE.C4 && !isCompact"
            class="absolute top-2 z-10 -translate-x-1/2 pointer-events-none"
            :style="{ left: `${KEY_BY_NOTE.C4.centerPct}%` }"
          >
            <span class="rounded-full bg-sky-500/15 border border-sky-400/25 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-sky-300/80">
              C4 · Do
            </span>
          </div>

          <!-- DARS REJIMI: Tushuvchi notalar -->
          <template v-if="mode === 'lesson'">
            <div
              v-for="block in visibleBlocks"
              :key="block.id"
              class="absolute px-[2px] pointer-events-none will-change-transform"
              :style="{
                left: `${block.leftPct}%`,
                width: `${block.widthPct}%`,
                bottom: `${block.bottomPct}%`,
                height: `${block.heightPct}%`,
                opacity: !block.isActiveHand
                  ? 0.24
                  : block.isPast
                    ? Math.max(0, 1 + (block.bottomPct - HIT_LINE_PCT) / 14)
                    : 1,
                zIndex: block.isCurrent ? 20 : block.isBlack ? 14 : 12
              }"
            >
              <div
                :class="[
                  'flex h-full w-full flex-col items-center justify-end pb-1 rounded-lg border transition-colors duration-150',
                  getBlockClasses(block)
                ]"
              >
                <span
                  v-if="block.finger && block.isActiveHand && !block.isPast"
                  :class="[
                    'flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-extrabold leading-none',
                    block.isCurrent
                      ? block.hand === 'left'
                        ? 'bg-zinc-950/90 text-orange-300'
                        : 'bg-zinc-950/90 text-sky-300'
                      : 'bg-zinc-950/60 text-white/90'
                  ]"
                >
                  {{ block.finger }}
                </span>
                <span
                  :class="[
                    'mt-0.5 text-[9px] font-bold leading-none tracking-tight',
                    block.isCurrent ? 'text-zinc-950' : 'text-white/90'
                  ]"
                >
                  {{ block.displayNote }}
                </span>
              </div>
            </div>

            <!-- Ijro chizig‘i -->
            <div
              class="absolute inset-x-0 z-25 pointer-events-none"
              :style="{ bottom: `${HIT_LINE_PCT}%` }"
            >
              <div
                class="h-[2px] w-full bg-gradient-to-r from-transparent to-transparent shadow-[0_0_16px_rgba(56,189,248,0.8)]"
                :class="learningMode === 'flow' ? 'via-emerald-400/85' : 'via-sky-400/75'"
              />
            </div>
          </template>

          <!-- ERKIN CHALISH REJIMI -->
          <template v-else>
            <div
              v-for="ribbon in ribbons"
              :key="ribbon.id"
              class="absolute px-[2px] pointer-events-none"
              :style="{
                left: `${ribbon.leftPct}%`,
                width: `${ribbon.widthPct}%`,
                bottom: `${ribbon.bottomPct}%`,
                height: `${ribbon.heightPct}%`,
                opacity: ribbon.opacity,
                zIndex: ribbon.isBlack ? 16 : 12
              }"
            >
              <div
                :class="[
                  'h-full w-full rounded-t-lg border-t border-x',
                  ribbon.isBlack
                    ? 'bg-gradient-to-t from-violet-500/75 via-fuchsia-400/50 to-indigo-300/20 border-violet-300/60 shadow-[0_0_18px_rgba(167,139,250,0.5)]'
                    : 'bg-gradient-to-t from-sky-400/80 via-cyan-400/45 to-blue-300/15 border-sky-200/60 shadow-[0_0_18px_rgba(56,189,248,0.5)]'
                ]"
              />
            </div>
          </template>

          <!-- Chaqnash effektlari -->
          <div
            v-for="note in correctFlashNotes"
            :key="`cf-${note}`"
            class="absolute bottom-0 h-20 pointer-events-none z-30"
            :style="{
              left: `${KEY_BY_NOTE[note]?.leftPct || 0}%`,
              width: `${KEY_BY_NOTE[note]?.widthPct || 0}%`
            }"
          >
            <div class="h-full w-full bg-gradient-to-t from-emerald-400/60 via-emerald-400/20 to-transparent" />
          </div>

          <div
            v-for="note in wrongNotes"
            :key="`wf-${note}`"
            class="absolute bottom-0 h-24 pointer-events-none z-30"
            :style="{
              left: `${KEY_BY_NOTE[note]?.leftPct || 0}%`,
              width: `${KEY_BY_NOTE[note]?.widthPct || 0}%`
            }"
          >
            <div class="h-full w-full bg-gradient-to-t from-red-500/70 via-red-500/25 to-transparent" />
          </div>

          <div
            v-for="note in activeNotes"
            :key="`act-${note}`"
            class="absolute bottom-0 h-10 pointer-events-none z-20"
            :style="{
              left: `${KEY_BY_NOTE[note]?.leftPct || 0}%`,
              width: `${KEY_BY_NOTE[note]?.widthPct || 0}%`
            }"
          >
            <div class="h-full w-full bg-gradient-to-t from-sky-400/45 to-transparent" />
          </div>
        </div>

        <div
          class="absolute inset-x-0 top-0 h-12 z-25 pointer-events-none bg-gradient-to-b from-[#0a0d16] to-transparent"
        />
      </div>

      <!-- O‘ng bo‘shliq (`>` oktava tugmasi kengligiga 100% mos) -->
      <div v-if="isScrollableKeyboard" class="w-8 shrink-0 pointer-events-none" />
    </div>
  </section>
</template>
