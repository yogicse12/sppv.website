<template>
  <div class="carousel-container">
    <div
      ref="viewportRef"
      class="carousel-viewport"
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      tabindex="0"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
      @keydown="onKeyDown"
    >
      <!-- ============================================================
           Media
           Image slides (crossfade + Ken Burns) + gradient scrim.
           Isolated in its own box so it can be resized independently
           of the text/pagination on mobile & tablet portrait.
           ============================================================ -->
      <div class="carousel-media">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="carousel-slide"
          :class="{
            'carousel-slide--active': index === currentIndex
          }"
          :aria-hidden="index !== currentIndex"
        >
          <img
            :src="image.src"
            :alt="image.alt || ''"
            class="carousel-image"
            loading="lazy"
            draggable="false"
            @load="onImageLoad"
          />
        </div>

        <div class="carousel-scrim"></div>
      </div>

      <!-- ============================================================
           Text Content
           ============================================================ -->
      <div
        v-if="currentImage"
        class="carousel-content"
      >
        <Transition
          name="text-rise"
          mode="out-in"
        >
          <div
            :key="currentIndex"
            class="carousel-text"
          >
            <p
              v-if="currentImage.eyebrow"
              class="carousel-eyebrow"
            >
              {{ currentImage.eyebrow }}
            </p>

            <h3
              v-if="currentImage.caption"
              class="carousel-heading"
            >
              {{ currentImage.caption }}
            </h3>

            <p
              v-if="currentImage.description"
              class="carousel-body"
            >
              {{ currentImage.description }}
            </p>
          </div>
        </Transition>
      </div>

      <!-- ============================================================
           Progress Indicators

           Arrow buttons have been removed — left/right arrow keys
           (see onKeyDown) and these dots are the only slide controls.
           ============================================================ -->
      <div
        v-if="images.length > 1"
        class="carousel-indicators"
        role="tablist"
        aria-label="Carousel slides"
      >
        <button
          v-for="(image, index) in images"
          :key="
            index === currentIndex
              ? `active-${currentIndex}`
              : index
          "
          type="button"
          class="carousel-dot"
          :class="{
            'carousel-dot--active':
              index === currentIndex,

            'carousel-dot--done':
              index < currentIndex
          }"
          role="tab"
          :aria-selected="index === currentIndex"
          :aria-label="`Go to slide ${index + 1}${image.alt ? `: ${image.alt}` : ''}`"
          @click="goToSlide(index)"
        ></button>
      </div>

      <!-- ============================================================
           Screen Reader Status
           ============================================================ -->
      <div
        class="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        <span v-if="autoplay">
          Slide {{ currentIndex + 1 }} of {{ images.length }}.
          Carousel is playing.
        </span>

        <span v-else>
          Slide {{ currentIndex + 1 }} of {{ images.length }}.
          Carousel is paused.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch
} from 'vue'

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
*/

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },

  autoplay: {
    type: Boolean,
    default: true
  },

  autoplayInterval: {
    type: Number,
    default: 5000
  },

  enableKeyboard: {
    type: Boolean,
    default: true
  },

  loop: {
    type: Boolean,
    default: true
  }
})

/*
|--------------------------------------------------------------------------
| Refs / State
|--------------------------------------------------------------------------
*/

const viewportRef = ref(null)

const currentIndex = ref(0)

const isPaused = ref(false)

let autoplayTimer = null

/*
|--------------------------------------------------------------------------
| Computed
|--------------------------------------------------------------------------
*/

const currentImage = computed(() => {
  if (!props.images.length) {
    return null
  }

  return props.images[currentIndex.value]
})

const autoplay = computed(() => {
  return (
    props.autoplay &&
    !isPaused.value &&
    props.images.length > 1
  )
})

/*
|--------------------------------------------------------------------------
| Navigation
|--------------------------------------------------------------------------
*/

