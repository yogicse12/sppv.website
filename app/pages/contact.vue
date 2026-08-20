<template>
  <div>
    <Hero
      title="Let's talk about your business"
      subtitle="Whether it's a specific question or an ongoing relationship you're after, we'd be glad to hear from you."
      :primary-cta="null"
      :secondary-cta="null"
    />

    <section class="bg-white py-20 sm:py-24 lg:py-28">
      <div class="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <!-- Form -->
          <div class="lg:col-span-3">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900">
              Send us a message
            </h2>
            <p class="mt-2 text-slate-500">
              Tell us a little about what you need, and we'll get back to you.
            </p>

            <form class="mt-8 flex flex-col gap-6" novalidate @submit.prevent="handleSubmit">
              <div class="grid gap-6 sm:grid-cols-2">
                <div>
                  <label for="name" class="block text-sm font-medium text-slate-700">Full name</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    autocomplete="name"
                    placeholder="Jane Doe"
                    class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                  >
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-slate-700">Email</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    autocomplete="email"
                    placeholder="jane@company.com"
                    class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                  >
                </div>
              </div>

              <div class="grid gap-6 sm:grid-cols-2">
                <div>
                  <label for="phone" class="block text-sm font-medium text-slate-700">
                    Phone <span class="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    autocomplete="tel"
                    placeholder="+91 98765 43210"
                    class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                  >
                </div>

                <div>
                  <label for="service" class="block text-sm font-medium text-slate-700">What do you need help with?</label>
                  <select
                    id="service"
                    v-model="form.service"
                    class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                  >
                    <option value="" disabled>Select an area</option>
                    <option v-for="service in services" :key="service" :value="service">{{ service }}</option>
                    <option value="Something else">Something else</option>
                  </select>
                </div>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-slate-700">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  required
                  placeholder="Tell us a bit about your business and what you're looking for."
                  class="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                />
              </div>

              <div class="flex items-center gap-4">
                <button
                  type="submit"
                  :disabled="submitting"
                  class="inline-flex items-center rounded-full bg-indigo-600 px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {{ submitting ? 'Sending…' : 'Send message' }}
                </button>

                <p v-if="submitted" role="status" aria-live="polite" class="text-[14px] font-medium text-indigo-600">
                  Thanks — we've received your message and will be in touch shortly.
                </p>
              </div>

              <p v-if="errorMessage" role="alert" class="text-[14px] font-medium text-red-600">
                {{ errorMessage }}
              </p>
            </form>
          </div>

          <!-- What happens next -->
          <div class="lg:col-span-2">
            <div class="rounded-3xl bg-[#ededfd] p-8 sm:p-10">
              <h3 class="text-lg font-semibold text-slate-900">
                What happens next
              </h3>

              <ul class="mt-6 flex flex-col gap-5">
                <li v-for="(step, index) in steps" :key="step" class="flex gap-4">
                  <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                    {{ index + 1 }}
                  </span>
                  <span class="text-[15px] leading-relaxed text-slate-600">{{ step }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Contact Us',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with SPPV & Co LLP for tax, accounting, audit and advisory support.'
    }
  ]
})

const services = [
  'International Tax & Cross-Border Advisory',
  'Direct & Indirect Tax',
  'Finance & Accounting Advisory',
  'Transaction & Business Advisory',
  'Global Finance & Outsourcing',
  'Regulatory & Corporate Advisory'
]

const steps = [
  'We read every message and get back to you within one business day.',
  "We'll ask a few questions to understand your situation properly.",
  "We'll recommend next steps — no obligation, no pressure."
]

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

const submitting = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

async function handleSubmit () {
  submitting.value = true
  submitted.value = false
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form }
    })

    submitted.value = true

    form.name = ''
    form.email = ''
    form.phone = ''
    form.service = ''
    form.message = ''
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
