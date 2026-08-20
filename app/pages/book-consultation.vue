<template>
  <div class="bg-[#ededfd] py-20 sm:py-24 lg:py-28">
    <div class="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <!-- Intro -->
        <div>
          <span class="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-600">
            Book a Consultation
          </span>

          <h1 class="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Let's get started
          </h1>

          <p class="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
            Ready to talk through your tax, accounting or advisory needs?
            Tell us a little about your business and we'll set up a time to
            talk.
          </p>
        </div>

        <!-- Form card -->
        <div class="rounded-4xl bg-white p-8 shadow-medium ring-1 ring-slate-900/5 sm:p-10">
          <template v-if="!submitted">
            <span class="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3.5 py-1.5 text-[13px] font-medium text-indigo-600">
              <span class="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              Typically responds within one business day
            </span>

            <h2 class="mt-5 text-2xl font-bold tracking-tight text-slate-900">
              Book your consultation
            </h2>
            <p class="mt-2 text-slate-500">
              Takes about a minute — we'll handle the rest.
            </p>

            <!-- Progress -->
            <div class="mt-8 grid grid-cols-3 gap-1.5" aria-hidden="true">
              <span
                v-for="step in 3"
                :key="step"
                class="h-1.5 rounded-full transition-colors duration-300"
                :class="step <= currentStep ? 'bg-indigo-600' : 'bg-slate-200'"
              />
            </div>

            <form class="mt-8" novalidate @submit.prevent="handleSubmit">
              <!-- Step 1: You -->
              <div v-show="currentStep === 1">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-semibold uppercase tracking-wide text-indigo-600">You</span>
                  <span class="h-px flex-1 bg-slate-200" />
                </div>

                <div class="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-slate-700">
                      First name <span class="text-indigo-600">*</span>
                    </label>
                    <input
                      id="firstName"
                      v-model="form.firstName"
                      type="text"
                      required
                      autocomplete="given-name"
                      placeholder="e.g. Priya"
                      class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                    >
                  </div>

                  <div>
                    <label for="lastName" class="block text-sm font-medium text-slate-700">
                      Last name <span class="text-indigo-600">*</span>
                    </label>
                    <input
                      id="lastName"
                      v-model="form.lastName"
                      type="text"
                      required
                      autocomplete="family-name"
                      placeholder="e.g. Nair"
                      class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                    >
                  </div>
                </div>

                <div class="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label for="email" class="block text-sm font-medium text-slate-700">
                      Work email <span class="text-indigo-600">*</span>
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      autocomplete="email"
                      placeholder="you@company.com"
                      class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                    >
                  </div>

                  <div>
                    <label for="phone" class="block text-sm font-medium text-slate-700">
                      Phone <span class="text-indigo-600">*</span>
                    </label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      required
                      autocomplete="tel"
                      placeholder="+91 98765 43210"
                      class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                    >
                  </div>
                </div>
              </div>

              <!-- Step 2: Your business -->
              <div v-show="currentStep === 2">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-semibold uppercase tracking-wide text-indigo-600">Your business</span>
                  <span class="h-px flex-1 bg-slate-200" />
                </div>

                <div class="mt-5">
                  <label for="company" class="block text-sm font-medium text-slate-700">
                    Company name <span class="text-indigo-600">*</span>
                  </label>
                  <input
                    id="company"
                    v-model="form.company"
                    type="text"
                    required
                    autocomplete="organization"
                    placeholder="e.g. Nair & Sons Textiles"
                    class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                  >
                </div>

                <div class="mt-5">
                  <label for="service" class="block text-sm font-medium text-slate-700">
                    What do you need help with?
                  </label>
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

              <!-- Step 3: Message -->
              <div v-show="currentStep === 3">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-semibold uppercase tracking-wide text-indigo-600">Message</span>
                  <span class="h-px flex-1 bg-slate-200" />
                </div>

                <div class="mt-5">
                  <label for="message" class="block text-sm font-medium text-slate-700">
                    Anything we should know before we call?
                    <span class="font-normal text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="4"
                    placeholder="A little context helps us prepare."
                    class="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                  />
                </div>
              </div>

              <!-- Actions -->
              <div class="mt-8 flex items-center justify-between">
                <button
                  v-if="currentStep > 1"
                  type="button"
                  class="text-[14px] font-medium text-slate-500 transition-colors hover:text-slate-900"
                  @click="back"
                >
                  Back
                </button>
                <span v-else />

                <Button
                  v-if="currentStep < 3"
                  type="button"
                  arrow
                  :disabled="!canProceed"
                  @click="next"
                >
                  Next
                </Button>

                <Button
                  v-else
                  type="submit"
                  :disabled="submitting || !canProceed"
                >
                  {{ submitting ? 'Booking…' : 'Book consultation' }}
                </Button>
              </div>
            </form>

            <p class="mt-6 text-center text-[13px] text-slate-400">
              By submitting, you agree to be contacted about your enquiry.
              We never share your details.
            </p>
          </template>

          <!-- Success state -->
          <div v-else class="flex flex-col items-center py-10 text-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 class="mt-5 text-2xl font-bold tracking-tight text-slate-900">
              You're all set
            </h2>
            <p class="mt-2 max-w-sm text-[15px] leading-relaxed text-slate-500">
              Thanks{{ form.firstName ? `, ${form.firstName}` : '' }} — we've
              received your request and will be in touch within one
              business day.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Book a Consultation',
  meta: [
    {
      name: 'description',
      content: "Book a consultation with SPPV & Co LLP. Tell us a little about your business and we'll set up a time to talk."
    }
  ]
})

const services = [
  'Tax Advisory',
  'Accounting & Bookkeeping',
  'Audit & Assurance',
  'Business Advisory',
  'Compliance & Regulatory',
  'Wealth & Estate Planning'
]

const currentStep = ref(1)
const submitting = ref(false)
const submitted = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: ''
})

const canProceed = computed(() => {
  if (currentStep.value === 1) {
    return Boolean(form.firstName && form.lastName && form.email && form.phone)
  }

  if (currentStep.value === 2) {
    return Boolean(form.company)
  }

  return true
})

function next () {
  if (!canProceed.value) return
  if (currentStep.value < 3) currentStep.value += 1
}

function back () {
  if (currentStep.value > 1) currentStep.value -= 1
}

async function handleSubmit () {
  if (!canProceed.value) return

  submitting.value = true

  // NOTE: this is not wired up to a real endpoint yet — there's no
  // server route or email service configured. Swap this out for an
  // actual API call once one exists.
  await new Promise((resolve) => setTimeout(resolve, 600))

  submitting.value = false
  submitted.value = true
}
</script>
