/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep pine green, lifted from the mountain silhouettes in the Dugoba logo.
        forest: {
          50: '#eef4ee',
          100: '#d9e6da',
          200: '#b2cab5',
          300: '#86a988',
          400: '#5c8760',
          500: '#3f6b45',
          600: '#2f5535',
          700: '#24432a',
          800: '#1c3521',
          900: '#142819',
          950: '#0a170f',
        },
        // Warm sunburst gold, lifted from the sun rays behind the peaks.
        sand: {
          50: '#fdf8ea',
          100: '#faeecb',
          200: '#f4dd97',
          300: '#edc85f',
          400: '#e3b13a',
          500: '#cf9527',
          600: '#ab771e',
          700: '#875d1c',
          800: '#6d4b1c',
          900: '#5b3f1c',
          950: '#33220e',
        },
        // Sun-baked terracotta, lifted from the hillside behind the mountains.
        clay: {
          50: '#fdf1ea',
          100: '#fbdfcd',
          200: '#f4bb97',
          300: '#e89664',
          400: '#d8753f',
          500: '#c1592a',
          600: '#9e4620',
          700: '#7c371b',
          800: '#61301c',
          900: '#4c2819',
          950: '#2a140c',
        },
        // Warm linen-to-charcoal neutral, lifted from the cream wordmark and its black outline.
        stone: {
          50: '#faf8f5',
          100: '#f2ede6',
          200: '#e2d9cf',
          300: '#cabdae',
          400: '#a3937f',
          500: '#7d6c59',
          600: '#5c4d3d',
          700: '#453a2d',
          800: '#2e2620',
          900: '#201a15',
          950: '#120e0b',
        },
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['Archivo', 'system-ui', 'sans-serif'],
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
        'hero-gradient': 'linear-gradient(180deg, rgba(10,23,15,0.7) 0%, rgba(10,23,15,0.3) 50%, rgba(10,23,15,0.8) 100%)',
        'card-gradient': 'linear-gradient(180deg, transparent 0%, rgba(10,23,15,0.85) 100%)',
      },
    },
  },
  plugins: [],
};
