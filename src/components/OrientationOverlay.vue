<script setup>
import { Smartphone, RotateCw } from 'lucide-vue-next'

defineProps({
  visible: { type: Boolean, default: false }
})

const emit = defineEmits(['dismiss'])
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="fixed inset-0 z-[70] flex items-center justify-center bg-[#07080c]/88 backdrop-blur-2xl p-6"
      >
        <div
          class="glass-panel relative w-full max-w-sm rounded-3xl border border-white/[0.12] bg-[#0e121d]/95 p-7 text-center shadow-2xl"
        >
          <div
            class="pointer-events-none absolute -top-16 left-1/2 h-36 w-56 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl"
          />

          <div class="relative flex flex-col items-center">
            <div
              class="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-sky-400/25 bg-sky-500/10 text-sky-300 shadow-inner"
            >
              <div class="relative animate-rotate-device">
                <Smartphone class="h-10 w-10 stroke-[1.75]" />
                <RotateCw
                  class="absolute -right-2 -top-2 h-4.5 w-4.5 rounded-full bg-[#0e121d] p-0.5 text-amber-300"
                />
              </div>
            </div>

            <h2 class="text-lg font-bold text-white tracking-tight">
              Gorizontal rejim tavsiya etiladi
            </h2>
            <p class="mt-2.5 text-sm leading-relaxed text-zinc-300">
              Qulay chalish uchun telefonni gorizontal (yonbosh) holatga burang
            </p>

            <p class="mt-2 text-xs text-zinc-500">
              Yonbosh holatda tugmalar kengroq va akkord bosish ancha qulay bo‘ladi.
            </p>

            <button
              type="button"
              @click="emit('dismiss')"
              class="mt-6 w-full rounded-xl border border-white/[0.12] bg-white/[0.07] hover:bg-white/[0.13] active:scale-[0.98] px-4 py-2.5 text-sm font-semibold text-zinc-100 transition cursor-pointer"
            >
              Baribir davom etish
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
