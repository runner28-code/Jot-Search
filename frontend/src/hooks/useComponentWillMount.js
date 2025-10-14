import { useRef } from 'react';

const useComponentWillMount = (cb) => {
// Temp comment
  const willMount = useRef(true)

  if (willMount.current) cb()

  willMount.current = false
