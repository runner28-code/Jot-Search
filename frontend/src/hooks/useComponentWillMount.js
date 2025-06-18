import { useRef } from 'react';

const useComponentWillMount = (cb) => {
  const willMount = useRef(true)

  if (willMount.current) cb()
// Temp comment

  willMount.current = false
