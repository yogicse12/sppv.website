<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="[sizeClasses, variantClasses]"
  >
    <slot />
    <svg
      v-if="arrow"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-4 w-4"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </NuxtLink>

  <button
    v-else
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    :class="[sizeClasses, variantClasses]"
  >
    <slot />
    <svg
      v-if="arrow"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-4 w-4"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </button>
</template>

<script setup>
const props = defineProps({
  // Renders a NuxtLink when set, otherwise a native <button>
  to: {
    type: String,
    default: null
  },

  // Native button type, only used when `to` is not set
  type: {
    type: String,
    default: 'button'
  },

  // 'solid'  — indigo-600 bg, white text (Header, Footer, Contact form, CTA bands)
  // 'white'  — white bg, indigo text (Hero primary CTA, buttons on dark surfaces)
  // 'ghost'  — translucent white bg, white text (Hero secondary CTA, on dark surfaces)
  variant: {
    type: String,
    default: 'solid'
  },

  // 'sm' | 'md'
  size: {
    type: String,
    default: 'md'
  },

  // Show the trailing chevron-right icon
  arrow: {
    type: Boolean,
    default: false
  },

  disabled: {
    type: Boolean,
    default: false
  }
})

const sizeClasses = computed(() => {
  return props.size === 'sm'
    ? 'px-5 py-2.5 text-[14px]'
    : 'px-7 py-3.5 text-[15px]'
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'white':
      return 'bg-white text-indigo-700 shadow-sm hover:bg-indigo-50 focus-visible:outline-indigo-600'
    case 'ghost':
      return 'bg-white/15 text-white backdrop-blur hover:bg-white/25 focus-visible:outline-white'
    case 'solid':
    default:
      return 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600'
  }
})
</script>
