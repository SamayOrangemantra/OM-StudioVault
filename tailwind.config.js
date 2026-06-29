/** @type {import('tailwindcss').Config} */

// Map a CSS variable to a Tailwind color token. Using <alpha-value> keeps
// Tailwind's opacity modifiers (e.g. bg-accent/20) working with rgb vars.
const withVar = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: withVar('--bg'),
        surface: withVar('--surface'),
        'surface-2': withVar('--surface-2'),
        border: withVar('--border'),
        text: withVar('--text'),
        muted: withVar('--text-muted'),
        accent: withVar('--accent'),
        'accent-foreground': withVar('--accent-foreground'),
        ring: withVar('--ring'),
      },
      fontFamily: {
        // One geometric-sans system. Sofia Sans (Mastercard's own fallback) for
        // display; Inter for dense UI/body. No serif accent.
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Sofia Sans"', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      borderRadius: {
        // Editorial radius scale: generous, never the generic 8–12px middle.
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem', // cards / panels
        '4xl': '2.5rem', // hero / stadium frames (40px)
      },
      boxShadow: {
        // Atmospheric cushioning: large spread, low opacity — never hard drops.
        soft: '0 4px 24px rgb(0 0 0 / 0.05)',
        panel: '0 24px 48px rgb(0 0 0 / 0.08)',
        float: '0 40px 80px rgb(0 0 0 / 0.12)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [],
}
