/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2f9',
          100: '#cce5f3',
          200: '#99cbe7',
          300: '#66b0db',
          400: '#3396cf',
          500: '#007bc3',
          600: '#005EB8',
          700: '#004a93',
          800: '#00376e',
          900: '#002349',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
