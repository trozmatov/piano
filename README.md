# 🎹 Pianino Studio — Noldan Progacha Interaktiv Pianino O‘rgatuvchi

**Vue 3 + Vite + Tailwind CSS + Tone.js** asosida yaratilgan, noldan professional darajagacha (Zero to Pro) bosqichma-bosqich pianino chalishni o‘rgatuvchi interaktiv veb-ilova.

## Asosiy imkoniyatlar

- **Realistik ovoz dvigateli (`Tone.js`):** Salamander Grand Piano sempllari + tezkor `PolySynth` zaxirasi, 4 zarbli Metronom, Sustain pedali va Namuna (Demo) ijro.
- **3 xil kiritish usuli:**
  - Sichqoncha va ko‘p barmoqli **Multi-Touch** (telefon va planshetlar uchun `Pointer Events`).
  - Kompyuter klaviaturasi (`A–'` oq tugmalar, `W–P` qora tugmalar, `Z / X` oktava, `Space` sustain).
  - **Web MIDI API** — haqiqiy MIDI klaviaturani avtomatik aniqlash (`velocity` va sustain pedal `CC 64`).
- **6 bosqichli "Noldan Progacha" kurs (27 ta to‘liq dars):**
  1. **1-bosqich:** Boshlang‘ich (C4–G4, *Twinkle, Twinkle*, *Ode to Joy*, *Jingle Bells*)
  2. **2-bosqich:** Chap qo‘l va qora tugmalar (C3–G3, Diez/Bemol, ritm, *Happy Birthday* F Major)
  3. **3-bosqich:** Gammalar va barmoq texnikasi (*Thumb-under*, C/G Major, A Minor, *Hanon №1*)
  4. **4-bosqich:** Akkordlar va garmoniya (Major/Minor triads, `C–G–Am–F`, aylanmalar va arpedjio)
  5. **5-bosqich:** Ikki qo‘l koordinatsiyasi (*Ode to Joy* 2 qo‘lda, Pop ballada, Alberti basi, sinxron gamma)
  6. **6-bosqich:** Pro repertuar (Jaz septakkordlar, *Für Elise*, *Canon in D*, *River Flows in You*, *Moonlight Sonata*)
- **Pro o‘qitish mexanikalari:**
  - **Kutish rejimi (Wait Mode)** va **Ritm rejimi (Flow Mode — Timing Accuracy)**.
  - **Ikki qo‘l rangli ajratish** (Chap: binafsha/to‘q sariq, O‘ng: ko‘k/yashil) va **Practice Hand Selector** (`Faqat o‘ng`, `Faqat chap`, `Ikki qo‘l`).
  - **Lesson Brief**, **6 bosqichli Kurs Xaritasi** va `localStorage` orqali natijalarni saqlash.
- **Laptop, Planshet va Telefon optimizatsiyasi:** `100dvh`, Compact HUD, Fullscreen API, Smart Auto-Scroll va gorizontal rejim ogohlantirishi.

## Ishga tushirish

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```
