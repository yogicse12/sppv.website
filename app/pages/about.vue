<template>
  <div>
    <!-- Intro -->
    <Hero
      tagline="About Us"
      title="A professional advisory firm built on technical depth and commercial judgment"
      subtitle="We are a professional advisory firm providing integrated solutions across taxation, cross-border transactions, finance, regulatory compliance and business advisory."
      :primary-cta="null"
      :secondary-cta="null"
    />

    <!-- Our Approach -->
    <ImageContent
      tagline="Our Approach"
      title="Technical expertise, grounded in commercial and operational reality"
      image-src="/images/finance.jpg"
      image-alt="SPPV & Co LLP at work"
    >
      <template #details>
        <div class="flex flex-col gap-4">
          <p>
            Our approach combines technical expertise with a strong
            understanding of commercial and operational realities. We work
            closely with businesses, entrepreneurs, multinational groups and
            individuals to help them navigate complex regulatory
            environments, structure transactions, improve financial
            processes and make informed business decisions.
          </p>
        </div>
      </template>
    </ImageContent>

    <!-- Capabilities -->
    <section class="bg-[#ededfd] py-20 sm:py-24 lg:py-32">
      <div class="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8">
        <h2 class="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Our Capabilities
        </h2>

        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CapabilityCard
            v-for="capability in capabilities"
            :key="capability.title"
            :title="capability.title"
            :image-src="capability.image"
            :image-alt="capability.title"
          />
        </div>
      </div>
    </section>

    <!-- Our Objective -->
    <ImageContent
      reverse
      tagline="Our Objective"
      title="Advisory that goes beyond compliance"
      image-src="/images/image-2.jpg"
      image-alt="Meeting with a member of the SPPV & Co LLP team"
    >
      <template #details>
        <div class="flex flex-col gap-4">
          <p>
            We believe advisory should go beyond compliance. Our objective is
            to provide practical, commercially relevant solutions that help
            clients manage risk, improve efficiency and support sustainable
            growth.
          </p>
          <p>
            With experience across professional services, consulting and
            corporate environments, our team brings together technical
            knowledge, execution capability and a business-oriented approach
            to every engagement.
          </p>
        </div>
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
      content: 'SPPV & Co LLP is a professional advisory firm providing integrated solutions across taxation, cross-border transactions, finance, regulatory compliance and business advisory.'
    }
  ]
})

const capabilities = [
  {
    title: 'International Taxation',
    image: '/images/about/capabilities/international-tax.jpg'
  },
  {
    title: 'FEMA & Cross-Border Advisory',
    image: '/images/about/capabilities/fema-cross-border.jpg'
  },
  {
    title: 'Direct & Indirect Taxation',
    image: '/images/about/capabilities/individual-tax.jpg'
  },
  {
    title: 'Finance & Accounting Advisory',
    image: '/images/about/capabilities/tax-compliance.jpg'
  },
  {
    title: 'Transaction Support',
    image: '/images/about/capabilities/transaction-advisory.jpg'
  },
  {
    title: 'Business Structuring',
    image: '/images/about/capabilities/assessments-notices.jpg'
  },
  {
    title: 'Global Finance Operations',
    image: '/images/about/capabilities/global-finance-operations.jpg'
  }
]
</script>
