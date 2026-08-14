<template>
  <NuxtLink
    :to="to"
    class="group relative isolate block overflow-hidden rounded-4xl bg-[#05061a] shadow-xl shadow-slate-900/10 transition-transform duration-500 hover:-translate-y-1"
  >
    <div class="aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      >
    </div>

    <!-- Scrim, tinted to match the site's navy/indigo hero gradient -->
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05061a] via-[#05061a]/55 to-[#05061a]/5" />
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05061a]/40 via-transparent to-transparent" />

    <div class="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-8 sm:p-10 lg:p-14">
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-700">
          <svg viewBox="0 0 24 24" fill="currentColor" class="h-3 w-3" aria-hidden="true">
            <path d="M12 2.5l2.9 6.34 6.98.8-5.2 4.77 1.45 6.9L12 17.9l-6.13 3.4 1.45-6.9-5.2-4.76 6.98-.8L12 2.5Z" />
          </svg>
          Featured
        </span>

        <span v-if="category" class="text-xs font-medium uppercase tracking-wide text-white/70">
          {{ category }}
        </span>
      </div>

      <h2 class="max-w-2xl text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
        {{ title }}
      </h2>

      <p class="max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
        {{ excerpt }}
      </p>

      <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-white/60">
        <span v-if="date">{{ date }}</span>
        <span v-if="date && readTime" aria-hidden="true">&middot;</span>
        <span v-if="readTime">{{ readTime }}</span>

        <span class="inline-flex items-center gap-1.5 text-sm font-medium text-white sm:ml-auto">
          Read article
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
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

  // Route to the post's detail page, e.g. `/blog/capital-gains-planning-questions`
  to: {
    type: String,
    required: true
  }
})
</script>
