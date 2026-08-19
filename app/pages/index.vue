<template>
    <div>
        <Hero />
        <ImageContent
            tagline="About SPPV & Co LLP"
            title="Practical Advisory. Global Perspective. Business Focus."
            image-src="/images/finance.jpg"
            image-alt="Finance"
        >
            <template #details>
                <div class="flex flex-col gap-y-4">
                    <p>We are a professional advisory firm providing integrated solutions across taxation, cross-border transactions, finance, regulatory compliance and business advisory. We work closely with businesses, entrepreneurs, multinational groups and individuals, combining technical expertise with a clear understanding of commercial and operational realities.</p>
                    <p>Our approach goes beyond compliance to deliver practical, commercially relevant solutions. From international taxation and FEMA to transaction support, business structuring, finance and accounting, we help clients navigate complexity, manage risk, improve efficiency and make informed decisions that support sustainable growth.</p>
                </div>
                <div class="mt-8">
                    <Button to="/about" :arrow="true">Learn more</Button>
                </div>
            </template>
        </ImageContent>
        <section class="bg-[#ededfd] py-20 sm:py-24 lg:py-32">
            <div class="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8">
                <div class="grid gap-10 lg:grid-cols-2 lg:gap-16 mb-16">
                    <div>
                        <span class="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-600">
                            Our Services
                        </span>
                        <h2 class="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            From compliance to complex advisory, SPPV delivers integrated business support.
                        </h2>
                    </div>
                    <div class="flex flex-col gap-6 text-lg leading-relaxed text-slate-600">
                        <p>Tax, accounting, audit and advisory are interconnected.</p>
                        <p>A business decision can have tax consequences. A tax decision can affect cash flow. A transaction can change your reporting requirements.</p>
                        <p>SPPV brings these perspectives together to provide practical, commercially aware advice.</p>
                    </div>
                </div>
                <div class="grid items-center gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                    <div v-for="(service, index) in services" :key="index">
                        <ServiceCard :title="service.title" :description="service.description" :image-src="service.imageSrc" :image-alt="service.imageAlt" :to="`/services/${service.slug}`" />
                    </div>
                </div>
            </div>
        </section>
        <Testimonial
            tagline="Testimonials"
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