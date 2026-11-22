/**
 * 6-bosqich: Pro daraja va mashhur repertuar
 * 5 ta to‘liq Pro dars: Jaz septakkordlar (Cmaj7–Am7–Dm7–G7),
 * Betxoven — "Für Elise", Pachelbel — "Canon in D",
 * Yiruma — "River Flows in You" va Betxoven — "Moonlight Sonata".
 */

export const LEVEL_6_LESSONS = [
  {
    id: 'l6-1',
    level: 6,
    order: 1,
    title: 'Jaz septakkordlar (Cmaj7, Am7, Dm7, G7)',
    subtitle: 'Zamonaviy jaz, lo-fi va neo-soul garmoniyasi',
    description:
      'Uch tovushlikka 7-pog‘ona (septima) qo‘shilganda boy, baxmal jaz ohangi paydo bo‘ladi. Ushbu darsda mashhur I–vi–ii–V (Cmaj7 – Am7 – Dm7 – G7) jaz aylanishini ikki qo‘lda o‘zlashtirasiz.',
    brief: {
      goal: 'Cmaj7, Am7, Dm7 va G7 septakkordlarini ikki qo‘lli jaz ovozlanishi va sindirib chalish bilan ijro etish.',
      fingers: 'Chap qo‘l: bas (C3, A3, D3, G3) · O‘ng qo‘l: 3–4 notali septakkordlar',
      tip: 'Sustain pedalini yumshoq ishlating va har bir yangi akkordda pedalni yangilang — haqiqiy jaz klub atmosferasi hosil bo‘ladi!'
    },
    bpm: 80,
    handMode: 'both',
    steps: [
      // 1-sikl: To‘liq septakkordlarni tanish
      { notes: { left: ['C3'], right: ['E4', 'G4', 'B4'] }, fingers: { left: [5], right: [1, 3, 5] }, duration: 2, chordName: 'Cmaj7', hint: 'Cmaj7: Chap C3 + O‘ng E4-G4-B4 (yumshoq orzuli ohang).' },
      { notes: { left: ['A3'], right: ['C4', 'E4', 'G4'] }, fingers: { left: [2], right: [1, 3, 5] }, duration: 2, chordName: 'Am7', hint: 'Am7: Chap A3 + O‘ng C4-E4-G4.' },
      { notes: { left: ['D3'], right: ['F4', 'A4', 'C5'] }, fingers: { left: [4], right: [1, 3, 5] }, duration: 2, chordName: 'Dm7', hint: 'Dm7: Chap D3 + O‘ng F4-A4-C5.' },
      { notes: { left: ['G3'], right: ['F4', 'G4', 'B4'] }, fingers: { left: [1], right: [1, 2, 4] }, duration: 2, chordName: 'G7', hint: 'G7 (Dominanta): Chap G3 + O‘ng F4-G4-B4.' },

      // 2-sikl: Ritmik jaz komping
      { notes: { left: ['C3', 'G3'], right: ['E4', 'B4'] }, fingers: { left: [5, 1], right: [1, 5] }, duration: 1.5, chordName: 'Cmaj7', hint: 'Jaz ritmi: Cmaj7 ochiq ovozlanish.' },
      { notes: { left: [], right: ['G4', 'B4', 'D5'] }, fingers: { left: [], right: [1, 3, 5] }, duration: 0.5, chordName: 'Cmaj9', hint: 'Cmaj9 rang berishi (D5 bilan)!' },
      { notes: { left: ['A3'], right: ['C4', 'E4', 'G4'] }, fingers: { left: [2], right: [1, 3, 5] }, duration: 1.5, chordName: 'Am7', hint: 'Am7.' },
      { notes: { left: [], right: ['E4', 'G4', 'B4'] }, fingers: { left: [], right: [1, 3, 5] }, duration: 0.5, chordName: 'Am9', hint: 'Am9 rang berishi!' },

      { notes: { left: ['D3', 'A3'], right: ['F4', 'C5'] }, fingers: { left: [5, 1], right: [1, 5] }, duration: 1.5, chordName: 'Dm7', hint: 'Dm7.' },
      { notes: { left: [], right: ['F4', 'A4', 'E5'] }, fingers: { left: [], right: [1, 2, 5] }, duration: 0.5, chordName: 'Dm9', hint: 'Dm9!' },
      { notes: { left: ['G3'], right: ['F4', 'B4', 'E5'] }, fingers: { left: [1], right: [1, 3, 5] }, duration: 1.5, chordName: 'G13', hint: 'G13 — haqiqiy jaz dominantasi!' },
      { notes: { left: [], right: ['F4', 'B4', 'D5'] }, fingers: { left: [], right: [1, 3, 5] }, duration: 0.5, chordName: 'G7', hint: 'G7.' },

      // 3-sikl: Jaz ballada arpedjiosi
      { notes: { left: ['C3'], right: ['E4'] }, fingers: { left: [5], right: [1] }, duration: 0.5, hint: 'Cmaj7 arpedjio: C3 + E4' },
      { notes: { left: [], right: ['G4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'G4' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'B4' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'D5' },

      { notes: { left: ['D3'], right: ['F4'] }, fingers: { left: [4], right: [1] }, duration: 0.5, hint: 'Dm7 arpedjio: D3 + F4' },
      { notes: { left: [], right: ['A4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'A4' },
      { notes: { left: [], right: ['C5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'C5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'E5' },

      { notes: { left: ['G3'], right: ['F4'] }, fingers: { left: [1], right: [1] }, duration: 0.5, hint: 'G7 arpedjio: G3 + F4' },
      { notes: { left: [], right: ['A4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'A4' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'B4' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'D5' },

      { notes: { left: ['C3', 'G3'], right: ['E4', 'B4', 'D5'] }, fingers: { left: [5, 1], right: [1, 4, 5] }, duration: 4, chordName: 'Cmaj9', hint: 'Ajoyib! Baxmal Cmaj9 jaz yakuni!' }
    ]
  },
  {
    id: 'l6-2',
    level: 6,
    order: 2,
    title: 'Betxoven — "Für Elise" (Ikki qo‘lda)',
    subtitle: 'Dunyodagi eng mashhur fortepiano asari — asosiy qism va o‘tish',
    description:
      'Lyudvig van Betxovenning o‘lmas "Elizaga" (WoO 59, A Minor) asarini asl E5–D♯5 motivi, chap qo‘l jo‘rligi va C Major / G Major o‘rta ko‘prigi bilan to‘liq ijro eting.',
    brief: {
      goal: 'E5–D♯5 xromatik tebranishi, chap qo‘l Am / E arpedjiolari va ifodali klassik frazalarni birlashtirish.',
      fingers: 'O‘ng qo‘l: E5(5) D♯5(4) B4(2) D5(4) C5(3) A4(1) · Chap qo‘l: A3, E3, G♯3, C3, G3',
      tip: 'Kirishdagi E5–D♯5–E5–D♯5–E5 notalarini 5- va 4-barmoqlar bilan yengil va sirli chaling.'
    },
    bpm: 104,
    handMode: 'both',
    steps: [
      // 1-ibora
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'Mashhur kirish: E5 (5)' },
      { notes: { left: [], right: ['D#5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'D♯5 (4)' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'E5 (5)' },
      { notes: { left: [], right: ['D#5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'D♯5 (4)' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'E5 (5)' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'B4 (2)' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'D5 (4)' },
      { notes: { left: [], right: ['C5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'C5 (3)' },

      { notes: { left: ['A3'], right: ['A4'] }, fingers: { left: [5], right: [1] }, duration: 1, hint: 'Am: Chap A3 + O‘ng A4!' },
      { notes: { left: ['C4'], right: [] }, fingers: { left: [3], right: [] }, duration: 0.5, hint: 'Chap jo‘r: C4' },
      { notes: { left: [], right: ['C4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'O‘ng javob: C4' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'O‘ng: E4' },
      { notes: { left: [], right: ['A4'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'O‘ng: A4' },

      { notes: { left: ['E3'], right: ['B4'] }, fingers: { left: [5], right: [5] }, duration: 1, hint: 'E Major: Chap E3 + O‘ng B4!' },
      { notes: { left: ['G#3'], right: [] }, fingers: { left: [3], right: [] }, duration: 0.5, hint: 'Chap: G♯3 (qora tugma!)' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'O‘ng: E4' },
      { notes: { left: [], right: ['G#4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'O‘ng: G♯4' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'O‘ng: B4' },

      { notes: { left: ['A3'], right: ['C5'] }, fingers: { left: [5], right: [5] }, duration: 1, hint: 'Am: Chap A3 + O‘ng C5!' },
      { notes: { left: ['E3'], right: [] }, fingers: { left: [5], right: [] }, duration: 0.5, hint: 'Chap: E3' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'O‘ng: E4 — takrorga tayyorlaning!' },

      // 2-ibora (Yakunlovchi kadans)
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: '2-ibora: E5' },
      { notes: { left: [], right: ['D#5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'D♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'E5' },
      { notes: { left: [], right: ['D#5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'D♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'E5' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'B4' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'D5' },
      { notes: { left: [], right: ['C5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'C5' },

      { notes: { left: ['A3'], right: ['A4'] }, fingers: { left: [5], right: [1] }, duration: 1, hint: 'Am: Chap A3 + O‘ng A4' },
      { notes: { left: [], right: ['C4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'O‘ng: C4' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'O‘ng: E4' },
      { notes: { left: [], right: ['A4'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'O‘ng: A4' },

      { notes: { left: ['E3', 'G#3'], right: ['B4'] }, fingers: { left: [5, 3], right: [5] }, duration: 1, hint: 'Chap E3+G♯3 + O‘ng B4' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'O‘ng: E4' },
      { notes: { left: [], right: ['C5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'O‘ng: C5' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'O‘ng: B4' },
      { notes: { left: ['A3'], right: ['A4'] }, fingers: { left: [5], right: [3] }, duration: 1.5, hint: 'Am da to‘xtash! Endi C Major ko‘prigi!' },

      // O‘rta ko‘prik (C – G – Am – E)
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'Ko‘prik: B4' },
      { notes: { left: [], right: ['C5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'C5' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'D5' },

      { notes: { left: ['C3', 'G3'], right: ['E5'] }, fingers: { left: [5, 1], right: [4] }, duration: 1.5, hint: 'Yorqin C Major! Chap C3+G3 + O‘ng E5.' },
      { notes: { left: [], right: ['G4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'O‘ng: G4' },
      { notes: { left: [], right: ['F5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'O‘ng: F5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'O‘ng: E5' },

      { notes: { left: ['G3', 'B3'], right: ['D5'] }, fingers: { left: [4, 2], right: [3] }, duration: 1.5, hint: 'G Major: Chap G3+B3 + O‘ng D5.' },
      { notes: { left: [], right: ['F4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'O‘ng: F4' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'O‘ng: E5' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'O‘ng: D5' },

      { notes: { left: ['A3'], right: ['C5'] }, fingers: { left: [3], right: [3] }, duration: 1.5, hint: 'Am: Chap A3 + O‘ng C5.' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'O‘ng: E4' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'O‘ng: D5' },
      { notes: { left: [], right: ['C5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'O‘ng: C5' },
      { notes: { left: ['E3', 'G#3'], right: ['B4'] }, fingers: { left: [5, 3], right: [2] }, duration: 1.5, hint: 'E Major — asosiy mavzuga qaytish!' },

      // Yakuniy qaytish (Reprise)
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'Yakuniy mavzu: E5' },
      { notes: { left: [], right: ['D#5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'D♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'E5' },
      { notes: { left: [], right: ['D#5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'D♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'E5' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'B4' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'D5' },
      { notes: { left: [], right: ['C5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'C5' },

      { notes: { left: ['A3'], right: ['A4'] }, fingers: { left: [5], right: [1] }, duration: 1, hint: 'Am: A3 + A4' },
      { notes: { left: [], right: ['C4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'C4' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'E4' },
      { notes: { left: [], right: ['A4'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'A4' },

      { notes: { left: ['E3', 'G#3'], right: ['B4'] }, fingers: { left: [5, 3], right: [5] }, duration: 1, hint: 'E: E3+G♯3 + B4' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'E4' },
      { notes: { left: [], right: ['C5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'C5' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'B4' },
      { notes: { left: ['A3', 'C4', 'E4'], right: ['A4'] }, fingers: { left: [5, 3, 1], right: [3] }, duration: 3, chordName: 'A Minor', hint: 'Bravo! Betxovenning "Für Elise" asarini ijro etdingiz!' }
    ]
  },
  {
    id: 'l6-3',
    level: 6,
    order: 3,
    title: 'Pachelbel — "Canon in D" (Pro aranjiman)',
    subtitle: 'D Major (F♯, C♯) — Xoral, chorak oqim va sakkiztalik variatsiya',
    description:
      'Iogann Paxelbelning afsonaviy "Re major kanoni" o‘zgarmas 8 notalik bas chizig‘i (D–A–B–F♯–G–D–G–A) ustida tobora boyib boruvchi 3 ta variatsiyadan iborat.',
    brief: {
      goal: 'D Major tonalligida (F♯ va C♯ bilan) uzluksiz barokko polifoniyasi va 3 bosqichli variatsiyani chalish.',
      fingers: 'Chap qo‘l: D3–B3 bas chizig‘i · O‘ng qo‘l: F♯4–A5 lirik variatsiyalar',
      tip: '3-variatsiyada sakkiztalik notalar boshlanadi — avval Kutish rejimida yodlang, keyin 76 BPM da Ritm (Flow) rejimida sinab ko‘ring!'
    },
    bpm: 76,
    handMode: 'both',
    steps: [
      // 1-variatsiya: Xoral mavzusi (yarim notalar)
      { notes: { left: ['D3', 'A3'], right: ['F#5'] }, fingers: { left: [5, 1], right: [4] }, duration: 2, chordName: 'D', hint: '1-variatsiya (D): Chap D3+A3 + O‘ng F♯5.' },
      { notes: { left: ['A3'], right: ['E5'] }, fingers: { left: [1], right: [3] }, duration: 2, chordName: 'A', hint: 'A: Chap A3 + O‘ng E5.' },
      { notes: { left: ['B3'], right: ['D5'] }, fingers: { left: [1], right: [2] }, duration: 2, chordName: 'Bm', hint: 'Bm: Chap B3 + O‘ng D5.' },
      { notes: { left: ['F#3'], right: ['C#5'] }, fingers: { left: [3], right: [2] }, duration: 2, chordName: 'F♯m', hint: 'F♯m: Chap F♯3 + O‘ng C♯5.' },
      { notes: { left: ['G3'], right: ['B4'] }, fingers: { left: [2], right: [1] }, duration: 2, chordName: 'G', hint: 'G: Chap G3 + O‘ng B4.' },
      { notes: { left: ['D3'], right: ['A4'] }, fingers: { left: [5], right: [1] }, duration: 2, chordName: 'D', hint: 'D: Chap D3 + O‘ng A4.' },
      { notes: { left: ['G3'], right: ['B4'] }, fingers: { left: [2], right: [2] }, duration: 2, chordName: 'G', hint: 'G: Chap G3 + O‘ng B4.' },
      { notes: { left: ['A3'], right: ['C#5'] }, fingers: { left: [1], right: [3] }, duration: 2, chordName: 'A', hint: 'A: Chap A3 + O‘ng C♯5.' },

      // 2-variatsiya: Chorak notali lirik oqim
      { notes: { left: ['D3'], right: ['D5'] }, fingers: { left: [5], right: [1] }, duration: 1, hint: '2-variatsiya: D3 + D5.' },
      { notes: { left: [], right: ['F#5'] }, fingers: { left: [], right: [3] }, duration: 1, hint: 'O‘ng: F♯5' },
      { notes: { left: ['A3'], right: ['A5'] }, fingers: { left: [1], right: [5] }, duration: 1, hint: 'A3 + A5.' },
      { notes: { left: [], right: ['G5'] }, fingers: { left: [], right: [4] }, duration: 1, hint: 'O‘ng: G5' },
      { notes: { left: ['B3'], right: ['F#5'] }, fingers: { left: [1], right: [3] }, duration: 1, hint: 'B3 + F♯5.' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [1] }, duration: 1, hint: 'O‘ng: D5' },
      { notes: { left: ['F#3'], right: ['F#5'] }, fingers: { left: [3], right: [4] }, duration: 1, hint: 'F♯3 + F♯5.' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [3] }, duration: 1, hint: 'O‘ng: E5' },
      { notes: { left: ['G3'], right: ['D5'] }, fingers: { left: [2], right: [2] }, duration: 1, hint: 'G3 + D5.' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [1] }, duration: 1, hint: 'O‘ng: B4' },
      { notes: { left: ['D3'], right: ['D5'] }, fingers: { left: [5], right: [3] }, duration: 1, hint: 'D3 + D5.' },
      { notes: { left: [], right: ['A4'] }, fingers: { left: [], right: [1] }, duration: 1, hint: 'O‘ng: A4' },
      { notes: { left: ['G3'], right: ['G4'] }, fingers: { left: [2], right: [1] }, duration: 1, hint: 'G3 + G4.' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [3] }, duration: 1, hint: 'O‘ng: B4' },
      { notes: { left: ['A3'], right: ['A4'] }, fingers: { left: [1], right: [2] }, duration: 1, hint: 'A3 + A4.' },
      { notes: { left: [], right: ['G4'] }, fingers: { left: [], right: [1] }, duration: 1, hint: 'O‘ng: G4' },

      // 3-variatsiya: Mashhur sakkiztalik oqim!
      { notes: { left: ['D3'], right: ['F#4'] }, fingers: { left: [5], right: [1] }, duration: 0.5, hint: '3-variatsiya (D): D3 + F♯4' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'D5' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'D5' },

      { notes: { left: ['A3'], right: ['E5'] }, fingers: { left: [1], right: [5] }, duration: 0.5, hint: 'A: A3 + E5' },
      { notes: { left: [], right: ['A4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'A4' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'E5' },

      { notes: { left: ['B3'], right: ['D5'] }, fingers: { left: [1], right: [3] }, duration: 0.5, hint: 'Bm: B3 + D5' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'B4' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'D5' },
      { notes: { left: [], right: ['F#5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'F♯5' },

      { notes: { left: ['F#3'], right: ['C#5'] }, fingers: { left: [3], right: [3] }, duration: 0.5, hint: 'F♯m: F♯3 + C♯5' },
      { notes: { left: [], right: ['A4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'A4' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'E5' },

      { notes: { left: ['G3'], right: ['B4'] }, fingers: { left: [2], right: [2] }, duration: 0.5, hint: 'G: G3 + B4' },
      { notes: { left: [], right: ['G4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'G4' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'B4' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'D5' },

      { notes: { left: ['D3'], right: ['A4'] }, fingers: { left: [5], right: [2] }, duration: 0.5, hint: 'D: D3 + A4' },
      { notes: { left: [], right: ['F#4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'F♯4' },
      { notes: { left: [], right: ['A4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'A4' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'D5' },

      { notes: { left: ['G3'], right: ['B4'] }, fingers: { left: [2], right: [1] }, duration: 0.5, hint: 'G: G3 + B4' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'D5' },
      { notes: { left: [], right: ['G5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'G5' },
      { notes: { left: [], right: ['F#5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'F♯5' },

      { notes: { left: ['A3'], right: ['E5'] }, fingers: { left: [1], right: [4] }, duration: 0.5, hint: 'A: A3 + E5' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['A4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'A4' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'C♯5' },

      { notes: { left: ['D3', 'A3'], right: ['D5', 'F#5'] }, fingers: { left: [5, 1], right: [2, 4] }, duration: 4, chordName: 'D Major', hint: 'Betakror! Pachelbel "Canon in D" yakunlandi!' }
    ]
  },
  {
    id: 'l6-4',
    level: 6,
    order: 4,
    title: 'Yiruma — "River Flows in You"',
    subtitle: 'Zamonaviy neoklassik durdona — kirish va asosiy motiv (A Major)',
    description:
      'Koreys bastakori Yirumaning eng mashhur asari A Major / F♯ Minor tonalligida (3 ta diez: F♯, C♯, G♯) yozilgan. Suvdek oquvchi kirish motivi va ta’sirchan kuyni his qilib chaling.',
    brief: {
      goal: 'A5–G♯5 kirish motivi va F♯m – D – A – E zamonaviy neoklassik oqimini ikki qo‘lda ifodali chalish.',
      fingers: 'Chap qo‘l: F♯3–C♯4, D3–A3, A3–E4, E3–B3 · O‘ng qo‘l: A4–A5',
      tip: 'Asar nomi kabi daryodek ravon (rubato) oqishi kerak — kuch bilan urmang, tugmalarni silab bosing.'
    },
    bpm: 78,
    handMode: 'both',
    steps: [
      // Kirish 1-ibora (A5 – G#5 – A5 – G#5 – A5 – E5 – A5 – D5)
      { notes: { left: ['F#3'], right: ['A5'] }, fingers: { left: [5], right: [5] }, duration: 0.5, hint: 'F♯m kirish: Chap F♯3 + O‘ng A5.' },
      { notes: { left: [], right: ['G#5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'G♯5' },
      { notes: { left: [], right: ['A5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'A5' },
      { notes: { left: ['C#4'], right: ['G#5'] }, fingers: { left: [1], right: [4] }, duration: 0.5, hint: 'Chap C♯4 + O‘ng G♯5.' },
      { notes: { left: [], right: ['A5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'A5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'E5' },
      { notes: { left: [], right: ['A5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'A5' },
      { notes: { left: ['D3'], right: ['D5'] }, fingers: { left: [5], right: [1] }, duration: 1, hint: 'D Major: Chap D3 + O‘ng D5!' },
      { notes: { left: ['A3'], right: ['C#5'] }, fingers: { left: [1], right: [2] }, duration: 0.5, hint: 'Chap A3 + O‘ng C♯5.' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'D5' },
      { notes: { left: ['A3'], right: ['E5'] }, fingers: { left: [2], right: [4] }, duration: 1, hint: 'A Major: Chap A3 + O‘ng E5.' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [2] }, duration: 1, hint: 'C♯5' },
      { notes: { left: ['E3', 'B3'], right: ['B4'] }, fingers: { left: [5, 1], right: [1] }, duration: 2, hint: 'E Major: Chap E3+B3 + O‘ng B4 (2 zarb).' },

      // Kirish 2-ibora
      { notes: { left: ['F#3'], right: ['A5'] }, fingers: { left: [5], right: [5] }, duration: 0.5, hint: '2-ibora: Chap F♯3 + O‘ng A5.' },
      { notes: { left: [], right: ['G#5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'G♯5' },
      { notes: { left: [], right: ['A5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'A5' },
      { notes: { left: ['C#4'], right: ['G#5'] }, fingers: { left: [1], right: [4] }, duration: 0.5, hint: 'Chap C♯4 + O‘ng G♯5.' },
      { notes: { left: [], right: ['A5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'A5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'E5' },
      { notes: { left: [], right: ['A5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'A5' },
      { notes: { left: ['D3'], right: ['D5'] }, fingers: { left: [5], right: [1] }, duration: 1, hint: 'D3 + D5.' },
      { notes: { left: ['A3'], right: ['E5'] }, fingers: { left: [1], right: [4] }, duration: 0.5, hint: 'A3 + E5.' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: ['E3', 'B3'], right: ['B4'] }, fingers: { left: [5, 1], right: [1] }, duration: 2, hint: 'E3+B3 + B4.' },

      // Asosiy lirik mavzu (1-qism)
      { notes: { left: ['F#3', 'C#4'], right: ['A4'] }, fingers: { left: [5, 1], right: [1] }, duration: 0.5, hint: 'Asosiy mavzu (F♯m): Chap F♯3+C♯4 + O‘ng A4.' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'B4' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [3] }, duration: 1, hint: 'C♯5' },
      { notes: { left: ['D3', 'A3'], right: ['D5'] }, fingers: { left: [5, 1], right: [4] }, duration: 0.5, hint: 'D: Chap D3+A3 + O‘ng D5.' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [2] }, duration: 1, hint: 'B4' },
      { notes: { left: ['A3', 'E4'], right: ['C#5'] }, fingers: { left: [5, 1], right: [3] }, duration: 1, hint: 'A: Chap A3+E4 + O‘ng C♯5.' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 1, hint: 'E5' },
      { notes: { left: ['E3', 'B3'], right: ['B4'] }, fingers: { left: [5, 1], right: [2] }, duration: 2, hint: 'E: Chap E3+B3 + O‘ng B4.' },

      // Asosiy lirik mavzu (2-qism — avj va yakun)
      { notes: { left: ['F#3', 'C#4'], right: ['A4'] }, fingers: { left: [5, 1], right: [1] }, duration: 0.5, hint: 'Avj qism: F♯m + A4.' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'B4' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'E5' },
      { notes: { left: ['D3', 'A3'], right: ['D5'] }, fingers: { left: [5, 1], right: [4] }, duration: 0.5, hint: 'D + D5.' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['B4'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'B4' },
      { notes: { left: [], right: ['A4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'A4' },
      { notes: { left: ['A3', 'E4'], right: ['C#5'] }, fingers: { left: [5, 1], right: [3] }, duration: 1, hint: 'A + C♯5.' },
      { notes: { left: ['E3', 'B3'], right: ['B4'] }, fingers: { left: [5, 1], right: [2] }, duration: 1, hint: 'E + B4.' },
      { notes: { left: ['F#3', 'C#4'], right: ['A4', 'C#5'] }, fingers: { left: [5, 1], right: [1, 3] }, duration: 3.5, chordName: 'F♯ Minor', hint: 'Chiroyli! "River Flows in You" asosiy motivi yakunlandi!' }
    ]
  },
  {
    id: 'l6-5',
    level: 6,
    order: 5,
    title: 'Betxoven — "Moonlight Sonata" (Kirish arpedjiolari)',
    subtitle: '14-sonata (C♯ Minor) — Oy nuri ostidagi gipnotik triollar',
    description:
      'Kursning cho‘qqisi! Betxovenning mashhur "Oy sonatasi" (1-qism, Adagio sostenuto) kirish arpedjiolari, pastga tushuvchi dramatik bas chizig‘i (C♯–B–A–F♯–G♯–C♯) va G♯5 kuyining kirib kelishi.',
    brief: {
      goal: 'C♯ Minor tonalligida uzluksiz 3 notali (triol) arpedjiolar, chuqur bas harakati va 5-barmoq melodiyasini birlashtirish.',
      fingers: 'Chap qo‘l: C♯4 → B3 → A3 → F♯3 → G♯3 → C♯3 · O‘ng qo‘l: 1-2-4 arpedjio va 5-barmoq kuy',
      tip: 'Shoshilmang (60 BPM)! Har bir arpedjio bir xil sokin to‘lqinda oqsin, 5-barmoqda G♯5 notasi kirib kelganda uni alohida kuylatib chiqaring.'
    },
    bpm: 60,
    handMode: 'both',
    steps: [
      // 1-takt: C#m (L: C#4, R: G#4 - C#5 - E5 x 2)
      { notes: { left: ['C#4'], right: ['G#4'] }, fingers: { left: [1], right: [1] }, duration: 0.5, chordName: 'C♯m', hint: '1-takt (C♯m): Chap C♯4 + O‘ng G♯4.' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'E5' },
      { notes: { left: [], right: ['G#4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'G♯4' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'E5' },

      // 2-takt: C#m/B (L: B3, R: G#4 - C#5 - E5 x 2)
      { notes: { left: ['B3'], right: ['G#4'] }, fingers: { left: [2], right: [1] }, duration: 0.5, chordName: 'C♯m/B', hint: '2-takt (Bas pastga tushadi!): Chap B3 + O‘ng G♯4.' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'E5' },
      { notes: { left: [], right: ['G#4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'G♯4' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'E5' },

      // 3-takt: A Major + D/F# (Neapolitan akkordi!)
      { notes: { left: ['A3'], right: ['A4'] }, fingers: { left: [3], right: [1] }, duration: 0.5, chordName: 'A', hint: '3-takt (A Major): Chap A3 + O‘ng A4.' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'E5' },
      { notes: { left: ['F#3'], right: ['A4'] }, fingers: { left: [5], right: [1] }, duration: 0.5, chordName: 'D/F♯', hint: 'Mashhur Neapolitan akkordi! Chap F♯3 + O‘ng A4.' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'D5' },
      { notes: { left: [], right: ['F#5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'F♯5' },

      // 4-takt: G#7 -> C#m/G# -> G#7 (C5 = B#4)
      { notes: { left: ['G#3'], right: ['G#4'] }, fingers: { left: [4], right: [1] }, duration: 0.5, chordName: 'G♯7', hint: '4-takt (G♯7): Chap G♯3 + O‘ng G♯4.' },
      { notes: { left: [], right: ['C5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'C5 (B♯4)' },
      { notes: { left: [], right: ['F#5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'F♯5' },
      { notes: { left: [], right: ['G#4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'G♯4' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'E5' },
      { notes: { left: ['G#3'], right: ['G#4'] }, fingers: { left: [4], right: [1] }, duration: 0.5, hint: 'Chap G♯3 + O‘ng G♯4' },
      { notes: { left: [], right: ['C5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'C5 (B♯4)' },
      { notes: { left: [], right: ['D#5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'D♯5' },

      // 5–6-takt: Afsonaviy G#5 kuyi kirib keladi!
      { notes: { left: ['C#3', 'G#3'], right: ['G#4'] }, fingers: { left: [5, 1], right: [1] }, duration: 0.5, chordName: 'C♯m', hint: '5-takt: Chuqur C♯3+G♯3 basi + G♯4.' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'E5' },
      { notes: { left: [], right: ['G#4', 'G#5'] }, fingers: { left: [], right: [1, 5] }, duration: 0.5, hint: 'KUY KIRDI! 1-barmoq G♯4 + 5-barmoq G♯5 ni kuylating!' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: [], right: ['E5', 'G#5'] }, fingers: { left: [], right: [3, 5] }, duration: 0.5, hint: 'E5 + G♯5!' },

      { notes: { left: ['C#3', 'G#3'], right: ['G#4', 'G#5'] }, fingers: { left: [5, 1], right: [1, 5] }, duration: 1, chordName: 'C♯m', hint: '6-takt: Chap C♯3+G♯3 + O‘ng G♯4+G♯5!' },
      { notes: { left: [], right: ['C#5'] }, fingers: { left: [], right: [2] }, duration: 0.5, hint: 'C♯5' },
      { notes: { left: ['F#3'], right: ['A4', 'A5'] }, fingers: { left: [3], right: [1, 5] }, duration: 1, chordName: 'F♯m', hint: 'Dramatik ko‘tarilish: Chap F♯3 + O‘ng A4+A5!' },
      { notes: { left: ['G#3'], right: ['G#4', 'G#5'] }, fingers: { left: [2], right: [1, 5] }, duration: 1, chordName: 'G♯7', hint: 'Chap G♯3 + O‘ng G♯4+G♯5.' },
      { notes: { left: ['G#3'], right: ['D#5', 'F#5'] }, fingers: { left: [2], right: [3, 5] }, duration: 1, hint: 'D♯5 + F♯5.' },
      { notes: { left: ['C#3', 'G#3'], right: ['G#4', 'C#5', 'E5'] }, fingers: { left: [5, 1], right: [1, 3, 5] }, duration: 4, chordName: 'C♯ Minor', hint: 'TABRIKLAYMIZ! Noldan Progacha barcha 6 bosqichni egalladingiz!' }
    ]
  }
]
