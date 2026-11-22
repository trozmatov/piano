import { reactive } from 'vue'
import { midiToNoteName, START_MIDI, END_MIDI } from './musicTheory.js'

/**
 * Web MIDI API boshqaruvchisi.
 * Real MIDI klaviatura ulanganda avtomatik aniqlaydi (hot-plug qo‘llab-quvvatlanadi)
 * va bosish kuchi (velocity) hamda sustain pedal (CC 64) signallarini uzatadi.
 */
class MidiHandler {
  constructor() {
    this.state = reactive({
      supported: typeof navigator !== 'undefined' && typeof navigator.requestMIDIAccess === 'function',
      initialized: false,
      connected: false,
      devices: [],
      error: null
    })

    this.midiAccess = null
    this.callbacks = {
      onNoteOn: null,
      onNoteOff: null,
      onSustainChange: null
    }
    this.boundMessageHandler = this.handleMidiMessage.bind(this)
  }

  async init({ onNoteOn, onNoteOff, onSustainChange } = {}) {
    this.callbacks = {
      onNoteOn: onNoteOn || null,
      onNoteOff: onNoteOff || null,
      onSustainChange: onSustainChange || null
    }

    if (!this.state.supported) {
      this.state.error = 'Brauzer Web MIDI API ni qo‘llab-quvvatlamaydi'
      return false
    }

    try {
      this.midiAccess = await navigator.requestMIDIAccess({ sysex: false })
      this.state.initialized = true
      this.state.error = null
      this.syncInputs()

      this.midiAccess.onstatechange = () => {
        this.syncInputs()
      }
      return true
    } catch (err) {
      this.state.error = 'MIDI qurilmalariga ruxsat berilmadi'
      this.state.connected = false
      return false
    }
  }

  syncInputs() {
    if (!this.midiAccess) return

    const activeDevices = []
    for (const input of this.midiAccess.inputs.values()) {
      if (input.state === 'connected') {
        input.onmidimessage = this.boundMessageHandler
        activeDevices.push({
          id: input.id,
          name: input.name || 'MIDI Klaviatura',
          manufacturer: input.manufacturer || ''
        })
      } else {
        input.onmidimessage = null
      }
    }

    this.state.devices = activeDevices
    this.state.connected = activeDevices.length > 0
  }

  handleMidiMessage(event) {
    const [status, data1, data2 = 0] = event.data
    const command = status & 0xf0

    // Note On (0x90) - velocity 0 bo‘lsa, MIDI standartiga ko‘ra Note Off hisoblanadi
    if (command === 0x90 && data2 > 0) {
      const midiNote = data1
      const velocity = Math.max(0.15, Math.min(1, data2 / 127))
      const noteName = midiToNoteName(midiNote)
      if (this.callbacks.onNoteOn) {
        this.callbacks.onNoteOn(noteName, velocity, midiNote >= START_MIDI && midiNote <= END_MIDI)
      }
      return
    }

    // Note Off (0x80) yoki Note On velocity=0
    if (command === 0x80 || (command === 0x90 && data2 === 0)) {
      const noteName = midiToNoteName(data1)
      if (this.callbacks.onNoteOff) {
        this.callbacks.onNoteOff(noteName)
      }
      return
    }

    // Control Change (0xB0): Sustain Pedal (CC 64)
    if (command === 0xb0 && data1 === 64) {
      if (this.callbacks.onSustainChange) {
        this.callbacks.onSustainChange(data2 >= 64)
      }
    }
  }

  dispose() {
    if (this.midiAccess) {
      for (const input of this.midiAccess.inputs.values()) {
        input.onmidimessage = null
      }
      this.midiAccess.onstatechange = null
    }
  }
}

export const midiHandler = new MidiHandler()
export default midiHandler
