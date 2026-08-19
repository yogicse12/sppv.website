<template>
  <section class="bg-[#ffffff] py-20 sm:py-24 lg:py-32">
    <div class="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <!-- Text column -->
        <div :class="reverse ? 'lg:order-2' : 'lg:order-1'">
          <span
            v-if="tagline"
            class="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-600"
          >
            {{ tagline }}
          </span>

          <h2 class="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {{ title }}
          </h2>

          <div class="mt-6 text-md leading-relaxed text-slate-500">
            <slot name="details" />
          </div>
        </div>

        <!-- Image column -->
        <div
          class="aspect-[1/1] w-full overflow-hidden rounded-4xl"
          :class="reverse ? 'lg:order-1' : 'lg:order-2'"
        >
          <img
            :src="imageSrc"
            :alt="imageAlt"
            class="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  tagline: {
    type: String,
    default: ''
  },

  title: {
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

  // Swap columns on lg+ (image left, text right)
  reverse: {
    type: Boolean,
    default: false
  }
});
</script>
