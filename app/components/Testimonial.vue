<template>
  <section v-if="testimonials.length" class="bg-slate-50 py-20 sm:py-24 lg:py-32">
    <div class="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
      <div v-if="tagline || title" class="mb-12 text-center sm:mb-16">
        <span
          v-if="tagline"
          class="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-600"
        >
          {{ tagline }}
        </span>

        <h2
          v-if="title"
          class="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
        >
          {{ title }}
        </h2>
      </div>

      <div
        ref="regionRef"
        class="relative rounded-4xl bg-white p-10 shadow-sm ring-1 ring-slate-900/5 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-indigo-600 sm:p-14 lg:p-16"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        tabindex="0"
        @mouseenter="pause"
        @mouseleave="resume"
        @keydown="onKeyDown"
      >
        <!-- Decorative quote mark -->
        <svg
          class="mx-auto h-9 w-9 text-indigo-100"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.14 6.4C6.3 8.9 4.8 11.8 4.8 15.1c0 3.3 2 5.6 4.7 5.6 2.4 0 4.1-1.8 4.1-4.1 0-2.1-1.4-3.7-3.4-4 .4-2.1 1.8-4 3.8-5.3L9.14 6.4Zm9.7 0c-2.84 2.5-4.34 5.4-4.34 8.7 0 3.3 2 5.6 4.7 5.6 2.4 0 4.1-1.8 4.1-4.1 0-2.1-1.4-3.7-3.4-4 .4-2.1 1.8-4 3.8-5.3L18.84 6.4Z" />
        </svg>

        <Transition name="fade-rise" mode="out-in">
          <div :key="activeIndex" class="mt-6 text-center">
            <p class="mx-auto max-w-3xl text-2xl font-medium leading-snug tracking-tight text-slate-900 sm:text-3xl">
              &ldquo;{{ active.quote }}&rdquo;
            </p>

            <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <img
                v-if="active.avatar"
                :src="active.avatar"
                :alt="active.avatarAlt || active.name || ''"
                loading="lazy"
                class="h-14 w-14 rounded-full object-cover ring-1 ring-slate-200"
              >

              <div class="text-center sm:text-left">
                <p class="font-semibold text-slate-900">
                  {{ active.name }}
                </p>
                <p v-if="active.role || active.company" class="text-sm text-slate-500">
                  {{ active.role }}<template v-if="active.role && active.company">, </template>{{ active.company }}
                </p>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Pagination -->
        <div
          v-if="testimonials.length > 1"
          class="mt-10 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Testimonials"
        >
          <button
            v-for="(t, index) in testimonials"
            :key="index"
            type="button"
            class="h-2 rounded-full transition-all duration-300"
            :class="index === activeIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200 hover:bg-slate-300'"
            role="tab"
            :aria-selected="index === activeIndex"
            :aria-label="`Go to testimonial ${index + 1}${t.name ? `: ${t.name}` : ''}`"
            @click="goTo(index)"
          />
        </div>

        <div class="sr-only" aria-live="polite" aria-atomic="true">
          Testimonial {{ activeIndex + 1 }} of {{ testimonials.length }}.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
*/

const props = defineProps({
  // { quote, name, role, company, avatar, avatarAlt }[]
  testimonials: {
    type: Array,
    default: () => []
  },

  tagline: {
    type: String,
    default: ''
  },

  title: {
    type: String,
    default: ''
  },

  autoplay: {
    type: Boolean,
    default: true
  },

  autoplayInterval: {
    type: Number,
    default: 6000
  }
})

/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const activeIndex = ref(0)
const isPaused = ref(false)

let timer = null

const active = computed(() => props.testimonials[activeIndex.value] || {})

/*
|--------------------------------------------------------------------------
| Navigation
|--------------------------------------------------------------------------
*/

function goTo (index) {
  const length = props.testimonials.length

  if (!length) return

  activeIndex.value = ((index % length) + length) % length

  restartAutoplay()
}

function next () {
  goTo(activeIndex.value + 1)
}

function previous () {
  goTo(activeIndex.value - 1)
}

/*
|--------------------------------------------------------------------------
| Autoplay
|--------------------------------------------------------------------------
*/

function startAutoplay () {
  if (!props.autoplay || props.testimonials.length <= 1 || isPaused.value) return

  clearAutoplay()

  timer = setInterval(next, props.autoplayInterval)
}

function clearAutoplay () {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function restartAutoplay () {
  clearAutoplay()

  if (props.autoplay && !isPaused.value && props.testimonials.length > 1) {
    startAutoplay()
  }
}

function pause () {
  isPaused.value = true
  clearAutoplay()
}

function resume () {
  isPaused.value = false
  startAutoplay()
}

/*
|--------------------------------------------------------------------------
| Keyboard Navigation
|--------------------------------------------------------------------------
*/

function onKeyDown (event) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    previous()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    next()
  }
}

/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

onMounted(startAutoplay)
onBeforeUnmount(clearAutoplay)

watch(() => props.testimonials.length, (length) => {
  if (!length) {
    activeIndex.value = 0
    clearAutoplay()
    return
  }

  if (activeIndex.value >= length) {
    activeIndex.value = length - 1
  }

  restartAutoplay()
})
</script>

<style scoped>
.fade-rise-enter-active,
.fade-rise-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-rise-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-rise-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
