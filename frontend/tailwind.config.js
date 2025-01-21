/* eslint-disable no-undef */
const plugin = require('tailwindcss/plugin')

module.exports = {
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin': 'spin .175s linear forwards',
        'spin-reverse': 'spin-reverse .175s linear forwards'
      },
      keyframes: {
        'spin': {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
