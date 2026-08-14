<template>
  <div>
    <Hero
      title="Services built around your business"
      subtitle="Tax, accounting, audit and advisory support — technically sound, practical, and aligned with your objectives."
      :secondary-cta="null"
    />

    <section class="py-16 sm:py-20 lg:py-24">
      <div class="mx-auto grid max-w-8xl gap-8 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        <ServiceCard
          v-for="service in services"
          :key="service.slug"
          :title="service.title"
          :description="service.description"
          :image-src="service.image"
          :image-alt="service.title"
          :to="`/services/${service.slug}`"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Services',
  meta: [
    {
      name: 'description',
      content: 'Tax, accounting, audit and advisory services from SPPV & Co LLP — technically sound, practical, and aligned with your objectives.'
    }
  ]
})

const services = [
  {
    slug: 'tax-advisory',
    title: 'Tax Advisory',
    description: 'Strategic tax planning and compliance support that keeps you ahead of regulatory change and protects your bottom line.',
    image: '/images/finance.jpg'
  },
  {
    slug: 'accounting-bookkeeping',
    title: 'Accounting & Bookkeeping',
    description: 'Accurate, timely books and management accounts so you always know exactly where your business stands.',
    image: '/images/image-1.jpg'
  },
  {
    slug: 'audit-assurance',
    title: 'Audit & Assurance',
    description: 'Independent audit and assurance services that build confidence with stakeholders, lenders, and regulators.',
    image: '/images/image-2.jpg'
  },
  {
    slug: 'business-advisory',
    title: 'Business Advisory',
    description: 'Practical, commercially minded advice on structuring, growth, and the decisions that matter most.',
    image: '/images/finance.jpg'
  },
  {
    slug: 'compliance-regulatory',
    title: 'Compliance & Regulatory',
    description: 'Stay compliant with evolving statutory requirements without losing focus on running your business.',
    image: '/images/image-1.jpg'
  },
  {
    slug: 'wealth-estate-planning',
    title: 'Wealth & Estate Planning',
    description: "Long-term planning that protects what you've built and prepares it for the next generation.",
    image: '/images/image-2.jpg'
  }
]
</script>
