export default defineNuxtConfig({
  compatibilityDate: '2026-08-01',

  devtools: {
    enabled: true
  },

  ssr: true,

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  css: [
    '~/assets/scss/styles.scss'
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },

  image: {
    quality: 80,
    format: ['webp', 'avif']
  },

  runtimeConfig: {
    apiSecret: '',

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

      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        }
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

    '/blog/**': {
      isr: 3600
    },

    '/admin/**': {
      ssr: false
    }
  }
})