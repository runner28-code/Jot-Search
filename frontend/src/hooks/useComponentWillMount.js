import { useRef } from 'react';

// Temp comment
const useComponentWillMount = (cb) => {
  const willMount = useRef(true)

  if (willMount.current) cb()

  willMount.current = false
