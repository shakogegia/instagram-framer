/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'instagram': 'linear-gradient(30deg, rgba(255,198,0,1) 0%, rgba(255,61,53,1) 51%, rgba(209,0,196,1) 86%)'
      },
      fontFamily: {
        'fsp': 'fontspring_demo_-_blue_vinyRg',
        'fsp-bold': 'fontspring_demo_-_blue_vinyBd-bold',
      },
    },
  },
  plugins: [],
}
