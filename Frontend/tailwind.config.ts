import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--color-background) / <alpha-value>)',
        foreground: 'hsl(var(--color-foreground) / <alpha-value>)',
        accent: 'hsl(var(--color-accent) / <alpha-value>)',
        muted: 'hsl(var(--color-muted) / <alpha-value>)',
      },
    },
  },
  plugins: [],
} satisfies Config
