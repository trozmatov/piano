/**
 * Musiqa nazariyasi, 3 oktavali (C3–C6) klaviatura geometriyasi,
 * diez/bemol (engarmonik) normallashtirish, kompyuter klaviaturasi xaritasi va akkord aniqlash moduli.
 */

export const CHROMATIC_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const FLAT_TO_SHARP = {
  Db: 'C#',
  Eb: 'D#',
  Gb: 'F#',
  Ab: 'G#',
  Bb: 'A#'
}

export const SOLFEGE_MAP = {
  C: 'Do',
  'C#': 'Do♯',
  Db: 'Re♭',
  D: 'Re',
  'D#': 'Re♯',
  Eb: 'Mi♭',
  E: 'Mi',
  F: 'Fa',
  'F#': 'Fa♯',
  Gb: 'Sol♭',
  G: 'Sol',
  'G#': 'Sol♯',
  Ab: 'Lya♭',
  A: 'Lya',
  'A#': 'Lya♯',
  Bb: 'Si♭',
  B: 'Si'
}

export const FINGER_NAMES = {
  1: 'Bosh barmoq',
  2: 'Ko‘rsatkich',
  3: 'O‘rta barmoq',
  4: 'Nomsiz barmoq',
  5: 'Jimjiloq'
}

// Qora tugmalarning haqiqiy royal pianinodagi kabi vizual siljish nisbatlari
const BLACK_KEY_OFFSET_RATIO = {
  'C#': 0.57,
  'D#': 0.43,
  'F#': 0.59,
  'G#': 0.5,
  'A#': 0.41
}

export const START_MIDI = 48 // C3
export const END_MIDI = 84 // C6

/**
 * Bemol notalarni (masalan, Bb4, Eb4) kanonik diez ko‘rinishiga (A#4, D#4) aylantiradi,
 * shunda klaviatura, MIDI va AudioEngine da 100% aniq moslik ta'minlanadi.
 */
