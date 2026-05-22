/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        sans: ['"Geist"', 'system-ui'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: '#0A0A0A',
        cream: '#F5F1EA',
        amber: '#FF6B1A',
        electric: '#00FFB2',
        violet: '#7C5CFC',
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-5%)' },
          '30%': { transform: 'translate(3%,-10%)' },
          '50%': { transform: 'translate(-10%,5%)' },
          '70%': { transform: 'translate(5%,8%)' },
          '90%': { transform: 'translate(-3%,3%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
