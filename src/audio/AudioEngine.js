import * as Tone from 'tone'
import { reactive } from 'vue'

/**
 * Salamander Grand Piano sempllari (C3–C6 oralig‘i uchun optimal 15 ta tayanch sempl).
 * Kichik hajm (~400 KB) tufayli tez yuklanadi, lekin yuklanguncha yoki oflayn holatda
 * sifatli PolySynth avtomatik zaxira (fallback) sifatida uzluksiz ishlaydi.
 */
const SALAMANDER_URLS = {
  A2: 'A2.mp3',
  C3: 'C3.mp3',
  'D#3': 'Ds3.mp3',
  'F#3': 'Fs3.mp3',
  A3: 'A3.mp3',
  C4: 'C4.mp3',
  'D#4': 'Ds4.mp3',
  'F#4': 'Fs4.mp3',
  A4: 'A4.mp3',
  C5: 'C5.mp3',
  'D#5': 'Ds5.mp3',
  'F#5': 'Fs5.mp3',
  A5: 'A5.mp3',
  C6: 'C6.mp3',
  'D#6': 'Ds6.mp3'
}

const SALAMANDER_BASE_URL = 'https://tonejs.github.io/audio/salamander/'

class AudioEngine {
  constructor() {
    this.state = reactive({
      ready: false,
      samplerLoaded: false,
      samplerLoading: false,
      samplerError: false,
      engineLabel: 'PolySynth (Tayyor)',
      volume: 0.85,
      muted: false,
      sustainPedal: false,
      metronomeEnabled: false,
      bpm: 80,
      currentBeat: 0
    })

    this.masterGain = null
    this.compressor = null
    this.reverb = null
    this.sampler = null
    this.fallbackSynth = null
    this.metronomeHigh = null
    this.metronomeLow = null
    this.metronomeLoop = null

    this.initialized = false
    this.contextListenerAttached = false
    this.heldNotes = new Set()
    this.sustainedNotes = new Set()
    this.demoTimers = []
    this.demoRunning = false
  }

