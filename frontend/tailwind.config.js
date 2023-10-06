/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        heading: 'Poppins',
        body: 'Poppins',
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#65de4a',
          secondary: '#cfc9ca',
          accent: '#1534d1',
          neutral: '#1c1c30',
          'base-100': '#e2e2ee',
        },
        dark: {
          primary: '#3cb521',
          secondary: '#363031',
          accent: '#2e4eea',
          neutral: '#1d1d30',
          'base-100': '#12121e',
        },
      },
    ],
  },
};
