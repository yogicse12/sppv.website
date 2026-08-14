<template>
  <NuxtLink
    :to="to"
    class="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    <div class="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
      <img
        :src="imageSrc"
        :alt="imageAlt"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      >
      <span
        v-if="category"
        class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-indigo-600 backdrop-blur"
      >
        {{ category }}
      </span>
    </div>

    <div class="flex flex-1 flex-col p-6">
      <h3 class="text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600">
        {{ title }}
      </h3>

      <p class="mt-2 flex-1 text-[15px] leading-relaxed text-slate-500">
        {{ excerpt }}
      </p>

      <div v-if="date || readTime" class="mt-5 flex items-center gap-2 text-[13px] text-slate-400">
        <span v-if="date">{{ date }}</span>
        <span v-if="date && readTime" aria-hidden="true">&middot;</span>
        <span v-if="readTime">{{ readTime }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },

  excerpt: {
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

  category: {
    type: String,
    default: ''
  },

  date: {
    type: String,
    default: ''
  },

  readTime: {
    type: String,
    default: ''
  },

  // Route to the post's detail page, e.g. `/blog/understanding-input-tax-credit`
  to: {
    type: String,
    required: true
  }
})
</script>
