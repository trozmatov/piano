/**
 * 2-bosqich: Chap qo‘l va qora tugmalar (Diez va Bemol)
 * 5 ta to‘liq interaktiv dars: Chap qo‘l C3–G3, qora tugmalar (F#, Bb, C#),
 * nota cho‘zimlari va ritm mashqi, "Happy Birthday" (F Major) va ikki qo‘lga ilk qadam.
 */

export const LEVEL_2_LESSONS = [
  {
    id: 'l2-1',
    level: 2,
    order: 1,
    title: 'Chap qo‘l pozitsiyasi (C3–G3)',
    subtitle: 'Bas registrida 5-4-3-2-1 barmoqlar mashqi',
    description:
      'Chap qo‘lda barmoqlar o‘ng qo‘lning ko‘zgu aksidir: 5-barmoq (jimjiloq) C3 tugmasida, 1-barmoq (bosh barmoq) esa G3 tugmasida turadi.',
    brief: {
      goal: 'Chap qo‘lni C3–G3 oralig‘iga erkin joylashtirish va pastki bas notalarini aniq chalish.',
      fingers: 'Chap qo‘l: 5 → C3 (Do), 4 → D3 (Re), 3 → E3 (Mi), 2 → F3 (Fa), 1 → G3 (Sol)',
      tip: 'Kompyuter klaviaturasida chalayotgan bo‘lsangiz, pastki oktavaga (C3–F4) tushish uchun Z tugmasini bosing.'
    },
    bpm: 74,
    handMode: 'left',
    steps: [
      { notes: ['C3'], fingers: [5], duration: 2, hint: 'Chap qo‘l 5-barmoq (jimjiloq) — C3 (Do).' },
      { notes: ['D3'], fingers: [4], duration: 1.5, hint: '4-barmoq — D3 (Re).' },
      { notes: ['E3'], fingers: [3], duration: 1.5, hint: '3-barmoq — E3 (Mi).' },
      { notes: ['F3'], fingers: [2], duration: 1.5, hint: '2-barmoq — F3 (Fa).' },
      { notes: ['G3'], fingers: [1], duration: 2, hint: '1-barmoq (bosh barmoq) — G3 (Sol).' },
      { notes: ['F3'], fingers: [2], duration: 1, hint: 'Pastga qaytamiz: 2-barmoq — F3 (Fa).' },
      { notes: ['E3'], fingers: [3], duration: 1, hint: '3-barmoq — E3 (Mi).' },
      { notes: ['D3'], fingers: [4], duration: 1, hint: '4-barmoq — D3 (Re).' },
      { notes: ['C3'], fingers: [5], duration: 2, hint: '5-barmoq — C3 (Do). Endi bas sakramalari!' },
      { notes: ['G3'], fingers: [1], duration: 1, hint: 'Kvinta sakramasi: 1-barmoq — G3 (Sol).' },
      { notes: ['C3'], fingers: [5], duration: 1, hint: '5-barmoq — C3 (Do).' },
      { notes: ['E3'], fingers: [3], duration: 1, hint: '3-barmoq — E3 (Mi).' },
      { notes: ['G3'], fingers: [1], duration: 1, hint: '1-barmoq — G3 (Sol).' },
      { notes: ['F3'], fingers: [2], duration: 1, hint: '2-barmoq — F3 (Fa).' },
      { notes: ['D3'], fingers: [4], duration: 1, hint: '4-barmoq — D3 (Re).' },
      { notes: ['G3'], fingers: [1], duration: 1, hint: '1-barmoq — G3 (Sol).' },
      { notes: ['E3'], fingers: [3], duration: 1, hint: '3-barmoq — E3 (Mi).' },
      { notes: ['D3'], fingers: [4], duration: 1, hint: '4-barmoq — D3 (Re).' },
      { notes: ['C3'], fingers: [5], duration: 2, hint: 'Ajoyib! Chap qo‘l C3 da yakunlandi.' }
    ]
  },
  {
    id: 'l2-2',
    level: 2,
    order: 2,
    title: 'Qora tugmalarni tanish (F♯, B♭, C♯)',
    subtitle: 'Diez (♯ — yarim ton yuqori) va Bemol (♭ — yarim ton past)',
    description:
      'Qora tugmalar oq tugmalar orasidagi yarim tonlarni beradi: Diez (♯) notani o‘ngdagi qora tugmaga ko‘taradi, Bemol (♭) esa chapdagi qora tugmaga tushiradi.',
    brief: {
      goal: 'Eng ko‘p uchraydigan qora tugmalarni — F♯4, B♭4 va C♯4 ni bemalol topish va chalish.',
      fingers: 'O‘ng qo‘l: qora tugmalarni asosan uzun barmoqlar (2, 3, 4) bilan bosing',
      tip: 'Qora tugmaga o‘tganda qo‘lingizni biroz klaviatura ichkarisiga suring — barmoqni egib cho‘zishga hojat qolmaydi.'
    },
    bpm: 72,
    handMode: 'right',
    steps: [
      // F#4 ni tanish
      { notes: ['F4'], fingers: [2], duration: 1, hint: 'Avval oq F4 (Fa) tugmasini bosing.' },
      { notes: ['F#4'], fingers: [3], duration: 1.5, hint: 'F♯4 (Fa-diez) — F4 dan yarim ton o‘ngdagi qora tugma!' },
      { notes: ['G4'], fingers: [4], duration: 1.5, hint: 'G4 (Sol) ga yeching.' },
      { notes: ['F#4'], fingers: [3], duration: 1, hint: 'Yana F♯4 (Fa-diez).' },
      { notes: ['G4'], fingers: [4], duration: 2, hint: 'G4 (Sol) — 2 zarb.' },

      // Bb4 (A#4) ni tanish
      { notes: ['A4'], fingers: [3], duration: 1, hint: 'Endi B♭ (Si-bemol) ni o‘rganamiz: avval A4 (Lya).' },
      { notes: ['Bb4'], fingers: [4], duration: 1.5, hint: 'B♭4 (Si-bemol) — 3 ta qora tugmaning eng o‘ngdagisi (B4 dan yarim ton chapda)!' },
      { notes: ['A4'], fingers: [3], duration: 1, hint: 'A4 (Lya) ga qayting.' },
      { notes: ['G4'], fingers: [2], duration: 1, hint: 'G4 (Sol).' },
      { notes: ['F4'], fingers: [1], duration: 2, hint: 'F4 (Fa) — bu F Major ohangi!' },

      // C#4 ni tanish
      { notes: ['C4'], fingers: [1], duration: 1, hint: 'Endi C♯4 (Do-diez): avval Markaziy Do (C4).' },
      { notes: ['C#4'], fingers: [2], duration: 1.5, hint: 'C♯4 (Do-diez) — 2 ta qora tugmaning chapdagisi!' },
      { notes: ['D4'], fingers: [3], duration: 1.5, hint: 'D4 (Re) ga yeching.' },
      { notes: ['E4'], fingers: [4], duration: 1, hint: 'E4 (Mi).' },
      { notes: ['F#4'], fingers: [3], duration: 1, hint: 'Yana F♯4 (Fa-diez) — D Major ohangi!' },
      { notes: ['G4'], fingers: [4], duration: 1, hint: 'G4 (Sol).' },
      { notes: ['A4'], fingers: [5], duration: 1, hint: 'A4 (Lya).' },
      { notes: ['F#4'], fingers: [3], duration: 1, hint: 'F♯4 (Fa-diez).' },
      { notes: ['D4'], fingers: [1], duration: 2, hint: 'D4 (Re) — qora tugmalar bilan ajoyib tanishuv!' }
    ]
  },
  {
    id: 'l2-3',
    level: 2,
    order: 3,
    title: 'Nota cho‘zimlari va ritm mashqi',
    subtitle: 'Butun (4), yarim (2), chorak (1) va sakkiztalik (0.5) notalar',
    description:
      'Musiqada nota balandligi kabi uning davomiyligi ham muhim. Ushbu darsni avval Kutish rejimida, so‘ngra Ritm (Flow) rejimida metronom bilan sinab ko‘ring!',
    brief: {
      goal: 'Butun (4 zarb), yarim (2 zarb), chorak (1 zarb) va sakkiztalik (0.5 zarb) notalarni aniq sanash.',
      fingers: 'O‘ng qo‘l: C4(1), D4(2), E4(3), F4(4), G4(5)',
      tip: 'Ritm (Flow) rejimini yoqib, ichingizda "1-va-2-va-3-va-4-va" deb sanasangiz sakkiztalik notalar juda oson chiqadi.'
    },
    bpm: 80,
    handMode: 'right',
    steps: [
      // Butun nota (4 zarb)
      { notes: ['C4'], fingers: [1], duration: 4, hint: 'Butun nota (4 zarb): C4 ni bosib, 1-2-3-4 sanang.' },
      // Yarim notalar (2 + 2 zarb)
      { notes: ['E4'], fingers: [3], duration: 2, hint: 'Yarim nota (2 zarb): E4 — 1-2 sanang.' },
      { notes: ['G4'], fingers: [5], duration: 2, hint: 'Yarim nota (2 zarb): G4 — 3-4 sanang.' },
      // Chorak notalar (1 + 1 + 1 + 1)
      { notes: ['C4'], fingers: [1], duration: 1, hint: 'Chorak notalar (har biri 1 zarb): 1 — C4.' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2 — D4.' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3 — E4.' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: '4 — F4.' },
      { notes: ['G4'], fingers: [5], duration: 2, hint: 'Yarim nota (2 zarb): G4.' },
      { notes: ['E4'], fingers: [3], duration: 2, hint: 'Yarim nota (2 zarb): E4.' },

      // Sakkiztalik notalar (0.5 zarb)
      { notes: ['C4'], fingers: [1], duration: 0.5, hint: 'Sakkiztalik (0.5 zarb — ikki baravar tez): 1 (C4)' },
      { notes: ['D4'], fingers: [2], duration: 0.5, hint: 'va (D4)' },
      { notes: ['E4'], fingers: [3], duration: 0.5, hint: '2 (E4)' },
      { notes: ['F4'], fingers: [4], duration: 0.5, hint: 'va (F4)' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: '3 — G4 (chorak)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '4 — E4 (chorak)' },

      // Aralash ritmik ibora
      { notes: ['F4'], fingers: [4], duration: 0.5, hint: '1 (F4)' },
      { notes: ['E4'], fingers: [3], duration: 0.5, hint: 'va (E4)' },
      { notes: ['D4'], fingers: [2], duration: 0.5, hint: '2 (D4)' },
      { notes: ['E4'], fingers: [3], duration: 0.5, hint: 'va (E4)' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '3 — D4 (chorak)' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: '4 — G4 (chorak)' },
      { notes: ['C4'], fingers: [1], duration: 4, hint: 'Yakuniy butun nota (4 zarb): C4!' }
    ]
  },
  {
    id: 'l2-4',
    level: 2,
    order: 4,
    title: '"Happy Birthday" (F Major — B♭ bilan)',
    subtitle: 'Qora tugma (B♭4) ishtirokidagi mashhur kuy',
    description:
      'Dunyodagi eng mashhur tabrik kuyini haqiqiy F Major tonalligida chaling. Oxirgi qatorda B♭4 (Si-bemol) qora tugmasi kuyga iliq rang beradi.',
    brief: {
      goal: 'B♭4 qora tugmasi va C4–C5 oktava sakramasini haqiqiy kuy ichida to‘g‘ri chalish.',
      fingers: 'O‘ng qo‘l: C4(1), D4(2), E4(2), F4(3), G4(4), A4(3), B♭4(4), C5(5)',
      tip: 'Uchinchi qatorda C4 dan C5 ga oktava sakraganingizda 5-barmoqni bemalol oching, so‘ngra B♭4 ga 4-barmoq bilan tushing.'
    },
    bpm: 88,
    handMode: 'right',
    steps: [
      // 1-qator: Happy birthday to you
      { notes: ['C4'], fingers: [1], duration: 0.5, hint: 'Hap-py (C4 — 0.5 zarb)' },
      { notes: ['C4'], fingers: [1], duration: 0.5, hint: 'C4' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: 'birth- (D4)' },
      { notes: ['C4'], fingers: [1], duration: 1, hint: '-day (C4)' },
      { notes: ['F4'], fingers: [3], duration: 1, hint: 'to (F4)' },
      { notes: ['E4'], fingers: [2], duration: 2, hint: 'you! (E4 — 2 zarb)' },

      // 2-qator: Happy birthday to you
      { notes: ['C4'], fingers: [1], duration: 0.5, hint: '2-qator: Hap-py (C4)' },
      { notes: ['C4'], fingers: [1], duration: 0.5, hint: 'C4' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: 'birth- (D4)' },
      { notes: ['C4'], fingers: [1], duration: 1, hint: '-day (C4)' },
      { notes: ['G4'], fingers: [4], duration: 1, hint: 'to (G4 — 4-barmoq)' },
      { notes: ['F4'], fingers: [3], duration: 2, hint: 'you! (F4 — 2 zarb)' },

      // 3-qator: Happy birthday dear friend
      { notes: ['C4'], fingers: [1], duration: 0.5, hint: '3-qator: C4' },
      { notes: ['C4'], fingers: [1], duration: 0.5, hint: 'C4 — yuqori C5 ga tayyorlaning!' },
      { notes: ['C5'], fingers: [5], duration: 1, hint: 'Oktava sakramasi: 5-barmoq — C5!' },
      { notes: ['A4'], fingers: [3], duration: 1, hint: '3-barmoq — A4 (Lya)' },
      { notes: ['F4'], fingers: [2], duration: 1, hint: '2-barmoq — F4 (Fa)' },
      { notes: ['E4'], fingers: [2], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['D4'], fingers: [1], duration: 2, hint: 'D4 (Re — 2 zarb)' },

      // 4-qator: Happy birthday to you (Bb4 bilan!)
      { notes: ['Bb4'], fingers: [4], duration: 0.5, hint: 'Qora tugma: 4-barmoq — B♭4 (Si-bemol)!' },
      { notes: ['Bb4'], fingers: [4], duration: 0.5, hint: 'Yana B♭4!' },
      { notes: ['A4'], fingers: [3], duration: 1, hint: '3-barmoq — A4 (Lya)' },
      { notes: ['F4'], fingers: [2], duration: 1, hint: '2-barmoq — F4 (Fa)' },
      { notes: ['G4'], fingers: [3], duration: 1, hint: '3-barmoq — G4 (Sol)' },
      { notes: ['F4'], fingers: [2], duration: 3, hint: 'Tabriklaymiz! Yakuniy F4 (Fa)!' }
    ]
  },
  {
    id: 'l2-5',
    level: 2,
    order: 5,
    title: 'Ikki qo‘lga ilk qadam: Bas va Kuy',
    subtitle: 'Chap (binafsha) va o‘ng (ko‘k) qo‘lni birlashtirish',
    description:
      'Ikki qo‘l bilan chalishga tayyormisiz? Avval "Faqat o‘ng qo‘l" va "Faqat chap qo‘l" rejimlarida alohida mashq qilib, so‘ngra "Ikki qo‘l birga" rejimida birlashtiring!',
    brief: {
      goal: 'Chap qo‘l bas notalari (C3–G3) va o‘ng qo‘l kuyini (C4–G4) bir vaqtda uyg‘unlashtirish.',
      fingers: 'Chap qo‘l: C3(5), F3(2), G3(1) · O‘ng qo‘l: C4(1), D4(2), E4(3), F4(4), G4(5)',
      tip: 'Binafsha/sariq bloklar chap qo‘l, moviy/yashil bloklar o‘ng qo‘l uchun. Yuqoridagi "Qo‘l tanlash" tugmasi orqali alohida mashq qilishingiz mumkin!'
    },
    bpm: 72,
    handMode: 'both',
    steps: [
      {
        notes: { left: ['C3'], right: ['C4'] },
        fingers: { left: [5], right: [1] },
        duration: 2,
        hint: 'Birga bosing: Chap 5-barmoq (C3) + O‘ng 1-barmoq (C4).'
      },
      {
        notes: { left: [], right: ['D4'] },
        fingers: { left: [], right: [2] },
        duration: 1,
        hint: 'O‘ng qo‘l: D4 (2-barmoq).'
      },
      {
        notes: { left: [], right: ['E4'] },
        fingers: { left: [], right: [3] },
        duration: 1,
        hint: 'O‘ng qo‘l: E4 (3-barmoq).'
      },
      {
        notes: { left: ['F3'], right: ['F4'] },
        fingers: { left: [2], right: [4] },
        duration: 2,
        hint: 'Birga bosing: Chap 2-barmoq (F3) + O‘ng 4-barmoq (F4).'
      },
      {
        notes: { left: [], right: ['E4'] },
        fingers: { left: [], right: [3] },
        duration: 1,
        hint: 'O‘ng qo‘l: E4 (3-barmoq).'
      },
      {
        notes: { left: [], right: ['D4'] },
        fingers: { left: [], right: [2] },
        duration: 1,
        hint: 'O‘ng qo‘l: D4 (2-barmoq).'
      },
      {
        notes: { left: ['G3'], right: ['G4'] },
        fingers: { left: [1], right: [5] },
        duration: 2,
        hint: 'Birga bosing: Chap 1-barmoq (G3) + O‘ng 5-barmoq (G4).'
      },
      {
        notes: { left: [], right: ['F4'] },
        fingers: { left: [], right: [4] },
        duration: 1,
        hint: 'O‘ng qo‘l: F4 (4-barmoq).'
      },
      {
        notes: { left: [], right: ['E4'] },
        fingers: { left: [], right: [3] },
        duration: 1,
        hint: 'O‘ng qo‘l: E4 (3-barmoq).'
      },
      {
        notes: { left: ['C3'], right: ['E4', 'G4'] },
        fingers: { left: [5], right: [3, 5] },
        duration: 2,
        chordName: 'C Major (Ikki qo‘l)',
        hint: 'Uyg‘unlik! Chapda C3 (5), o‘ngda E4 + G4 (3 va 5) ni birga bosing.'
      },
      {
        notes: { left: ['G3'], right: ['D4', 'F4'] },
        fingers: { left: [1], right: [2, 4] },
        duration: 2,
        chordName: 'G7 (Soddalashtirilgan)',
        hint: 'Chapda G3 (1), o‘ngda D4 + F4 (2 va 4) ni birga bosing.'
      },
      {
        notes: { left: ['C3'], right: ['C4', 'E4'] },
        fingers: { left: [5], right: [1, 3] },
        duration: 3,
        chordName: 'C Major',
        hint: 'Ajoyib! Chapda C3 (5) va o‘ngda C4 + E4 (1 va 3) bilan 2-bosqichni tugating!'
      }
    ]
  }
]
