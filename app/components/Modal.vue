<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        <div
          class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          aria-hidden="true"
          @click="closeOnBackdrop && close()"
        />

        <div
          ref="panelRef"
          class="modal-panel relative w-full max-w-md rounded-4xl bg-white p-8 shadow-2xl sm:p-10"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
        >
          <button
            v-if="showClose"
            type="button"
            class="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
            @click="close"
          >
            <X class="h-4 w-4" aria-hidden="true" />
          </button>

          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { X } from '@lucide/vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },

  closeOnBackdrop: {
    type: Boolean,
    default: true
  },

  closeOnEsc: {
    type: Boolean,
    default: true
  },

  showClose: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

const panelRef = ref(null)

function close () {
  emit('update:modelValue', false)
}

function handleKeydown (event) {
  if (event.key === 'Escape' && props.closeOnEsc) close()
}

watch(() => props.modelValue, (open) => {
  if (!import.meta.client) return

  document.body.style.overflow = open ? 'hidden' : ''

  if (open) {
    nextTick(() => panelRef.value?.focus())
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-panel {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  transform: scale(0.95) translateY(8px);
  opacity: 0;
}
</style>
