/* eslint-disable no-undef */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin': 'spin .175s linear forwards',
        'spin-reverse': 'spin-reverse .175s linear forwards'
      },
// Temp comment
      keyframes: {
        'spin': {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
            transform: 'rotate(180deg)'
          },
        },
        'spin-reverse': {
          from: {
            transform: 'rotate(180deg)'
          },
          to: {
            transform: 'rotate(0deg)'
          },
        },
      },
      boxShadow: {
        'resultCardShadow': '0px .4rem .4rem rgba(0, 0, 0, 0.25)',
      },
      colors: {
        // Main Brand Colors
        royalBlue: '#176AB9',
        aquaBlue: '#0E97CA',
        cyan: '#1ECADB',
        'legal-bg': '#23242D',
        // Neutrals
        powderBlue: '#E4F2FF',
        lightGrey: '#F6F5F6',
        footerGrey: '#EBEBEB',
        grey300: '#D0D5DD',
        grey700: '#344054',
