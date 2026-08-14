<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <!--
      Header is `fixed`. Routes with a dark Hero at the top (see
      useHasOverlayHero) reserve their own top space to sit under the
      transparent overlay header, but every other route needs the page
      content pushed down to clear the floating white header.
    -->
    <main class="flex-1" :class="{ 'pt-20 sm:pt-24 md:pt-28 lg:pt-32': !hasOverlayHero }">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
const hasOverlayHero = useHasOverlayHero()
</script>
