import { useRef } from 'react';

const useComponentWillMount = (cb) => {
  const willMount = useRef(true)


  willMount.current = false
