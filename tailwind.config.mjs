/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary-50': '#EEF8FF',
        'primary-100': '#D8EEFF',
        'primary-200': '#B9E0FF',
        'primary-300': '#89CFFF',
        'primary-400': '#52B4FF',
        'primary-500': '#2A91FF',
        'primary-600': '#0D6EFD',
        'primary-700': '#0C5AE9',
        'primary-800': '#1149BC',
        'primary-900': '#144194',
        'primary-950': '#11295A',
      },
    },
  },
  plugins: [],
}
