export default defineNuxtConfig({
  compatibilityDate: '2026-08-01',

  devtools: {
    enabled: true
  },

  ssr: true,

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  css: [
    '~/assets/scss/styles.scss'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/variables.scss";
          `,
        },
      },
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },

  image: {
    quality: 80,
    format: ['webp', 'avif']
  },

  runtimeConfig: {
    apiSecret: '',

    // Server-only — never exposed to the client bundle.
    resendApiKey: process.env.RESEND_API_KEY || '',
    emailFrom: process.env.EMAIL_FROM || '',
    emailTo: process.env.EMAIL_TO || 'yogicse12@gmail.com',

    public: {
      siteUrl: '',
      siteName: ''
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },

      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ],

      title: 'Home',
      titleTemplate: '%s | SPPV & Co LLP',

      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'true',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap',
        },
      ]
    }
  },

  routeRules: {
    '/': {
      prerender: true
    },

    '/about': {
      prerender: true
    },

    '/services/**': {
      swr: 3600
    },

    '/insights/**': {
      isr: 3600
    },

    '/admin/**': {
      ssr: false
    }
  },

  features: {
    inlineStyles: false,
  }
})