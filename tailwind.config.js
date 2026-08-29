/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f4',
          100: '#dbede5',
          200: '#b9dccb',
          300: '#8bc2aa',
          400: '#5a9f82',
          500: '#3a8064',
          600: '#2c6650',
          700: '#235341',
          800: '#1d4234',
          900: '#163026',
          950: '#0c1d16',
        },
        sand: {
          50: '#faf8f3',
          100: '#f3eee0',
          200: '#e6dabf',
          300: '#d6c194',
          400: '#c6a467',
          500: '#bb8f4c',
          600: '#a87a40',
          700: '#8b6136',
          800: '#724e31',
          900: '#5f412c',
          950: '#342318',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.7s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
        'split-char-in': 'splitCharIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'arrow-pulse': 'arrowPulse 1.8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        splitCharIn: {
          '0%': { opacity: '0', transform: 'translateY(60%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        arrowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(8px)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, rgba(12,29,22,0.7) 0%, rgba(12,29,22,0.3) 50%, rgba(12,29,22,0.8) 100%)',
        'card-gradient': 'linear-gradient(180deg, transparent 0%, rgba(12,29,22,0.85) 100%)',
      },
    },
  },
  plugins: [],
};
