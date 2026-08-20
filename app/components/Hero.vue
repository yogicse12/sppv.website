<template>
  <section class="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#05061a]">
    <!-- Navy -> indigo -> white gradient -->
    <div
      class="absolute inset-0 -z-20"
      style="background: linear-gradient(180deg, #05061a 0%, #1c1f6b 22%, #4341d6 42%, #8b8af0 68%, #ffffff 100%);"
    />

    <!-- Subtle grid pattern, fades naturally as the gradient lightens -->
    <div
      class="absolute inset-0 -z-10"
      style="
        background-image:
          linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
        background-size: 80px 80px;
      "
    />

    <div class="mx-auto flex max-w-4xl flex-col items-center gap-5 px-5 pt-6 text-center sm:gap-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-8">
      <span
        v-if="tagline"
        class="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur"
      >
        {{ tagline }}
      </span>

      <h1 class="text-4xl font-semibold leading-loose tracking-normal text-white sm:text-5xl lg:text-6xl">
        {{ title }}
      </h1>

      <p
        v-if="subtitle"
        class="max-w-2xl text-lg leading-relaxed text-indigo-100/70 sm:text-xl"
      >
        {{ subtitle }}
      </p>

      <div
        v-if="primaryCta || secondaryCta"
        class="mt-4 flex flex-wrap items-center justify-center gap-4"
      >
        <Button
          v-if="primaryCta"
          :to="primaryCta.to"
          variant="white"
        >
          {{ primaryCta.label }}
        </Button>

        <Button
          v-if="secondaryCta"
          :to="secondaryCta.to"
          variant="ghost"
          arrow
        >
          {{ secondaryCta.label }}
        </Button>
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
    default: 'Clear thinking for complex tax and financial decisions'
  },

  subtitle: {
    type: String,
    default: "Tax, accounting, audit and advisory support that's technically sound, practical, and aligned with your objectives."
  },

  // { label, to } — pass `null` to hide either button
  primaryCta: {
    type: null,
    default: () => ({ label: 'Book a consultation', to: '/contact' })
  },

  secondaryCta: {
    type: null,
    default: () => ({ label: 'Our services', to: '/services' })
  }
});
</script>
