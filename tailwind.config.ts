import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '14px',
        xl: '20px',
      },
      fontFamily: {
        serif: ['var(--font-instrument-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-inter-tight)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'Menlo'],
        display: ['var(--font-instrument-serif)', 'serif'],
        hand: ['var(--font-caveat)', 'cursive'],
      },
      fontSize: {
        eyebrow: ['10.5px', { letterSpacing: '0.14em', lineHeight: '1.2' }],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          ink: 'hsl(var(--accent-ink-hue))',
          soft: 'hsl(var(--accent-soft-hue))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border) / 0.12)',
        input: 'hsl(var(--input) / 0.12)',
        ring: 'hsl(var(--ring))',
        paper: {
          DEFAULT: 'hsl(var(--paper))',
          2: 'hsl(var(--paper-2))',
          3: 'hsl(var(--paper-3))',
        },
        ink: {
          DEFAULT: 'hsl(var(--ink))',
          2: 'hsl(var(--ink-2))',
          3: 'hsl(var(--ink-3))',
          4: 'hsl(var(--ink-4))',
        },
        stone: {
          DEFAULT: 'hsl(var(--stone))',
          2: 'hsl(var(--stone-2))',
        },
        line: 'hsl(var(--ink) / 0.12)',
        'line-2': 'hsl(var(--ink) / 0.06)',
        ok: 'hsl(var(--ok-hue))',
        warn: 'hsl(var(--warn-hue))',
        alert: 'hsl(var(--alert-hue))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
