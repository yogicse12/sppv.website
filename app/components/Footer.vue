<template>
  <footer class="relative overflow-hidden bg-[#ededfd]">
    <div class="mx-auto max-w-8xl px-5 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">

        <div class="lg:col-span-4">
          <p class="text-sm font-medium text-slate-400">
            SPPV & Co. LLP
          </p>
          <p class="mt-5 max-w-sm text-[15px] leading-relaxed text-slate-600">
            SPPV & Co. LLP is a professional services firm providing tax, accounting, audit and advisory support to individuals and organisations. We help our clients make informed decisions that are technically sound, practical and aligned with their objectives.
          </p>
        </div>

        <!-- Company -->
        <div class="lg:col-span-2">
          <p class="text-sm font-medium text-slate-400">
            Company
          </p>
          <ul class="mt-5 space-y-3.5">
            <li v-for="link in companyLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-[15px] text-slate-700 transition-colors hover:text-indigo-600">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <!-- Services -->
        <div class="lg:col-span-3">
          <p class="text-sm font-medium text-slate-400">
            Services
          </p>
          <ul class="mt-5 space-y-3.5">
            <li v-for="service in services" :key="service.to">
              <NuxtLink :to="service.to" class="text-[15px] text-slate-700 transition-colors hover:text-indigo-600">
                {{ service.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Get in touch -->
        <div class="lg:col-span-3">
          <p class="text-sm font-medium text-slate-400">
            Get in touch
          </p>
          <p class="mt-5 max-w-sm text-[15px] leading-relaxed text-slate-600">
            Have a question about your tax, accounting, or advisory needs?
            We'd be glad to hear from you.
          </p>
          <NuxtLink
            to="/book-consultation"
            class="mt-6 inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Book a consultation
          </NuxtLink>

          <div class="mt-6 flex flex-col gap-2.5 text-[14px] text-slate-600">
            <p class="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true">
                <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 0-2Z" />
              </svg>
              <a href="tel:+919811635695" class="transition-colors hover:text-indigo-600">+91 9811635695</a>
              <span aria-hidden="true" class="text-slate-300">/</span>
              <a href="tel:+918655087696" class="transition-colors hover:text-indigo-600">+91 8655087696</a>
            </p>
            <p class="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              <a href="mailto:sppv2026@outlook.com" class="transition-colors hover:text-indigo-600">sppv2026@outlook.com</a>
            </p>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="mt-16 border-t border-slate-900/10 pt-8 sm:mt-20 flex items-center justify-between gap-6 sm:flex-row">
        <p class="text-[13px] text-slate-500">
          &copy; {{ currentYear }} SPPV &amp; Co LLP. All rights reserved.
        </p>
        <div class="mt-8 flex items-center gap-3">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              class="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-slate-500 transition-colors hover:bg-white hover:text-indigo-600"
              :aria-label="social.label"
              target="_blank"
              rel="noopener noreferrer"
              v-html="social.icon"
            />
          </div>
      </div>
    </div>

    <!-- Decorative brand mark, bleeding off the bottom edge -->
    <div class="relative mt-4 h-16 select-none overflow-hidden sm:h-36 lg:h-48 text-center" aria-hidden="true">
      <div class="absolute inset-x-0 bottom-[-0.35em] flex items-center justify-center gap-3 px-5 sm:justify-start sm:gap-4 sm:px-8 lg:px-12 text-center">
        <span class="text-[2rem] font-black leading-none tracking-tight text-indigo-400/25 sm:text-[8rem] lg:text-[11rem] text-center mx-auto">
          SPPV & Co LLP
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()

const services = [
  { label: 'International Tax & Cross-Border Advisory', to: '/services#international-tax-cross-border-advisory' },
  { label: 'Direct & Indirect Tax', to: '/services#direct-indirect-tax' },
  { label: 'Finance & Accounting Advisory', to: '/services#finance-accounting-advisory' },
  { label: 'Transaction & Business Advisory', to: '/services#transaction-business-advisory' },
  { label: 'Global Finance & Outsourcing', to: '/services#global-finance-outsourcing' },
  { label: 'Regulatory & Corporate Advisory', to: '/services#regulatory-corporate-advisory' }
]

const companyLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' }
]

const socials = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.33V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>'
  },
  {
    label: 'X',
    href: '#',
    icon: '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M18.24 3h3.02l-6.6 7.54L22.5 21h-6.08l-4.76-6.23L6.2 21H3.17l7.06-8.07L2 3h6.23l4.3 5.69L18.24 3Zm-1.06 16.17h1.67L7.9 4.74H6.1l11.08 14.43Z"/></svg>'
  },
  {
    label: 'YouTube',
    href: '#',
    icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M21.58 7.2a2.75 2.75 0 0 0-1.94-1.95C17.9 4.75 12 4.75 12 4.75s-5.9 0-7.64.5A2.75 2.75 0 0 0 2.42 7.2 28.6 28.6 0 0 0 1.92 12a28.6 28.6 0 0 0 .5 4.8 2.75 2.75 0 0 0 1.94 1.95c1.74.5 7.64.5 7.64.5s5.9 0 7.64-.5a2.75 2.75 0 0 0 1.94-1.95c.34-1.58.51-3.19.5-4.8a28.6 28.6 0 0 0-.5-4.8ZM9.9 15.02V8.98L15.5 12l-5.6 3.02Z"/></svg>'
  }
]
</script>
