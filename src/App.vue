<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import TopBar from './components/TopBar.vue'
import LessonDrawer from './components/LessonDrawer.vue'
import LessonPlayer from './components/LessonPlayer.vue'
import OrientationOverlay from './components/OrientationOverlay.vue'
import { LEVELS, LESSONS, getRecommendedLessonId } from './data/lessons/index.js'
import { audioEngine } from './audio/AudioEngine.js'
import { midiHandler } from './utils/midiHandler.js'
import { useViewport } from './utils/useViewport.js'
import {
  loadProgressData,
  recordLessonResult,
  updateSettings,
  resetAllProgress
} from './utils/storage.js'

const { viewport, toggleFullscreen } = useViewport()
const progressData = ref(loadProgressData())

const initialLesson =
  LESSONS.find((l) => l.id === progressData.value.settings.lastLessonId) || LESSONS[0]

const currentLessonId = ref(initialLesson.id)
const mode = ref('lesson') // 'lesson' | 'freeplay'
const learningMode = ref(progressData.value.settings.learningMode || 'wait') // 'wait' | 'flow'
const drawerOpen = ref(false)
const stepProgress = ref({ current: 0, total: initialLesson.steps.length })
const bpm = ref(initialLesson.defaultBpm)
const isNewRecord = ref(false)
const orientationDismissed = ref(false)

const showNoteNames = ref(progressData.value.settings.showNoteNames)
const showHotkeys = ref(progressData.value.settings.showHotkeys)
const octaveOffset = ref(progressData.value.settings.octaveOffset)

const currentLessonIndex = computed(() =>
  Math.max(0, LESSONS.findIndex((l) => l.id === currentLessonId.value))
)

const currentLesson = computed(() => LESSONS[currentLessonIndex.value] || LESSONS[0])
const currentLevelInfo = computed(
  () => LEVELS.find((lvl) => lvl.id === currentLesson.value.level) || null
)
const hasNextLesson = computed(() => currentLessonIndex.value < LESSONS.length - 1)

const completedCount = computed(
  () => LESSONS.filter((l) => progressData.value.lessons[l.id]?.completed).length
)

const recommendedLessonId = computed(() =>
  getRecommendedLessonId(progressData.value.lessons)
)

const showOrientationPrompt = computed(
  () => viewport.isMobilePortrait && !orientationDismissed.value
)

watch(
  () => viewport.isMobilePortrait,
  (isPortrait) => {
    if (!isPortrait) {
      orientationDismissed.value = false
    }
  }
)

function selectLesson(lessonId) {
  const found = LESSONS.find((l) => l.id === lessonId)
  if (!found) return
  currentLessonId.value = found.id
  stepProgress.value = { current: 0, total: found.steps.length }
  bpm.value = found.defaultBpm
  audioEngine.setBpm(found.defaultBpm)
  isNewRecord.value = false
  mode.value = 'lesson'
  progressData.value = updateSettings(progressData.value, { lastLessonId: found.id })
}

function goToNextLesson() {
  if (!hasNextLesson.value) return
  selectLesson(LESSONS[currentLessonIndex.value + 1].id)
}

function handleBpmUpdate(newBpm) {
  bpm.value = newBpm
  audioEngine.setBpm(newBpm)
}

function handleLearningModeUpdate(val) {
  learningMode.value = val
  progressData.value = updateSettings(progressData.value, { learningMode: val })
}

function handleLessonCompleted(payload) {
  const res = recordLessonResult(progressData.value, payload)
  progressData.value = res.data
  isNewRecord.value = res.isNewRecord
}

function handleShowNoteNames(val) {
  showNoteNames.value = val
  progressData.value = updateSettings(progressData.value, { showNoteNames: val })
}

function handleShowHotkeys(val) {
  showHotkeys.value = val
  progressData.value = updateSettings(progressData.value, { showHotkeys: val })
}

function handleOctaveOffset(val) {
  octaveOffset.value = val
  progressData.value = updateSettings(progressData.value, { octaveOffset: val })
}

function handleResetProgress() {
  progressData.value = resetAllProgress()
  isNewRecord.value = false
}

function handleUserAudioUnlock() {
  if (!audioEngine.state.ready) {
    audioEngine.ensureStarted()
  }
}