const goToSlide = (index) => {
  const length = props.images.length

  if (!length) {
    return
  }

  let targetIndex = index

  if (targetIndex < 0) {
    targetIndex = props.loop
      ? length - 1
      : 0
  }

  if (targetIndex >= length) {
    targetIndex = props.loop
      ? 0
      : length - 1
  }

  currentIndex.value = targetIndex

  restartAutoplay()
}

const goToNext = () => {
  if (props.images.length <= 1) {
    return
  }

  const nextIndex =
    currentIndex.value + 1 >= props.images.length
      ? props.loop
        ? 0
        : currentIndex.value
      : currentIndex.value + 1

  goToSlide(nextIndex)
}

const goToPrevious = () => {
  if (props.images.length <= 1) {
    return
  }

  const previousIndex =
    currentIndex.value - 1 < 0
      ? props.loop
        ? props.images.length - 1
        : 0
      : currentIndex.value - 1

  goToSlide(previousIndex)
}

/*
|--------------------------------------------------------------------------
| Autoplay
|--------------------------------------------------------------------------
*/

const startAutoplay = () => {
  if (
    !props.autoplay ||
    props.images.length <= 1 ||
    isPaused.value
  ) {
    return
  }

  clearAutoplay()

  autoplayTimer = setInterval(() => {
    goToNext()
  }, props.autoplayInterval)
}

const clearAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const restartAutoplay = () => {
  clearAutoplay()

  if (
    props.autoplay &&
    !isPaused.value &&
    props.images.length > 1
  ) {
    startAutoplay()
  }
}

const pauseAutoplay = () => {
  if (!props.autoplay) {
    return
  }

  isPaused.value = true

  clearAutoplay()
}

const resumeAutoplay = () => {
  if (!props.autoplay) {
    return
  }

  isPaused.value = false

  startAutoplay()
}

/*
|--------------------------------------------------------------------------
| Keyboard Navigation
|--------------------------------------------------------------------------
*/

const onKeyDown = (event) => {
  if (!props.enableKeyboard) {
    return
  }

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      goToPrevious()
      break

    case 'ArrowRight':
      event.preventDefault()
      goToNext()
      break

    case 'Home':
      event.preventDefault()
      goToSlide(0)
      break

    case 'End':
      event.preventDefault()
      goToSlide(props.images.length - 1)
      break
  }
}

/*
|--------------------------------------------------------------------------
| Image Load
|--------------------------------------------------------------------------
*/

const onImageLoad = () => {
  if (viewportRef.value) {
    viewportRef.value.dispatchEvent(
      new Event('imageLoaded')
    )
  }
}

/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  clearAutoplay()
})

/*
|--------------------------------------------------------------------------
| Watchers
|--------------------------------------------------------------------------
*/

watch(
  () => props.autoplay,
  (enabled) => {
    if (enabled) {
      startAutoplay()
    } else {
      clearAutoplay()
    }
  }
)

watch(
  () => props.images.length,
  (length) => {
    if (!length) {
      currentIndex.value = 0
      clearAutoplay()
      return
    }

    if (currentIndex.value >= length) {
      currentIndex.value = length - 1
    }

    if (length <= 1) {
      clearAutoplay()
    } else {
      startAutoplay()
    }
  }
);
</script>

<style scoped>
/*
|--------------------------------------------------------------------------
| Main Container
|--------------------------------------------------------------------------
*/

.carousel-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 88px);
  margin: 0 auto;

  overflow: hidden;

  border-radius: 0;

  background: var(--surface-1, #111);

  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.08);
}

/*
|--------------------------------------------------------------------------
| Viewport
|--------------------------------------------------------------------------
*/

.carousel-viewport {
  position: relative;

  width: 100%;
  
  height: 100%;

  overflow: hidden;

  background: var(--surface-2, #222);

  outline: none;
}

.carousel-viewport:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: -2px;
}

/*
|--------------------------------------------------------------------------
| Media
|
| Wraps the slides + scrim so this box can be resized independently
| of the text/pagination below the `1024px` breakpoint.
|--------------------------------------------------------------------------
*/

.carousel-media {
  position: absolute;

  inset: 0;
}

