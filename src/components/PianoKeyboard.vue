<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import {
  Tag,
  Keyboard,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Loader2,
  Waves
} from 'lucide-vue-next'
import { WHITE_KEYS, BLACK_KEYS } from '../utils/musicTheory.js'

const props = defineProps({
  activeNotes: { type: Array, default: () => [] },
  targetNotes: { type: Array, default: () => [] },
  targetFingers: { type: Object, default: () => ({}) },
  targetHands: { type: Object, default: () => ({}) }, // { [note]: 'left' | 'right' }
  correctNotes: { type: Array, default: () => [] },
  wrongNotes: { type: Array, default: () => [] },
  noteToHotkey: { type: Object, default: () => ({}) },
  showNoteNames: { type: Boolean, default: true },
  showHotkeys: { type: Boolean, default: true },
  octaveOffset: { type: Number, default: 0 },
  sustainActive: { type: Boolean, default: false },
  audioState: { type: Object, required: true },
  isCompact: { type: Boolean, default: false },
  isShortLandscape: { type: Boolean, default: false },
  isScrollableKeyboard: { type: Boolean, default: false },
  trackWidthPx: { type: Number, default: null },
  panOffsetPx: { type: Number, default: 0 },
  maxPanPx: { type: Number, default: 0 },
  visibleRangeLabel: { type: String, default: 'C3–C6' }
})

const emit = defineEmits([
  'note-on',
  'note-off',
  'update:showNoteNames',
  'update:showHotkeys',
  'update:octaveOffset',
  'toggle-sustain',
  'update:volume',
  'toggle-mute',
  'unlock-audio',
  'viewport-resize',
  'pan-left',
  'pan-right',
  'pan-to-ratio'
])

const keybedViewportRef = ref(null)
let resizeObserver = null

const activeSet = computed(() => new Set(props.activeNotes))
const targetSet = computed(() => new Set(props.targetNotes))
const correctSet = computed(() => new Set(props.correctNotes))
const wrongSet = computed(() => new Set(props.wrongNotes))

