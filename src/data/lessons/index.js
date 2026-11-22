import { normalizeNote } from '../../utils/musicTheory.js'
import { LEVEL_1_LESSONS } from './level1.js'
import { LEVEL_2_LESSONS } from './level2.js'
import { LEVEL_3_LESSONS } from './level3.js'
import { LEVEL_4_LESSONS } from './level4.js'
import { LEVEL_5_LESSONS } from './level5.js'
import { LEVEL_6_LESSONS } from './level6.js'

/**
 * "Noldan Progacha" (Zero to Pro) — 6 bosqichli kurs tuzilmasi
 */
export const LEVELS = [
  {
    id: 1,
    title: '1-bosqich: Boshlang‘ich',
    subtitle: 'Klaviaturani tanish va o‘ng qo‘l',
    badge: 'Boshlang‘ich',
    accent: 'sky',
    plannedCount: 5
  },
  {
    id: 2,
    title: '2-bosqich: Chap qo‘l va qora tugmalar',
    subtitle: 'Diez (♯), Bemol (♭), ritm va chap qo‘l',
    badge: 'Asosiy',
    accent: 'violet',
    plannedCount: 5
  },
  {
    id: 3,
    title: '3-bosqich: Gammalar va barmoq texnikasi',
    subtitle: 'Thumb-under, C/G Major, A Minor va Hanon №1',
    badge: 'Texnika',
    accent: 'emerald',
    plannedCount: 4
  },
  {
    id: 4,
    title: '4-bosqich: Akkordlar va garmoniya',
    subtitle: 'Major/Minor uch tovushliklar, Pop ketma-ketlik, arpedjio',
    badge: 'Garmoniya',
    accent: 'amber',
    plannedCount: 4
  },
  {
    id: 5,
    title: '5-bosqich: Ikki qo‘l koordinatsiyasi',
    subtitle: 'Bas + kuy, Alberti basi va sinxron gamma',
    badge: 'Koordinatsiya',
    accent: 'orange',
    plannedCount: 4
  },
  {
    id: 6,
    title: '6-bosqich: Pro daraja va repertuar',
    subtitle: 'Jaz septakkordlar, Für Elise, Canon in D, Yiruma, Moonlight',
    badge: 'Pro',
    accent: 'rose',
    plannedCount: 5
  }
]

export const LESSONS = [
  ...LEVEL_1_LESSONS,
  ...LEVEL_2_LESSONS,
  ...LEVEL_3_LESSONS,
  ...LEVEL_4_LESSONS,
  ...LEVEL_5_LESSONS,
  ...LEVEL_6_LESSONS
].map((lesson, globalIndex) => ({
  ...lesson,
  number: globalIndex + 1,
  defaultBpm: lesson.bpm || lesson.defaultBpm || 80
}))

export function getLessonById(id) {
  return LESSONS.find((l) => l.id === id) || LESSONS[0]
}

export function getLessonsByLevel(levelId) {
  return LESSONS.filter((l) => l.level === levelId)
}

/**
 * Tizim tavsiya etadigan keyingi dars:
 * Hali tugatilmagan birinchi dars (hamma dars tugagan bo‘lsa oxirgi dars).
 */
export function getRecommendedLessonId(progressMap = {}) {
  const firstUnfinished = LESSONS.find((l) => !progressMap[l.id]?.completed)
  if (firstUnfinished) return firstUnfinished.id
  return LESSONS[LESSONS.length - 1]?.id || null
}

/**
 * Bir qo‘lli (massiv) va ikki qo‘lli ({ left, right }) qadamlarni yagona tuzilmaga keltiradi.
 * `practiceHand`: 'both' | 'right' | 'left'
 */
export function buildLessonTimeline(lesson, practiceHand = 'both') {
  const effectiveHand =
    lesson.handMode === 'both'
      ? practiceHand
      : lesson.handMode || 'right'

  let cursor = 0

  return (lesson.steps || []).map((rawStep, index) => {
    const startBeat = cursor
    const duration = rawStep.duration || 1
    cursor += duration

    let leftRaw = []
    let rightRaw = []
    let leftFingers = []
    let rightFingers = []

    if (Array.isArray(rawStep.notes)) {
      if (lesson.handMode === 'left') {
        leftRaw = rawStep.notes
        leftFingers = Array.isArray(rawStep.fingers) ? rawStep.fingers : []
      } else {
        rightRaw = rawStep.notes
        rightFingers = Array.isArray(rawStep.fingers) ? rawStep.fingers : []
      }
    } else if (rawStep.notes && typeof rawStep.notes === 'object') {
      leftRaw = Array.isArray(rawStep.notes.left) ? rawStep.notes.left : []
      rightRaw = Array.isArray(rawStep.notes.right) ? rawStep.notes.right : []
      leftFingers = Array.isArray(rawStep.fingers?.left) ? rawStep.fingers.left : []
      rightFingers = Array.isArray(rawStep.fingers?.right) ? rawStep.fingers.right : []
    }

    const leftEntries = leftRaw.map((rawNote, i) => ({
      note: normalizeNote(rawNote),
      displayNote: rawNote,
      finger: leftFingers[i] ?? null,
      hand: 'left'
    }))

    const rightEntries = rightRaw.map((rawNote, i) => ({
      note: normalizeNote(rawNote),
      displayNote: rawNote,
      finger: rightFingers[i] ?? null,
      hand: 'right'
    }))

    const allEntries = [...leftEntries, ...rightEntries]

    let requiredEntries = allEntries
    let backingEntries = []

    if (effectiveHand === 'right') {
      requiredEntries = rightEntries
      backingEntries = leftEntries
    } else if (effectiveHand === 'left') {
      requiredEntries = leftEntries
      backingEntries = rightEntries
    }

    const uniqueRequiredNotes = [...new Set(requiredEntries.map((e) => e.note))]

    return {
      index,
      startBeat,
      duration,
      chordName: rawStep.chordName || null,
      hint: rawStep.hint || '',
      leftEntries,
      rightEntries,
      allEntries,
      requiredEntries,
      backingEntries,
      notes: uniqueRequiredNotes,
      isRestForActiveHand: requiredEntries.length === 0
    }
  })
}
