import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(240 12% 22%)',
        input: 'hsl(240 10% 16%)',
        ring: 'hsl(260 90% 70%)',
        background: 'hsl(236 26% 9%)',
        foreground: 'hsl(210 40% 98%)'
      }
    }
  },
  plugins: []
};

export default config;
