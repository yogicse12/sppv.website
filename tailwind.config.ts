import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1.5rem',
          lg: '2rem'
        }
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },

      maxWidth: {
        '8xl': '1440px'
      }
    }
  }
}