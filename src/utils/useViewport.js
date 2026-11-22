import { reactive, onMounted, onBeforeUnmount } from 'vue'

/**
 * Qurilma ekrani, orientatsiya (portrait/landscape), sensorli ko‘rsatkich (pointer: coarse)
 * hamda Fullscreen API holatini reaktiv tarzda kuzatuvchi yordamchi modul.
 *
 * Laptop Mode (width >= 1024px, height > 500px, no coarse pointer) hech qanday cheklovsiz
 * standart keng ko‘rinishda qoladi.
 */
const state = reactive({
  width: typeof window !== 'undefined' ? window.innerWidth : 1366,
  height: typeof window !== 'undefined' ? window.innerHeight : 850,
  isCompact: false, // max-width: 900px yoki max-height: 500px
  isShortLandscape: false, // telefon yonbosh (max-height: 500px)
  isMobilePortrait: false, // telefon vertikal (width < 768 && height > width)
  isCoarsePointer: false, // sensorli ekran (@media pointer: coarse)
  isScrollableKeyboard: false, // telefon va planshetda qulay barmoq o‘lchamli suriluvchi klaviatura
  deviceMode: 'laptop', // 'laptop' | 'tablet' | 'phone'
  fullscreenSupported: false,
  isFullscreen: false
})

let listenersCount = 0
let coarseQuery = null

function updateMetrics() {
  if (typeof window === 'undefined') return

  const w = window.innerWidth
  const h = window.innerHeight
  const coarse = coarseQuery ? coarseQuery.matches : false

  state.width = w
  state.height = h
  state.isCoarsePointer = coarse

  // Compact HUD: max-width: 900px yoki max-height: 500px
  state.isCompact = w <= 900 || h <= 500
  state.isShortLandscape = h <= 500 && w > h
  state.isMobilePortrait = w < 768 && h > w

  // Qurilma turini aniqlash (Laptop rejimiga ta'sir qilmaydi)
  if (w < 768 || h <= 500) {
    state.deviceMode = 'phone'
  } else if (w < 1080 || (coarse && w < 1280)) {
    state.deviceMode = 'tablet'
  } else {
    state.deviceMode = 'laptop'
  }

  // Laptop rejimida to‘liq 3 oktava (22 oq tugma) ko‘rinadi; telefon/planshetda barmoq uchun kattalashtiriladi
  state.isScrollableKeyboard = state.deviceMode !== 'laptop'

  const doc = document
  state.fullscreenSupported = Boolean(
    doc.fullscreenEnabled || doc.webkitFullscreenEnabled
  )
  state.isFullscreen = Boolean(
    doc.fullscreenElement || doc.webkitFullscreenElement
  )
}

function handleFullscreenChange() {
  const doc = document
  state.isFullscreen = Boolean(
    doc.fullscreenElement || doc.webkitFullscreenElement
  )
}

export async function toggleFullscreen() {
  if (typeof document === 'undefined') return false
  const doc = document
  const root = doc.documentElement

  try {
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      if (doc.exitFullscreen) {
        await doc.exitFullscreen()
      } else if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen()
      }
      return false
    } else {
      if (root.requestFullscreen) {
        await root.requestFullscreen({ navigationUI: 'hide' })
      } else if (root.webkitRequestFullscreen) {
        await root.webkitRequestFullscreen()
      }
      return true
    }
  } catch {
    return false
  }
}

export function useViewport() {
  onMounted(() => {
    if (listenersCount === 0 && typeof window !== 'undefined') {
      coarseQuery = window.matchMedia('(pointer: coarse)')
      updateMetrics()
      window.addEventListener('resize', updateMetrics, { passive: true })
      window.addEventListener('orientationchange', updateMetrics, { passive: true })
      coarseQuery.addEventListener?.('change', updateMetrics)
      document.addEventListener('fullscreenchange', handleFullscreenChange)
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    } else {
      updateMetrics()
    }
    listenersCount += 1
  })

  onBeforeUnmount(() => {
    listenersCount = Math.max(0, listenersCount - 1)
    if (listenersCount === 0 && typeof window !== 'undefined') {
      window.removeEventListener('resize', updateMetrics)
      window.removeEventListener('orientationchange', updateMetrics)
      coarseQuery?.removeEventListener?.('change', updateMetrics)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    }
  })

  return {
    viewport: state,
    toggleFullscreen
  }
}
