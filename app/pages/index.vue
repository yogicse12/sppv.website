<template>
    <div>
        <Hero />
        <ImageContent
            tagline="About SPPV & Co LLP"
            title="Professional advice built around trust, clarity and long term thinking"
            image-src="/images/finance.jpg"
            image-alt="Finance"
        >
            <template #details>
                <div class="flex flex-col gap-y-4">
                    <ul class="list-dash">
                        <li>Financial and tax decisions are rarely just about numbers.</li>
                        <li>Behind every return is a business owner.</li>
                        <li>Behind every transaction is a commercial objective.</li>
                        <li>Behind every tax issue is a potential financial consequence.</li>
                    </ul>
                    <p>At SPPV & Co LLP, we believe professional advice should recognise that bigger picture.</p>
                    <p>We work with individuals and organisations to provide tax, accounting, audit and advisory support that is technically sound, practical and aligned with their objectives.</p>
                </div>
                <div class="mt-8">
                    <NuxtLink
                        to="/about"
                        class="inline-flex items-center rounded-full bg-indigo-600 px-8 py-4 text-base font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase"
                    >
                        Learn more about us
                    </NuxtLink>
                </div>
            </template>
        </ImageContent>
        <section class="bg-[#ededfd] py-20 sm:py-24 lg:py-32">
            <div class="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8">
                <div class="grid items-center gap-2 lg:grid-cols-3 lg:gap-4">
                    <div v-for="(service, index) in services" :key="index">
                        <ServiceCard :title="service.title" :description="service.description" :image-src="service.imageSrc" :image-alt="service.imageAlt" :to="`/services/${service.slug}`" />
                    </div>
                </div>
            </div>
        </section>
        <Testimonial
            tagline="Client Stories"
            title="What our clients say"
            :testimonials="testimonials"
        />
    </div>
</template>

<script setup>

const testimonials = [
    {
        quote: 'SPPV took the time to understand our business before recommending anything. Their tax planning saved us real money and a lot of stress.',
        name: 'Priya Nair',
        role: 'Founder',
        company: 'Nair & Sons Textiles'
    },
    {
        quote: 'Clear, practical advice — no jargon, no surprises. Exactly what we needed going into our audit.',
        name: 'Rohan Mehta',
        role: 'CFO',
        company: 'Meridian Logistics'
    },
    {
        quote: 'They feel like part of our team, not just our accountants. Responsive, sharp, and always a step ahead.',
        name: 'Ananya Kapoor',
        role: 'Director',
        company: 'Kapoor Realty Group'
    }
]

const services = [
    {
        title: 'Tax Compliance',
        description: 'We help clients manage income tax compliance accurately, efficiently, and within all applicable statutory deadlines.',
        imageSrc: '/images/services/tax-compliance.jpg',
        imageAlt: 'Tax Compliance'
    },
    {
        title: 'Corporate Tax',
        description: 'We advise companies on tax implications arising from their operations, transactions, investments and business structures.',
        imageSrc: '/images/services/corporate-tax.jpg',
        imageAlt: 'Corporate Tax'
    },
    {
        title: 'Individual Tax',
        description: 'We provide tax advice for professionals, business owners, investors and individuals with complex financial circumstances.',
        imageSrc: '/images/services/individual-tax.jpg',
        imageAlt: 'Individual Tax'
    },
    {
        title: 'Assessments & Notices',
        description: 'When questions arise from the tax authorities, we help clients understand the issue, evaluate their position and prepare an appropriate response.',
        imageSrc: '/images/services/assessments-notices.jpg',
        imageAlt: 'Assessments & Notices'
    },
    {
        title: 'Capital Gains',
        description: 'We advise clients on the tax implications associated with selling, transferring, restructuring, or disposing of assets and investments.',
        imageSrc: '/images/services/capital-gains.jpg',
        imageAlt: 'Capital Gains'
    },
    {
        title: 'Transaction Advisory',
        description: 'Before a major transaction, we help identify potential tax implications so that tax considerations are incorporated into the decision—not discovered afterward.',
        imageSrc: '/images/services/transaction-advisory.jpg',
        imageAlt: 'Transaction Advisory'
    },
]
</script>

<style lang="scss" scoped>
ul.list-dash {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
        position: relative;
        padding: 16px 0 16px 30px;
        font-size: 15px;
        line-height: 1.5;
        color: #333;
        border-bottom: 1px solid #e5e5e5;
        &:before {
            content: "—";
            position: absolute;
            left: 0;
            color: #999;
        }
        &:last-child {
            border-bottom: none;
        }
    }
}
</style>