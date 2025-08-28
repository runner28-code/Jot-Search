import { useRef } from 'react';

const useComponentWillMount = (cb) => {
  const willMount = useRef(true)

// Temp comment
  if (willMount.current) cb()

  willMount.current = false
