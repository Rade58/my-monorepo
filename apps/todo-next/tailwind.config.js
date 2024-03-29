/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  // plugins: [],
  plugins: [require('daisyui')],
  // daisyUI config (optional)
  daisyui: {
    styled: true,

    themes: ['retro'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    // darkTheme: "dark",
  },
  darkMode: 'media',
};
