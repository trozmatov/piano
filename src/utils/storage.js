/**
 * Foydalanuvchi natijalari, yulduzchalari, ritm aniqligi va sozlamalarini
 * localStorage orqali saqlash (6 bosqichli Zero-to-Pro kursi uchun).
 */

const STORAGE_KEY = 'pianino_studio_progress_v2'
const LEGACY_STORAGE_KEY = 'pianino_studio_progress_v1'

const DEFAULT_DATA = {
  lessons: {},
  settings: {
    showNoteNames: true,
    showHotkeys: true,
    octaveOffset: 0,
    volume: 0.85,
    lastLessonId: 'l1-1',
    learningMode: 'wait' // 'wait' | 'flow'
  },
  stats: {
    totalNotesPlayed: 0,
    totalLessonsCompleted: 0
  }
}

export function loadProgressData() {
  try {
    const raw =
      window.localStorage.getItem(STORAGE_KEY) ||
      window.localStorage.getItem(LEGACY_STORAGE_KEY)
    if (!raw) return structuredClone(DEFAULT_DATA)
    const parsed = JSON.parse(raw)
    return {
      lessons: parsed.lessons && typeof parsed.lessons === 'object' ? parsed.lessons : {},
      settings: {
        ...DEFAULT_DATA.settings,
        ...(parsed.settings || {})
      },
      stats: {
        ...DEFAULT_DATA.stats,
        ...(parsed.stats || {})
      }
    }
  } catch {
    return structuredClone(DEFAULT_DATA)
  }
}

export function saveProgressData(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Private browsing yoki storage to‘lgan holatda xatolikni yutib yuborish
  }
}

export function recordLessonResult(
  currentData,
  { lessonId, accuracy, timingAccuracy = null, stars, mistakes, durationSec, learningMode = 'wait' }
) {
  const prev = currentData.lessons[lessonId]
  const isNewRecord = !prev || accuracy > prev.bestAccuracy || stars > prev.stars

  const bestTiming =
    timingAccuracy !== null
      ? Math.max(prev?.bestTimingAccuracy || 0, timingAccuracy)
      : prev?.bestTimingAccuracy ?? null

  const updatedLesson = {
    completed: true,
    stars: Math.max(prev?.stars || 0, stars),
    bestAccuracy: Math.max(prev?.bestAccuracy || 0, accuracy),
    bestTimingAccuracy: bestTiming,
    lastAccuracy: accuracy,
    lastTimingAccuracy: timingAccuracy,
    lastMistakes: mistakes,
    lastDurationSec: durationSec,
    lastLearningMode: learningMode,
    attempts: (prev?.attempts || 0) + 1,
    completedAt: new Date().toISOString()
  }

  const nextData = {
    ...currentData,
    lessons: {
      ...currentData.lessons,
      [lessonId]: updatedLesson
    },
    stats: {
      ...currentData.stats,
      totalLessonsCompleted: (currentData.stats?.totalLessonsCompleted || 0) + 1
    }
  }

  saveProgressData(nextData)
  return { data: nextData, isNewRecord }
}

export function updateSettings(currentData, partialSettings) {
  const nextData = {
    ...currentData,
    settings: {
      ...currentData.settings,
      ...partialSettings
    }
  }
  saveProgressData(nextData)
  return nextData
}

export function resetAllProgress() {
  const fresh = structuredClone(DEFAULT_DATA)
  saveProgressData(fresh)
  return fresh
}
