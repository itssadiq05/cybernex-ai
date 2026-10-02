/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#050505',
          dark: '#080808',
          card: '#0B0B0D',
          surface1: '#111214',
          surface2: '#151619',
          surface3: '#1A1B1F',
          lime: '#CCFF00',
          cyan: '#00F0FF',
          red: '#FF3366',
          amber: '#FFB800',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s infinite alternate',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 5px rgba(204, 255, 0, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(204, 255, 0, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