/*
|--------------------------------------------------------------------------
| Slides
|
| Images are stacked on top of each other.
| Only the active slide is visible.
|
| Based on the reference carousel's:
| opacity + scale animation.
|--------------------------------------------------------------------------
*/

.carousel-slide {
  position: absolute;

  inset: 0;

  opacity: 0;

  /*
   * Initial state for Ken Burns effect.
   */
  transform: scale(1.04);

  transition:
    opacity 1.1s cubic-bezier(0.4, 0, 0.2, 1),
    transform 6s cubic-bezier(
      0.25,
      0.46,
      0.45,
      0.94
    );

  z-index: 0;

  pointer-events: none;
}

.carousel-slide--active {
  opacity: 1;

  transform: scale(1);

  z-index: 1;
}

/*
|--------------------------------------------------------------------------
| Images
|--------------------------------------------------------------------------
*/

.carousel-image {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;

  pointer-events: none;
  user-select: none;

  -webkit-user-drag: none;
}

/*
|--------------------------------------------------------------------------
| Gradient Scrim
|
| Keeps text readable without making the entire image dark.
|--------------------------------------------------------------------------
*/

.carousel-scrim {
  position: absolute;

  inset: 0;

  z-index: 2;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.82) 0%,
    rgba(0, 0, 0, 0.45) 38%,
    rgba(0, 0, 0, 0.10) 65%,
    transparent 100%
  );

  pointer-events: none;
}

/*
|--------------------------------------------------------------------------
| Text Content
|--------------------------------------------------------------------------
*/

.carousel-content {
  position: absolute;

  left: 0;
  right: 0;
  bottom: 72px;

  padding: 0 2.5rem;

  z-index: 3;

  pointer-events: none;
}

.carousel-text {
  max-width: 540px;
  margin: 0 auto;

  text-align: center;
}

.carousel-eyebrow {
  margin: 0 0 14px;

  font-size: 10px;
  font-weight: 500;

  line-height: 1.2;

  letter-spacing: 2px;

  text-transform: uppercase;

  color: rgba(255, 255, 255, 0.55);
}

.carousel-heading {
  margin: 0 0 12px;

  font-size: 36px;
  font-weight: 600;

  line-height: 1.18;

  letter-spacing: -0.5px;

  color: #ffffff;
}

.carousel-body {
  margin: 0 auto;

  max-width: 480px;

  font-size: 15px;
  font-weight: 300;

  line-height: 1.65;

  color: rgba(255, 255, 255, 0.72);
}

/*
|--------------------------------------------------------------------------
| Text Rise Transition
|
| Fade in + move upward 10px.
|--------------------------------------------------------------------------
*/

.text-rise-enter-active {
  transition:
    opacity 0.55s ease,
    transform 0.55s cubic-bezier(
      0.22,
      1,
      0.36,
      1
    );
}

.text-rise-leave-active {
  transition:
    opacity 0.25s ease;
}

.text-rise-enter-from {
  opacity: 0;

  transform: translateY(10px);
}

.text-rise-leave-to {
  opacity: 0;
}

/*
|--------------------------------------------------------------------------
| Progress Indicators
|
| Horizontal progress pills instead of circular dots.
|--------------------------------------------------------------------------
*/

.carousel-indicators {
  position: absolute;

  left: 0;
  right: 0;
  bottom: 2.25rem;

  z-index: 5;

  display: flex;

  align-items: center;
  justify-content: center;

  gap: 6px;
}

.carousel-dot {
  appearance: none;

  position: relative;

  width: 28px;
  height: 3px;

  padding: 0;

  border: none;
  outline: none;

  border-radius: 2px;

  overflow: hidden;

  background: rgba(255, 255, 255, 0.3);

  cursor: pointer;

  transition:
    background 0.3s ease;
}

/*
 * Completed slides.
 */
.carousel-dot--done {
  background:
    rgba(255, 255, 255, 0.85);
}

/*
 * Active slide.
 */
.carousel-dot--active {
  background:
    rgba(255, 255, 255, 0.3);
}

