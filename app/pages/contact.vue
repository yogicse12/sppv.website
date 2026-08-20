<template>
  <div class="relative isolate overflow-hidden bg-[#05061a]">
    <!-- Navy -> indigo gradient, matching the Book a Consultation page -->
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
          Get in Touch
        </span>

        <h1 class="mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Let's talk about your business
        </h1>

        <p class="mt-5 text-lg leading-relaxed text-indigo-100/70">
          Whether it's a specific question or an ongoing relationship you're
          after, we'd be glad to hear from you.
        </p>
      </div>

      <!-- Form card -->
      <div class="mx-auto mt-10 max-w-2xl rounded-4xl bg-white p-8 shadow-medium sm:mt-12 sm:p-10 lg:p-12">
        <h2 class="text-2xl font-bold tracking-tight text-slate-900">
          Send us a message
        </h2>
        <p class="mt-2 text-slate-500">
          Share your details and we'll get back to you.
        </p>

        <form class="mt-8" novalidate @submit.prevent="handleSubmit">
          <div class="grid gap-5 sm:grid-cols-2">
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
          </div>

          <div class="mt-5">
            <label for="message" class="block text-sm font-medium text-slate-700">
              Message <span class="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              placeholder="Tell us a bit about your business and what you're looking for."
              class="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
            />
          </div>

          <p v-if="errorMessage" role="alert" class="mt-4 text-[14px] font-medium text-red-600">
            {{ errorMessage }}
          </p>

          <div class="mt-8 flex justify-end border-t border-slate-100 pt-6">
            <Button type="submit" :disabled="submitting || !canSubmit" arrow>
              {{ submitting ? 'Sending…' : 'Send message' }}
            </Button>
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
            Message sent
          </h2>
          <p class="mt-2 max-w-sm text-[15px] leading-relaxed text-slate-500">
            Thanks{{ form.firstName ? `, ${form.firstName}` : '' }} — we've
            received your message and will be in touch shortly.
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
import { ShieldCheck, Clock, Users } from '@lucide/vue'

useHead({
  title: 'Contact Us',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with SPPV & Co LLP for tax, accounting, audit and advisory support.'
    }
  ]
})

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

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})

const submitting = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

const canSubmit = computed(() => Boolean(form.firstName && form.lastName && form.email))

async function handleSubmit () {
  if (!canSubmit.value) return

  submitting.value = true
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
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
// click, or Esc) — resets the form so a returning visitor sees a fresh one.
function handleModalClose (value) {
  submitted.value = value
  if (!value) resetForm()
}

function resetForm () {
  errorMessage.value = ''
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
  form.message = ''
}
</script>
