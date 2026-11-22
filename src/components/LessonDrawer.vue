<script setup>
import { ref, computed, watch } from 'vue'
import {
  X,
  Star,
  CheckCircle2,
  Play,
  RotateCcw,
  Award,
  Music,
  ChevronDown,
  Sparkles,
  Hand,
  Compass
} from 'lucide-vue-next'

const props = defineProps({
  open: { type: Boolean, default: false },
  levels: { type: Array, required: true },
  lessons: { type: Array, required: true },
  currentLessonId: { type: String, required: true },
  recommendedLessonId: { type: String, default: null },
  progressMap: { type: Object, required: true }
})

const emit = defineEmits(['close', 'select-lesson', 'reset-progress'])

const confirmReset = ref(false)

// Hozirgi dars tegishli bo‘lgan bosqich avtomatik ochiq turadi
const expandedLevels = ref(new Set([1]))

watch(
  () => [props.open, props.currentLessonId],
  ([isOpen]) => {
    if (isOpen) {
      const activeLesson = props.lessons.find((l) => l.id === props.currentLessonId)
      if (activeLesson) {
        expandedLevels.value = new Set([...expandedLevels.value, activeLesson.level])
      }
    }
  }
)

const completedCount = computed(() =>
  props.lessons.filter((l) => props.progressMap[l.id]?.completed).length
)

const totalStars = computed(() =>
  props.lessons.reduce((sum, l) => sum + (props.progressMap[l.id]?.stars || 0), 0)
)

const maxStars = computed(() => props.lessons.length * 3)

const recommendedLesson = computed(() =>
  props.lessons.find((l) => l.id === props.recommendedLessonId) || null
)

const levelStats = computed(() =>
  props.levels.map((level) => {
    const items = props.lessons.filter((l) => l.level === level.id)
    const done = items.filter((l) => props.progressMap[l.id]?.completed).length
    const stars = items.reduce((s, l) => s + (props.progressMap[l.id]?.stars || 0), 0)
    const pct = items.length > 0 ? Math.round((done / items.length) * 100) : 0
    return {
      ...level,
      lessons: items,
      completedCount: done,
      totalCount: items.length,
      stars,
      maxStars: items.length * 3,
      progressPct: pct
    }
  })
)

