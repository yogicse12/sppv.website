<template>
  <div>
    <!-- Intro -->
    <Hero
      title="Advice built around your business, not a template."
      subtitle="A tax, accounting, audit and advisory practice built around genuinely understanding the business we're serving — not a template we run everyone through."
      :primary-cta="null"
      :secondary-cta="null"
    />

    <!-- Our Story -->
    <ImageContent
      tagline="Our Story"
      title="Built on the belief that good advice starts with listening"
      image-src="/images/finance.jpg"
      image-alt="SPPV & Co LLP at work"
    >
      <template #details>
        <div class="flex flex-col gap-4">
          <p>
            SPPV &amp; Co LLP was founded on a simple premise: tax and financial
            advice is only useful if it accounts for the realities of the
            business it serves.
          </p>
          <p>
            Numbers alone rarely tell the full story. Behind every filing is a
            decision that was made, or one that still needs to be. We start by
            understanding that context — the commercial pressures, the timeline,
            the people involved — before we offer a view.
          </p>
          <p>
            That approach has shaped how we work with every client since:
            technically rigorous, commercially grounded, and built around an
            ongoing relationship rather than a once-a-year conversation.
          </p>
        </div>
      </template>
    </ImageContent>

    <!-- Values -->
    <section class="bg-[#ededfd] py-20 sm:py-24 lg:py-32">
      <div class="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8">
        <div class="max-w-2xl">
          <span class="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-600">
            What We Value
          </span>
          <h2 class="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            The principles behind every engagement
          </h2>
        </div>

        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="value in values"
            :key="value.title"
            class="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5"
          >
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true" v-html="value.icon" />
            </div>
            <h3 class="mt-5 text-lg font-semibold text-slate-900">
              {{ value.title }}
            </h3>
            <p class="mt-2 text-[15px] leading-relaxed text-slate-500">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How We Work -->
    <ImageContent
      reverse
      tagline="How We Work"
      title="Advice that fits how your business actually runs"
      image-src="/images/image-2.jpg"
      image-alt="Meeting with a member of the SPPV & Co LLP team"
    >
      <template #details>
        <ul class="flex flex-col divide-y divide-slate-200">
          <li v-for="point in approach" :key="point" class="flex gap-3 py-4 first:pt-0 last:pb-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{{ point }}</span>
          </li>
        </ul>
      </template>
    </ImageContent>
  </div>
</template>

<script setup>
useHead({
  title: 'About Us',
  meta: [
    {
      name: 'description',
      content: 'Learn more about SPPV & Co LLP, our mission, values, and the team that drives our success. Discover how we provide exceptional services to our clients.'
    }
  ]
})

const values = [
  {
    title: 'Clarity',
    description: 'We explain the reasoning behind every recommendation, not just the recommendation itself.',
    icon: '<circle cx="12" cy="12" r="9" /><path d="M12 8v4l2.5 2.5" />'
  },
  {
    title: 'Integrity',
    description: 'Advice that holds up to scrutiny, whether from a regulator, an auditor, or your own conscience.',
    icon: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />'
  },
  {
    title: 'Partnership',
    description: 'We work alongside you as decisions are made, not just after the fact.',
    icon: '<circle cx="9" cy="9" r="3" /><circle cx="17" cy="10" r="2.5" /><path d="M3.5 19c.6-2.6 2.7-4.3 5.5-4.3s4.9 1.7 5.5 4.3M15 15.2c1.9.2 3.3 1.6 3.8 3.8" />'
  },
  {
    title: 'Precision',
    description: 'Technical accuracy is the baseline. We build practical judgment on top of it.',
    icon: '<circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" />'
  }
]

const approach = [
  "We take the time to understand your business before recommending anything.",
  'We explain the reasoning behind our advice, not just the conclusion.',
  "We stay involved through implementation, not just at the point of sign-off.",
  "We flag risk early, while there's still time to act on it."
]
</script>
