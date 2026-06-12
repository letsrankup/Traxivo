/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0284c7', /* Premium Sky Blue Corporate Primary */
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#0a3a5c',
        },
        dark: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          700: '#1e293b',
          800: '#0f172a',
          900: '#020617',
          950: '#010314',
        },
      },
      backgroundImage: {
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.5))',
        'brand-gradient': 'linear-gradient(135deg, #0284c7, #4f46e5)',
        'dark-gradient': 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(2,132,199,0.05), inset 0 1px 0 rgba(255,255,255,0.6)',
        'brand': '0 0 30px rgba(2,132,199,0.2)',
        'glow': '0 0 60px rgba(2,132,199,0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(2,132,199,0.1)' },
          to: { boxShadow: '0 0 40px rgba(2,132,199,0.3)' },
        },
      },
    },
  },
  plugins: [],
}
