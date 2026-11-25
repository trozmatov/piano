<script setup>
import { ref, computed } from 'vue'
import {
  BookOpen,
  ChevronDown,
  Minus,
  Plus,
  Piano,
  GraduationCap,
  Radio,
  Sparkles,
  CheckCircle2,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Tag,
  Waves,
  X,
  Smartphone,
  Info
} from 'lucide-vue-next'

const props = defineProps({
  lesson: { type: Object, required: true },
  mode: { type: String, required: true }, // 'lesson' | 'freeplay'
  currentStepIndex: { type: Number, default: 0 },
  totalSteps: { type: Number, default: 1 },
  bpm: { type: Number, default: 80 },
  metronomeEnabled: { type: Boolean, default: false },
  currentBeat: { type: Number, default: 0 },
  midiState: { type: Object, required: true },
  audioState: { type: Object, required: true },
  completedCount: { type: Number, default: 0 },
  totalLessons: { type: Number, default: 5 },
  viewport: { type: Object, required: true },
  showNoteNames: { type: Boolean, default: true }
})

const emit = defineEmits([
  'open-drawer',
  'update:mode',
  'update:bpm',
  'toggle-metronome',
  'toggle-fullscreen',
  'unlock-audio',
  'update:showNoteNames',
  'toggle-sustain',
  'update:volume',
  'toggle-mute'
])

const settingsOpen = ref(false)

const progressPercent = computed(() => {
  if (props.totalSteps <= 0) return 0
  return Math.min(100, Math.round((props.currentStepIndex / props.totalSteps) * 100))
})

const midiLabel = computed(() => {
  if (!props.midiState.supported) return 'MIDI yo‘q'
  if (props.midiState.connected && props.midiState.devices.length > 0) {
    return props.midiState.devices[0].name
  }
  return 'MIDI kutmoqda'
})

function adjustBpm(delta) {
  emit('update:bpm', Math.max(40, Math.min(160, props.bpm + delta)))
}

function openLessonsFromSettings() {
  settingsOpen.value = false
  emit('open-drawer')
}
</script>