  /**
   * Audio tugunlarini bir marta yaratadi.
   * Brauzerning (xususan iOS Safari / Android Chrome) Autoplay siyosatini buzmaslik
   * uchun Tone.start() faqat foydalanuvchi teginishi / bosishi paytida chaqiriladi.
   */
  setupNodes() {
    if (this.initialized) return
    this.initialized = true

    const ctx = Tone.getContext()
    if (ctx && typeof ctx.lookAhead === 'number') {
      ctx.lookAhead = 0.01
    }

    this.attachContextStateListeners()

    this.masterGain = new Tone.Gain(this.state.muted ? 0 : this.state.volume).toDestination()
    this.compressor = new Tone.Compressor({
      threshold: -14,
      ratio: 3,
      attack: 0.005,
      release: 0.15
    }).connect(this.masterGain)

    this.reverb = new Tone.Reverb({
      decay: 1.8,
      preDelay: 0.01,
      wet: 0.16
    }).connect(this.compressor)

    // Zaxira sifatli akustik tusli PolySynth (darhol ovoz chiqaradi)
    this.fallbackSynth = new Tone.PolySynth(Tone.Synth, {
      maxPolyphony: 24,
      oscillator: {
        type: 'triangle4'
      },
      envelope: {
        attack: 0.004,
        decay: 1.15,
        sustain: 0.16,
        release: 1.35
      }
    }).connect(this.reverb)
    this.fallbackSynth.volume.value = -4

    // Metronom zarblari (1-zarb baland, 2-3-4-zarblar yumshoq)
    this.metronomeHigh = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.045, sustain: 0, release: 0.02 }
    }).connect(this.masterGain)
    this.metronomeHigh.volume.value = -6

    this.metronomeLow = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.038, sustain: 0, release: 0.02 }
    }).connect(this.masterGain)
    this.metronomeLow.volume.value = -10

    // Salamander Grand Piano semplarini fonda yuklash
    this.loadSalamanderSampler()
  }

  /**
   * iOS Safari fon rejimiga o‘tib qaytganda AudioContext 'interrupted' yoki 'suspended'
   * holatiga tushishini kuzatib, UI dagi "Ovozni yoqish" indikatorini sinxronlashtiradi.
   */
  attachContextStateListeners() {
    if (this.contextListenerAttached) return
    this.contextListenerAttached = true

    const syncReady = () => {
      const ctx = Tone.getContext()
      const raw = ctx?.rawContext
      const running = ctx?.state === 'running' && (!raw || raw.state === 'running')
      this.state.ready = running
    }

    const rawCtx = Tone.getContext()?.rawContext
    if (rawCtx && typeof rawCtx.addEventListener === 'function') {
      rawCtx.addEventListener('statechange', syncReady)
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          syncReady()
        }
      })
    }
  }

  loadSalamanderSampler() {
    if (this.state.samplerLoading || this.state.samplerLoaded) return
    this.state.samplerLoading = true
    this.state.samplerError = false

    try {
      this.sampler = new Tone.Sampler({
        urls: SALAMANDER_URLS,
        baseUrl: SALAMANDER_BASE_URL,
        release: 1.4,
        onload: () => {
          this.state.samplerLoaded = true
          this.state.samplerLoading = false
          this.state.engineLabel = 'Salamander Grand Piano'
        },
        onerror: () => {
          this.state.samplerLoading = false
          this.state.samplerError = true
          this.state.engineLabel = 'PolySynth (Oflayn)'
        }
      }).connect(this.reverb)
      this.sampler.volume.value = -1
    } catch {
      this.state.samplerLoading = false
      this.state.samplerError = true
      this.state.engineLabel = 'PolySynth'
    }
  }

  /**
   * Mobil va desktop brauzerlar uchun AudioContext ni xavfsiz faollashtirish.
   * Ham Tone.start(), ham ichki rawContext.resume() chaqiriladi (iOS Safari barqarorligi uchun).
   */
  async ensureStarted() {
    this.setupNodes()
    const ctx = Tone.getContext()
    const raw = ctx?.rawContext

    try {
      if (ctx.state !== 'running') {
        await Tone.start()
      }
      if (raw && raw.state !== 'running' && typeof raw.resume === 'function') {
        await raw.resume()
      }
    } catch {
      this.state.ready = false
      return false
    }

    const isRunning = ctx.state === 'running' && (!raw || raw.state === 'running')
    this.state.ready = isRunning
    return isRunning
  }

  getActiveInstrument() {
    if (this.state.samplerLoaded && this.sampler) {
      return this.sampler
    }
    return this.fallbackSynth
  }

  /**
   * Notani kechikishsiz (immediate) chalish.
   * Agar mobil brauzerda AudioContext birinchi teginishda hali 'suspended' bo‘lsa,
   * darhol uyg‘otib, o‘sha birinchi bosilgan notaning o‘zini ham ovozli chaladi.
   */
  playNote(note, velocity = 0.85) {
    if (!this.initialized) {
      this.setupNodes()
    }

    const triggerNow = () => {
      const inst = this.getActiveInstrument()
      if (!inst) return
      this.heldNotes.add(note)
      this.sustainedNotes.delete(note)
      try {
        inst.triggerAttack(note, Tone.immediate(), Math.max(0.12, Math.min(1, velocity)))
      } catch {
        // Tezkor qayta bosishda yuzaga kelishi mumkin bo‘lgan xatolikdan himoya
      }
    }

    const ctx = Tone.getContext()
    const raw = ctx?.rawContext
    const isRunning = ctx.state === 'running' && (!raw || raw.state === 'running')

    if (!isRunning) {
      this.ensureStarted().then((ok) => {
        if (ok) triggerNow()
      })
      return
    }

    if (!this.state.ready) {
      this.state.ready = true
    }
    triggerNow()
  }

  /**
   * Notani qo‘yib yuborish (sustain pedal bosilgan bo‘lsa kechiktiradi).
   */
  releaseNote(note) {
    this.heldNotes.delete(note)

    if (this.state.sustainPedal) {
      this.sustainedNotes.add(note)
      return
    }

    const now = Tone.immediate()
    try {
      if (this.sampler && this.state.samplerLoaded) {
        this.sampler.triggerRelease(note, now)
      }
      if (this.fallbackSynth) {
        this.fallbackSynth.triggerRelease(note, now)
      }
    } catch {
      // ignore
    }
  }

  setSustainPedal(active) {
    this.state.sustainPedal = active
    if (!active && this.sustainedNotes.size > 0) {
      const now = Tone.immediate()
      for (const note of this.sustainedNotes) {
        if (!this.heldNotes.has(note)) {
          try {
            if (this.sampler && this.state.samplerLoaded) {
              this.sampler.triggerRelease(note, now)
            }
            if (this.fallbackSynth) {
              this.fallbackSynth.triggerRelease(note, now)
            }
          } catch {
            // ignore
          }
        }
      }
      this.sustainedNotes.clear()
    }
  }

  releaseAll() {
    this.heldNotes.clear()
    this.sustainedNotes.clear()
    try {
      if (this.sampler && this.state.samplerLoaded) {
        this.sampler.releaseAll()
      }
      if (this.fallbackSynth) {
        this.fallbackSynth.releaseAll()
      }
    } catch {
      // ignore
    }
  }

  setVolume(val) {
    const clamped = Math.max(0, Math.min(1, val))
    this.state.volume = clamped
    this.state.muted = clamped === 0
    if (this.masterGain) {
      this.masterGain.gain.rampTo(this.state.muted ? 0 : clamped, 0.04)
    }
  }

  toggleMute() {
    this.state.muted = !this.state.muted
    if (this.masterGain) {
      this.masterGain.gain.rampTo(this.state.muted ? 0 : this.state.volume, 0.04)
    }
  }

  setBpm(bpm) {
    const clamped = Math.max(40, Math.min(160, Math.round(bpm)))
    this.state.bpm = clamped
    Tone.getTransport().bpm.value = clamped
  }

  async toggleMetronome(forceState) {
    const nextState = typeof forceState === 'boolean' ? forceState : !this.state.metronomeEnabled
    await this.ensureStarted()

    if (nextState) {
      this.startMetronome()
    } else {
      this.stopMetronome()
    }
    return this.state.metronomeEnabled
  }

  startMetronome() {
    this.setupNodes()
    const transport = Tone.getTransport()
    transport.bpm.value = this.state.bpm

    if (this.metronomeLoop) {
      this.metronomeLoop.dispose()
    }

    let beatCounter = 0
    this.metronomeLoop = new Tone.Loop((time) => {
      const beat = (beatCounter % 4) + 1
      beatCounter += 1

      if (beat === 1) {
        this.metronomeHigh?.triggerAttackRelease('E6', '32n', time)
      } else {
        this.metronomeLow?.triggerAttackRelease('A5', '32n', time)
      }

      Tone.getDraw().schedule(() => {
        this.state.currentBeat = beat
      }, time)
    }, '4n')

    this.metronomeLoop.start(0)
    if (transport.state !== 'started') {
      transport.start()
    }
    this.state.metronomeEnabled = true
  }

  stopMetronome() {
    if (this.metronomeLoop) {
      this.metronomeLoop.stop()
      this.metronomeLoop.dispose()
      this.metronomeLoop = null
    }
    const transport = Tone.getTransport()
    if (transport.state === 'started') {
      transport.stop()
    }
    this.state.metronomeEnabled = false
    this.state.currentBeat = 0
  }

  /**
   * Flow Mode sanog‘i (count-in) yoki takt zarbi uchun bir martalik metronom ovozi.
   */
  playMetronomeClick(isAccent = false) {
    if (!this.initialized) {
      this.setupNodes()
    }
    const ctx = Tone.getContext()
    if (ctx.state !== 'running') return
    const now = Tone.immediate()
    try {
      if (isAccent) {
        this.metronomeHigh?.triggerAttackRelease('E6', '32n', now)
      } else {
        this.metronomeLow?.triggerAttackRelease('A5', '32n', now)
      }
    } catch {
      // ignore
    }
  }

  /**
   * Bir qo‘lda mashq qilayotganda ikkinchi qo‘lning fon (jo‘r) notalarini yumshoq chalish.
   */
  playBackingNotes(notes, durationSec = 0.5, velocity = 0.45) {
    if (!notes || notes.length === 0) return
    if (!this.initialized) {
      this.setupNodes()
    }
    const ctx = Tone.getContext()
    if (ctx.state !== 'running') return
    const inst = this.getActiveInstrument()
    if (!inst) return
    const now = Tone.immediate()
    const safeDur = Math.max(0.18, Math.min(3.5, durationSec))
    for (const note of notes) {
      try {
        inst.triggerAttackRelease(note, safeDur, now, velocity)
      } catch {
        // ignore
      }
    }
  }

  /**
   * Joriy darsni namuna (Demo) sifatida avtomatik ijro etish (bir va ikki qo‘lli darslar uchun).
   */
  async playLessonDemo(steps, bpm, { onStep, onEnd } = {}) {
    await this.ensureStarted()
    this.stopDemo()
    this.demoRunning = true

    const beatMs = (60 / Math.max(40, bpm)) * 1000
    let offsetMs = 120

    steps.forEach((step, idx) => {
      const durMs = Math.max(200, (step.duration || 1) * beatMs)
      const holdMs = durMs * 0.86
      const demoNotes = step.allEntries
        ? [...new Set(step.allEntries.map((e) => e.note))]
        : Array.isArray(step.notes)
          ? step.notes
          : []

      const startTimer = window.setTimeout(() => {
        if (!this.demoRunning) return
        if (onStep) onStep(idx, demoNotes)
        for (const note of demoNotes) {
          this.playNote(note, 0.78)
        }
      }, offsetMs)

      const releaseTimer = window.setTimeout(() => {
        if (!this.demoRunning) return
        for (const note of demoNotes) {
          this.releaseNote(note)
        }
      }, offsetMs + holdMs)

      this.demoTimers.push(startTimer, releaseTimer)
      offsetMs += durMs
    })

    const finishTimer = window.setTimeout(() => {
      this.demoRunning = false
      if (onEnd) onEnd()
    }, offsetMs + 250)
    this.demoTimers.push(finishTimer)
  }

  stopDemo() {
    this.demoRunning = false
    for (const id of this.demoTimers) {
      window.clearTimeout(id)
    }
    this.demoTimers = []
    this.releaseAll()
  }

  /**
   * Dars muvaffaqiyatli tugaganda yoqimli akkordli tabrik ovozi.
   */
  async playCompletionChime() {
    await this.ensureStarted()
    const inst = this.getActiveInstrument()
    if (!inst) return

    const notes = ['C5', 'E5', 'G5', 'B5', 'C6']
    const now = Tone.now()
    notes.forEach((note, idx) => {
      try {
        inst.triggerAttackRelease(note, '4n', now + idx * 0.085, 0.6)
      } catch {
        // ignore
      }
    })
  }
}

export const audioEngine = new AudioEngine()
export default audioEngine
