/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cobalt-blue': '#005A9C',
        'deep-cobalt': '#003D6B',
        'light-cobalt': '#4A90E2',
        'ocean-cobalt': '#0077BE',
        'sky-cobalt': '#87CEEB',
        'coral-pink': '#FF6B6B',
        'sand-white': '#FAFAFA',
        'sunset-gold': '#FFD700',
        'sea-foam': '#E0F2F1',
        'deep-ocean': '#1A237E',
        'warm-gray': '#757575',
        'shell-beige': '#FFF8E1',
        'seaweed-green': '#26A69A',
        'aurora-teal': '#4DD0E1',
        'aurora-purple': '#9C27B0',
        'aurora-pink': '#E91E63',
      },
      fontFamily: {
        zen: ['Zen Maru Gothic', 'sans-serif'],
        kiwi: ['Kiwi Maru', 'sans-serif'],
        'noto-serif': ['Noto Serif JP', 'serif'],
      },
      animation: {
        wave: 'wave 3s ease-in-out infinite',
        float: 'float 15s ease-in-out infinite',
        'aurora-sweep': 'aurora-sweep 8s linear infinite',
        'aurora-wave-reverse': 'aurora-wave-reverse 8s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'wave-flow': 'wave-flow 25s linear infinite',
        countUp: 'countUp 0.5s ease-out forwards',
        rollNumber: 'rollNumber 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        fadeIn: 'fadeIn 0.3s ease-out',
        slideUp: 'slideUp 0.4s ease-out',
        pulseGlow: 'pulseGlow 1s ease-out',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-20px) translateX(10px)' },
          '50%': { transform: 'translateY(-10px) translateX(-10px)' },
          '75%': { transform: 'translateY(-30px) translateX(5px)' },
        },
        'aurora-sweep': {
          '0%': { backgroundPosition: '100% 0' },
          '100%': { backgroundPosition: '-100% 0' },
        },
        'aurora-wave-reverse': {
          '0%': { backgroundPosition: '-150% 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '0.5',
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '50%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1.1)',
          },
        },
        'wave-flow': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'scale(0.5) rotateX(90deg)' },
          to: { opacity: '1', transform: 'scale(1) rotateX(0deg)' },
        },
        rollNumber: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(50px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: '1' },
          '100%': { transform: 'translate(-50%, -50%) scale(2)', opacity: '0' },
        },
      },
      perspective: {
        1000: '1000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        hidden: 'hidden',
      },
    },
  },
  plugins: [],
};
