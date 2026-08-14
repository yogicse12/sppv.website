<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <!--
      Header is `fixed`. On the home page the Hero component reserves its
      own top space to sit under the transparent overlay header, but every
      other route needs the page content pushed down to clear the floating
      header card.
    -->
    <main class="flex-1" :class="{ 'pt-20 sm:pt-24 md:pt-28 lg:pt-32': !isHome }">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
const route = useRoute()

const isHome = computed(() => route.path === '/')
</script>