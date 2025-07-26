/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bronze: {
          50: '#f9f6f1',
          100: '#f1e8d7',
          200: '#e6d2b3',
          300: '#d9b989',
          400: '#cca05f',
          500: '#c08b45',
          600: '#b07339',
          700: '#925a32',
          800: '#774830',
          900: '#633c2c',
          950: '#351e16',
        },
        light: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#f0f0f0',
          400: '#e4e4e7',
          500: '#d4d4d8',
        },
        dark: {
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
          600: '#222222',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'bodoni': ['"Bodoni Moda"', 'serif'],
      },
      maxWidth: {
        '8xl': '90rem', // 1440px
        '9xl': '100rem', // 1600px
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.midjourney.com/b5b0189a-3ea7-4c89-be91-1143d05de263/0_1.png')",
        'about-pattern': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.midjourney.com/09cc389c-d756-43bd-9230-ec03a89374aa/0_0.png')",
        'services-pattern': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.midjourney.com/5ab36683-16f9-4731-b23f-1e3f23ebdbfb/0_0.png')",
        'contact-pattern': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.midjourney.com/588177fc-2c93-4b13-a6ba-2b3b4751e828/0_0.png')",
        'portfolio-pattern': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.midjourney.com/7693ce2b-d5df-4cb0-9f0c-dff2c3bdc11b/0_0.png')",
        'insights-pattern': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.midjourney.com/639fb269-03dc-4d99-9312-312db578b636/0_0.png')",
        'secondary-pattern': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.midjourney.com/30b0fbd2-8502-44cf-adb6-5b71271f0c5f/0_3.png')",
      },
    },
  },
  plugins: [],
};