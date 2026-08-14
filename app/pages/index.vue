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
    </div>
</template>

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