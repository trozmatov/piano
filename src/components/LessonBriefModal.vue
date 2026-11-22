<script setup>
import { computed } from 'vue'
import {
  Play,
  Headphones,
  Hand,
  Lightbulb,
  Target,
  Clock,
  Activity,
  Sparkles,
  X
} from 'lucide-vue-next'

const props = defineProps({
  open: { type: Boolean, default: false },
  lesson: { type: Object, required: true },
  levelInfo: { type: Object, default: null },
  learningMode: { type: String, default: 'wait' }, // 'wait' | 'flow'
  practiceHand: { type: String, default: 'both' } // 'both' | 'right' | 'left'
})

const emit = defineEmits([
  'start',
  'demo',
  'close',
  'update:learningMode',
  'update:practiceHand'
])

const handBadgeText = computed(() => {
  if (props.lesson.handMode === 'left') return 'Chap qo‘l'
  if (props.lesson.handMode === 'both') return 'Ikki qo‘l'
  return 'O‘ng qo‘l'
})

const handBadgeClass = computed(() => {
  if (props.lesson.handMode === 'left') {
    return 'border-violet-400/35 bg-violet-500/15 text-violet-200'
  }
  if (props.lesson.handMode === 'both') {
    return 'border-amber-400/35 bg-amber-500/15 text-amber-200'
  }
  return 'border-sky-400/35 bg-sky-500/15 text-sky-200'
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-180 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-4 overflow-y-auto"
        @click.self="emit('close')"
      >
        <div
          class="glass-panel relative w-full max-w-lg max-h-[92dvh] overflow-y-auto rounded-3xl border border-white/[0.12] bg-[#0d111b]/96 p-5 sm:p-6 shadow-2xl my-auto"
        >
          <div
            class="pointer-events-none absolute -top-20 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-sky-500/15 blur-3xl"
          />

          <!-- Yuqori qism -->
          <div class="relative flex items-start justify-between gap-3">
            <div>
              <div class="flex items-center flex-wrap gap-1.5 mb-2">
                <span
                  class="rounded-full border border-white/[0.1] bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-semibold text-zinc-200"
                >
                  {{ levelInfo?.title || `${lesson.level}-bosqich` }}
                </span>
                <span
                  :class="[
                    'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                    handBadgeClass
                  ]"
                >
                  {{ handBadgeText }}
                </span>
                <span
                  class="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono-num text-[11px] text-zinc-300"
                >
                  {{ lesson.bpm || lesson.defaultBpm }} BPM · {{ lesson.steps.length }} qadam
                </span>
              </div>

              <h2 class="text-lg sm:text-xl font-bold text-white tracking-tight">
                {{ lesson.title }}
              </h2>
              <p class="mt-0.5 text-xs sm:text-sm text-zinc-400">
                {{ lesson.subtitle }}
              </p>
            </div>

            <button
              type="button"
              @click="emit('close')"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-zinc-400 hover:text-white transition cursor-pointer"
              aria-label="Yopish"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          <!-- Qisqa yo‘riqnoma bloklari -->
          <div class="relative mt-4 space-y-2.5">
            <div class="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5">
              <div class="flex items-center gap-2 text-xs font-semibold text-sky-300">
                <Target class="h-3.5 w-3.5" />
                <span>Bu darsda nima o‘rganiladi</span>
              </div>
              <p class="mt-1 text-xs sm:text-sm leading-relaxed text-zinc-200">
                {{ lesson.brief?.goal || lesson.description }}
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
                <div class="flex items-center gap-1.5 text-[11px] font-semibold text-violet-300">
                  <Hand class="h-3.5 w-3.5" />
                  <span>Barmoqlar joylashuvi</span>
                </div>
                <p class="mt-1 text-xs leading-relaxed text-zinc-300">
                  {{ lesson.brief?.fingers || 'Ekranda ko‘rsatilgan 1–5 barmoq raqamlariga amal qiling.' }}
                </p>
              </div>

              <div class="rounded-2xl border border-amber-400/20 bg-amber-500/[0.06] p-3">
                <div class="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300">
                  <Lightbulb class="h-3.5 w-3.5" />
                  <span>Asosiy maslahat</span>
                </div>
                <p class="mt-1 text-xs leading-relaxed text-zinc-200/90">
                  {{ lesson.brief?.tip || lesson.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- O‘rganish rejimi va Qo‘l tanlash -->
          <div class="relative mt-4 space-y-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3.5">
            <!-- Learning Mode -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span class="text-xs font-medium text-zinc-300">O‘rganish rejimi:</span>
              <div class="grid grid-cols-2 gap-1 rounded-xl border border-white/[0.08] bg-black/30 p-1">
                <button
                  type="button"
                  @click="emit('update:learningMode', 'wait')"
                  :class="[
                    'flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer',
                    learningMode === 'wait'
                      ? 'bg-sky-400 text-zinc-950 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  ]"
                >
                  <Clock class="h-3.5 w-3.5" />
                  <span>O‘rganish (Kutish)</span>
                </button>
                <button
                  type="button"
                  @click="emit('update:learningMode', 'flow')"
                  :class="[
                    'flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer',
                    learningMode === 'flow'
                      ? 'bg-emerald-400 text-zinc-950 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  ]"
                >
                  <Activity class="h-3.5 w-3.5" />
                  <span>Ritm (Flow)</span>
                </button>
              </div>
            </div>

            <!-- Practice Hand Selector (faqat ikki qo‘lli darslarda) -->
            <div
              v-if="lesson.handMode === 'both'"
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-white/[0.07] pt-3"
            >
              <span class="text-xs font-medium text-zinc-300">Mashq qilish qo‘li:</span>
              <div class="grid grid-cols-3 gap-1 rounded-xl border border-white/[0.08] bg-black/30 p-1">
                <button
                  type="button"
                  @click="emit('update:practiceHand', 'right')"
                  :class="[
                    'rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition cursor-pointer',
                    practiceHand === 'right'
                      ? 'bg-sky-400 text-zinc-950'
                      : 'text-zinc-400 hover:text-zinc-200'
                  ]"
                >
                  Faqat o‘ng
                </button>
                <button
                  type="button"
                  @click="emit('update:practiceHand', 'left')"
                  :class="[
                    'rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition cursor-pointer',
                    practiceHand === 'left'
                      ? 'bg-violet-400 text-zinc-950'
                      : 'text-zinc-400 hover:text-zinc-200'
                  ]"
                >
                  Faqat chap
                </button>
                <button
                  type="button"
                  @click="emit('update:practiceHand', 'both')"
                  :class="[
                    'rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition cursor-pointer',
                    practiceHand === 'both'
                      ? 'bg-white text-zinc-950'
                      : 'text-zinc-400 hover:text-zinc-200'
                  ]"
                >
                  Ikki qo‘l
                </button>
              </div>
            </div>

            <!-- Ikki qo‘l rang eslatmasi -->
            <div
              v-if="lesson.handMode === 'both'"
              class="flex items-center justify-center gap-4 pt-1 text-[11px] text-zinc-400"
            >
              <span class="inline-flex items-center gap-1.5">
                <span class="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-violet-400 to-orange-400" />
                Chap qo‘l (Binafsha/Sariq)
              </span>
              <span class="inline-flex items-center gap-1.5">
                <span class="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
                O‘ng qo‘l (Ko‘k/Yashil)
              </span>
            </div>
          </div>

          <!-- Harakat tugmalari -->
          <div class="relative mt-5 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              @click="emit('demo')"
              class="flex w-full sm:w-auto flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] px-4 py-2.5 text-sm font-medium text-zinc-200 transition cursor-pointer"
            >
              <Headphones class="h-4 w-4" />
              <span>Avval tinglash</span>
            </button>

            <button
              type="button"
              @click="emit('start')"
              class="flex w-full sm:w-auto flex-[1.35] items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 hover:brightness-110 px-5 py-2.5 text-sm font-bold text-zinc-950 shadow-lg shadow-sky-500/25 transition cursor-pointer"
            >
              <Play v-if="learningMode === 'flow'" class="h-4 w-4 fill-current" />
              <Sparkles v-else class="h-4 w-4" />
              <span>Boshlash</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
