<template>
  <div class="group overflow-hidden rounded-[28px] bg-white p-3 shadow-sm ring-1 ring-slate-900/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-900/10">
    <div class="aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-slate-100">
      <img
        :src="imageSrc"
        :alt="imageAlt"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      >
    </div>

    <p class="px-2 pb-3 pt-4 text-[17px] font-bold leading-snug text-slate-800">
      {{ title }}
    </p>
  </div>
</template>

<script setup>
defineProps({
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
  }
})
</script>
