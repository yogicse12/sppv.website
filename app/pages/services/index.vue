<template>
  <div>
    <Hero
      title="Integrated Advisory Solutions"
      subtitle="We provide integrated advisory solutions across taxation, finance, regulatory compliance, cross-border transactions and business strategy. Our services are designed to address complex financial and business requirements, helping organisations and individuals manage risk, improve efficiency, maintain compliance and make confident, commercially informed decisions for sustainable growth."
      :secondary-cta="null"
    />

    <ImageContent
      v-for="(category, index) in serviceCategories"
      :id="category.slug"
      :key="category.title"
      :tagline="category.tagline"
      :title="category.title"
      :image-src="category.image"
      :image-alt="category.title"
      :reverse="index % 2 === 1"
      spacing="compact"
      class="scroll-mt-24 sm:scroll-mt-28"
    >
      <template #details>
        <ul class="flex flex-col divide-y divide-slate-200">
          <li v-for="item in category.items" :key="item" class="flex gap-3 py-4 first:pt-0 last:pb-0">
            <Check class="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" aria-hidden="true" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </template>
    </ImageContent>
  </div>
</template>

<script setup>
import { Check } from '@lucide/vue'

useHead({
  title: 'Services',
  meta: [
    {
      name: 'description',
      content: 'Tax, accounting, audit and advisory services from SPPV & Co LLP — technically sound, practical, and aligned with your objectives.'
    }
  ]
})

const serviceCategories = [
  {
    slug: 'international-tax-cross-border-advisory',
    tagline: '01',
    title: 'International Tax & Cross-Border Advisory',
    image: '/images/services/fema-cross-border.jpg',
    items: [
      'International Taxation',
      'Cross-Border Transaction Structuring',
      'FEMA Advisory & Compliance',
      'FDI / ODI Advisory',
      'NRI Taxation & Repatriation',
      'Transfer Pricing Advisory'
    ]
  },
  {
    slug: 'direct-indirect-tax',
    tagline: '02',
    title: 'Direct & Indirect Tax',
    image: '/images/services/individual-tax.jpg',
    items: [
      'Corporate & Individual Taxation',
      'Tax Advisory & Compliance',
      'Income-Tax Assessments & Litigation Support',
      'Capital Gains & Transaction Advisory',
      'GST Advisory & Compliance',
      'GST Registrations & Returns',
      'Input Tax Credit Reviews',
      'GST Assessments, Notices & Litigation Support'
    ]
  },
  {
    slug: 'finance-accounting-advisory',
    tagline: '03',
    title: 'Finance & Accounting Advisory',
    image: '/images/services/assessments-notices.jpg',
    items: [
      'Accounting & Bookkeeping',
      'Virtual / Outsourced CFO Support',
      'Management Reporting & MIS',
      'Financial Planning & Analysis',
      'Project & Profitability Reporting',
      'Finance Function Transformation'
    ]
  },
  {
    slug: 'transaction-business-advisory',
    tagline: '04',
    title: 'Transaction & Business Advisory',
    image: '/images/services/transaction-advisory.jpg',
    items: [
      'Due Diligence',
      'Valuation Support',
      'M&A & Transaction Support',
      'Business Structuring',
      'Start-up & Founder Advisory'
    ]
  },
  {
    slug: 'global-finance-outsourcing',
    tagline: '05',
    title: 'Global Finance & Outsourcing',
    image: '/images/services/global-finance-operations.jpg',
    items: [
      'Offshore Accounting Support',
      'Finance Operations',
      'Global Bookkeeping',
      'Process Optimisation & Automation',
      'Management Dashboards & Analytics'
    ]
  },
  {
    slug: 'regulatory-corporate-advisory',
    tagline: '06',
    title: 'Regulatory & Corporate Advisory',
    image: '/images/services/corporate-tax.jpg',
    items: [
      'Companies Act Advisory',
      'Regulatory Compliance',
      'Entity Setup & Structuring',
      'Business & Commercial Advisory'
    ]
  }
]
</script>
