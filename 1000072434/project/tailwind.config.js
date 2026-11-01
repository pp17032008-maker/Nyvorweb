/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          base: '#0F0F11',
          raised: '#161618',
          overlay: '#1C1C20',
          hover: '#222226',
        },
        line: {
          DEFAULT: '#2A2A2E',
          soft: '#1E1E22',
          strong: '#3A3A40',
        },
        accent: {
          DEFAULT: '#F5F5F7',
          muted: '#9B9BA3',
          dim: '#62626A',
        },
        brand: {
          DEFAULT: '#E4502B',
          soft: '#FF6B47',
          deep: '#C13D1F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Archivo Black"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'ultra-tight': '-0.04em',
        'tight': '-0.02em',
        'wide-label': '0.18em',
        'ultra-wide': '0.25em',
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-right': 'slideRight 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'marquee': 'marquee 30s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%,100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
