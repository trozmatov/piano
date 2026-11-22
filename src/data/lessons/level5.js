/**
 * 5-bosqich: Ikki qo‘l koordinatsiyasi (Hand Independence)
 * 4 ta to‘liq ikki qo‘lli dars: "Ode to Joy" (Bas + Kuy), Pop ballada akkord + kuy ("Let It Be" uslubi),
 * Alberti basi (C-G-E-G) va o‘ng qo‘l uyg‘unligi, hamda Ikki qo‘lda sinxron gamma.
 */

export const LEVEL_5_LESSONS = [
  {
    id: 'l5-1',
    level: 5,
    order: 1,
    title: 'Betxoven — "Ode to Joy" (Ikki qo‘lda)',
    subtitle: 'Chap qo‘lda kuchli bas tayanch + o‘ng qo‘lda to‘liq kuy',
    description:
      'Tanish "Ode to Joy" kuyini endi to‘liq ikki qo‘lda ijro eting! Chap qo‘l har bir takt boshida garmonik bas notasini beradi, o‘ng qo‘l esa ravon kuy chaladi.',
    brief: {
      goal: 'Chap qo‘l va o‘ng qo‘lni bir vaqtda aniq tushirish hamda qo‘llar mustaqilligini rivojlantirish.',
      fingers: 'Chap qo‘l: C3(5), F3(2), G3(1) · O‘ng qo‘l: C4(1)–G4(5)',
      tip: 'Agar ikki qo‘l birga qiyin tuyulsa, avval "Faqat chap qo‘l" rejimida bas chizig‘ini 1 marta o‘tib oling!'
    },
    bpm: 88,
    handMode: 'both',
    steps: [
      // 1-satr (1–4 takt)
      { notes: { left: ['C3'], right: ['E4'] }, fingers: { left: [5], right: [3] }, duration: 1, hint: 'Birga: Chap C3 (5) + O‘ng E4 (3).' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [3] }, duration: 1, hint: 'O‘ng: E4.' },
      { notes: { left: [], right: ['F4'] }, fingers: { left: [], right: [4] }, duration: 1, hint: 'O‘ng: F4.' },
      { notes: { left: [], right: ['G4'] }, fingers: { left: [], right: [5] }, duration: 1, hint: 'O‘ng: G4.' },

      { notes: { left: ['G3'], right: ['G4'] }, fingers: { left: [1], right: [5] }, duration: 1, hint: 'Birga: Chap G3 (1) + O‘ng G4 (5).' },
      { notes: { left: [], right: ['F4'] }, fingers: { left: [], right: [4] }, duration: 1, hint: 'O‘ng: F4.' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [3] }, duration: 1, hint: 'O‘ng: E4.' },
      { notes: { left: [], right: ['D4'] }, fingers: { left: [], right: [2] }, duration: 1, hint: 'O‘ng: D4.' },

      { notes: { left: ['C3'], right: ['C4'] }, fingers: { left: [5], right: [1] }, duration: 1, hint: 'Birga: Chap C3 (5) + O‘ng C4 (1).' },
      { notes: { left: [], right: ['C4'] }, fingers: { left: [], right: [1] }, duration: 1, hint: 'O‘ng: C4.' },
      { notes: { left: ['G3'], right: ['D4'] }, fingers: { left: [1], right: [2] }, duration: 1, hint: 'Birga: Chap G3 (1) + O‘ng D4 (2).' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [3] }, duration: 1, hint: 'O‘ng: E4.' },

      { notes: { left: ['C3'], right: ['E4'] }, fingers: { left: [5], right: [3] }, duration: 1.5, hint: 'Birga: Chap C3 + O‘ng E4 (1.5 zarb).' },
      { notes: { left: ['G3'], right: ['D4'] }, fingers: { left: [1], right: [2] }, duration: 0.5, hint: 'Tezkor: Chap G3 + O‘ng D4.' },
      { notes: { left: ['G3'], right: ['D4'] }, fingers: { left: [1], right: [2] }, duration: 2, hint: '1-qism yakuni: G3 + D4 (2 zarb).' },

      // 2-satr (5–8 takt)
      { notes: { left: ['C3'], right: ['E4'] }, fingers: { left: [5], right: [3] }, duration: 1, hint: '2-qism: Chap C3 + O‘ng E4.' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [3] }, duration: 1, hint: 'O‘ng: E4.' },
      { notes: { left: [], right: ['F4'] }, fingers: { left: [], right: [4] }, duration: 1, hint: 'O‘ng: F4.' },
      { notes: { left: [], right: ['G4'] }, fingers: { left: [], right: [5] }, duration: 1, hint: 'O‘ng: G4.' },

      { notes: { left: ['G3'], right: ['G4'] }, fingers: { left: [1], right: [5] }, duration: 1, hint: 'Birga: Chap G3 + O‘ng G4.' },
      { notes: { left: [], right: ['F4'] }, fingers: { left: [], right: [4] }, duration: 1, hint: 'O‘ng: F4.' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [3] }, duration: 1, hint: 'O‘ng: E4.' },
      { notes: { left: [], right: ['D4'] }, fingers: { left: [], right: [2] }, duration: 1, hint: 'O‘ng: D4.' },

      { notes: { left: ['C3'], right: ['C4'] }, fingers: { left: [5], right: [1] }, duration: 1, hint: 'Birga: Chap C3 + O‘ng C4.' },
      { notes: { left: [], right: ['C4'] }, fingers: { left: [], right: [1] }, duration: 1, hint: 'O‘ng: C4.' },
      { notes: { left: ['F3'], right: ['D4'] }, fingers: { left: [2], right: [2] }, duration: 1, hint: 'Yangi bas! Chap F3 (2) + O‘ng D4 (2).' },
      { notes: { left: ['C3'], right: ['E4'] }, fingers: { left: [5], right: [3] }, duration: 1, hint: 'Chap C3 + O‘ng E4.' },

      { notes: { left: ['G3'], right: ['D4'] }, fingers: { left: [1], right: [2] }, duration: 1.5, hint: 'Finalga chiqish: G3 + D4.' },
      { notes: { left: ['G3'], right: ['C4'] }, fingers: { left: [1], right: [1] }, duration: 0.5, hint: 'Tezkor: G3 + C4.' },
      { notes: { left: ['C3', 'G3'], right: ['C4'] }, fingers: { left: [5, 1], right: [1] }, duration: 3, chordName: 'C5 + C4', hint: 'Muhtasham yakun! Chap C3+G3 va O‘ng C4!' }
    ]
  },
  {
    id: 'l5-2',
    level: 5,
    order: 2,
    title: 'Pop Ballada: Chap qo‘l akkord + O‘ng qo‘l kuy',
    subtitle: '"Let It Be" uslubidagi C – G – Am – F ikki qo‘lli motiv',
    description:
      'Chap qo‘lda to‘liq akkordlar (C – G – Am – F aylanmalari) bilan garmoniya yaratib, o‘ng qo‘lda kuylovchi lirik melodiya ijro etishni o‘rganing.',
    brief: {
      goal: 'Chap qo‘l akkord jo‘rligi va o‘ng qo‘l melodiyasini bir vaqtda muvozanatli chalish.',
      fingers: 'Chap qo‘l: C(C3-E3-G3), G(D3-G3-B3), Am(C3-E3-A3), F(C3-F3-A3) · O‘ng qo‘l: C4–A4',
      tip: 'Chap qo‘l akkordlarini o‘ng qo‘l melodiyasidan biroz yumshoqroq bosing — shunda kuy tiniq ajralib turadi.'
    },
    bpm: 76,
    handMode: 'both',
    steps: [
      // C Major takti
      { notes: { left: ['C3', 'E3', 'G3'], right: ['G4'] }, fingers: { left: [5, 3, 1], right: [3] }, duration: 1, chordName: 'C', hint: 'Chapda C akkordi + O‘ngda G4.' },
      { notes: { left: [], right: ['G4'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'O‘ng: G4' },
      { notes: { left: [], right: ['G4'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'O‘ng: G4' },
      { notes: { left: ['C3', 'E3', 'G3'], right: ['A4'] }, fingers: { left: [5, 3, 1], right: [4] }, duration: 1, chordName: 'C', hint: 'Chapda C + O‘ngda A4.' },
      { notes: { left: [], right: ['E4'] }, fingers: { left: [], right: [1] }, duration: 1, hint: 'O‘ng: E4' },

      // G Major takti
      { notes: { left: ['D3', 'G3', 'B3'], right: ['G4'] }, fingers: { left: [5, 2, 1], right: [3] }, duration: 1, chordName: 'G/D', hint: 'Chapda G (D3-G3-B3) + O‘ngda G4.' },
      { notes: { left: [], right: ['G4'] }, fingers: { left: [], right: [3] }, duration: 1, hint: 'O‘ng: G4' },
      { notes: { left: ['D3', 'G3', 'B3'], right: ['C5'] }, fingers: { left: [5, 2, 1], right: [5] }, duration: 1, chordName: 'G/D', hint: 'Chapda G + O‘ngda C5.' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [5] }, duration: 1, hint: 'O‘ng: D5' },

      // Am takti
      { notes: { left: ['C3', 'E3', 'A3'], right: ['E5'] }, fingers: { left: [5, 3, 1], right: [5] }, duration: 1, chordName: 'Am/C', hint: 'Chapda Am (C3-E3-A3) + O‘ngda E5.' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'O‘ng: E5' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 0.5, hint: 'O‘ng: E5' },
      { notes: { left: ['C3', 'E3', 'A3'], right: ['D5'] }, fingers: { left: [5, 3, 1], right: [4] }, duration: 1, chordName: 'Am/C', hint: 'Chapda Am + O‘ngda D5.' },
      { notes: { left: [], right: ['C5'] }, fingers: { left: [], right: [3] }, duration: 1, hint: 'O‘ng: C5' },

      // F Major takti
      { notes: { left: ['C3', 'F3', 'A3'], right: ['C5'] }, fingers: { left: [5, 2, 1], right: [3] }, duration: 1.5, chordName: 'F/C', hint: 'Chapda F (C3-F3-A3) + O‘ngda C5.' },
      { notes: { left: [], right: ['A4'] }, fingers: { left: [], right: [1] }, duration: 0.5, hint: 'O‘ng: A4' },
      { notes: { left: ['C3', 'F3', 'A3'], right: ['A4'] }, fingers: { left: [5, 2, 1], right: [1] }, duration: 2, chordName: 'F/C', hint: 'Chapda F + O‘ngda A4 (2 zarb).' },

      // Yakuniy ibora: C -> G -> F -> C
      { notes: { left: ['C3', 'E3', 'G3'], right: ['E5'] }, fingers: { left: [5, 3, 1], right: [5] }, duration: 1, chordName: 'C', hint: 'Yakuniy ibora: C + E5.' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [5] }, duration: 1, hint: 'O‘ng: E5' },
      { notes: { left: ['D3', 'G3', 'B3'], right: ['F5'] }, fingers: { left: [5, 2, 1], right: [5] }, duration: 1, chordName: 'G/D', hint: 'G + F5.' },
      { notes: { left: [], right: ['E5'] }, fingers: { left: [], right: [4] }, duration: 0.5, hint: 'O‘ng: E5' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [3] }, duration: 0.5, hint: 'O‘ng: D5' },

      { notes: { left: ['C3', 'F3', 'A3'], right: ['E5'] }, fingers: { left: [5, 2, 1], right: [4] }, duration: 1, chordName: 'F/C', hint: 'F + E5.' },
      { notes: { left: [], right: ['D5'] }, fingers: { left: [], right: [3] }, duration: 1, hint: 'O‘ng: D5' },
      { notes: { left: ['C3', 'E3', 'G3'], right: ['C5'] }, fingers: { left: [5, 3, 1], right: [2] }, duration: 3, chordName: 'C Major', hint: 'Yurakdan chiqadigan yakun: Chap C + O‘ng C5!' }
    ]
  },
  {
    id: 'l5-3',
    level: 5,
    order: 3,
    title: 'Alberti basi (C–G–E–G) va o‘ng qo‘l uyg‘unligi',
    subtitle: 'Motsart va Klementi klassik sonatalarining asosiy uslubi',
    description:
      'Alberti basi — chap qo‘lda akkord notalarini “pastki – yuqori – o‘rta – yuqori” (C3–G3–E3–G3) tartibida tezkor to‘lqin qilib chalish uslubidir.',
    brief: {
      goal: 'Chap qo‘l uzluksiz sakkiztalik Alberti to‘lqinini chalayotganda o‘ng qo‘lda mustaqil melodiya olib borish.',
      fingers: 'Chap qo‘l: C3(5)-G3(1)-E3(3)-G3(1), C3(5)-A3(1)-F3(2)-A3(1), D3(4)-G3(1)-F3(2)-G3(1)',
      tip: 'Chap qo‘lingizni avval "Faqat chap qo‘l" rejimida avtomatizm darajasiga yetkazing, keyin o‘ng qo‘lni qo‘shing!'
    },
    bpm: 84,
    handMode: 'both',
    steps: [
      // 1-takt: C Major Alberti (C3-G3-E3-G3) + O‘ng E4 -> G4
      { notes: { left: ['C3'], right: ['E4'] }, fingers: { left: [5], right: [1] }, duration: 0.5, hint: '1-takt (C): Chap C3 + O‘ng E4.' },
      { notes: { left: ['G3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: G3 (1)' },
      { notes: { left: ['E3'], right: [] }, fingers: { left: [3], right: [] }, duration: 0.5, hint: 'Chap: E3 (3)' },
      { notes: { left: ['G3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: G3 (1)' },

      { notes: { left: ['C3'], right: ['G4'] }, fingers: { left: [5], right: [3] }, duration: 0.5, hint: 'Chap C3 + O‘ng G4.' },
      { notes: { left: ['G3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: G3' },
      { notes: { left: ['E3'], right: [] }, fingers: { left: [3], right: [] }, duration: 0.5, hint: 'Chap: E3' },
      { notes: { left: ['G3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: G3' },

      // 2-takt: C Major + O‘ng C5 -> B4
      { notes: { left: ['C3'], right: ['C5'] }, fingers: { left: [5], right: [5] }, duration: 0.5, hint: '2-takt: Chap C3 + O‘ng C5.' },
      { notes: { left: ['G3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: G3' },
      { notes: { left: ['E3'], right: [] }, fingers: { left: [3], right: [] }, duration: 0.5, hint: 'Chap: E3' },
      { notes: { left: ['G3'], right: ['B4'] }, fingers: { left: [1], right: [4] }, duration: 0.5, hint: 'Chap G3 + O‘ng B4.' },

      // 3-takt: F Major Alberti (C3-A3-F3-A3) + O‘ng A4 -> F4
      { notes: { left: ['C3'], right: ['A4'] }, fingers: { left: [5], right: [3] }, duration: 0.5, hint: '3-takt (F): Chap C3 + O‘ng A4.' },
      { notes: { left: ['A3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: A3 (1)' },
      { notes: { left: ['F3'], right: [] }, fingers: { left: [2], right: [] }, duration: 0.5, hint: 'Chap: F3 (2)' },
      { notes: { left: ['A3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: A3 (1)' },

      { notes: { left: ['C3'], right: ['F4'] }, fingers: { left: [5], right: [1] }, duration: 0.5, hint: 'Chap C3 + O‘ng F4.' },
      { notes: { left: ['A3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: A3' },
      { notes: { left: ['F3'], right: [] }, fingers: { left: [2], right: [] }, duration: 0.5, hint: 'Chap: F3' },
      { notes: { left: ['A3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: A3' },

      // 4-takt: G7 Alberti (D3-G3-F3-G3) + O‘ng G4 -> D4 -> F4
      { notes: { left: ['D3'], right: ['G4'] }, fingers: { left: [4], right: [3] }, duration: 0.5, hint: '4-takt (G7): Chap D3 + O‘ng G4.' },
      { notes: { left: ['G3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: G3' },
      { notes: { left: ['F3'], right: [] }, fingers: { left: [2], right: [] }, duration: 0.5, hint: 'Chap: F3' },
      { notes: { left: ['G3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: G3' },

      { notes: { left: ['D3'], right: ['F4'] }, fingers: { left: [4], right: [2] }, duration: 0.5, hint: 'Chap D3 + O‘ng F4.' },
      { notes: { left: ['G3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: G3' },
      { notes: { left: ['F3'], right: ['D4'] }, fingers: { left: [2], right: [1] }, duration: 0.5, hint: 'Chap F3 + O‘ng D4.' },
      { notes: { left: ['G3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: G3' },

      // 5-takt: C Major Alberti yakuniy kadans
      { notes: { left: ['C3'], right: ['E4'] }, fingers: { left: [5], right: [2] }, duration: 0.5, hint: 'Yakuniy takt: Chap C3 + O‘ng E4.' },
      { notes: { left: ['G3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: G3' },
      { notes: { left: ['E3'], right: ['G4'] }, fingers: { left: [3], right: [3] }, duration: 0.5, hint: 'Chap E3 + O‘ng G4.' },
      { notes: { left: ['G3'], right: [] }, fingers: { left: [1], right: [] }, duration: 0.5, hint: 'Chap: G3' },
      { notes: { left: ['C3', 'E3', 'G3'], right: ['C5'] }, fingers: { left: [5, 3, 1], right: [5] }, duration: 3, chordName: 'C Major', hint: 'Klassik Motsart uslubidagi ajoyib yakun!' }
    ]
  },
  {
    id: 'l5-4',
    level: 5,
    order: 4,
    title: 'Ikki qo‘lda sinxron C Major gammasi',
    subtitle: 'Parallel harakat: Chap C3–C4 + O‘ng C5–C6',
    description:
      'Ikki qo‘lda bir vaqtda gamma chalishda barmoq almashtirish joylari turlicha bo‘ladi: o‘ng qo‘l F notada, chap qo‘l esa A notada buriladi!',
    brief: {
      goal: 'Chap (5-4-3-2-1-3-2-1) va O‘ng (1-2-3-1-2-3-4-5) qo‘llarni bir xil ritmda mukammal sinxronlashtirish.',
      fingers: 'Chap: 5-4-3-2-1-3-2-1 · O‘ng: 1-2-3-1-2-3-4-5 (3-barmoqlar doimo E va A da uchrashadi!)',
      tip: 'Muhim qoida: E va A notalarida ikkala qo‘lingizda ham 3-barmoqlar bir vaqtda tushadi — shu ikki nuqta sizga tayanch bo‘ladi!'
    },
    bpm: 80,
    handMode: 'both',
    steps: [
      // 1-o‘tish: Chorak notalar (1 zarb)
      { notes: { left: ['C3'], right: ['C5'] }, fingers: { left: [5], right: [1] }, duration: 1, hint: 'Boshladik! Chap 5 (C3) + O‘ng 1 (C5).' },
      { notes: { left: ['D3'], right: ['D5'] }, fingers: { left: [4], right: [2] }, duration: 1, hint: 'Chap 4 (D3) + O‘ng 2 (D5).' },
      { notes: { left: ['E3'], right: ['E5'] }, fingers: { left: [3], right: [3] }, duration: 1, hint: 'Tayanch nuqta! Ikkala qo‘lda 3-barmoq (E).' },
      { notes: { left: ['F3'], right: ['F5'] }, fingers: { left: [2], right: [1] }, duration: 1, hint: 'O‘ng qo‘l ostidan 1-barmoq (F5), Chap 2 (F3)!' },
      { notes: { left: ['G3'], right: ['G5'] }, fingers: { left: [1], right: [2] }, duration: 1, hint: 'Chap 1 (G3) + O‘ng 2 (G5).' },
      { notes: { left: ['A3'], right: ['A5'] }, fingers: { left: [3], right: [3] }, duration: 1, hint: 'Chap qo‘l ustidan 3-barmoq (A3) + O‘ng 3 (A5)!' },
      { notes: { left: ['B3'], right: ['B5'] }, fingers: { left: [2], right: [4] }, duration: 1, hint: 'Chap 2 (B3) + O‘ng 4 (B5).' },
      { notes: { left: ['C4'], right: ['C6'] }, fingers: { left: [1], right: [5] }, duration: 1.5, hint: 'Cho‘qqi! Chap 1 (C4) + O‘ng 5 (C6).' },

      // Pastga tushish (chorak)
      { notes: { left: ['B3'], right: ['B5'] }, fingers: { left: [2], right: [4] }, duration: 1, hint: 'Pastga: Chap 2 + O‘ng 4.' },
      { notes: { left: ['A3'], right: ['A5'] }, fingers: { left: [3], right: [3] }, duration: 1, hint: 'Ikkala qo‘lda 3-barmoq (A).' },
      { notes: { left: ['G3'], right: ['G5'] }, fingers: { left: [1], right: [2] }, duration: 1, hint: 'Chap ostidan 1 (G3) + O‘ng 2 (G5)!' },
      { notes: { left: ['F3'], right: ['F5'] }, fingers: { left: [2], right: [1] }, duration: 1, hint: 'Chap 2 (F3) + O‘ng 1 (F5).' },
      { notes: { left: ['E3'], right: ['E5'] }, fingers: { left: [3], right: [3] }, duration: 1, hint: 'O‘ng ustidan 3 (E5) + Chap 3 (E3)!' },
      { notes: { left: ['D3'], right: ['D5'] }, fingers: { left: [4], right: [2] }, duration: 1, hint: 'Chap 4 + O‘ng 2.' },
      { notes: { left: ['C3'], right: ['C5'] }, fingers: { left: [5], right: [1] }, duration: 2, hint: 'Ajoyib! Endi sakkiztalik tezlikda!' },

      // 2-o‘tish: Sakkiztalik (0.5 zarb)
      { notes: { left: ['C3'], right: ['C5'] }, fingers: { left: [5], right: [1] }, duration: 0.5, hint: 'Tezkor gamma: C' },
      { notes: { left: ['D3'], right: ['D5'] }, fingers: { left: [4], right: [2] }, duration: 0.5, hint: 'D' },
      { notes: { left: ['E3'], right: ['E5'] }, fingers: { left: [3], right: [3] }, duration: 0.5, hint: 'E (3+3)' },
      { notes: { left: ['F3'], right: ['F5'] }, fingers: { left: [2], right: [1] }, duration: 0.5, hint: 'F (o‘ng 1)' },
      { notes: { left: ['G3'], right: ['G5'] }, fingers: { left: [1], right: [2] }, duration: 0.5, hint: 'G' },
      { notes: { left: ['A3'], right: ['A5'] }, fingers: { left: [3], right: [3] }, duration: 0.5, hint: 'A (chap 3)' },
      { notes: { left: ['B3'], right: ['B5'] }, fingers: { left: [2], right: [4] }, duration: 0.5, hint: 'B' },
      { notes: { left: ['C4'], right: ['C6'] }, fingers: { left: [1], right: [5] }, duration: 0.5, hint: 'C cho‘qqi' },
      { notes: { left: ['B3'], right: ['B5'] }, fingers: { left: [2], right: [4] }, duration: 0.5, hint: 'B' },
      { notes: { left: ['A3'], right: ['A5'] }, fingers: { left: [3], right: [3] }, duration: 0.5, hint: 'A (3+3)' },
      { notes: { left: ['G3'], right: ['G5'] }, fingers: { left: [1], right: [2] }, duration: 0.5, hint: 'G (chap 1)' },
      { notes: { left: ['F3'], right: ['F5'] }, fingers: { left: [2], right: [1] }, duration: 0.5, hint: 'F' },
      { notes: { left: ['E3'], right: ['E5'] }, fingers: { left: [3], right: [3] }, duration: 0.5, hint: 'E (o‘ng 3)' },
      { notes: { left: ['D3'], right: ['D5'] }, fingers: { left: [4], right: [2] }, duration: 0.5, hint: 'D' },
      { notes: { left: ['C3', 'G3'], right: ['C5', 'E5', 'G5'] }, fingers: { left: [5, 1], right: [1, 3, 5] }, duration: 3, chordName: 'C Major (To‘liq)', hint: '5-bosqich yakunlandi! Endi Pro repertuarga tayyorsiz!' }
    ]
  }
]
