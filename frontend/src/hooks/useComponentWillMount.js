import { useRef } from 'react';

  const willMount = useRef(true)

  if (willMount.current) cb()

  willMount.current = false
