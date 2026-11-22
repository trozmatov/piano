/**
 * 1-bosqich: Boshlang‘ich (Klaviaturani tanish va o‘ng qo‘l)
 * 5 ta to‘liq interaktiv dars: C4–G4 pozitsiyasi, gamma mashqi,
 * "Twinkle, Twinkle, Little Star", "Ode to Joy" va "Jingle Bells".
 */

export const LEVEL_1_LESSONS = [
  {
    id: 'l1-1',
    level: 1,
    order: 1,
    title: 'Markaziy Do (C4) va 5 barmoq pozitsiyasi',
    subtitle: 'O‘ng qo‘l uchun C4–G4 asosiy joylashuvi',
    description:
      'O‘ng qo‘lingiz bosh barmog‘ini (1) Markaziy Do (C4) tugmasiga, qolgan barmoqlarni esa ketma-ket D4, E4, F4 va G4 tugmalariga joylashtiring.',
    brief: {
      goal: 'Markaziy Do (C4) va dastlabki 5 ta oq tugmaning (Do, Re, Mi, Fa, Sol) o‘rnini ishonchli tanib olish.',
      fingers: 'O‘ng qo‘l: 1 → C4 (Do), 2 → D4 (Re), 3 → E4 (Mi), 4 → F4 (Fa), 5 → G4 (Sol)',
      tip: 'Klaviaturada 2 ta qora tugma guruhini toping — ularning chap tomonidagi birinchi oq tugma doimo Do (C) bo‘ladi.'
    },
    bpm: 72,
    handMode: 'right',
    steps: [
      { notes: ['C4'], fingers: [1], duration: 2, hint: 'Markaziy Do (C4) — 2 ta qora tugmadan chapdagi oq tugma. 1-barmoq bilan bosing.' },
      { notes: ['C4'], fingers: [1], duration: 1, hint: 'Yana C4 (Do) — qo‘l holatini mustahkamlang.' },
      { notes: ['D4'], fingers: [2], duration: 1.5, hint: 'D4 (Re) — 2 ta qora tugma o‘rtasida. 2-barmoq bilan bosing.' },
      { notes: ['E4'], fingers: [3], duration: 1.5, hint: 'E4 (Mi) — 2 ta qora tugmadan o‘ngda. 3-barmoq bilan bosing.' },
      { notes: ['F4'], fingers: [4], duration: 1.5, hint: 'F4 (Fa) — 3 ta qora tugmadan chapda. 4-barmoq bilan bosing.' },
      { notes: ['G4'], fingers: [5], duration: 2, hint: 'G4 (Sol) — 5-barmoq (jimjiloq) bilan bosing.' },
      { notes: ['C4'], fingers: [1], duration: 1, hint: 'Tekshiruv: 1-barmoq bilan C4 (Do) ni toping.' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi).' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: '5-barmoq — G4 (Sol).' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa).' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re).' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi).' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re).' },
      { notes: ['C4'], fingers: [1], duration: 2, hint: 'Barakalla! Yakuniy nota — Markaziy Do (C4).' }
    ]
  },
  {
    id: 'l1-2',
    level: 1,
    order: 2,
    title: 'Oq tugmalarda oddiy mashqlar',
    subtitle: 'Ko‘tarilish, tushish va barmoq sakramalari',
    description:
      'Besh barmoqni bir tekis harakatlantirishni mashq qiling: avval C4 dan G4 gacha ko‘tarilib tushing, so‘ngra bitta tugma tashlab (tersiya) chaling.',
    brief: {
      goal: 'Barcha 5 barmoqni mustaqil va bir xil kuch bilan boshqarish ko‘nikmasini shakllantirish.',
      fingers: 'O‘ng qo‘l: 1-2-3-4-5 ketma-ket ko‘tarilish va 5-4-3-2-1 qaytish',
      tip: 'Keyingi barmoq tugmani bosganda avvalgisini yumshoq qo‘yib yuboring — shunda tovushlar bir-biriga ravon (legato) ulanadi.'
    },
    bpm: 82,
    handMode: 'right',
    steps: [
      { notes: ['C4'], fingers: [1], duration: 1, hint: 'Yuqoriga ko‘tarilamiz: 1-barmoq — C4 (Do).' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re).' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi).' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa).' },
      { notes: ['G4'], fingers: [5], duration: 1.5, hint: '5-barmoq — G4 (Sol). Endi pastga tushamiz!' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa).' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi).' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re).' },
      { notes: ['C4'], fingers: [1], duration: 1.5, hint: '1-barmoq — C4 (Do). Endi tersiya sakramalari!' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'D4 ni tashlab, 3-barmoq — E4 (Mi).' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re).' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: 'E4 ni tashlab, 4-barmoq — F4 (Fa).' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi).' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: 'F4 ni tashlab, 5-barmoq — G4 (Sol).' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa).' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re).' },
      { notes: ['C4'], fingers: [1], duration: 1, hint: 'Sindirib chalish: 1-barmoq — C4 (Do).' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi).' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: '5-barmoq — G4 (Sol).' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi).' },
      { notes: ['C4'], fingers: [1], duration: 2, hint: 'Ajoyib yakun: 1-barmoq — C4 (Do)!' }
    ]
  },
  {
    id: 'l1-3',
    level: 1,
    order: 3,
    title: '"Twinkle, Twinkle, Little Star"',
    subtitle: 'Birinchi to‘liq mashhur kuy (C Major)',
    description:
      'Mashhur bolalar kuyini boshidan oxirigacha to‘liq ijro eting. Qo‘lni C4–G4 pozitsiyasida tuting, A4 notasi kelganda 5-barmoqni bir tugma o‘ngga cho‘zing.',
    brief: {
      goal: 'Uch qismli (A–B–A) to‘liq kuyni ritm va barmoq intizomi bilan ijro etish.',
      fingers: 'O‘ng qo‘l: C4(1), D4(2), E4(3), F4(4), G4(5) va A4 uchun 5-barmoq cho‘zilishi',
      tip: 'Har bir ibora oxiridagi 2 zarbli notani shoshilmasdan to‘liq ushlab turing.'
    },
    bpm: 88,
    handMode: 'right',
    steps: [
      // A1 qismi
      { notes: ['C4'], fingers: [1], duration: 1, hint: '1-ibora: Twin-kle (C4 — Do)' },
      { notes: ['C4'], fingers: [1], duration: 1, hint: 'Twin-kle (C4 — Do)' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: '5-barmoq bilan G4 (Sol) ga o‘ting' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: 'G4 (Sol)' },
      { notes: ['A4'], fingers: [5], duration: 1, hint: '5-barmoqni bir tugma o‘ngga — A4 (Lya) ga cho‘zing' },
      { notes: ['A4'], fingers: [5], duration: 1, hint: 'A4 (Lya)' },
      { notes: ['G4'], fingers: [5], duration: 2, hint: 'G4 (Sol) — 2 zarb cho‘zing' },

      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa)' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: 'F4 (Fa)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re)' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: 'D4 (Re)' },
      { notes: ['C4'], fingers: [1], duration: 2, hint: '1-barmoq — C4 (Do), 1-qism yakunlandi!' },

      // B qismi
      { notes: ['G4'], fingers: [5], duration: 1, hint: '2-qism: G4 (Sol) dan boshlaymiz' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: 'G4 (Sol)' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa)' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: 'F4 (Fa)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['D4'], fingers: [2], duration: 2, hint: '2-barmoq — D4 (Re) ni 2 zarb tuting' },

      { notes: ['G4'], fingers: [5], duration: 1, hint: 'Takror: G4 (Sol)' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: 'G4 (Sol)' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa)' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: 'F4 (Fa)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['D4'], fingers: [2], duration: 2, hint: '2-barmoq — D4 (Re)' },

      // A2 qismi (Yakun)
      { notes: ['C4'], fingers: [1], duration: 1, hint: 'Yakuniy qism: C4 (Do)' },
      { notes: ['C4'], fingers: [1], duration: 1, hint: 'C4 (Do)' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: '5-barmoq — G4 (Sol)' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: 'G4 (Sol)' },
      { notes: ['A4'], fingers: [5], duration: 1, hint: '5-barmoq — A4 (Lya)' },
      { notes: ['A4'], fingers: [5], duration: 1, hint: 'A4 (Lya)' },
      { notes: ['G4'], fingers: [5], duration: 2, hint: 'G4 (Sol)' },

      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa)' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: 'F4 (Fa)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re)' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: 'D4 (Re)' },
      { notes: ['C4'], fingers: [1], duration: 2.5, hint: 'Ajoyib! Yakuniy C4 (Do) bilan kuyni tugating.' }
    ]
  },
  {
    id: 'l1-4',
    level: 1,
    order: 4,
    title: 'Betxoven — "Ode to Joy"',
    subtitle: '9-simfoniyadan mashhur klassik mavzu (o‘ng qo‘l)',
    description:
      'Lyudvig van Betxovenning eng mashhur kuyi to‘liq besh barmoq (C4–G4) oralig‘ida chalinadi. Ibora oxiridagi nuqtali ritmga e’tibor bering.',
    brief: {
      goal: 'Klassik kuyning ravon frazalari va 1.5 + 0.5 zarbli ritmik burilishini to‘g‘ri chalish.',
      fingers: 'O‘ng qo‘l: C4(1), D4(2), E4(3), F4(4), G4(5) — qo‘lni joyidan siljitmasdan!',
      tip: 'Kuy 3-barmoq (E4) bilan boshlanadi. Qo‘lingizni bir tekis tuting va ritmni ichingizda sanang.'
    },
    bpm: 96,
    handMode: 'right',
    steps: [
      // 1-qism (4 takt)
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq bilan E4 (Mi) dan boshlang.' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa)' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: '5-barmoq — G4 (Sol)' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: 'G4 (Sol) dan pastga tushamiz' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi)' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re)' },
      { notes: ['C4'], fingers: [1], duration: 1, hint: '1-barmoq — C4 (Do)' },
      { notes: ['C4'], fingers: [1], duration: 1, hint: 'C4 (Do)' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 1.5, hint: 'E4 (Mi) — biroz cho‘zing (1.5 zarb)' },
      { notes: ['D4'], fingers: [2], duration: 0.5, hint: 'Tezkor o‘tish: D4 (Re)' },
      { notes: ['D4'], fingers: [2], duration: 2, hint: '1-qism yakuni: D4 (Re)' },

      // 2-qism (4 takt)
      { notes: ['E4'], fingers: [3], duration: 1, hint: '2-qism: yana E4 (Mi) dan boshlaymiz' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa)' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: '5-barmoq — G4 (Sol)' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: 'G4 (Sol)' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi)' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re)' },
      { notes: ['C4'], fingers: [1], duration: 1, hint: '1-barmoq — C4 (Do)' },
      { notes: ['C4'], fingers: [1], duration: 1, hint: 'C4 (Do)' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi)' },
      { notes: ['D4'], fingers: [2], duration: 1.5, hint: 'Yakuniy burilish: D4 (Re)' },
      { notes: ['C4'], fingers: [1], duration: 0.5, hint: 'Tezkor C4 (Do)' },
      { notes: ['C4'], fingers: [1], duration: 2.5, hint: 'Muhtasham yakun — C4 (Do)!' }
    ]
  },
  {
    id: 'l1-5',
    level: 1,
    order: 5,
    title: '"Jingle Bells" (To‘liq naqorat)',
    subtitle: 'Quvnoq va tezkor ritm mashqi (C4–G4)',
    description:
      'Boshlang‘ich bosqichning yakuniy kuyi! Barcha notalar C4–G4 besh barmoq pozitsiyasida joylashgan, lekin sakkiztalik (0.5) va butun (4) notalar bilan ritmni mustahkamlaysiz.',
    brief: {
      goal: '1-bosqich ko‘nikmalarini jonli, quvnoq va ritmik kuy orqali mustahkamlash.',
      fingers: 'O‘ng qo‘l: C4(1), D4(2), E4(3), F4(4), G4(5)',
      tip: 'Ketma-ket takrorlanadigan E4 va F4 notalarida bilakni qotirib qo‘ymang — yengil sakrab bosing.'
    },
    bpm: 108,
    handMode: 'right',
    steps: [
      // 1-4 taktlar
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'Jin-gle bells! (E4)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 2, hint: 'E4 (Mi — 2 zarb)' },

      { notes: ['E4'], fingers: [3], duration: 1, hint: 'Jin-gle bells! (E4)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 2, hint: 'E4 (Mi — 2 zarb)' },

      { notes: ['E4'], fingers: [3], duration: 1, hint: 'Jin-gle all the way: E4' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: '5-barmoq — G4 (Sol)' },
      { notes: ['C4'], fingers: [1], duration: 1.5, hint: '1-barmoq — C4 (Do)' },
      { notes: ['D4'], fingers: [2], duration: 0.5, hint: 'Tezkor D4 (Re)' },
      { notes: ['E4'], fingers: [3], duration: 4, hint: 'E4 (Mi) — to‘liq 4 zarb ushlab turing!' },

      // 5-8 taktlar
      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa)' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: 'F4 (Fa)' },
      { notes: ['F4'], fingers: [4], duration: 1.5, hint: 'F4 (Fa)' },
      { notes: ['F4'], fingers: [4], duration: 0.5, hint: 'Tezkor F4' },

      { notes: ['F4'], fingers: [4], duration: 1, hint: 'F4 (Fa)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 0.5, hint: 'Tezkor E4' },
      { notes: ['E4'], fingers: [3], duration: 0.5, hint: 'Tezkor E4' },

      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re)' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: 'D4 (Re)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4 (Mi)' },
      { notes: ['D4'], fingers: [2], duration: 2, hint: 'D4 (Re — 2 zarb)' },
      { notes: ['G4'], fingers: [5], duration: 2, hint: '5-barmoq — G4 (Sol — 2 zarb)!' },

      // 9-12 taktlar
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'Ikkinchi qism: E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 2, hint: 'E4 (Mi — 2 zarb)' },

      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 2, hint: 'E4 (Mi — 2 zarb)' },

      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: '5-barmoq — G4 (Sol)' },
      { notes: ['C4'], fingers: [1], duration: 1.5, hint: '1-barmoq — C4 (Do)' },
      { notes: ['D4'], fingers: [2], duration: 0.5, hint: 'Tezkor D4 (Re)' },
      { notes: ['E4'], fingers: [3], duration: 4, hint: 'E4 (Mi — 4 zarb)' },

      // 13-16 taktlar (Final)
      { notes: ['F4'], fingers: [4], duration: 1, hint: 'Finalga chiqamiz: F4 (Fa)' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: 'F4 (Fa)' },
      { notes: ['F4'], fingers: [4], duration: 1.5, hint: 'F4 (Fa)' },
      { notes: ['F4'], fingers: [4], duration: 0.5, hint: 'Tezkor F4' },

      { notes: ['F4'], fingers: [4], duration: 1, hint: 'F4 (Fa)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'E4 (Mi)' },
      { notes: ['E4'], fingers: [3], duration: 0.5, hint: 'Tezkor E4' },
      { notes: ['E4'], fingers: [3], duration: 0.5, hint: 'Tezkor E4' },

      { notes: ['G4'], fingers: [5], duration: 1, hint: '5-barmoq — G4 (Sol)' },
      { notes: ['G4'], fingers: [5], duration: 1, hint: 'G4 (Sol)' },
      { notes: ['F4'], fingers: [4], duration: 1, hint: '4-barmoq — F4 (Fa)' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4 (Re)' },
      { notes: ['C4'], fingers: [1], duration: 4, hint: '1-bosqich yakunlandi! Yakuniy C4 (Do)!' }
    ]
  }
]