<template>
  <header class="sticky top-0 z-30 w-full border-b border-white/[0.07] bg-[#090b10]/85 backdrop-blur-2xl shrink-0">
    <!-- ==================== COMPACT HUD (Telefon / Planshet: max-width 900px yoki max-height 500px) ==================== -->
    <div v-if="viewport.isCompact" class="safe-area-x relative py-1.5">
      <div class="flex items-center justify-between gap-2">
        <!-- Chap: Dars nomi + qadam -->
        <button
          type="button"
          @click="emit('open-drawer')"
          class="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] active:bg-white/[0.1] px-2.5 py-1 text-left min-w-0 cursor-pointer"
        >
          <div
            class="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600"
          >
            <Piano class="h-3.5 w-3.5 text-white" />
          </div>
          <div class="min-w-0">
            <p class="truncate text-xs font-semibold text-zinc-100 max-w-[140px] sm:max-w-[230px]">
              {{ mode === 'lesson' ? lesson.title : 'Erkin chalish' }}
            </p>
          </div>
          <span
            v-if="mode === 'lesson'"
            class="font-mono-num shrink-0 rounded-md bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-sky-300"
          >
            {{ Math.min(currentStepIndex, totalSteps) }}/{{ totalSteps }}
          </span>
          <ChevronDown class="h-3.5 w-3.5 shrink-0 text-zinc-400" />
        </button>

        <!-- O‘ng: Ovozni yoqish + Rejim + Fullscreen + Sozlamalar -->
        <div class="flex items-center gap-1.5 shrink-0">
          <!-- Mobil audio bloklangan bo‘lsa: Ovozni yoqish tugmasi -->
          <button
            v-if="!audioState.ready"
            type="button"
            @click="emit('unlock-audio')"
            class="inline-flex items-center gap-1 rounded-xl border border-amber-400/45 bg-amber-500/20 px-2.5 py-1 text-[11px] font-semibold text-amber-200 active:scale-95 transition cursor-pointer"
          >
            <Volume2 class="h-3.5 w-3.5 animate-pulse" />
            <span>Ovozni yoqish</span>
          </button>

          <!-- Rejim almashtirgich (ixcham) -->
          <div class="flex items-center rounded-xl border border-white/[0.08] bg-white/[0.04] p-0.5">
            <button
              type="button"
              @click="emit('update:mode', 'lesson')"
              :class="[
                'flex items-center gap-1 rounded-[9px] px-2 py-1 text-[11px] font-semibold transition cursor-pointer',
                mode === 'lesson' ? 'bg-white text-zinc-950' : 'text-zinc-400'
              ]"
            >
              <GraduationCap class="h-3 w-3" />
              <span class="hidden xs:inline sm:inline">Dars</span>
            </button>
            <button
              type="button"
              @click="emit('update:mode', 'freeplay')"
              :class="[
                'flex items-center gap-1 rounded-[9px] px-2 py-1 text-[11px] font-semibold transition cursor-pointer',
                mode === 'freeplay' ? 'bg-white text-zinc-950' : 'text-zinc-400'
              ]"
            >
              <Sparkles class="h-3 w-3" />
              <span class="hidden xs:inline sm:inline">Erkin</span>
            </button>
          </div>

          <!-- To‘liq ekran (Fullscreen API) tugmasi — mobil uchun qulay va sezilarli -->
          <button
            v-if="viewport.fullscreenSupported"
            type="button"
            @click="emit('toggle-fullscreen')"
            :class="[
              'inline-flex items-center gap-1 rounded-xl border transition cursor-pointer',
              viewport.isFullscreen
                ? 'h-7.5 w-7.5 justify-center border-sky-400/40 bg-sky-500/20 text-sky-200'
                : 'border-sky-400/35 bg-sky-500/15 hover:bg-sky-500/25 active:bg-sky-500/35 px-2 py-1 text-sky-200'
            ]"
            :title="viewport.isFullscreen ? 'To‘liq ekrandan chiqish' : 'Brauzer panellarini yashirish va to‘liq ekranga o‘tish'"
            :aria-label="viewport.isFullscreen ? 'To‘liq ekrandan chiqish' : 'To‘liq ekran'"
          >
            <Minimize2 v-if="viewport.isFullscreen" class="h-3.5 w-3.5 text-sky-300" />
            <template v-else>
              <Maximize2 class="h-3 w-3 text-sky-300" />
              <span class="hidden xs:inline text-[11px] font-semibold text-sky-200">To‘liq ekran</span>
            </template>
          </button>

          <!-- Ixcham "Sozlamalar" menyusi tugmasi -->
          <button
            type="button"
            @click="settingsOpen = !settingsOpen"
            :class="[
              'inline-flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-[11px] font-semibold transition cursor-pointer',
              settingsOpen
                ? 'border-sky-400/45 bg-sky-500/20 text-sky-200'
                : 'border-white/[0.09] bg-white/[0.045] text-zinc-200 active:bg-white/[0.12]'
            ]"
            aria-label="Sozlamalar"
          >
            <SlidersHorizontal class="h-3.5 w-3.5" />
            <span class="hidden sm:inline">Sozlamalar</span>
          </button>
        </div>
      </div>

      <!-- Pastki qirrada ingichka progress chizig‘i -->
      <div
        v-if="mode === 'lesson'"
        class="absolute inset-x-0 bottom-0 h-[2px] bg-white/[0.06]"
      >
        <div
          class="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 transition-all duration-300"
          :style="{ width: `${progressPercent}%` }"
        />
      </div>
    </div>

    <!-- ==================== LAPTOP MODE (To‘liq standart ko‘rinish — o‘zgarishsiz) ==================== -->
    <div v-else class="mx-auto max-w-[1440px] px-3 sm:px-5 py-2">
      <div class="flex flex-wrap lg:flex-nowrap items-center justify-between gap-2 xl:gap-4">
        <!-- Chap qism: Brend + Dars tanlagich -->
        <div class="flex items-center gap-2 sm:gap-2.5 min-w-0 shrink">
          <div
            class="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 shadow-lg shadow-sky-500/20 ring-1 ring-white/20"
          >
            <Piano class="h-4 w-4 text-white" />
          </div>

          <button
            type="button"
            @click="emit('open-drawer')"
            class="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 text-left transition-all cursor-pointer min-w-0"
          >
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] font-medium uppercase tracking-wider text-sky-400">
                  {{ mode === 'lesson' ? `${lesson.level}-bosqich · ${lesson.order}-dars` : 'Studiyada' }}
                </span>
                <span
                  v-if="completedCount > 0"
                  class="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-emerald-400/90"
                >
                  <CheckCircle2 class="h-2.5 w-2.5" />
                  {{ completedCount }}/{{ totalLessons }}
                </span>
              </div>
              <p class="truncate text-xs sm:text-sm font-semibold text-zinc-100 max-w-[155px] xl:max-w-[250px]">
                {{ mode === 'lesson' ? lesson.title : 'Erkin chalish (Free Play)' }}
              </p>
            </div>
            <ChevronDown class="h-4 w-4 shrink-0 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
          </button>
        </div>

        <!-- Markaziy qism: BPM sozlagichi + Metronom -->
        <div class="flex items-center gap-2 xl:gap-3 order-3 lg:order-2 w-full lg:w-auto justify-between lg:justify-center shrink-0">
          <!-- BPM boshqaruvi -->
          <div class="glass-pill flex items-center gap-1.5 xl:gap-2 rounded-xl px-2.5 py-1.5">
            <span class="text-[11px] font-medium text-zinc-400 tracking-wide">BPM</span>
            <button
              type="button"
              @click="adjustBpm(-5)"
              class="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.05] hover:bg-white/[0.12] text-zinc-300 transition cursor-pointer"
              title="Tezlikni pasaytirish"
            >
              <Minus class="h-3 w-3" />
            </button>

            <input
              type="range"
              min="40"
              max="160"
              step="1"
              :value="bpm"
              @input="emit('update:bpm', Number($event.target.value))"
              class="studio-slider w-16 xl:w-24"
              aria-label="BPM tezligi"
            />

            <button
              type="button"
              @click="adjustBpm(5)"
              class="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.05] hover:bg-white/[0.12] text-zinc-300 transition cursor-pointer"
              title="Tezlikni oshirish"
            >
              <Plus class="h-3 w-3" />
            </button>

            <span class="font-mono-num w-7 text-right text-xs font-semibold text-zinc-100">
              {{ bpm }}
            </span>
          </div>

          <!-- Metronom tugmasi va 4 zarbli indikator -->
          <button
            type="button"
            @click="emit('toggle-metronome')"
            :class="[
              'flex items-center gap-1.5 xl:gap-2 rounded-xl px-2.5 xl:px-3 py-1.5 text-xs font-medium border transition-all cursor-pointer',
              metronomeEnabled
                ? 'border-sky-400/40 bg-sky-500/15 text-sky-200 shadow-sm shadow-sky-500/20'
                : 'border-white/[0.08] bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]'
            ]"
            title="Metronomni yoqish / o‘chirish"
          >
            <Radio :class="['h-3.5 w-3.5', metronomeEnabled ? 'text-sky-400 animate-pulse' : 'text-zinc-400']" />
            <span class="hidden sm:inline">Metronom</span>
            <span class="flex items-center gap-1 ml-0.5">
              <span
                v-for="beat in 4"
                :key="beat"
                :class="[
                  'h-1.5 w-1.5 rounded-full transition-all duration-100',
                  metronomeEnabled && currentBeat === beat
                    ? beat === 1
                      ? 'bg-amber-400 scale-125 shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                      : 'bg-sky-400 scale-125 shadow-[0_0_8px_rgba(56,189,248,0.9)]'
                    : 'bg-white/15'
                ]"
              />
            </span>
          </button>

          <!-- MIDI holati -->
          <div
            :class="[
              'hidden xl:flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-[11px] font-medium border',
              midiState.connected
                ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300'
                : 'border-white/[0.07] bg-white/[0.03] text-zinc-400'
            ]"
            :title="midiState.error || midiLabel"
          >
            <span
              :class="[
                'h-2 w-2 rounded-full',
                midiState.connected
                  ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse'
                  : midiState.supported
                    ? 'bg-zinc-500'
                    : 'bg-zinc-700'
              ]"
            />
            <span class="max-w-[130px] truncate">{{ midiLabel }}</span>
          </div>
        </div>

        <!-- O‘ng qism: Dars / Erkin chalish rejimi + Planshetda Fullscreen -->
        <div class="flex items-center gap-1.5 xl:gap-2 order-2 lg:order-3 shrink-0">
          <div class="flex items-center rounded-xl border border-white/[0.08] bg-white/[0.035] p-0.5">
            <button
              type="button"
              @click="emit('update:mode', 'lesson')"
              :class="[
                'flex items-center gap-1.5 rounded-[10px] px-2.5 xl:px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all cursor-pointer',
                mode === 'lesson'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              ]"
            >
              <GraduationCap class="h-3.5 w-3.5" />
              <span>Darslar</span>
            </button>
            <button
              type="button"
              @click="emit('update:mode', 'freeplay')"
              :class="[
                'flex items-center gap-1.5 rounded-[10px] px-2.5 xl:px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all cursor-pointer',
                mode === 'freeplay'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              ]"
            >
              <Sparkles class="h-3.5 w-3.5" />
              <span>Erkin chalish</span>
            </button>
          </div>

          <!-- Planshet / sensorli qurilmada Fullscreen tugmasi -->
          <button
            v-if="viewport.fullscreenSupported && (viewport.deviceMode === 'tablet' || viewport.isCoarsePointer)"
            type="button"
            @click="emit('toggle-fullscreen')"
            class="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.09] text-zinc-300 transition cursor-pointer"
            :title="viewport.isFullscreen ? 'To‘liq ekrandan chiqish' : 'To‘liq ekran'"
          >
            <Minimize2 v-if="viewport.isFullscreen" class="h-4 w-4 text-sky-300" />
            <Maximize2 v-else class="h-4 w-4" />
          </button>

          <button
            type="button"
            @click="emit('open-drawer')"
            class="hidden xl:flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.09] text-zinc-300 transition cursor-pointer"
            title="O‘quv dasturi (5 ta dars)"
          >
            <BookOpen class="h-4 w-4" />
          </button>
        </div>
      </div>

      <!-- Dars jarayoni (Progress Bar) -->
      <div v-if="mode === 'lesson'" class="mt-2 flex items-center gap-3">
        <div class="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            class="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 transition-all duration-300 ease-out"
            :style="{ width: `${progressPercent}%` }"
          />
        </div>
        <span class="font-mono-num shrink-0 text-[11px] font-medium text-zinc-400">
          {{ Math.min(currentStepIndex, totalSteps) }} / {{ totalSteps }}
          <span class="text-zinc-500 ml-1">({{ progressPercent }}%)</span>
        </span>
      </div>
    </div>

    <!-- ==================== COMPACT SOZLAMALAR DRAWER / POPOVER ==================== -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="settingsOpen && viewport.isCompact"
          class="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
          @click.self="settingsOpen = false"
        >
          <div
            class="flex h-full w-full max-w-xs flex-col border-l border-white/[0.1] bg-[#0c101a]/96 backdrop-blur-3xl shadow-2xl overflow-y-auto"
          >
            <div class="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
              <div class="flex items-center gap-2">
                <SlidersHorizontal class="h-4 w-4 text-sky-400" />
                <span class="text-sm font-semibold text-white">Sozlamalar</span>
              </div>
              <button
                type="button"
                @click="settingsOpen = false"
                class="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-300 cursor-pointer"
              >
                <X class="h-4 w-4" />
              </button>
            </div>

            <div class="p-4 space-y-4">
              <!-- Darslarni tanlash -->
              <button
                type="button"
                @click="openLessonsFromSettings"
                class="flex w-full items-center justify-between rounded-xl border border-sky-400/30 bg-sky-500/10 px-3.5 py-2.5 text-left cursor-pointer"
              >
                <div class="flex items-center gap-2.5">
                  <BookOpen class="h-4 w-4 text-sky-300" />
                  <div>
                    <div class="text-xs font-semibold text-white">Kurs xaritasi (6 bosqich)</div>
                    <div class="text-[11px] text-sky-300/80">
                      {{ completedCount }}/{{ totalLessons }} dars tugatildi
                    </div>
                  </div>
                </div>
                <ChevronDown class="h-4 w-4 -rotate-90 text-sky-300" />
              </button>

              <!-- BPM sozlagichi -->
              <div class="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-medium text-zinc-300">Tezlik (BPM)</span>
                  <span class="font-mono-num text-xs font-bold text-sky-300">{{ bpm }} BPM</span>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    @click="adjustBpm(-5)"
                    class="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-200 cursor-pointer"
                  >
                    <Minus class="h-3.5 w-3.5" />
                  </button>
                  <input
                    type="range"
                    min="40"
                    max="160"
                    step="1"
                    :value="bpm"
                    @input="emit('update:bpm', Number($event.target.value))"
                    class="studio-slider flex-1"
                  />
                  <button
                    type="button"
                    @click="adjustBpm(5)"
                    class="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-200 cursor-pointer"
                  >
                    <Plus class="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <!-- Metronom -->
              <button
                type="button"
                @click="emit('toggle-metronome')"
                :class="[
                  'flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-medium transition cursor-pointer',
                  metronomeEnabled
                    ? 'border-sky-400/40 bg-sky-500/15 text-sky-200'
                    : 'border-white/[0.08] bg-white/[0.03] text-zinc-300'
                ]"
              >
                <span class="flex items-center gap-2">
                  <Radio class="h-4 w-4" />
                  Metronom
                </span>
                <span class="flex items-center gap-1">
                  <span
                    v-for="beat in 4"
                    :key="beat"
                    :class="[
                      'h-2 w-2 rounded-full transition-all',
                      metronomeEnabled && currentBeat === beat
                        ? beat === 1
                          ? 'bg-amber-400 scale-125'
                          : 'bg-sky-400 scale-125'
                        : 'bg-white/15'
                    ]"
                  />
                </span>
              </button>

              <!-- Nota nomlari va Sustain -->
              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  @click="emit('update:showNoteNames', !showNoteNames)"
                  :class="[
                    'flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-medium transition cursor-pointer',
                    showNoteNames
                      ? 'border-sky-400/35 bg-sky-500/15 text-sky-200'
                      : 'border-white/[0.08] bg-white/[0.03] text-zinc-400'
                  ]"
                >
                  <Tag class="h-3.5 w-3.5" />
                  Nota nomi
                </button>

                <button
                  type="button"
                  @click="emit('toggle-sustain')"
                  :class="[
                    'flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-medium transition cursor-pointer',
                    audioState.sustainPedal
                      ? 'border-amber-400/40 bg-amber-500/15 text-amber-200'
                      : 'border-white/[0.08] bg-white/[0.03] text-zinc-400'
                  ]"
                >
                  <Waves class="h-3.5 w-3.5" />
                  Sustain
                </button>
              </div>

              <!-- Ovoz balandligi -->
              <div class="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-medium text-zinc-300">Ovoz balandligi</span>
                  <span class="text-[10px] text-zinc-400">{{ audioState.engineLabel }}</span>
                </div>
                <div class="flex items-center gap-2.5">
                  <button
                    type="button"
                    @click="emit('toggle-mute')"
                    class="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-200 cursor-pointer"
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
                    class="studio-slider flex-1"
                  />
                </div>
              </div>

              <!-- MIDI holati -->
              <div class="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[11px] text-zinc-400">
                <span>MIDI holati</span>
                <span :class="midiState.connected ? 'text-emerald-400 font-medium' : 'text-zinc-500'">
                  {{ midiLabel }}
                </span>
              </div>

              <!-- Ekran rejimi: To'liq ekran sozlamasi (Android / Desktop) -->
              <div v-if="viewport.fullscreenSupported" class="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-medium text-zinc-300">Ekran ko‘rinishi</span>
                  <span class="text-[10px] text-zinc-400">
                    {{ viewport.isFullscreen ? 'To‘liq ekran faol' : 'Oddiy rejim' }}
                  </span>
                </div>
                <button
                  type="button"
                  @click="emit('toggle-fullscreen')"
                  :class="[
                    'flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 px-3 text-xs font-semibold transition cursor-pointer',
                    viewport.isFullscreen
                      ? 'border-sky-400/40 bg-sky-500/20 text-sky-200'
                      : 'border-sky-400/35 bg-sky-500/15 text-sky-200 hover:bg-sky-500/25 active:bg-sky-500/35'
                  ]"
                >
                  <Minimize2 v-if="viewport.isFullscreen" class="h-4 w-4" />
                  <Maximize2 v-else class="h-4 w-4" />
                  <span>{{ viewport.isFullscreen ? 'To‘liq ekrandan chiqish' : 'Brauzer panellarini yashirish (To‘liq ekran)' }}</span>
                </button>
              </div>

              <!-- iOS Safari to'liq ekran qo'llanmasi -->
              <div
                v-if="viewport.isIOS && !viewport.isStandalone"
                class="rounded-xl border border-amber-400/25 bg-amber-500/[0.07] p-3 text-left space-y-1.5"
              >
                <div class="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                  <Smartphone class="h-3.5 w-3.5 shrink-0" />
                  <span>Safari-da ekranni kengaytirish:</span>
                </div>
                <p class="text-[11px] leading-relaxed text-zinc-300">
                  1. Safari pastidagi <strong>«aA»</strong> tugmasini bosib <strong>«Veb-sayt panellarini yashirish»</strong> ni tanlang.<br />
                  2. Yoki <strong>«Ulashish»</strong> (Share) → <strong>«Asosiy ekranga qo‘shish»</strong> qilsangiz, pianino alohida ilovadek to‘liq ekranda ishlaydi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
