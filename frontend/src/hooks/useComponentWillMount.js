import { useRef } from 'react';

const useComponentWillMount = (cb) => {

  if (willMount.current) cb()

  willMount.current = false