const ACCENT_STYLES = {
  sky: { badge: 'bg-sky-500/20 text-sky-300 border-sky-400/30', bar: 'from-sky-400 to-cyan-400' },
  violet: { badge: 'bg-violet-500/20 text-violet-300 border-violet-400/30', bar: 'from-violet-400 to-fuchsia-400' },
  emerald: { badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30', bar: 'from-emerald-400 to-teal-400' },
  amber: { badge: 'bg-amber-500/20 text-amber-300 border-amber-400/30', bar: 'from-amber-400 to-yellow-400' },
  orange: { badge: 'bg-orange-500/20 text-orange-300 border-orange-400/30', bar: 'from-orange-400 to-amber-400' },
  rose: { badge: 'bg-rose-500/20 text-rose-300 border-rose-400/30', bar: 'from-rose-400 to-pink-400' }
}

function toggleLevel(levelId) {
  const next = new Set(expandedLevels.value)
  if (next.has(levelId)) {
    next.delete(levelId)
  } else {
    next.add(levelId)
  }
  expandedLevels.value = next
}

function handModeMeta(handMode) {
  if (handMode === 'left') {
    return { label: 'Chap qo‘l', cls: 'bg-violet-500/15 text-violet-300 border-violet-400/25' }
  }
  if (handMode === 'both') {
    return { label: 'Ikki qo‘l', cls: 'bg-amber-500/15 text-amber-300 border-amber-400/25' }
  }
  return { label: 'O‘ng qo‘l', cls: 'bg-sky-500/15 text-sky-300 border-sky-400/25' }
}

function handleSelect(lessonId) {
  emit('select-lesson', lessonId)
  emit('close')
}

function handleReset() {
  if (!confirmReset.value) {
    confirmReset.value = true
    return
  }
  emit('reset-progress')
  confirmReset.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex bg-black/65 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <aside
          class="relative flex h-full w-full max-w-lg flex-col border-r border-white/[0.09] bg-[#0b0e16]/96 backdrop-blur-3xl shadow-2xl"
        >
          <!-- Yuqori sarlavha -->
          <div class="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
            <div class="flex items-center gap-2.5">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/25 to-violet-500/25 text-sky-300 border border-sky-400/25">
                <Music class="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 class="text-base font-bold text-zinc-100">Kurs xaritasi — Noldan Progacha</h2>
                <p class="text-xs text-zinc-400">6 bosqichli tizimli pianino dasturi · Barcha darslar ochiq</p>
              </div>
            </div>
            <button
              type="button"
              @click="emit('close')"
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] hover:bg-white/[0.12] text-zinc-400 hover:text-white transition cursor-pointer"
              aria-label="Yopish"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          <!-- Umumiy statistika + Tavsiya etilgan keyingi dars -->
          <div class="border-b border-white/[0.07] px-5 py-3.5 bg-white/[0.02] space-y-3">
            <div>
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="text-zinc-400">
                  Umumiy progress:
                  <strong class="text-zinc-100">{{ completedCount }}/{{ lessons.length }} dars</strong>
                </span>
                <span class="inline-flex items-center gap-1 text-amber-300 font-medium">
                  <Award class="h-3.5 w-3.5" />
                  {{ totalStars }} / {{ maxStars }} yulduz
                </span>
              </div>
              <div class="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 transition-all duration-500"
                  :style="{ width: `${lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0}%` }"
                />
              </div>
            </div>

            <!-- Tavsiya etilgan keyingi dars kartochkasi -->
            <button
              v-if="recommendedLesson"
              type="button"
              @click="handleSelect(recommendedLesson.id)"
              class="group flex w-full items-center justify-between gap-3 rounded-2xl border border-sky-400/35 bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-emerald-500/10 px-3.5 py-2.5 text-left transition hover:border-sky-300/55 cursor-pointer"
            >
              <div class="min-w-0">
                <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                  <Compass class="h-3 w-3" />
                  <span>Tavsiya etilgan keyingi dars · {{ recommendedLesson.level }}-bosqich</span>
                </div>
                <p class="mt-0.5 truncate text-xs sm:text-sm font-semibold text-white">
                  {{ recommendedLesson.title }}
                </p>
              </div>
              <span class="shrink-0 inline-flex items-center gap-1 rounded-xl bg-sky-400 px-2.5 py-1.5 text-xs font-bold text-zinc-950 group-hover:bg-sky-300 transition">
                <Play class="h-3 w-3 fill-current" />
                O‘tish
              </span>
            </button>
          </div>

          <!-- 6 ta bosqich (Accordion) -->
          <div class="flex-1 overflow-y-auto px-4 py-3.5 space-y-2.5">
            <div
              v-for="lvl in levelStats"
              :key="lvl.id"
              class="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]"
            >
              <!-- Bosqich sarlavhasi -->
              <button
                type="button"
                @click="toggleLevel(lvl.id)"
                class="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-white/[0.03] transition cursor-pointer"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <span
                    :class="[
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-xs font-extrabold',
                      ACCENT_STYLES[lvl.accent]?.badge || ACCENT_STYLES.sky.badge
                    ]"
                  >
                    {{ lvl.id }}
                  </span>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <h3 class="truncate text-sm font-bold text-zinc-100">{{ lvl.title }}</h3>
                    </div>
                    <p class="truncate text-[11px] text-zinc-400">{{ lvl.subtitle }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-2.5 shrink-0">
                  <div class="text-right">
                    <div class="font-mono-num text-[11px] font-semibold text-zinc-200">
                      <template v-if="lvl.totalCount > 0">
                        {{ lvl.completedCount }}/{{ lvl.totalCount }} dars
                      </template>
                      <template v-else>
                        <span class="text-zinc-500">Tez kunda</span>
                      </template>
                    </div>
                    <div
                      v-if="lvl.totalCount > 0"
                      class="mt-1 h-1 w-16 overflow-hidden rounded-full bg-white/[0.08]"
                    >
                      <div
                        class="h-full rounded-full bg-gradient-to-r transition-all duration-300"
                        :class="ACCENT_STYLES[lvl.accent]?.bar || ACCENT_STYLES.sky.bar"
                        :style="{ width: `${lvl.progressPct}%` }"
                      />
                    </div>
                  </div>
                  <ChevronDown
                    :class="[
                      'h-4 w-4 text-zinc-400 transition-transform duration-200',
                      expandedLevels.has(lvl.id) ? 'rotate-180 text-zinc-200' : ''
                    ]"
                  />
                </div>
              </button>

              <!-- Bosqich ichidagi darslar -->
              <div
                v-if="expandedLevels.has(lvl.id)"
                class="border-t border-white/[0.06] bg-black/20 px-3 py-2.5 space-y-2"
              >
                <template v-if="lvl.lessons.length > 0">
                  <button
                    v-for="lesson in lvl.lessons"
                    :key="lesson.id"
                    type="button"
                    @click="handleSelect(lesson.id)"
                    :class="[
                      'group w-full rounded-xl border p-3 text-left transition-all cursor-pointer',
                      lesson.id === currentLessonId
                        ? 'border-sky-400/50 bg-sky-500/12 shadow-md shadow-sky-950/30'
                        : lesson.id === recommendedLessonId
                          ? 'border-emerald-400/30 bg-emerald-500/[0.06] hover:bg-emerald-500/10'
                          : 'border-white/[0.06] bg-white/[0.025] hover:bg-white/[0.06] hover:border-white/[0.12]'
                    ]"
                  >
                    <div class="flex items-start justify-between gap-2.5">
                      <div class="flex items-start gap-2.5 min-w-0">
                        <div
                          :class="[
                            'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold border',
                            progressMap[lesson.id]?.completed
                              ? 'border-emerald-400/35 bg-emerald-500/15 text-emerald-300'
                              : lesson.id === currentLessonId
                                ? 'border-sky-400/40 bg-sky-500/20 text-sky-200'
                                : 'border-white/10 bg-white/[0.04] text-zinc-400'
                          ]"
                        >
                          <CheckCircle2 v-if="progressMap[lesson.id]?.completed" class="h-3.5 w-3.5" />
                          <span v-else>{{ lesson.order }}</span>
                        </div>

                        <div class="min-w-0">
                          <div class="flex items-center flex-wrap gap-1.5">
                            <h4 class="text-xs sm:text-sm font-semibold text-zinc-100 leading-snug">
                              {{ lesson.title }}
                            </h4>
                            <span
                              v-if="lesson.id === recommendedLessonId && lesson.id !== currentLessonId"
                              class="inline-flex items-center gap-0.5 rounded-full bg-emerald-400/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-emerald-300"
                            >
                              <Sparkles class="h-2.5 w-2.5" />
                              Tavsiya
                            </span>
                          </div>
                          <p class="mt-0.5 text-[11px] text-zinc-400 line-clamp-1">
                            {{ lesson.subtitle }}
                          </p>

                          <div class="mt-2 flex items-center flex-wrap gap-1.5">
                            <span
                              :class="[
                                'inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium',
                                handModeMeta(lesson.handMode).cls
                              ]"
                            >
                              <Hand class="h-2.5 w-2.5" />
                              {{ handModeMeta(lesson.handMode).label }}
                            </span>
                            <span class="font-mono-num text-[10px] text-zinc-500">
                              {{ lesson.steps.length }} qadam · {{ lesson.bpm || lesson.defaultBpm }} BPM
                            </span>
                            <span
                              v-if="progressMap[lesson.id]?.bestAccuracy"
                              class="font-mono-num text-[10px] font-semibold text-emerald-400"
                            >
                              Best: {{ progressMap[lesson.id].bestAccuracy }}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- Yulduzchalar va faol holat -->
                      <div class="flex flex-col items-end gap-1.5 shrink-0">
                        <div class="flex items-center gap-0.5">
                          <Star
                            v-for="s in 3"
                            :key="s"
                            :class="[
                              'h-3 w-3',
                              s <= (progressMap[lesson.id]?.stars || 0)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-zinc-700'
                            ]"
                          />
                        </div>
                        <span
                          v-if="lesson.id === currentLessonId"
                          class="inline-flex items-center gap-1 rounded-full bg-sky-400/20 px-2 py-0.5 text-[9px] font-bold text-sky-300"
                        >
                          <Play class="h-2.5 w-2.5 fill-current" />
                          Joriy
                        </span>
                      </div>
                    </div>
                  </button>
                </template>

                <div
                  v-else
                  class="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.015] px-3.5 py-3 text-center text-xs text-zinc-400"
                >
                  Ushbu bosqichning {{ lvl.plannedCount }} ta to‘liq darsi 2-qadamda qo‘shiladi.
                </div>
              </div>
            </div>
          </div>

          <!-- Pastki qism -->
          <div class="border-t border-white/[0.08] px-5 py-3 flex items-center justify-between">
            <span class="text-[11px] text-zinc-500">
              Natijalar brauzerda avtomatik saqlanadi
            </span>
            <button
              type="button"
              @click="handleReset"
              :class="[
                'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition cursor-pointer',
                confirmReset
                  ? 'bg-red-500/20 text-red-300 border border-red-400/35'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]'
              ]"
            >
              <RotateCcw class="h-3.5 w-3.5" />
              {{ confirmReset ? 'Tasdiqlaysizmi?' : 'Tozalash' }}
            </button>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>
