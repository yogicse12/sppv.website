<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <!-- Shell: transparent on the home hero, white once scrolled (or on any other page) -->
    <div
      class="transition-colors duration-300"
      :class="isFloating ? 'bg-white' : 'bg-transparent'"
    >
      <div class="mx-auto flex h-14 sm:h-16 md:h-20 lg:h-[80px] max-w-8xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex shrink-0 items-center"
          @click="closeMenu"
        >
          <img :src="logoSrc" alt="SPPV & Co LLP" class="h-10 w-auto">
        </NuxtLink>

        <!-- Desktop navigation -->
        <nav class="hidden lg:flex lg:items-center lg:gap-10" aria-label="Primary">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link relative py-2 text-[15px] font-medium transition-colors"
            :class="navLinkClasses(link.to)"
            :aria-current="isActive(link.to) ? 'page' : undefined"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Desktop CTA -->
        <div class="hidden lg:flex lg:items-center">
          <NuxtLink
            to="/contact"
            class="rounded-full bg-indigo-600 px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Book a consultation
          </NuxtLink>
        </div>

        <!-- Mobile menu toggle -->
        <button
          type="button"
          class="hamburger inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
          :class="[
            isFloating
              ? 'text-slate-900 hover:bg-black/5 focus-visible:outline-slate-900'
              : 'text-white hover:bg-white/10 focus-visible:outline-white',
            { 'is-open': isMenuOpen }
          ]"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-nav"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          @click="toggleMenu"
        >
          <span class="hamburger-bar" />
          <span class="hamburger-bar" />
          <span class="hamburger-bar" />
        </button>
      </div>
    </div>

    <!-- Mobile navigation -->
    <Transition name="mobile-nav">
      <nav
        v-if="isMenuOpen"
        id="mobile-nav"
        class="mx-3 mt-2 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-lg sm:mx-4 lg:hidden"
        aria-label="Mobile"
      >
        <ul class="flex flex-col divide-y divide-black/5 px-5 sm:px-6">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="block py-4 text-[17px] font-medium text-slate-800"
              :class="{ 'text-slate-900': isActive(link.to) }"
              :aria-current="isActive(link.to) ? 'page' : undefined"
              @click="closeMenu"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
        <div class="px-5 pb-6 sm:px-6">
          <NuxtLink
            to="/contact"
            class="block rounded-full bg-indigo-600 px-5 py-3 text-center text-[15px] font-medium text-white transition-colors hover:bg-indigo-500"
            @click="closeMenu"
          >
            Get in touch
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
const route = useRoute()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const isMenuOpen = ref(false)

// Only the home page ever shows the transparent overlay state (it has a
// dark hero to sit over). Every other route — and the home page itself
// once scrolled — uses the floating white card.
const isHome = computed(() => route.path === '/')
const scrolled = ref(false)
const isFloating = computed(() => !isHome.value || scrolled.value)

// Dark logo reads on the floating white card; light logo reads on the
// transparent overlay over the dark hero.
const logoSrc = computed(() => isFloating.value ? '/images/logo-dark.png' : '/images/logo-light.png')

const SCROLL_THRESHOLD = 24

function handleScroll () {
  scrolled.value = window.scrollY > SCROLL_THRESHOLD
}

function navLinkClasses (to) {
  const active = isActive(to)

  if (isFloating.value) {
    return active
      ? 'text-slate-900'
      : 'text-slate-600 hover:text-slate-900'
  }

  return active
    ? 'text-white'
    : 'text-white/75 hover:text-white'
}

function toggleMenu () {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu () {
  isMenuOpen.value = false
}

function isActive (to) {
  return to === '/' ? route.path === to : route.path.startsWith(to)
}

// Close the mobile menu whenever navigation happens
watch(() => route.fullPath, closeMenu)

// Lock body scroll while the mobile menu is open
watch(isMenuOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

function handleKeydown (event) {
  if (event.key === 'Escape') closeMenu()
}

function handleResize () {
  // lg breakpoint (1024px) — close the mobile panel if the viewport grows into desktop
  if (window.innerWidth >= 1024) closeMenu()
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
  if (import.meta.client) document.body.style.overflow = ''
});
</script>

<style lang="scss" scoped>
// Animated underline for desktop nav links
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1.5px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.nav-link:hover::after,
.nav-link[aria-current='page']::after {
  transform: scaleX(1);
}

// Animated hamburger -> close icon
// (layout/visibility is handled by Tailwind utilities on the button itself,
// so it shares the same cascade as `lg:hidden` — only bar styling lives here)
.hamburger-bar {
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background-color: currentColor;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hamburger.is-open .hamburger-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.is-open .hamburger-bar:nth-child(2) {
  opacity: 0;
}

.hamburger.is-open .hamburger-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

// Mobile nav enter/leave transition
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
