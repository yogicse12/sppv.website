<template>
  <section v-if="testimonials.length" class="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32">
    <div class="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8">
      <div v-if="tagline || title" class="max-w-xl text-center mx-auto">
        <span v-if="tagline" class="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-600">
          {{ tagline }}
        </span>
        <h2
          v-if="title"
          class="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
        >
          {{ title }}
        </h2>
      </div>
    </div>

    <div
      class="relative mt-14 flex flex-col gap-6 sm:mt-16"
      role="region"
      aria-label="Client testimonials"
      @mouseenter="pause"
      @mouseleave="resume"
    >
      <!-- Decorative dashed grid lines, behind the cards -->
      <div
        class="pointer-events-none absolute inset-0 hidden grid-cols-4 divide-x divide-dashed divide-slate-200 sm:grid lg:grid-cols-6"
        aria-hidden="true"
      />

      <!-- Edge fade masks -->
      <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-24 lg:w-40" aria-hidden="true" />
      <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-24 lg:w-40" aria-hidden="true" />

      <div class="marquee-row">
        <div
          class="marquee-track"
          :class="{ 'is-paused': isPaused }"
          :style="{ animationDuration: `${durationRowOne}s` }"
        >
          <div
            v-for="(t, index) in rowOne"
            :key="`row1-${index}`"
            class="flex w-[300px] shrink-0 flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:w-[360px] sm:p-8 lg:w-[400px]"
          >
            <p class="text-[17px] leading-relaxed text-slate-800">
              &ldquo;{{ t.quote }}&rdquo;
            </p>

            <div class="mt-auto flex items-center gap-3">
              <img
                v-if="t.avatar"
                :src="t.avatar"
                :alt="t.avatarAlt || t.name || ''"
                loading="lazy"
                class="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
              >
              <div
                v-else
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold"
                :class="avatarColor(index)"
              >
                {{ initials(t.name) }}
              </div>

              <div>
                <p class="text-[15px] font-semibold text-slate-900">
                  {{ t.name }}
                </p>
                <p v-if="t.role || t.company" class="text-[13px] text-slate-500">
                  {{ t.role }}<template v-if="t.role && t.company">, </template>{{ t.company }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="marquee-row">
        <div
          class="marquee-track"
          :class="{ 'is-paused': isPaused }"
          :style="{ animationDuration: `${durationRowTwo}s` }"
        >
          <div
            v-for="(t, index) in rowTwo"
            :key="`row2-${index}`"
            class="flex w-[300px] shrink-0 flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:w-[360px] sm:p-8 lg:w-[400px]"
          >
            <p class="text-[17px] leading-relaxed text-slate-800">
              &ldquo;{{ t.quote }}&rdquo;
            </p>

            <div class="mt-auto flex items-center gap-3">
              <img
                v-if="t.avatar"
                :src="t.avatar"
                :alt="t.avatarAlt || t.name || ''"
                loading="lazy"
                class="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
              >
              <div
                v-else
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold"
                :class="avatarColor(index + 1)"
              >
                {{ initials(t.name) }}
              </div>

              <div>
                <p class="text-[15px] font-semibold text-slate-900">
                  {{ t.name }}
                </p>
                <p v-if="t.role || t.company" class="text-[13px] text-slate-500">
                  {{ t.role }}<template v-if="t.role && t.company">, </template>{{ t.company }}
                </p>
              </div>
            </div>
          </div>
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
  // { quote, name, role, company, avatar?, avatarAlt? }[]
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

  // Seconds for one full loop of a row — smaller is faster.
  // Left null to auto-scale with the number of testimonials.
  speed: {
    type: Number,
    default: null
  }
})

/*
|--------------------------------------------------------------------------
| Rows — each duplicated so the marquee can loop seamlessly at -50%
|--------------------------------------------------------------------------
*/

const rowOne = computed(() => [...props.testimonials, ...props.testimonials])
const rowTwo = computed(() => {
  const reversed = [...props.testimonials].reverse()
  return [...reversed, ...reversed]
})

const durationRowOne = computed(() => props.speed || Math.max(props.testimonials.length * 8, 20))
const durationRowTwo = computed(() => props.speed || Math.max(props.testimonials.length * 9, 24))

/*
|--------------------------------------------------------------------------
| Avatar helpers (initials instead of stock photos when none is provided)
|--------------------------------------------------------------------------
*/

const AVATAR_COLORS = [
  'bg-indigo-100 text-indigo-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-sky-100 text-sky-700',
  'bg-rose-100 text-rose-700'
]

function initials (name) {
  if (!name) return ''

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

function avatarColor (index) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length]
}

/*
|--------------------------------------------------------------------------
| Pause on hover / focus
|--------------------------------------------------------------------------
*/

const isPaused = ref(false)

function pause () {
  isPaused.value = true
}

function resume () {
  isPaused.value = false
}
</script>

<style scoped>
.marquee-row {
  overflow: hidden;
}

.marquee-track {
  display: flex;
  width: max-content;
  gap: 1.5rem;
  animation-name: marquee-left;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.marquee-track.is-paused {
  animation-play-state: paused;
}

@keyframes marquee-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
