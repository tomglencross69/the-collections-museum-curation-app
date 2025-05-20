import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      maxWidth: {
        content: '1280px'
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config