/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'
import withMT from '@material-tailwind/react/utils/withMT'

// Remove old colors to suppress warnings.
delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;

export default withMT({
  content: [
    './src/**/*.{mjs,js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    colors: {
      ...colors,
      blue: {
        50: '#EEF8FF',
        100: '#D8EEFF',
        200: '#B9E0FF',
        300: '#89CFFF',
        400: '#52B4FF',
        500: '#2A91FF',
        600: '#0D6EFD',
        700: '#0C5AE9',
        800: '#1149BC',
        900: '#144194',
        950: '#11295A',
      },
      green: {
        50: '#F1FCF3',
        100: '#DEFAE5',
        200: '#BEF4CA',
        300: '#8CE9A3',
        400: '#52D672',
        500: '#2BBC4E',
        600: '#1C9239',
        700: '#1B7A32',
        800: '#1A612C',
        900: '#175027',
        950: '#072C11',
      },
    },
    extend: {
      colors: {
        fireBush: {
          50: '#FEF9EC',
          100: '#FBEFCA',
          200: '#F7DE90',
          300: '#F4C855',
          400: '#F1B12E',
          500: '#EB9824',
          600: '#CF6D10',
          700: '#AC4D11',
          800: '#8C3D14',
          900: '#733214',
          950: '#421806',
        },
      },
      maxHeight: {
        46: '186px',
      },
    },
  },
  plugins: [],
})
