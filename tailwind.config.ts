import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        red:    '#FF3C00',  // Main / logo colour
        blue:   '#00006A',  // Primary text / dark backgrounds
        cream:  '#F8F8F8',  // Background white
        yellow: '#EDFF00',  // Accent — use only with red
      },
      fontFamily: {
        sans: ['Vulf Sans', 'sans-serif'],
      },
      fontWeight: {
        light:   '300',
        regular: '400',
        medium:  '500',
        bold:    '700',
        black:   '900',
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight:   '-0.02em',
        normal:  '0em',
        wide:    '0.04em',
        wider:   '0.08em',
        widest:  '0.12em',
      },
    },
  },
  plugins: [],
}

export default config