const octaveRangeLabel = computed(() => {
  if (props.octaveOffset === -1) return 'C3–F4'
  if (props.octaveOffset === 1) return 'C5–C6'
  return 'C4–F5'
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

const minimapThumbStyle = computed(() => {
  if (!props.isScrollableKeyboard || !props.trackWidthPx || props.maxPanPx <= 0) {
    return { left: '0%', width: '100%' }
  }
  const viewportWidth = props.trackWidthPx - props.maxPanPx
  const widthPct = Math.max(18, Math.min(100, (viewportWidth / props.trackWidthPx) * 100))
  const leftPct = (props.panOffsetPx / props.trackWidthPx) * 100
  return {
    left: `${leftPct}%`,
    width: `${widthPct}%`
  }
})

const canPanLeft = computed(() => props.panOffsetPx > 4)
const canPanRight = computed(() => props.panOffsetPx < props.maxPanPx - 4)

/**
 * MULTI-TOUCH POINTER ENGINE (3–5 barmoq bilan akkordlar va silliq sirpanish)
 */
const pointerToNote = new Map()

function isNoteHeldByAnyPointer(note) {
  for (const held of pointerToNote.values()) {
    if (held === note) return true
  }
  return false
}

function handlePointerDown(event, note) {
  event.preventDefault()
  if (pointerToNote.get(event.pointerId) === note) return

  const alreadyHeld = isNoteHeldByAnyPointer(note)
  pointerToNote.set(event.pointerId, note)

  if (!alreadyHeld) {
    const pressure = typeof event.pressure === 'number' && event.pressure > 0.1 ? event.pressure : 0.88
    emit('note-on', note, Math.max(0.55, Math.min(1, pressure)))
  }
}

function handleKeybedPointerMove(event) {
  const isTracked = pointerToNote.has(event.pointerId)
  if (!isTracked && !(event.pointerType === 'mouse' && event.buttons === 1)) {
    return
  }

  const prevNote = pointerToNote.get(event.pointerId) || null
  const hitEl = document.elementFromPoint(event.clientX, event.clientY)
  const keyButton = hitEl?.closest?.('[data-note]')
  const nextNote = keyButton?.dataset?.note || null

  if (nextNote === prevNote) return

  if (nextNote) {
    pointerToNote.set(event.pointerId, nextNote)
  } else {
    pointerToNote.delete(event.pointerId)
  }

  if (prevNote && !isNoteHeldByAnyPointer(prevNote)) {
    emit('note-off', prevNote)
  }

  if (nextNote) {
    let otherHoldsNext = false
    for (const [pid, n] of pointerToNote.entries()) {
      if (pid !== event.pointerId && n === nextNote) {
        otherHoldsNext = true
        break
      }
    }
    if (!otherHoldsNext) {
      emit('note-on', nextNote, 0.84)
    }
  }
}

function releasePointerById(pointerId) {
  if (!pointerToNote.has(pointerId)) return
  const note = pointerToNote.get(pointerId)
  pointerToNote.delete(pointerId)
  if (note && !isNoteHeldByAnyPointer(note)) {
    emit('note-off', note)
  }
}

function handleWindowPointerUp(event) {
  releasePointerById(event.pointerId)
}

function handleKeyPointerLeave(event, note) {
  if (event.pointerType === 'mouse' && event.buttons === 0 && pointerToNote.get(event.pointerId) === note) {
    releasePointerById(event.pointerId)
  }
}

function handleMinimapClick(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  if (rect.width <= 0) return
  const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
  emit('pan-to-ratio', ratio)
}

function getWhiteKeyClasses(note) {
  const isWrong = wrongSet.value.has(note)
  const isCorrect = correctSet.value.has(note)
  const isTarget = targetSet.value.has(note)
  const isActive = activeSet.value.has(note)
  const hand = props.targetHands[note] || 'right'

  if (isWrong) {
    return 'bg-gradient-to-b from-red-400 via-red-500 to-rose-600 text-white shadow-[0_0_24px_rgba(239,68,68,0.85)] translate-y-[2px] animate-wrong-shake border-red-300'
  }
  if (isCorrect) {
    return 'bg-gradient-to-b from-emerald-300 via-emerald-400 to-teal-500 text-zinc-950 shadow-[0_0_24px_rgba(16,185,129,0.75)] translate-y-[2px] border-emerald-200'
  }
  if (isTarget) {
    if (hand === 'left') {
      return 'bg-gradient-to-b from-violet-100 via-purple-300 to-orange-300 text-zinc-950 animate-target-left-pulse border-violet-300'
    }
    return 'bg-gradient-to-b from-sky-100 via-cyan-200 to-emerald-300 text-zinc-950 animate-target-pulse border-sky-300'
  }
  if (isActive) {
    return 'bg-gradient-to-b from-sky-200 via-sky-300 to-indigo-400 text-zinc-950 shadow-[0_0_20px_rgba(56,189,248,0.65)] translate-y-[2px] border-sky-300'
  }
  return 'bg-gradient-to-b from-[#fbfcfd] via-[#f3f5f8] to-[#dfe4ec] text-zinc-700 hover:from-white hover:to-[#e7ecf3] border-zinc-400/50 shadow-[inset_0_-6px_8px_rgba(15,23,42,0.12),0_4px_6px_rgba(0,0,0,0.45)]'
}

function getBlackKeyClasses(note) {
  const isWrong = wrongSet.value.has(note)
  const isCorrect = correctSet.value.has(note)
  const isTarget = targetSet.value.has(note)
  const isActive = activeSet.value.has(note)
  const hand = props.targetHands[note] || 'right'

  if (isWrong) {
    return 'bg-gradient-to-b from-red-500 via-red-600 to-rose-700 text-white border-red-300 shadow-[0_0_22px_rgba(239,68,68,0.9)] translate-y-[2px] animate-wrong-shake'
  }
  if (isCorrect) {
    return 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-600 text-zinc-950 border-emerald-200 shadow-[0_0_22px_rgba(16,185,129,0.85)] translate-y-[2px]'
  }
  if (isTarget) {
    if (hand === 'left') {
      return 'bg-gradient-to-b from-violet-500 via-purple-600 to-orange-400 text-white border-violet-200 animate-target-left-pulse'
    }
    return 'bg-gradient-to-b from-sky-400 via-cyan-500 to-emerald-400 text-zinc-950 border-sky-200 animate-target-pulse'
  }
  if (isActive) {
    return 'bg-gradient-to-b from-indigo-400 via-violet-500 to-indigo-700 text-white border-indigo-300 shadow-[0_0_18px_rgba(129,140,248,0.8)] translate-y-[2px]'
  }
  return 'bg-gradient-to-b from-[#2b303c] via-[#151821] to-[#0a0c11] text-zinc-400 border-zinc-700/70 hover:from-[#363c4b] shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-5px_6px_rgba(0,0,0,0.85),0_6px_12px_rgba(0,0,0,0.8)]'
}

function getFingerBadgeClass(note) {
  const hand = props.targetHands[note] || 'right'
  if (hand === 'left') {
    return 'bg-zinc-950 text-orange-300 ring-2 ring-violet-400/90'
  }
  return 'bg-zinc-950 text-sky-300 ring-2 ring-emerald-300/90'
}

function measureViewport() {
  if (!keybedViewportRef.value) return
  emit('viewport-resize', keybedViewportRef.value.clientWidth)
}

onMounted(() => {
  window.addEventListener('pointerup', handleWindowPointerUp, { passive: true })
  window.addEventListener('pointercancel', handleWindowPointerUp, { passive: true })

  measureViewport()
  if (typeof ResizeObserver !== 'undefined' && keybedViewportRef.value) {
    resizeObserver = new ResizeObserver(() => measureViewport())
    resizeObserver.observe(keybedViewportRef.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('pointerup', handleWindowPointerUp)
  window.removeEventListener('pointercancel', handleWindowPointerUp)
  resizeObserver?.disconnect()

  for (const note of new Set(pointerToNote.values())) {
    emit('note-off', note)
  }
  pointerToNote.clear()
})
</script>

<template>
  <section :class="['w-full shrink-0', isCompact ? 'space-y-1' : 'space-y-2.5']">
    <!-- LAPTOP / KATTA EKRAN BOSHQARUV PANELI -->
    <div
      v-if="!isCompact"
      class="glass-panel rounded-2xl px-3.5 py-2 flex flex-wrap items-center justify-between gap-2.5"
    >
      <div class="flex items-center flex-wrap gap-1.5 sm:gap-2">
        <button
          type="button"
          @click="emit('update:showNoteNames', !showNoteNames)"
          :class="[
            'inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium border transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60',
            showNoteNames
              ? 'border-sky-400/35 bg-sky-500/15 text-sky-200'
              : 'border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-zinc-200'
          ]"
        >
          <Tag class="h-3.5 w-3.5" />
          <span>Nota nomlari</span>
        </button>

        <button
          type="button"
          @click="emit('update:showHotkeys', !showHotkeys)"
          :class="[
            'desktop-hotkey-only inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium border transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60',
            showHotkeys
              ? 'border-sky-400/35 bg-sky-500/15 text-sky-200'
              : 'border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-zinc-200'
          ]"
        >
          <Keyboard class="h-3.5 w-3.5" />
          <span>Klaviatura harflari</span>
        </button>

        <div
          class="desktop-hotkey-only inline-flex items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.035] px-1.5 py-1 text-xs"
          title="Kompyuter klaviaturasi oktavasini o‘zgartirish (Z / X)"
        >
          <button
            type="button"
            :disabled="octaveOffset <= -1"
            @click="emit('update:octaveOffset', Math.max(-1, octaveOffset - 1))"
            class="flex h-5 w-5 items-center justify-center rounded-md text-zinc-300 hover:bg-white/10 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronLeft class="h-3.5 w-3.5" />
          </button>
          <span class="font-mono-num px-1 text-[11px] font-medium text-zinc-300">
            {{ octaveRangeLabel }}
          </span>
          <button
            type="button"
            :disabled="octaveOffset >= 1"
            @click="emit('update:octaveOffset', Math.min(1, octaveOffset + 1))"
            class="flex h-5 w-5 items-center justify-center rounded-md text-zinc-300 hover:bg-white/10 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronRight class="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          type="button"
          @click="emit('toggle-sustain')"
          :class="[
            'inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium border transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60',
            sustainActive
              ? 'border-amber-400/40 bg-amber-500/15 text-amber-200'
              : 'border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-zinc-200'
          ]"
          title="Sustain pedali (Space tugmasini bosib turish ham mumkin)"
        >
          <Waves class="h-3.5 w-3.5" />
          <span>Sustain</span>
        </button>
      </div>

      <div class="flex items-center gap-2.5 ml-auto">
        <button
          v-if="!audioState.ready"
          type="button"
          @click="emit('unlock-audio')"
          class="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-200 hover:bg-amber-500/25 transition cursor-pointer"
        >
          <Sparkles class="h-3 w-3 animate-pulse" />
          Ovozni yoqish
        </button>
        <div
          v-else
          class="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-400"
        >
          <Loader2 v-if="audioState.samplerLoading" class="h-3 w-3 animate-spin text-sky-400" />
          <span
            v-else
            class="h-1.5 w-1.5 rounded-full"
            :class="audioState.samplerLoaded ? 'bg-emerald-400' : 'bg-sky-400'"
          />
          <span>{{ audioState.samplerLoading ? 'Grand Piano yuklanmoqda...' : audioState.engineLabel }}</span>
        </div>

        <div class="flex items-center gap-1.5">
          <button
            type="button"
            @click="emit('toggle-mute')"
            class="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 transition cursor-pointer"
            title="Ovozni o‘chirish / yoqish"
          >
            <VolumeX v-if="audioState.muted || audioState.volume === 0" class="h-3.5 w-3.5 text-red-400" />
            <Volume2 v-else class="h-3.5 w-3.5" />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            :value="audioState.muted ? 0 : audioState.volume"
            @input="emit('update:volume', Number($event.target.value))"
            class="studio-slider w-16 sm:w-20"
            aria-label="Ovoz balandligi"
          />
        </div>
      </div>
    </div>

    <!-- VIRTUAL PIANINO KLAVIATURASI -->
    <div
      :class="[
        'relative rounded-2xl border border-white/[0.09] bg-[#0b0d14] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)]',
        isScrollableKeyboard ? 'p-1.5 pb-2.5 sm:pb-3' : 'p-2 sm:p-2.5'
      ]"
    >
      <div
        v-if="isScrollableKeyboard"
        class="mb-1 flex items-center gap-2 px-1"
      >
        <span class="font-mono-num text-[9px] font-semibold text-zinc-500">C3</span>
        <div
          class="relative h-2 flex-1 rounded-full bg-white/[0.06] cursor-pointer overflow-hidden"
          @pointerdown="handleMinimapClick"
          title="Oktava oralig‘iga tezkor o‘tish"
        >
          <div
            class="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400/75 to-indigo-400/75 transition-all duration-300"
            :style="minimapThumbStyle"
          />
        </div>
        <span class="font-mono-num text-[9px] font-semibold text-zinc-500">C6</span>
        <span class="font-mono-num rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-semibold text-sky-300">
          {{ visibleRangeLabel }}
        </span>
      </div>

      <div
        v-else
        class="h-1.5 w-full rounded-t-md bg-gradient-to-r from-rose-950 via-red-800/80 to-rose-950 mb-0.5 shadow-inner"
      />

      <div class="flex items-stretch gap-1.5">
        <button
          v-if="isScrollableKeyboard"
          type="button"
          :disabled="!canPanLeft"
          @click="emit('pan-left')"
          class="flex w-9 sm:w-10 shrink-0 flex-col items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.045] active:bg-sky-500/25 active:border-sky-400/40 text-zinc-200 disabled:opacity-25 active:scale-95 transition cursor-pointer select-none"
          aria-label="Pastki oktavaga surish"
          title="Pastki oktava"
        >
          <ChevronLeft class="h-4.5 w-4.5" />
          <span class="mt-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-400">Okt</span>
        </button>

        <div
          ref="keybedViewportRef"
          :class="[
            'piano-touch-surface relative flex-1 overflow-hidden rounded-b-[10px]',
            isShortLandscape
              ? 'h-[44dvh] min-h-[142px] max-h-[190px]'
              : isCompact
                ? 'h-48 sm:h-52'
                : 'h-44 sm:h-52 lg:h-56'
          ]"
          @pointermove="handleKeybedPointerMove"
          @contextmenu.prevent
        >
          <div class="relative h-full will-change-transform" :style="syncedTrackStyle">
            <!-- 22 ta oq tugma -->
            <button
              v-for="key in WHITE_KEYS"
              :key="key.note"
              type="button"
              :data-note="key.note"
              @pointerdown="handlePointerDown($event, key.note)"
              @pointerleave="handleKeyPointerLeave($event, key.note)"
              @contextmenu.prevent
              :style="{ left: `${key.leftPct}%`, width: `${key.widthPct}%` }"
              :class="[
                'piano-touch-surface absolute top-0 bottom-0.5 sm:bottom-1 flex flex-col items-center justify-end pb-2 sm:pb-2.5 rounded-b-[8px] border-x border-b transition-[transform,background,box-shadow] duration-75 cursor-pointer focus:outline-none',
                getWhiteKeyClasses(key.note)
              ]"
            >
              <span
                v-if="key.note === 'C4'"
                class="mb-auto mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.9)]"
                title="Markaziy Do (C4)"
              />

              <!-- Barmoq raqami (Chap: binafsha/sariq, O‘ng: ko‘k/yashil) -->
              <span
                v-if="targetSet.has(key.note) && targetFingers[key.note]"
                :class="[
                  'mb-1.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-extrabold shadow-md pointer-events-none',
                  getFingerBadgeClass(key.note)
                ]"
              >
                {{ targetFingers[key.note] }}
              </span>

              <span
                v-if="showHotkeys && noteToHotkey[key.note]"
                :class="[
                  'desktop-hotkey-only mb-1 flex h-5 min-w-[20px] items-center justify-center rounded px-1 font-mono-num text-[10px] font-bold border pointer-events-none',
                  targetSet.has(key.note) || activeSet.has(key.note) || correctSet.has(key.note)
                    ? 'bg-zinc-950/20 border-zinc-950/25 text-zinc-950'
                    : 'bg-zinc-900/10 border-zinc-900/15 text-zinc-600'
                ]"
              >
                {{ noteToHotkey[key.note] }}
              </span>

              <div v-if="showNoteNames" class="flex flex-col items-center leading-tight pointer-events-none">
                <span class="text-[11px] font-bold tracking-tight">
                  {{ key.note }}
                </span>
                <span class="text-[9px] font-medium opacity-75">
                  {{ key.solfege }}
                </span>
              </div>
            </button>

            <!-- 15 ta qora tugma -->
            <button
              v-for="key in BLACK_KEYS"
              :key="key.note"
              type="button"
              :data-note="key.note"
              @pointerdown.stop="handlePointerDown($event, key.note)"
              @pointerleave.stop="handleKeyPointerLeave($event, key.note)"
              @contextmenu.prevent
              :style="{ left: `${key.leftPct}%`, width: `${key.widthPct}%` }"
              :class="[
                'piano-touch-surface absolute top-0 h-[60%] z-20 flex flex-col items-center justify-end pb-1.5 rounded-b-[7px] border-x border-b transition-[transform,background,box-shadow] duration-75 cursor-pointer focus:outline-none',
                getBlackKeyClasses(key.note)
              ]"
            >
              <span
                v-if="targetSet.has(key.note) && targetFingers[key.note]"
                :class="[
                  'mb-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-extrabold pointer-events-none',
                  getFingerBadgeClass(key.note)
                ]"
              >
                {{ targetFingers[key.note] }}
              </span>

              <span
                v-if="showHotkeys && noteToHotkey[key.note]"
                class="desktop-hotkey-only mb-0.5 rounded bg-white/10 px-1 py-0.5 font-mono-num text-[9px] font-bold text-zinc-200 leading-none pointer-events-none"
              >
                {{ noteToHotkey[key.note] }}
              </span>

              <span
                v-if="showNoteNames"
                class="text-[8px] font-semibold opacity-80 leading-none pointer-events-none"
              >
                {{ key.note }}
              </span>
            </button>
          </div>
        </div>

        <button
          v-if="isScrollableKeyboard"
          type="button"
          :disabled="!canPanRight"
          @click="emit('pan-right')"
          class="flex w-9 sm:w-10 shrink-0 flex-col items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.045] active:bg-sky-500/25 active:border-sky-400/40 text-zinc-200 disabled:opacity-25 active:scale-95 transition cursor-pointer select-none"
          aria-label="Yuqori oktavaga surish"
          title="Yuqori oktava"
        >
          <ChevronRight class="h-4.5 w-4.5" />
          <span class="mt-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-400">Okt</span>
        </button>
      </div>
    </div>
  </section>
</template>
