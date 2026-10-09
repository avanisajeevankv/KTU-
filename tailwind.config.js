/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#1A3A7C',
          800: '#0F2557',
          900: '#0A1A3E',
        },
        ktu: {
          blue:   '#0F2557',
          navy:   '#1A3A7C',
          violet: '#6366F1',
          cyan:   '#06B6D4',
          light:  '#F8FAFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(15,37,87,0.08)',
        'card-hover': '0 8px 32px 0 rgba(15,37,87,0.14)',
        'nav': '0 1px 0 0 rgba(15,37,87,0.08)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0F2557 0%, #1A3A7C 50%, #1e4799 100%)',
        'card-gradient': 'linear-gradient(135deg, #EEF2FF 0%, #F8FAFF 100%)',
        'accent-gradient': 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
      },
    },
  },
  plugins: [],
}
