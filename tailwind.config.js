/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      'small': '18px',
      'small1': '20px',
      'small2': '24px',
      'medium': '30px',
      'large3': '32px',
      'large4': '40px', 
    },
    borderRadius: {
      'small': '30px',
      'large': '60px',
    },
    extend: {
      fontFamily: {
        sans: ['Zeyada', 'sans-serif'],
        zeyada: ['Zeyada', 'sans-serif'],
      },
      colors: {
        'underline-gray': 'rgba(173, 181, 189, 0.4)',
        'pearl-white': '#FBFCF8',
        'white-1': '#F8F9FA',
        'gray-2': '#DEE2E6',
        'gray-3': '#ADB5BD',
        'gray-4': '#495057',
        'black-5': '#212529',
      },

    },
  },
  plugins: [],
}