export function normalizeNote(note) {
  if (typeof note !== 'string') return note
  const match = /^([A-G])([#b]?)(-?\d+)$/.exec(note.trim())
  if (!match) return note
  const [, letter, accidental, octave] = match
  const key = `${letter}${accidental}`
  const canonicalPitch = FLAT_TO_SHARP[key] || key
  return `${canonicalPitch}${octave}`
}

export function formatDisplayPitch(note) {
  if (typeof note !== 'string') return note
  return note.replace('#', '♯').replace(/([A-G])b(?=-?\d)/, '$1♭')
}

export function midiToNoteName(midi) {
  const pitchClass = CHROMATIC_NOTES[((midi % 12) + 12) % 12]
  const octave = Math.floor(midi / 12) - 1
  return `${pitchClass}${octave}`
}

export function noteNameToMidi(note) {
  const canonical = normalizeNote(note)
  const match = /^([A-G]#?)(-?\d+)$/.exec(canonical)
  if (!match) return null
  const [, pitch, octStr] = match
  const idx = CHROMATIC_NOTES.indexOf(pitch)
  if (idx === -1) return null
  return (parseInt(octStr, 10) + 1) * 12 + idx
}

export function parseNote(note) {
  const match = /^([A-G][#b]?)(-?\d+)$/.exec(note)
  if (!match) {
    return {
      note,
      canonical: normalizeNote(note),
      pitch: note,
      octave: 4,
      solfege: note,
      isBlack: false
    }
  }
  const [, pitch, octStr] = match
  const canonical = normalizeNote(note)
  return {
    note,
    canonical,
    pitch,
    octave: parseInt(octStr, 10),
    solfege: SOLFEGE_MAP[pitch] || pitch,
    isBlack: pitch.includes('#') || pitch.includes('b')
  }
}

export function formatNoteWithSolfege(note) {
  const { solfege } = parseNote(note)
  return `${formatDisplayPitch(note)} - ${solfege}`
}

/**
 * C3 dan C6 gacha bo‘lgan barcha 37 tugmani (22 oq, 15 qora) aniq foizli
 * koordinatalari bilan yaratadi.
 */
function buildPianoKeys() {
  const rawKeys = []
  let whiteCount = 0

  for (let midi = START_MIDI; midi <= END_MIDI; midi++) {
    const note = midiToNoteName(midi)
    const { pitch, octave, solfege, isBlack } = parseNote(note)
    if (!isBlack) {
      rawKeys.push({
        midi,
        note,
        pitch,
        octave,
        solfege,
        isBlack: false,
        whiteIndex: whiteCount
      })
      whiteCount += 1
    } else {
      rawKeys.push({
        midi,
        note,
        pitch,
        octave,
        solfege,
        isBlack: true,
        afterWhiteIndex: whiteCount - 1
      })
    }
  }

  const whiteWidthPct = 100 / whiteCount
  const blackWidthPct = whiteWidthPct * 0.62

  return rawKeys.map((key) => {
    if (!key.isBlack) {
      const leftPct = key.whiteIndex * whiteWidthPct
      return {
        ...key,
        leftPct,
        widthPct: whiteWidthPct,
        centerPct: leftPct + whiteWidthPct / 2
      }
    }
    const ratio = BLACK_KEY_OFFSET_RATIO[key.pitch] ?? 0.5
    const boundaryPct = (key.afterWhiteIndex + 1) * whiteWidthPct
    const leftPct = boundaryPct - blackWidthPct * ratio
    return {
      ...key,
      leftPct,
      widthPct: blackWidthPct,
      centerPct: leftPct + blackWidthPct / 2
    }
  })
}

export const PIANO_KEYS = buildPianoKeys()
export const WHITE_KEYS = PIANO_KEYS.filter((k) => !k.isBlack)
export const BLACK_KEYS = PIANO_KEYS.filter((k) => k.isBlack)
export const KEY_BY_NOTE = Object.fromEntries(PIANO_KEYS.map((k) => [k.note, k]))

export function getKeyGeometry(note) {
  return KEY_BY_NOTE[normalizeNote(note)] || null
}

/**
 * Fizik klaviatura kodlari (KeyboardEvent.code) -> yarim tonlar (semitone offset).
 */
export const KEYBOARD_LAYOUT = [
  { code: 'KeyA', label: 'A', semitone: 0 },
  { code: 'KeyW', label: 'W', semitone: 1 },
  { code: 'KeyS', label: 'S', semitone: 2 },
  { code: 'KeyE', label: 'E', semitone: 3 },
  { code: 'KeyD', label: 'D', semitone: 4 },
  { code: 'KeyF', label: 'F', semitone: 5 },
  { code: 'KeyT', label: 'T', semitone: 6 },
  { code: 'KeyG', label: 'G', semitone: 7 },
  { code: 'KeyY', label: 'Y', semitone: 8 },
  { code: 'KeyH', label: 'H', semitone: 9 },
  { code: 'KeyU', label: 'U', semitone: 10 },
  { code: 'KeyJ', label: 'J', semitone: 11 },
  { code: 'KeyK', label: 'K', semitone: 12 },
  { code: 'KeyO', label: 'O', semitone: 13 },
  { code: 'KeyL', label: 'L', semitone: 14 },
  { code: 'KeyP', label: 'P', semitone: 15 },
  { code: 'Semicolon', label: ';', semitone: 16 },
  { code: 'Quote', label: "'", semitone: 17 }
]

export function buildKeyboardMaps(octaveOffset = 0) {
  const baseMidi = 60 + octaveOffset * 12 // 60 = C4
  const codeToNote = {}
  const noteToHotkey = {}

  for (const item of KEYBOARD_LAYOUT) {
    const midi = baseMidi + item.semitone
    if (midi >= START_MIDI && midi <= END_MIDI) {
      const note = midiToNoteName(midi)
      codeToNote[item.code] = note
      noteToHotkey[note] = item.label
    }
  }

  return { codeToNote, noteToHotkey }
}

/**
 * Erkin chalish (Free Play) rejimida bosilgan tugmalar bo‘yicha akkordni aniqlaydi.
 */
const CHORD_PATTERNS = [
  { intervals: [0, 4, 7], suffix: 'Major', uz: 'major' },
  { intervals: [0, 3, 7], suffix: 'Minor', uz: 'minor' },
  { intervals: [0, 3, 6], suffix: 'Dim', uz: 'kamaytirilgan' },
  { intervals: [0, 4, 8], suffix: 'Aug', uz: 'orttirilgan' },
  { intervals: [0, 2, 7], suffix: 'Sus2', uz: 'sus2' },
  { intervals: [0, 5, 7], suffix: 'Sus4', uz: 'sus4' },
  { intervals: [0, 4, 7, 11], suffix: 'Maj7', uz: 'katta septakkord' },
  { intervals: [0, 4, 7, 10], suffix: '7', uz: 'septakkord' },
  { intervals: [0, 3, 7, 10], suffix: 'Min7', uz: 'minor septakkord' }
]

export function detectChord(notes) {
  if (!notes || notes.length < 3) return null

  const midiValues = notes
    .map(noteNameToMidi)
    .filter((m) => m !== null)
    .sort((a, b) => a - b)

  const uniquePitchClasses = [...new Set(midiValues.map((m) => m % 12))]
  if (uniquePitchClasses.length < 3) return null

  for (const root of uniquePitchClasses) {
    const normalized = uniquePitchClasses
      .map((pc) => (pc - root + 12) % 12)
      .sort((a, b) => a - b)

    for (const pattern of CHORD_PATTERNS) {
      if (
        pattern.intervals.length === normalized.length &&
        pattern.intervals.every((val, idx) => val === normalized[idx])
      ) {
        const rootName = CHROMATIC_NOTES[root]
        const solfege = SOLFEGE_MAP[rootName]
        return {
          symbol: `${rootName} ${pattern.suffix}`,
          uzLabel: `${solfege} ${pattern.uz}`
        }
      }
    }
  }

  return null
}
