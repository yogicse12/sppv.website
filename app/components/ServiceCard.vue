<template>
  <NuxtLink
    :to="to"
    class="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    <div class="aspect-[4/3] w-full overflow-hidden bg-slate-100">
      <img
        :src="imageSrc"
        :alt="imageAlt"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      >
    </div>

    <div class="flex flex-1 flex-col p-6">
      <h3 class="text-lg font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
        {{ title }}
      </h3>

      <p class="mt-2 flex-1 text-[15px] leading-relaxed text-slate-500">
        {{ description }}
      </p>

      <span class="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-indigo-600">
        Learn more
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </span>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  imageSrc: {
    type: String,
    required: true
  },

  imageAlt: {
    type: String,
    default: ''
  },

  // Route to the service's detail page, e.g. `/services/tax-advisory`
  to: {
    type: String,
    required: true
  }
})
</script>
