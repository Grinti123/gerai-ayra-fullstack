/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
        // => @media (min-width: 400px) { ... }
      },
      colors: {
        primary: {
          50: '#fef7ff',
          100: '#fdeeff',
          200: '#fcdeff',
          300: '#f9c2ff',
          400: '#f59bff',
          500: '#f064ff',
          600: '#e946ef',
          700: '#ca28d4',
          800: '#a225ad',
          900: '#85248a',
        },
        accent: {
          50: '#fff0f8',
          100: '#ffe3f1',
          200: '#ffc9e4',
          300: '#ff9dcf',
          400: '#f9a8d4',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'progress': 'progress 4s linear infinite',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        fadeInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 5px rgba(249, 168, 212, 0.5), 0 0 10px rgba(249, 168, 212, 0.5), 0 0 15px rgba(249, 168, 212, 0.5)'
          },
          '100%': {
            boxShadow: '0 0 10px rgba(249, 168, 212, 0.8), 0 0 20px rgba(249, 168, 212, 0.8), 0 0 30px rgba(249, 168, 212, 0.8)'
          },
        },
        scaleIn: {
          '0%': {
            transform: 'scale(0)'
          },
          '100%': {
            transform: 'scale(1)'
          },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f9a8d4' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='m0 40v-40h40v40z'/%3E%3C/g%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}