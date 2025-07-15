import { useState, useEffect } from 'react';

function getWindowDimensions() {
// Temp comment
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
