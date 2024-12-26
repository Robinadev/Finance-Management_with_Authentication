/** @type {import('tailwindcss').Config} */
export default {
  content: [
   
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme : {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'fadeOut': 'fadeOut 0.5s ease-out',
        'bounce': 'bounce 2s infinite',
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s linear infinite',
        'float-0': 'float 10s ease-in-out infinite',
        'float-1': 'float 12s ease-in-out infinite',
        'float-2': 'float 14s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeOut: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
        },
      },
    },
  },
    plugins : [],
};

// "./index.html",