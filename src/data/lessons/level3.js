/**
 * 3-bosqich: Gammalar va barmoq texnikasi
 * 4 ta to‘liq dars: Thumb-under texnikasi, C Major 1-oktava gammasi,
 * G Major (F♯) va A Minor gammalari, hamda Hanon №1 barmoq chiniqtirish mashqi.
 */

export const LEVEL_3_LESSONS = [
  {
    id: 'l3-1',
    level: 3,
    order: 1,
    title: 'Bosh barmoqni ostidan o‘tkazish (Thumb-under)',
    subtitle: '1-2-3 → 1-2-3-4-5 uzluksiz barmoq almashtirish texnikasi',
    description:
      'Besh barmoq bilan 8 notalik gammani uzluksiz chalish uchun 3-barmoq (E4) dan keyin 1-barmoqni (bosh barmoqni) kaft ostidan F4 tugmasiga o‘tkazing.',
    brief: {
      goal: 'Yuqoriga chiqishda 3 → 1 (bosh barmoq ostidan) va pastga tushishda 1 → 3 (o‘rta barmoq ustidan) silliq o‘tishni o‘zlashtirish.',
      fingers: 'O‘ng qo‘l: C4(1) D4(2) E4(3) → F4(1) G4(2) A4(3) B4(4) C5(5)',
      tip: 'E4 ni 3-barmoq bilan bosayotganingizdayoq bosh barmog‘ingizni F4 tomon yaqinlashtirib turing — tirsakni ko‘tarib yubormang!'
    },
    bpm: 76,
    handMode: 'right',
    steps: [
      // 1-mashq: qisqa 3->1->3 burilish
      { notes: ['C4'], fingers: [1], duration: 1, hint: 'Boshlang‘ich holat: 1-barmoq — C4.' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4.' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4. Bosh barmoqni ostidan tayyorlang!' },
      { notes: ['F4'], fingers: [1], duration: 1.5, hint: 'THUMB-UNDER! 1-barmoqni 3-barmoq ostidan F4 ga o‘tkazing.' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoqni 1-barmoq ustidan E4 ga qaytaring.' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4.' },
      { notes: ['C4'], fingers: [1], duration: 1.5, hint: '1-barmoq — C4. Endi G4 gacha kengaytiramiz!' },

      // 2-mashq: G4 va A4 gacha kengaytirish
      { notes: ['C4'], fingers: [1], duration: 1, hint: '1-barmoq — C4.' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4.' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3-barmoq — E4.' },
      { notes: ['F4'], fingers: [1], duration: 1, hint: 'Ostidan 1-barmoq — F4!' },
      { notes: ['G4'], fingers: [2], duration: 1, hint: '2-barmoq — G4.' },
      { notes: ['A4'], fingers: [3], duration: 1.5, hint: '3-barmoq — A4. Pastga qaytamiz!' },
      { notes: ['G4'], fingers: [2], duration: 1, hint: '2-barmoq — G4.' },
      { notes: ['F4'], fingers: [1], duration: 1, hint: '1-barmoq — F4.' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'Ustidan 3-barmoq — E4!' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2-barmoq — D4.' },
      { notes: ['C4'], fingers: [1], duration: 1.5, hint: '1-barmoq — C4. Endi to‘liq C5 gacha!' },

      // 3-mashq: To‘liq 1-2-3-1-2-3-4-5 o‘tish
      { notes: ['C4'], fingers: [1], duration: 1, hint: '1 — C4' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2 — D4' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3 — E4' },
      { notes: ['F4'], fingers: [1], duration: 1, hint: 'Ostidan 1 — F4!' },
      { notes: ['G4'], fingers: [2], duration: 1, hint: '2 — G4' },
      { notes: ['A4'], fingers: [3], duration: 1, hint: '3 — A4' },
      { notes: ['B4'], fingers: [4], duration: 1, hint: '4 — B4' },
      { notes: ['C5'], fingers: [5], duration: 1.5, hint: '5 — C5 (cho‘qqi!)' },
      { notes: ['B4'], fingers: [4], duration: 1, hint: '4 — B4' },
      { notes: ['A4'], fingers: [3], duration: 1, hint: '3 — A4' },
      { notes: ['G4'], fingers: [2], duration: 1, hint: '2 — G4' },
      { notes: ['F4'], fingers: [1], duration: 1, hint: '1 — F4' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: 'Ustidan 3 — E4!' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2 — D4' },
      { notes: ['C4'], fingers: [1], duration: 2, hint: 'Ajoyib! Thumb-under muvaffaqiyatli o‘zlashtirildi.' }
    ]
  },
  {
    id: 'l3-2',
    level: 3,
    order: 2,
    title: 'To‘liq C Major (Do major) gammasi',
    subtitle: '1 oktava yuqoriga, pastga va C Major arpedjiosi',
    description:
      'C Major gammasi barcha oq tugmalardan iborat. Avval chorak (1 zarb), so‘ngra sakkiztalik (0.5 zarb) tezlikda ravon chaling va arpedjio bilan yakunlang.',
    brief: {
      goal: 'C Major gammasini bir tekis tovush va tezlikda chalish hamda 1-oktava arpedjio texnikasini egallash.',
      fingers: 'Gamma: 1-2-3-1-2-3-4-5 · Arpedjio: C4(1) E4(2) G4(3) C5(5)',
      tip: 'Sakkiztalik (tezkor) qismda bosh barmoq burilishida tovush balandligi sakrab ketmasin — barcha notalar bir xil yumshoq eshitilsin.'
    },
    bpm: 88,
    handMode: 'right',
    steps: [
      // 1-o‘tish: Chorak notalar (1 zarb)
      { notes: ['C4'], fingers: [1], duration: 1, hint: '1-o‘tish (ravon chorak): 1 — C4' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2 — D4' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3 — E4' },
      { notes: ['F4'], fingers: [1], duration: 1, hint: '1 (ostidan) — F4' },
      { notes: ['G4'], fingers: [2], duration: 1, hint: '2 — G4' },
      { notes: ['A4'], fingers: [3], duration: 1, hint: '3 — A4' },
      { notes: ['B4'], fingers: [4], duration: 1, hint: '4 — B4' },
      { notes: ['C5'], fingers: [5], duration: 1, hint: '5 — C5' },
      { notes: ['B4'], fingers: [4], duration: 1, hint: '4 — B4' },
      { notes: ['A4'], fingers: [3], duration: 1, hint: '3 — A4' },
      { notes: ['G4'], fingers: [2], duration: 1, hint: '2 — G4' },
      { notes: ['F4'], fingers: [1], duration: 1, hint: '1 — F4' },
      { notes: ['E4'], fingers: [3], duration: 1, hint: '3 (ustidan) — E4' },
      { notes: ['D4'], fingers: [2], duration: 1, hint: '2 — D4' },
      { notes: ['C4'], fingers: [1], duration: 2, hint: '1 — C4. Endi tezroq (sakkiztalik)!' },

      // 2-o‘tish: Sakkiztalik notalar (0.5 zarb)
      { notes: ['C4'], fingers: [1], duration: 0.5, hint: 'Tezkor gamma: 1 — C4' },
      { notes: ['D4'], fingers: [2], duration: 0.5, hint: '2 — D4' },
      { notes: ['E4'], fingers: [3], duration: 0.5, hint: '3 — E4' },
      { notes: ['F4'], fingers: [1], duration: 0.5, hint: '1 — F4' },
      { notes: ['G4'], fingers: [2], duration: 0.5, hint: '2 — G4' },
      { notes: ['A4'], fingers: [3], duration: 0.5, hint: '3 — A4' },
      { notes: ['B4'], fingers: [4], duration: 0.5, hint: '4 — B4' },
      { notes: ['C5'], fingers: [5], duration: 0.5, hint: '5 — C5' },
      { notes: ['B4'], fingers: [4], duration: 0.5, hint: '4 — B4' },
      { notes: ['A4'], fingers: [3], duration: 0.5, hint: '3 — A4' },
      { notes: ['G4'], fingers: [2], duration: 0.5, hint: '2 — G4' },
      { notes: ['F4'], fingers: [1], duration: 0.5, hint: '1 — F4' },
      { notes: ['E4'], fingers: [3], duration: 0.5, hint: '3 — E4' },
      { notes: ['D4'], fingers: [2], duration: 0.5, hint: '2 — D4' },
      { notes: ['C4'], fingers: [1], duration: 1.5, hint: 'Endi C Major arpedjio!' },

      // C Major arpedjio yakuni
      { notes: ['C4'], fingers: [1], duration: 0.5, hint: 'Arpedjio: 1 — C4' },
      { notes: ['E4'], fingers: [2], duration: 0.5, hint: '2 — E4' },
      { notes: ['G4'], fingers: [3], duration: 0.5, hint: '3 — G4' },
      { notes: ['C5'], fingers: [5], duration: 1, hint: '5 — C5' },
      { notes: ['G4'], fingers: [3], duration: 0.5, hint: '3 — G4' },
      { notes: ['E4'], fingers: [2], duration: 0.5, hint: '2 — E4' },
      { notes: ['C4'], fingers: [1], duration: 2, hint: 'Ajoyib! To‘liq C Major gammasi yakunlandi.' }
    ]
  },
  {
    id: 'l3-3',
    level: 3,
    order: 3,
    title: 'G Major (F♯ bilan) va A Minor gammalari',
    subtitle: 'Yorqin major (1 diez) va lirik natural minor gammasini solishtirish',
    description:
      'G Major gammasida bitta qora tugma — F♯ (Fa-diez) ishtirok etadi. A Minor (Lya minor) esa C Majorning parallel minori bo‘lib, faqat oq tugmalardan tuzilgan.',
    brief: {
      goal: 'G Major (F♯5 bilan) va A Natural Minor (A4–A5) gammalarini to‘g‘ri 1-2-3-1-2-3-4-5 barmoq tartibida chalish.',
      fingers: 'Ikkala gammada ham: 1-2-3-1-2-3-4-5 (yuqoriga) va 5-4-3-2-1-3-2-1 (pastga)',
      tip: 'G Major da 4-barmoq F♯5 qora tugmasiga aniq tushishi uchun qo‘lni biroz yuqoriroqda tuting.'
    },
    bpm: 84,
    handMode: 'right',
    steps: [
      // G Major gammasi (G4 – G5, F#5 bilan)
      { notes: ['G4'], fingers: [1], duration: 1, hint: 'G Major boshlanadi: 1 — G4' },
      { notes: ['A4'], fingers: [2], duration: 1, hint: '2 — A4' },
      { notes: ['B4'], fingers: [3], duration: 1, hint: '3 — B4' },
      { notes: ['C5'], fingers: [1], duration: 1, hint: 'Ostidan 1 — C5!' },
      { notes: ['D5'], fingers: [2], duration: 1, hint: '2 — D5' },
      { notes: ['E5'], fingers: [3], duration: 1, hint: '3 — E5' },
      { notes: ['F#5'], fingers: [4], duration: 1, hint: 'Diqqat! Qora tugma: 4 — F♯5 (Fa-diez)!' },
      { notes: ['G5'], fingers: [5], duration: 1.5, hint: '5 — G5 (cho‘qqi!)' },
      { notes: ['F#5'], fingers: [4], duration: 1, hint: 'Pastga: 4 — F♯5 (qora tugma)' },
      { notes: ['E5'], fingers: [3], duration: 1, hint: '3 — E5' },
      { notes: ['D5'], fingers: [2], duration: 1, hint: '2 — D5' },
      { notes: ['C5'], fingers: [1], duration: 1, hint: '1 — C5' },
      { notes: ['B4'], fingers: [3], duration: 1, hint: 'Ustidan 3 — B4!' },
      { notes: ['A4'], fingers: [2], duration: 1, hint: '2 — A4' },
      { notes: ['G4'], fingers: [1], duration: 2, hint: 'G Major tugadi! Endi A Minor (Lya minor).' },

      // A Natural Minor gammasi (A4 – A5)
      { notes: ['A4'], fingers: [1], duration: 1, hint: 'A Minor (lirik ohang): 1 — A4' },
      { notes: ['B4'], fingers: [2], duration: 1, hint: '2 — B4' },
      { notes: ['C5'], fingers: [3], duration: 1, hint: '3 — C5' },
      { notes: ['D5'], fingers: [1], duration: 1, hint: 'Ostidan 1 — D5!' },
      { notes: ['E5'], fingers: [2], duration: 1, hint: '2 — E5' },
      { notes: ['F5'], fingers: [3], duration: 1, hint: '3 — F5' },
      { notes: ['G5'], fingers: [4], duration: 1, hint: '4 — G5' },
      { notes: ['A5'], fingers: [5], duration: 1.5, hint: '5 — A5 (cho‘qqi!)' },
      { notes: ['G5'], fingers: [4], duration: 1, hint: 'Pastga: 4 — G5' },
      { notes: ['F5'], fingers: [3], duration: 1, hint: '3 — F5' },
      { notes: ['E5'], fingers: [2], duration: 1, hint: '2 — E5' },
      { notes: ['D5'], fingers: [1], duration: 1, hint: '1 — D5' },
      { notes: ['C5'], fingers: [3], duration: 1, hint: 'Ustidan 3 — C5!' },
      { notes: ['B4'], fingers: [2], duration: 1, hint: '2 — B4' },
      { notes: ['A4'], fingers: [1], duration: 2, hint: 'Barakalla! Major va Minor farqini his qildingiz.' }
    ]
  },
  {
    id: 'l3-4',
    level: 3,
    order: 4,
    title: 'Hanon №1 — Barmoq chiniqtirish mashqi',
    subtitle: 'Dunyo pianistlarining klassik tezlik va kuch mashqi',
    description:
      'Sharl-Lui Ganonning mashhur 1-mashqi zaif 4- va 5-barmoqlarni chiniqtiradi. Yuqoriga chiqishda 1-2 barmoqlar orasida bitta oq tugma tashlanadi, pastga tushishda esa 5-4 barmoqlar orasida.',
    brief: {
      goal: 'Barcha besh barmoqning, ayniqsa 4- va 5-barmoqning mustaqilligi va tezkorligini oshirish.',
      fingers: 'Ko‘tarilish: 1-2-3-4-5-4-3-2 · Tushish: 5-4-3-2-1-2-3-4',
      tip: 'Avval sekin (72–80 BPM) aniq va bir tekis chaling, qo‘l erkinlashgach tezlikni asta-sekin 100+ BPM ga oshiring.'
    },
    bpm: 90,
    handMode: 'right',
    steps: [
      // Ko‘tarilish: 1-takt (C4 dan)
      { notes: ['C4'], fingers: [1], duration: 0.5, hint: '1-takt (C4): 1-barmoq, so‘ng D4 ni tashlab E4 ga!' },
      { notes: ['E4'], fingers: [2], duration: 0.5, hint: '2 — E4' },
      { notes: ['F4'], fingers: [3], duration: 0.5, hint: '3 — F4' },
      { notes: ['G4'], fingers: [4], duration: 0.5, hint: '4 — G4' },
      { notes: ['A4'], fingers: [5], duration: 0.5, hint: '5 — A4' },
      { notes: ['G4'], fingers: [4], duration: 0.5, hint: '4 — G4' },
      { notes: ['F4'], fingers: [3], duration: 0.5, hint: '3 — F4' },
      { notes: ['E4'], fingers: [2], duration: 0.5, hint: '2 — E4' },

      // 2-takt (D4 dan)
      { notes: ['D4'], fingers: [1], duration: 0.5, hint: '2-takt (D4): 1 — D4, E4 ni tashlab F4 ga!' },
      { notes: ['F4'], fingers: [2], duration: 0.5, hint: '2 — F4' },
      { notes: ['G4'], fingers: [3], duration: 0.5, hint: '3 — G4' },
      { notes: ['A4'], fingers: [4], duration: 0.5, hint: '4 — A4' },
      { notes: ['B4'], fingers: [5], duration: 0.5, hint: '5 — B4' },
      { notes: ['A4'], fingers: [4], duration: 0.5, hint: '4 — A4' },
      { notes: ['G4'], fingers: [3], duration: 0.5, hint: '3 — G4' },
      { notes: ['F4'], fingers: [2], duration: 0.5, hint: '2 — F4' },

      // 3-takt (E4 dan)
      { notes: ['E4'], fingers: [1], duration: 0.5, hint: '3-takt (E4): 1 — E4' },
      { notes: ['G4'], fingers: [2], duration: 0.5, hint: '2 — G4' },
      { notes: ['A4'], fingers: [3], duration: 0.5, hint: '3 — A4' },
      { notes: ['B4'], fingers: [4], duration: 0.5, hint: '4 — B4' },
      { notes: ['C5'], fingers: [5], duration: 0.5, hint: '5 — C5' },
      { notes: ['B4'], fingers: [4], duration: 0.5, hint: '4 — B4' },
      { notes: ['A4'], fingers: [3], duration: 0.5, hint: '3 — A4' },
      { notes: ['G4'], fingers: [2], duration: 0.5, hint: '2 — G4' },

      // 4-takt (F4 dan)
      { notes: ['F4'], fingers: [1], duration: 0.5, hint: '4-takt (F4): 1 — F4' },
      { notes: ['A4'], fingers: [2], duration: 0.5, hint: '2 — A4' },
      { notes: ['B4'], fingers: [3], duration: 0.5, hint: '3 — B4' },
      { notes: ['C5'], fingers: [4], duration: 0.5, hint: '4 — C5' },
      { notes: ['D5'], fingers: [5], duration: 0.5, hint: '5 — D5' },
      { notes: ['C5'], fingers: [4], duration: 0.5, hint: '4 — C5' },
      { notes: ['B4'], fingers: [3], duration: 0.5, hint: '3 — B4' },
      { notes: ['A4'], fingers: [2], duration: 0.5, hint: '2 — A4' },

      // Tushish: 5-takt (C5 dan pastga)
      { notes: ['C5'], fingers: [5], duration: 0.5, hint: 'Pastga tushamiz (C5): 5 — C5, B4 ni tashlab A4 ga!' },
      { notes: ['A4'], fingers: [4], duration: 0.5, hint: '4 — A4' },
      { notes: ['G4'], fingers: [3], duration: 0.5, hint: '3 — G4' },
      { notes: ['F4'], fingers: [2], duration: 0.5, hint: '2 — F4' },
      { notes: ['E4'], fingers: [1], duration: 0.5, hint: '1 — E4' },
      { notes: ['F4'], fingers: [2], duration: 0.5, hint: '2 — F4' },
      { notes: ['G4'], fingers: [3], duration: 0.5, hint: '3 — G4' },
      { notes: ['A4'], fingers: [4], duration: 0.5, hint: '4 — A4' },

      // 6-takt (B4 dan pastga)
      { notes: ['B4'], fingers: [5], duration: 0.5, hint: '6-takt (B4): 5 — B4' },
      { notes: ['G4'], fingers: [4], duration: 0.5, hint: '4 — G4' },
      { notes: ['F4'], fingers: [3], duration: 0.5, hint: '3 — F4' },
      { notes: ['E4'], fingers: [2], duration: 0.5, hint: '2 — E4' },
      { notes: ['D4'], fingers: [1], duration: 0.5, hint: '1 — D4' },
      { notes: ['E4'], fingers: [2], duration: 0.5, hint: '2 — E4' },
      { notes: ['F4'], fingers: [3], duration: 0.5, hint: '3 — F4' },
      { notes: ['G4'], fingers: [4], duration: 0.5, hint: '4 — G4' },

      // 7-takt (A4 dan pastga)
      { notes: ['A4'], fingers: [5], duration: 0.5, hint: '7-takt (A4): 5 — A4' },
      { notes: ['F4'], fingers: [4], duration: 0.5, hint: '4 — F4' },
      { notes: ['E4'], fingers: [3], duration: 0.5, hint: '3 — E4' },
      { notes: ['D4'], fingers: [2], duration: 0.5, hint: '2 — D4' },
      { notes: ['C4'], fingers: [1], duration: 0.5, hint: '1 — C4' },
      { notes: ['D4'], fingers: [2], duration: 0.5, hint: '2 — D4' },
      { notes: ['E4'], fingers: [3], duration: 0.5, hint: '3 — E4' },
      { notes: ['F4'], fingers: [4], duration: 0.5, hint: '4 — F4' },

      // 8-takt (G4 dan pastga va C4 da yakun)
      { notes: ['G4'], fingers: [5], duration: 0.5, hint: '8-takt (G4): 5 — G4' },
      { notes: ['E4'], fingers: [4], duration: 0.5, hint: '4 — E4' },
      { notes: ['D4'], fingers: [3], duration: 0.5, hint: '3 — D4' },
      { notes: ['C4'], fingers: [2], duration: 0.5, hint: '2 — C4' },
      { notes: ['B3'], fingers: [1], duration: 0.5, hint: '1 — B3' },
      { notes: ['C4'], fingers: [2], duration: 0.5, hint: '2 — C4' },
      { notes: ['D4'], fingers: [3], duration: 0.5, hint: '3 — D4' },
      { notes: ['E4'], fingers: [4], duration: 0.5, hint: '4 — E4' },
      { notes: ['C4'], fingers: [1], duration: 2, hint: '3-bosqich tugadi! Barmoq texnikangiz yangi darajaga chiqdi!' }
    ]
  }
]
