/**
 * 4-bosqich: Akkordlar va garmoniya
 * 4 ta to‘liq dars: Major uch tovushliklar (C, F, G), Minor uch tovushliklar (Am, Dm, Em),
 * Pop ketma-ketligi (C–G–Am–F), hamda Akkord aylanmalari (Inversions) va Arpedjio.
 */

export const LEVEL_4_LESSONS = [
  {
    id: 'l4-1',
    level: 4,
    order: 1,
    title: 'Asosiy Major uch tovushliklar (C, F, G)',
    subtitle: 'Uchta notani bir vaqtda bosib yorqin major akkordlar chalish',
    description:
      'C Major, F Major va G Major — G‘arb musiqasining eng asosiy uchta ustun akkordi (Tonika I, Subdominanta IV, Dominanta V). Har bir akkordni 1-3-5 barmoqlar bilan bir vaqtda bosing.',
    brief: {
      goal: 'C, F va G major akkordlarini toza, bir vaqtda bosish va ular orasida erkin almashish.',
      fingers: 'O‘ng qo‘l: har uchala akkord uchun 1–3–5 barmoqlar',
      tip: 'Kompyuter klaviaturasida bir nechta tugmani birga bosishingiz mumkin: C (A+D+G), F (F+H+K), G (G+J+L). Telefon/planshetda esa 3 barmoq bilan birga bosing!'
    },
    bpm: 74,
    handMode: 'right',
    steps: [
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 2, chordName: 'C Major', hint: 'C Major (I): C4 + E4 + G4 ni bir vaqtda bosing.' },
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 2, chordName: 'C Major', hint: 'Yana C Major — uchala tugma bir tekis tushsin.' },
      { notes: ['F4', 'A4', 'C5'], fingers: [1, 3, 5], duration: 2, chordName: 'F Major', hint: 'F Major (IV): F4 + A4 + C5 (1-3-5 barmoqlar).' },
      { notes: ['F4', 'A4', 'C5'], fingers: [1, 3, 5], duration: 2, chordName: 'F Major', hint: 'Yana F Major.' },
      { notes: ['G4', 'B4', 'D5'], fingers: [1, 3, 5], duration: 2, chordName: 'G Major', hint: 'G Major (V): G4 + B4 + D5 (1-3-5 barmoqlar).' },
      { notes: ['G4', 'B4', 'D5'], fingers: [1, 3, 5], duration: 2, chordName: 'G Major', hint: 'Yana G Major.' },
      // Klassik I – IV – V – I kadans
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 2, chordName: 'C Major', hint: 'Kadans: C Major (I).' },
      { notes: ['F4', 'A4', 'C5'], fingers: [1, 3, 5], duration: 2, chordName: 'F Major', hint: 'F Major (IV).' },
      { notes: ['G4', 'B4', 'D5'], fingers: [1, 3, 5], duration: 2, chordName: 'G Major', hint: 'G Major (V).' },
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 2, chordName: 'C Major', hint: 'C Major (I) ga yechish!' },
      // Ikkinchi ketma-ketlik
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 2, chordName: 'C Major', hint: 'Almashinuv: C Major.' },
      { notes: ['G4', 'B4', 'D5'], fingers: [1, 3, 5], duration: 2, chordName: 'G Major', hint: 'G Major.' },
      { notes: ['F4', 'A4', 'C5'], fingers: [1, 3, 5], duration: 2, chordName: 'F Major', hint: 'F Major.' },
      { notes: ['G4', 'B4', 'D5'], fingers: [1, 3, 5], duration: 2, chordName: 'G Major', hint: 'G Major — yakuniy taranglik!' },
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 3, chordName: 'C Major', hint: 'Barakalla! Yakuniy C Major.' }
    ]
  },
  {
    id: 'l4-2',
    level: 4,
    order: 2,
    title: 'Asosiy Minor uch tovushliklar (Am, Dm, Em)',
    subtitle: 'Ta’sirchan va lirik minor garmoniyasi',
    description:
      'Minor uch tovushlikda o‘rta nota (tersiya) major akkordga qaraganda yarim ton past bo‘ladi — shuning uchun Am, Dm va Em akkordlari chuqur, lirik kayfiyat beradi.',
    brief: {
      goal: 'Am (A-C-E), Dm (D-F-A) va Em (E-G-B) minor akkordlarini tez va aniq almashtirish.',
      fingers: 'O‘ng qo‘l: barcha uch tovushliklarda 1–3–5 barmoqlar',
      tip: 'Qo‘l shaklini o‘zgartirmay butun bilak bilan keyingi akkord ustiga ko‘ching — barmoqlaringiz avtomatik kerakli tugmalarga tushadi.'
    },
    bpm: 74,
    handMode: 'right',
    steps: [
      { notes: ['A4', 'C5', 'E5'], fingers: [1, 3, 5], duration: 2, chordName: 'A Minor (Am)', hint: 'A Minor: A4 + C5 + E5 ni bir vaqtda bosing.' },
      { notes: ['A4', 'C5', 'E5'], fingers: [1, 3, 5], duration: 2, chordName: 'A Minor (Am)', hint: 'Yana A Minor — yumshoq va lirik ohangni tinglang.' },
      { notes: ['D4', 'F4', 'A4'], fingers: [1, 3, 5], duration: 2, chordName: 'D Minor (Dm)', hint: 'D Minor: D4 + F4 + A4.' },
      { notes: ['D4', 'F4', 'A4'], fingers: [1, 3, 5], duration: 2, chordName: 'D Minor (Dm)', hint: 'Yana D Minor.' },
      { notes: ['E4', 'G4', 'B4'], fingers: [1, 3, 5], duration: 2, chordName: 'E Minor (Em)', hint: 'E Minor: E4 + G4 + B4.' },
      { notes: ['E4', 'G4', 'B4'], fingers: [1, 3, 5], duration: 2, chordName: 'E Minor (Em)', hint: 'Yana E Minor.' },
      // Minor kadanslar
      { notes: ['A4', 'C5', 'E5'], fingers: [1, 3, 5], duration: 2, chordName: 'A Minor (Am)', hint: 'Ketma-ketlik: Am.' },
      { notes: ['D4', 'F4', 'A4'], fingers: [1, 3, 5], duration: 2, chordName: 'D Minor (Dm)', hint: 'Dm.' },
      { notes: ['E4', 'G4', 'B4'], fingers: [1, 3, 5], duration: 2, chordName: 'E Minor (Em)', hint: 'Em.' },
      { notes: ['A4', 'C5', 'E5'], fingers: [1, 3, 5], duration: 2, chordName: 'A Minor (Am)', hint: 'Am ga qaytish.' },
      { notes: ['E4', 'G4', 'B4'], fingers: [1, 3, 5], duration: 2, chordName: 'E Minor (Em)', hint: 'Em.' },
      { notes: ['D4', 'F4', 'A4'], fingers: [1, 3, 5], duration: 2, chordName: 'D Minor (Dm)', hint: 'Dm.' },
      { notes: ['E4', 'G4', 'B4'], fingers: [1, 3, 5], duration: 2, chordName: 'E Minor (Em)', hint: 'Em.' },
      { notes: ['A4', 'C5', 'E5'], fingers: [1, 3, 5], duration: 3, chordName: 'A Minor (Am)', hint: 'Ajoyib! Minor uch tovushliklar o‘zlashtirildi.' }
    ]
  },
  {
    id: 'l4-3',
    level: 4,
    order: 3,
    title: 'Mashhur Pop akkord ketma-ketligi (C – G – Am – F)',
    subtitle: 'Yuzlab xit qo‘shiqlar asosi — I–V–vi–IV progressiyasi',
    description:
      'C – G – Am – F ketma-ketligi zamonaviy pop, rok va kino musiqasidagi eng mashhur 4 akkordli formuladir. Avval yarim notalar bilan, so‘ngra ritmik pulsatsiya bilan chaling.',
    brief: {
      goal: 'I–V–vi–IV (C – G – Am – F) progressiyasini to‘xtamasdan, ritmni saqlagan holda chalish.',
      fingers: 'O‘ng qo‘l: 1–3–5 barmoqlar bilan C, G, Am va F akkordlari',
      tip: 'G (G4-B4-D5) dan Am (A4-C5-E5) ga o‘tishda qo‘lingiz shunchaki bir oq tugma o‘ngga siljiydi!'
    },
    bpm: 84,
    handMode: 'right',
    steps: [
      // 1-sikl: Sokin yarim notalar (2 zarb)
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 2, chordName: 'C (I)', hint: '1-sikl: C Major (I).' },
      { notes: ['G4', 'B4', 'D5'], fingers: [1, 3, 5], duration: 2, chordName: 'G (V)', hint: 'G Major (V).' },
      { notes: ['A4', 'C5', 'E5'], fingers: [1, 3, 5], duration: 2, chordName: 'Am (vi)', hint: 'A Minor (vi) — G dan 1 tugma o‘ngga!' },
      { notes: ['F4', 'A4', 'C5'], fingers: [1, 3, 5], duration: 2, chordName: 'F (IV)', hint: 'F Major (IV).' },

      // 2-sikl: Ikki martadan urish (pop ritmi)
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 1, chordName: 'C (I)', hint: 'Pop ritmi: C (1-zarb).' },
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 1, chordName: 'C (I)', hint: 'C (2-zarb).' },
      { notes: ['G4', 'B4', 'D5'], fingers: [1, 3, 5], duration: 1, chordName: 'G (V)', hint: 'G (1-zarb).' },
      { notes: ['G4', 'B4', 'D5'], fingers: [1, 3, 5], duration: 1, chordName: 'G (V)', hint: 'G (2-zarb).' },
      { notes: ['A4', 'C5', 'E5'], fingers: [1, 3, 5], duration: 1, chordName: 'Am (vi)', hint: 'Am (1-zarb).' },
      { notes: ['A4', 'C5', 'E5'], fingers: [1, 3, 5], duration: 1, chordName: 'Am (vi)', hint: 'Am (2-zarb).' },
      { notes: ['F4', 'A4', 'C5'], fingers: [1, 3, 5], duration: 1, chordName: 'F (IV)', hint: 'F (1-zarb).' },
      { notes: ['F4', 'A4', 'C5'], fingers: [1, 3, 5], duration: 1, chordName: 'F (IV)', hint: 'F (2-zarb).' },

      // 3-sikl: Yakuniy kuchli progressiya
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 1, chordName: 'C (I)', hint: '3-sikl: C.' },
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 1, chordName: 'C (I)', hint: 'C.' },
      { notes: ['G4', 'B4', 'D5'], fingers: [1, 3, 5], duration: 1, chordName: 'G (V)', hint: 'G.' },
      { notes: ['G4', 'B4', 'D5'], fingers: [1, 3, 5], duration: 1, chordName: 'G (V)', hint: 'G.' },
      { notes: ['A4', 'C5', 'E5'], fingers: [1, 3, 5], duration: 1, chordName: 'Am (vi)', hint: 'Am.' },
      { notes: ['A4', 'C5', 'E5'], fingers: [1, 3, 5], duration: 1, chordName: 'Am (vi)', hint: 'Am.' },
      { notes: ['F4', 'A4', 'C5'], fingers: [1, 3, 5], duration: 1, chordName: 'F (IV)', hint: 'F.' },
      { notes: ['G4', 'B4', 'D5'], fingers: [1, 3, 5], duration: 1, chordName: 'G (V)', hint: 'Dominanta G bilan yakunga ko‘tarilamiz!' },
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 3, chordName: 'C Major', hint: 'Muhtasham! C Major bilan yakunlang.' }
    ]
  },
  {
    id: 'l4-4',
    level: 4,
    order: 4,
    title: 'Akkord aylanmalari (Inversions) va Arpedjio',
    subtitle: 'Minimal qo‘l harakati bilan professional ovoz ulanishi',
    description:
      'Professional pianistlar akkorddan akkordga uzoq sakramaydi — ular aylanmalardan (inversions) foydalanadi. Masalan, C4-E4-G4 dan C4-F4-A4 (F Major) ga o‘tishda 1-barmoq C4 da qoladi!',
    brief: {
      goal: 'C Majorning 3 xil ko‘rinishi, yaqin ovoz ulanishi (voice-leading) va sindirib chalish (arpedjio) texnikasini egallash.',
      fingers: 'Asosiy: 1-3-5 · 1-aylanma: 1-2-5 · 2-aylanma: 1-3-5',
      tip: 'Arpedjio qismida sustain pedalini (Space yoki Sustain tugmasi) yoqib ko‘ring — akkordlar go‘zal to‘lqin kabi yangraydi!'
    },
    bpm: 86,
    handMode: 'right',
    steps: [
      // 1-qism: C Major aylanmalari
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 2, chordName: 'C (Asosiy)', hint: 'Asosiy holat: C4 + E4 + G4 (1-3-5).' },
      { notes: ['E4', 'G4', 'C5'], fingers: [1, 2, 5], duration: 2, chordName: 'C (1-aylanma)', hint: '1-aylanma (sekstakkord): E4 + G4 + C5 (1-2-5).' },
      { notes: ['G4', 'C5', 'E5'], fingers: [1, 3, 5], duration: 2, chordName: 'C (2-aylanma)', hint: '2-aylanma (kvartsekstakkord): G4 + C5 + E5 (1-3-5).' },
      { notes: ['E4', 'G4', 'C5'], fingers: [1, 2, 5], duration: 2, chordName: 'C (1-aylanma)', hint: 'Qaytish: E4 + G4 + C5.' },
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 2, chordName: 'C (Asosiy)', hint: 'Asosiy holatga qaytish: C4 + E4 + G4.' },

      // 2-qism: Yaqin ovoz ulanishi (C -> F/C -> G/B -> C)
      { notes: ['C4', 'F4', 'A4'], fingers: [1, 3, 5], duration: 2, chordName: 'F (2-aylanma)', hint: 'F Major 2-aylanma: C4 joyida qoladi, faqat F4 va A4 ga ko‘taring!' },
      { notes: ['B3', 'D4', 'G4'], fingers: [1, 2, 5], duration: 2, chordName: 'G (1-aylanma)', hint: 'G Major 1-aylanma: B3 + D4 + G4 (1-2-5) — juda yaqin!' },
      { notes: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], duration: 2, chordName: 'C Major', hint: 'C4 + E4 + G4 ga yumshoq yechish!' },

      // 3-qism: Arpedjio (C – G – Am – F sindirib chalish)
      { notes: ['C4'], fingers: [1], duration: 0.5, hint: 'C Major arpedjio: C4' },
      { notes: ['E4'], fingers: [2], duration: 0.5, hint: 'E4' },
      { notes: ['G4'], fingers: [3], duration: 0.5, hint: 'G4' },
      { notes: ['C5'], fingers: [5], duration: 0.5, hint: 'C5' },
      { notes: ['G4'], fingers: [3], duration: 0.5, hint: 'G4' },
      { notes: ['E4'], fingers: [2], duration: 0.5, hint: 'E4' },

      { notes: ['B3'], fingers: [1], duration: 0.5, hint: 'G Major (1-aylanma) arpedjio: B3' },
      { notes: ['D4'], fingers: [2], duration: 0.5, hint: 'D4' },
      { notes: ['G4'], fingers: [3], duration: 0.5, hint: 'G4' },
      { notes: ['B4'], fingers: [5], duration: 0.5, hint: 'B4' },
      { notes: ['G4'], fingers: [3], duration: 0.5, hint: 'G4' },
      { notes: ['D4'], fingers: [2], duration: 0.5, hint: 'D4' },

      { notes: ['C4'], fingers: [1], duration: 0.5, hint: 'A Minor (1-aylanma) arpedjio: C4' },
      { notes: ['E4'], fingers: [2], duration: 0.5, hint: 'E4' },
      { notes: ['A4'], fingers: [4], duration: 0.5, hint: 'A4' },
      { notes: ['C5'], fingers: [5], duration: 0.5, hint: 'C5' },
      { notes: ['A4'], fingers: [4], duration: 0.5, hint: 'A4' },
      { notes: ['E4'], fingers: [2], duration: 0.5, hint: 'E4' },

      { notes: ['C4'], fingers: [1], duration: 0.5, hint: 'F Major (2-aylanma) arpedjio: C4' },
      { notes: ['F4'], fingers: [2], duration: 0.5, hint: 'F4' },
      { notes: ['A4'], fingers: [4], duration: 0.5, hint: 'A4' },
      { notes: ['C5'], fingers: [5], duration: 0.5, hint: 'C5' },
      { notes: ['A4'], fingers: [4], duration: 0.5, hint: 'A4' },
      { notes: ['F4'], fingers: [2], duration: 0.5, hint: 'F4' },

      { notes: ['C4', 'E4', 'G4', 'C5'], fingers: [1, 2, 3, 5], duration: 3, chordName: 'C Major (Oktavali)', hint: '4-bosqich yakuni! To‘liq 4 notali C Major akkordi!' }
    ]
  }
]