onMounted(() => {
  audioEngine.setVolume(progressData.value.settings.volume ?? 0.85)
  audioEngine.setBpm(bpm.value)

  window.addEventListener('touchstart', handleUserAudioUnlock, { passive: true })
  window.addEventListener('pointerdown', handleUserAudioUnlock, { passive: true })
  window.addEventListener('keydown', handleUserAudioUnlock, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('touchstart', handleUserAudioUnlock)
  window.removeEventListener('pointerdown', handleUserAudioUnlock)
  window.removeEventListener('keydown', handleUserAudioUnlock)
  audioEngine.stopMetronome()
  audioEngine.stopDemo()
  midiHandler.dispose()
})
</script>

<template>
  <div
    :class="[
      'relative flex flex-col bg-[#07080c] text-zinc-100 overflow-x-hidden',
      viewport.isCompact || viewport.isScrollableKeyboard ? 'h-dvh overflow-hidden' : 'min-h-dvh'
    ]"
  >
    <!-- Fon muhit nuri -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        class="absolute -top-40 left-1/4 h-[420px] w-[520px] rounded-full bg-sky-500/[0.06] blur-[120px]"
      />
      <div
        class="absolute bottom-0 right-1/4 h-[380px] w-[480px] rounded-full bg-indigo-500/[0.06] blur-[120px]"
      />
    </div>

    <!-- Yuqori boshqaruv paneli -->
    <TopBar
      :lesson="currentLesson"
      :mode="mode"
      :current-step-index="stepProgress.current"
      :total-steps="stepProgress.total"
      :bpm="bpm"
      :metronome-enabled="audioEngine.state.metronomeEnabled"
      :current-beat="audioEngine.state.currentBeat"
      :midi-state="midiHandler.state"
      :audio-state="audioEngine.state"
      :completed-count="completedCount"
      :total-lessons="LESSONS.length"
      :viewport="viewport"
      :show-note-names="showNoteNames"
      @open-drawer="drawerOpen = true"
      @update:mode="mode = $event"
      @update:bpm="handleBpmUpdate"
      @toggle-metronome="audioEngine.toggleMetronome()"
      @toggle-fullscreen="toggleFullscreen()"
      @unlock-audio="audioEngine.ensureStarted()"
      @update:show-note-names="handleShowNoteNames"
      @toggle-sustain="audioEngine.setSustainPedal(!audioEngine.state.sustainPedal)"
      @update:volume="audioEngine.setVolume($event)"
      @toggle-mute="audioEngine.toggleMute()"
    />

    <!-- Asosiy interaktiv dars va pianino maydoni -->
    <LessonPlayer
      :lesson="currentLesson"
      :level-info="currentLevelInfo"
      :has-next-lesson="hasNextLesson"
      :mode="mode"
      :learning-mode="learningMode"
      :bpm="bpm"
      :audio-engine="audioEngine"
      :midi-handler="midiHandler"
      :viewport="viewport"
      :show-note-names="showNoteNames"
      :show-hotkeys="showHotkeys"
      :octave-offset="octaveOffset"
      :is-new-record="isNewRecord"
      @progress-change="stepProgress = $event"
      @lesson-completed="handleLessonCompleted"
      @next-lesson="goToNextLesson"
      @switch-freeplay="mode = 'freeplay'"
      @update:learning-mode="handleLearningModeUpdate"
      @update:show-note-names="handleShowNoteNames"
      @update:show-hotkeys="handleShowHotkeys"
      @update:octave-offset="handleOctaveOffset"
    />

    <!-- 6-bosqichli Kurs xaritasi yon paneli -->
    <LessonDrawer
      :open="drawerOpen"
      :levels="LEVELS"
      :lessons="LESSONS"
      :current-lesson-id="currentLessonId"
      :recommended-lesson-id="recommendedLessonId"
      :progress-map="progressData.lessons"
      @close="drawerOpen = false"
      @select-lesson="selectLesson"
      @reset-progress="handleResetProgress"
    />

    <!-- Telefon vertikal ogohlantirishi -->
    <OrientationOverlay
      :visible="showOrientationPrompt"
      @dismiss="orientationDismissed = true"
    />
  </div>
</template>
