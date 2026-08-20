<template>
  <div class="relative isolate overflow-hidden bg-[#05061a]">
    <!-- Navy -> indigo gradient, deliberately never fades to white so the
         trust row below the card stays legible for the full page height -->
    <div
      class="absolute inset-0 -z-20"
      style="background: linear-gradient(180deg, #05061a 0%, #12123f 45%, #1c1f6b 100%);"
    />
    <div
      class="absolute inset-0 -z-10"
      style="
        background-image:
          linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
        background-size: 80px 80px;
      "
    />

    <div class="mx-auto max-w-8xl px-5 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
      <!-- Intro -->
      <div class="mx-auto max-w-2xl text-center">
        <span class="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
          Schedule Your Session
        </span>

        <h1 class="mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Book a Consultation
        </h1>

        <p class="mt-5 text-lg leading-relaxed text-indigo-100/70">
          Take the first step towards clarity on your tax, accounting or
          advisory needs. Tell us a little about your business and we'll be
          in touch to confirm a time.
        </p>
      </div>

      <!-- Step indicator -->
      <div class="mt-10 flex items-center justify-center gap-x-8 sm:mt-12 sm:gap-x-16">
        <div v-for="(step, index) in stepMeta" :key="step.label" class="flex flex-col items-center gap-2">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-semibold ring-1 ring-inset transition-colors duration-300"
            :class="stepStatus(index + 1) === 'upcoming' ? 'bg-white/10 text-white/50 ring-white/10' : 'bg-indigo-600 text-white ring-indigo-400/40'"
          >
            <Check v-if="stepStatus(index + 1) === 'done'" class="h-5 w-5" :stroke-width="3" aria-hidden="true" />
            <template v-else>{{ index + 1 }}</template>
          </span>
          <span
            class="text-[13px] font-medium transition-colors duration-300"
            :class="stepStatus(index + 1) === 'upcoming' ? 'text-white/50' : 'text-white'"
          >
            {{ step.label }}
          </span>
        </div>
      </div>

      <!-- Form card -->
      <div class="mx-auto mt-10 max-w-3xl rounded-4xl bg-white p-8 shadow-medium sm:mt-12 sm:p-10 lg:p-12">
        <form novalidate @submit.prevent="handleSubmit">
            <!-- Step 1: Personal Details -->
            <div v-show="currentStep === 1">
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">
                Personal Details
              </h2>
              <p class="mt-2 text-slate-500">
                Tell us about yourself so we can prepare for your consultation.
              </p>

              <div class="mt-8 grid gap-5 sm:grid-cols-2">
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
                    placeholder="John"
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
                    placeholder="Doe"
                    class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                  >
                </div>
              </div>

              <div class="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label for="email" class="block text-sm font-medium text-slate-700">
                    Email address <span class="text-indigo-600">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    autocomplete="email"
                    placeholder="john@company.com"
                    class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                  >
                </div>

                <div>
                  <label for="phone" class="block text-sm font-medium text-slate-700">
                    Phone number <span class="text-indigo-600">*</span>
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

              <div class="mt-5">
                <label for="company" class="block text-sm font-medium text-slate-700">
                  Company / Organization
                  <span class="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  autocomplete="organization"
                  placeholder="Your company name"
                  class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                >
              </div>

              <div class="mt-8 border-t border-slate-100 pt-6">
                <div class="flex justify-end">
                  <Button type="button" arrow :disabled="!canProceed" @click="next">
                    Continue
                  </Button>
                </div>
              </div>
            </div>

            <!-- Step 2: Consultation Details -->
            <div v-show="currentStep === 2">
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">
                Consultation Details
              </h2>
              <p class="mt-2 text-slate-500">
                Select your preferred service and schedule.
              </p>

              <div class="mt-8">
                <label for="service" class="block text-sm font-medium text-slate-700">
                  Service type <span class="text-indigo-600">*</span>
                </label>
                <div class="relative mt-2">
                  <select
                    id="service"
                    v-model="form.service"
                    required
                    class="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-[15px] text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                  >
                    <option value="" disabled>Select a service</option>
                    <option v-for="service in services" :key="service" :value="service">{{ service }}</option>
                    <option value="Something else">Something else</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" :stroke-width="2" aria-hidden="true" />
                </div>
              </div>

              <div class="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium text-slate-700">
                    Preferred date <span class="text-indigo-600">*</span>
                  </label>
                  <div class="date-picker-field mt-2">
                    <ClientOnly>
                      <VueDatePicker
                        v-model="form.preferredDate"
                        model-type="yyyy-MM-dd"
                        :min-date="minSelectableDate"
                        :time-config="{ enableTimePicker: false }"
                        :formats="{ input: 'dd/MM/yyyy' }"
                        :input-attrs="{ clearable: false }"
                        :auto-apply="true"
                        placeholder="Select a date"
                      >
                        <template #input-icon>
                          <CalendarIcon class="ml-3 h-5 w-5 text-slate-400" :stroke-width="1.75" aria-hidden="true" />
                        </template>
                      </VueDatePicker>
                      <template #fallback>
                        <div class="flex h-[46px] w-full items-center gap-2.5 rounded-xl border border-slate-200 px-4 text-[15px] text-slate-400">
                          <CalendarIcon class="h-5 w-5" :stroke-width="1.75" aria-hidden="true" />
                          Select a date
                        </div>
                      </template>
                    </ClientOnly>
                  </div>
                </div>

                <div>
                  <label for="preferredTime" class="block text-sm font-medium text-slate-700">
                    Preferred time <span class="text-indigo-600">*</span>
                  </label>
                  <div class="relative mt-2">
                    <select
                      id="preferredTime"
                      v-model="form.preferredTime"
                      required
                      class="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-[15px] text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                    >
                      <option value="" disabled>Select a time slot</option>
                      <option v-for="slot in timeSlots" :key="slot" :value="slot">{{ slot }}</option>
                    </select>
                    <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" :stroke-width="2" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <p class="mt-3 text-[13px] text-slate-400">
                This is a preferred time — we'll confirm the exact slot based on availability.
              </p>

              <div class="mt-6">
                <span class="block text-sm font-medium text-slate-700">Consultation format</span>

                <div class="mt-3 grid gap-4 sm:grid-cols-3">
                  <button
                    v-for="option in formatOptions"
                    :key="option.value"
                    type="button"
                    class="flex flex-col items-center gap-2 rounded-2xl border p-5 text-center transition-colors"
                    :class="form.format === option.value
                      ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:border-slate-300'"
                    @click="form.format = option.value"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-slate-500" aria-hidden="true" v-html="option.icon" />
                    <span class="text-[15px] font-semibold text-slate-900">{{ option.label }}</span>
                    <span class="text-[13px] text-slate-500">{{ option.description }}</span>
                  </button>
                </div>
              </div>

              <div class="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                <button type="button" class="inline-flex items-center gap-1.5 text-[14px] font-medium text-slate-500 transition-colors hover:text-slate-900" @click="back">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Back
                </button>

                <Button type="button" arrow :disabled="!canProceed" @click="next">
                  Continue
                </Button>
              </div>
            </div>

            <!-- Step 3: Additional Information -->
            <div v-show="currentStep === 3">
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">
                Additional Information
              </h2>
              <p class="mt-2 text-slate-500">
                Any details that will help us prepare for your consultation.
              </p>

              <div class="mt-8">
                <label for="message" class="block text-sm font-medium text-slate-700">
                  How can we help you?
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  placeholder="Briefly describe your business challenge or what you'd like to discuss…"
                  class="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                />
              </div>

              <div class="mt-5">
                <label for="howHeard" class="block text-sm font-medium text-slate-700">
                  How did you hear about us?
                </label>
                <div class="relative mt-2">
                  <select
                    id="howHeard"
                    v-model="form.howHeard"
                    class="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-[15px] text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                  >
                    <option value="">Select an option (optional)</option>
                    <option v-for="option in howHeardOptions" :key="option" :value="option">{{ option }}</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" :stroke-width="2" aria-hidden="true" />
                </div>
              </div>

              <!-- Summary -->
              <div class="mt-8 rounded-2xl bg-slate-50 p-6">
                <p class="text-sm font-semibold text-slate-900">
                  Consultation Summary
                </p>

                <dl class="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  <div>
                    <dt class="text-[11px] font-medium uppercase tracking-wide text-slate-400">Name</dt>
                    <dd class="mt-1 text-[15px] font-semibold text-slate-900">{{ fullName || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-[11px] font-medium uppercase tracking-wide text-slate-400">Email</dt>
                    <dd class="mt-1 text-[15px] font-semibold text-slate-900">{{ form.email || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-[11px] font-medium uppercase tracking-wide text-slate-400">Service</dt>
                    <dd class="mt-1 text-[15px] font-semibold text-slate-900">{{ form.service || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-[11px] font-medium uppercase tracking-wide text-slate-400">Date &amp; time</dt>
                    <dd class="mt-1 text-[15px] font-semibold text-slate-900">{{ formattedSchedule }}</dd>
                  </div>
                  <div>
                    <dt class="text-[11px] font-medium uppercase tracking-wide text-slate-400">Format</dt>
                    <dd class="mt-1 text-[15px] font-semibold text-slate-900">{{ formatLabel }}</dd>
                  </div>
                  <div v-if="form.company">
                    <dt class="text-[11px] font-medium uppercase tracking-wide text-slate-400">Company</dt>
                    <dd class="mt-1 text-[15px] font-semibold text-slate-900">{{ form.company }}</dd>
                  </div>
                </dl>
              </div>

              <label class="mt-6 flex items-start gap-3 text-[14px] leading-relaxed text-slate-600">
                <input
                  v-model="consent"
                  type="checkbox"
                  required
                  class="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600/30"
                >
                <span>
                  I agree to be contacted about this enquiry and for the
                  details above to be used to prepare for the consultation.
                  <span class="text-indigo-600">*</span>
                </span>
              </label>

              <p v-if="errorMessage" role="alert" class="mt-4 text-[14px] font-medium text-red-600">
                {{ errorMessage }}
              </p>

              <div class="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                <button type="button" class="inline-flex items-center gap-1.5 text-[14px] font-medium text-slate-500 transition-colors hover:text-slate-900" @click="back">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Back
                </button>

                <Button type="submit" :disabled="submitting || !consent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  {{ submitting ? 'Booking…' : 'Book Consultation' }}
                </Button>
              </div>
            </div>
          </form>
      </div>

      <!-- Success modal -->
      <Modal :model-value="submitted" @update:model-value="handleModalClose">
        <div class="flex flex-col items-center py-2 text-center">
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
            received your request and will be in touch to confirm your
            consultation.
          </p>

          <Button class="mt-6" @click="handleModalClose(false)">
            Done
          </Button>
        </div>
      </Modal>

      <!-- Trust row -->
      <div class="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-4">
        <div
          v-for="item in trustItems"
          :key="item.label"
          class="flex items-center gap-3 rounded-full bg-white/5 py-2.5 pl-2.5 pr-5 ring-1 ring-inset ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
        >
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
            <component :is="item.icon" class="h-5 w-5" :stroke-width="1.75" aria-hidden="true" />
          </span>
          <span class="text-[14px] font-medium text-white/90">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShieldCheck, Clock, Users, Check, Calendar as CalendarIcon, ChevronDown } from '@lucide/vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

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
  'International Tax & Cross-Border Advisory',
  'Direct & Indirect Tax',
  'Finance & Accounting Advisory',
  'Transaction & Business Advisory',
  'Global Finance & Outsourcing',
  'Regulatory & Corporate Advisory'
]

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

const howHeardOptions = ['Google Search', 'Referral', 'LinkedIn', 'Social Media', 'Existing Client', 'Other']

const formatOptions = [
  {
    value: 'Virtual',
    label: 'Virtual Meeting',
    description: 'Zoom / Google Meet',
    icon: '<path d="M15 8l5-3v14l-5-3" /><rect x="3" y="6" width="12" height="12" rx="2" />'
  },
  {
    value: 'In-Person',
    label: 'In-Person',
    description: 'At our office',
    icon: '<path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6" />'
  },
  {
    value: 'Phone',
    label: 'Phone Call',
    description: "We'll call you",
    icon: '<path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 0-2Z" />'
  }
]

const trustItems = [
  {
    label: 'Confidential',
    icon: ShieldCheck
  },
  {
    label: 'Response within 24 hours',
    icon: Clock
  },
  {
    label: 'Expert Advisors',
    icon: Users
  }
]

const stepMeta = [
  { label: 'Your Details' },
  { label: 'Consultation' },
  { label: 'Confirm' }
]

const minSelectableDate = new Date()

const currentStep = ref(1)
const consent = ref(false)
const submitting = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  preferredDate: '',
  preferredTime: '',
  format: 'Virtual',
  message: '',
  howHeard: ''
})

const fullName = computed(() => `${form.firstName} ${form.lastName}`.trim())

const formatLabel = computed(() => {
  const match = formatOptions.find((option) => option.value === form.format)
  return match ? `${match.label} (${match.description})` : '—'
})

const formattedSchedule = computed(() => {
  if (!form.preferredDate || !form.preferredTime) return '—'

  const date = new Date(`${form.preferredDate}T00:00:00`)
  const formattedDate = date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return `${formattedDate} at ${form.preferredTime}`
})

const canProceed = computed(() => {
  if (currentStep.value === 1) {
    return Boolean(form.firstName && form.lastName && form.email && form.phone)
  }

  if (currentStep.value === 2) {
    return Boolean(form.service && form.preferredDate && form.preferredTime)
  }

  return true
})

function stepStatus (step) {
  if (step < currentStep.value) return 'done'
  if (step === currentStep.value) return 'active'
  return 'upcoming'
}

function next () {
  if (!canProceed.value) return
  if (currentStep.value < 3) currentStep.value += 1
}

function back () {
  if (currentStep.value > 1) currentStep.value -= 1
}

async function handleSubmit () {
  if (!canProceed.value || !consent.value) return

  submitting.value = true
  errorMessage.value = ''

  try {
    await $fetch('/api/book-consultation', {
      method: 'POST',
      body: { ...form }
    })

    submitted.value = true
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}

// Called when the success modal closes (via the Done button, backdrop
// click, or Esc) — resets the wizard so a returning visitor sees a fresh
// form rather than the just-submitted one.
function handleModalClose (value) {
  submitted.value = value
  if (!value) resetForm()
}

function resetForm () {
  currentStep.value = 1
  consent.value = false
  errorMessage.value = ''

  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
  form.company = ''
  form.service = ''
  form.preferredDate = ''
  form.preferredTime = ''
  form.format = 'Virtual'
  form.message = ''
  form.howHeard = ''
}
</script>

<style scoped>
/* Theme the date picker to match this form's inputs, using the library's
   documented CSS custom properties rather than fighting its internal markup. */
.date-picker-field {
  --dp-primary-color: #4f46e5;
  --dp-border-color: #e2e8f0;
  --dp-border-color-hover: #4f46e5;
  --dp-border-radius: 0.75rem;
  --dp-cell-border-radius: 9999px;
  --dp-font-family: inherit;
  --dp-input-padding: 0.75rem 1rem;
  --dp-font-size: 15px;
  --dp-cell-size: 32px;
}

.date-picker-field :deep(.dp__input) {
  border-color: #e2e8f0;
  color: #0f172a;
}

.date-picker-field :deep(.dp__input:hover) {
  border-color: #cbd5e1;
}

.date-picker-field :deep(.dp__input_focus) {
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}
</style>