/*
 * Active progress animation.
 *
 * Because the active dot gets a fresh Vue key,
 * this animation restarts every time the slide changes.
 */
.carousel-dot--active::after {
  content: '';

  position: absolute;

  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  border-radius: 2px;

  background: #ffffff;

  transform: scaleX(0);

  transform-origin: left center;

  animation:
    dot-fill 5s linear forwards;
}

@keyframes dot-fill {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

/*
|--------------------------------------------------------------------------
| Screen Reader Only
|--------------------------------------------------------------------------
*/

.sr-only {
  position: absolute;

  width: 1px;
  height: 1px;

  padding: 0;
  margin: -1px;

  overflow: hidden;

  clip: rect(0, 0, 0, 0);

  white-space: nowrap;

  border: 0;
}

/*
|--------------------------------------------------------------------------
| Mobile & Tablet Portrait (below the `lg` / 1024px breakpoint)
|
| The full-bleed overlay hero (arrows + text-on-image) doesn't work well
| on narrow/portrait viewports, so below 1024px this switches to a
| simple stacked layout:
|
|   1. Image, fixed to a 3:2 aspect ratio
|   2. Title + description, in normal flow below the image
|   3. Pagination dots, below the text
|
| Arrows are removed entirely — swipe/keyboard/dots remain for navigation.
| 1024px and up (tablet landscape + desktop) keeps the original
| full-height overlay design untouched.
|--------------------------------------------------------------------------
*/

@media (max-width: 1023.98px) {
  .carousel-container {
    height: auto;

    background: transparent;

    box-shadow: none;
  }

  .carousel-viewport {
    display: flex;
    flex-direction: column;

    height: auto;

    background: transparent;
  }

  .carousel-media {
    position: relative;

    inset: auto;

    width: 100%;

    aspect-ratio: 3 / 2;

    flex-shrink: 0;

    overflow: hidden;

    background: var(--surface-2, #222);
  }

  .carousel-scrim {
    display: none;
  }

  .carousel-content {
    position: static;

    padding: 1.5rem 1.25rem 0;

    pointer-events: auto;
  }

  .carousel-eyebrow {
    color: #a3a3a3;
  }

  .carousel-heading {
    color: #171717;
  }

  .carousel-body {
    color: #525252;
  }

  .carousel-indicators {
    position: static;

    justify-content: center;

    padding: 1.25rem 1.25rem 1.5rem;
  }

  .carousel-dot {
    background: rgba(23, 23, 23, 0.12);
  }

  .carousel-dot--done {
    background: rgba(23, 23, 23, 0.55);
  }

  .carousel-dot--active {
    background: rgba(23, 23, 23, 0.12);
  }

  .carousel-dot--active::after {
    background: #171717;
  }
}

/*
|--------------------------------------------------------------------------
| Mobile (phone) refinements
|--------------------------------------------------------------------------
*/

@media (max-width: 640px) {
  .carousel-content {
    padding: 1.25rem 1.25rem 0;
  }

  .carousel-eyebrow {
    margin-bottom: 10px;

    font-size: 9px;

    letter-spacing: 1.5px;
  }

  .carousel-heading {
    margin-bottom: 8px;

    font-size: 22px;

    line-height: 1.25;
  }

  .carousel-body {
    font-size: 13px;

    line-height: 1.5;
  }

  .carousel-indicators {
    gap: 5px;

    padding: 1rem 1.25rem 1.25rem;
  }

  .carousel-dot {
    width: 22px;
    height: 3px;
  }
}

/*
|--------------------------------------------------------------------------
| Reduced Motion
|--------------------------------------------------------------------------
*/

@media (prefers-reduced-motion: reduce) {
  .carousel-slide {
    transition:
      opacity 0.3s ease;

    transform: none;
  }

  .carousel-slide--active {
    transform: none;
  }

  .text-rise-enter-active,
  .text-rise-leave-active {
    transition:
      opacity 0.2s ease;
  }

  .text-rise-enter-from {
    transform: none;
  }

  .carousel-dot--active::after {
    animation: none;
    transform: scaleX(1);
  }
}
</style>