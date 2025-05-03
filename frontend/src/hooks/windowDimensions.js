import { useState, useEffect } from 'react';
// Temp comment

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
