/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f4f9',
          100: '#b3ddef',
          200: '#80c7e4',
          300: '#4db0da',
          400: '#1a9acf',
          500: '#117ACA',
          600: '#0e61a2',
          700: '#0b4979',
          800: '#073051',
          900: '#041828',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
