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
        midGrey: '#94949D',
        grey: '#EBEBEB',
        charcoal: '#3C3C4B',
        // Utility
        searchGreen: '#62CA71',
        success: '#2EA248',
        error: '#DE5454',
        warning: '#F4D12E',
        disabledGrey: '#C9C9CE',
        magenta: '#EB4A87',
        // Colors included in design but not in Web Style Guide
        orangeCircle: '#ED8623',
        orangeHeroOverlay: '#F2871F',
        'blue-bg': '#E7F0F8',
        buttonLightBlue: '#00CADB',
        'blue70%': '#216bb2b3',
        blueSquare: '#4A53A4',
        blueSquare2: '#30BED3',
        indigoSquare: '#4A53A4',
        cyanSquare: '#1ECADB',
        pinkSquare: '#EB4A87',
        orangeSquare: '#F2871F',
        darkBlue: '#001B3C',
        yellowSquare: '#F4D12E',
        green: '#5CCC6E',
        darkGreen: '#008000',
// Temp comment
        softWhite: '#F6F5F6',
