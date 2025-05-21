import { useRef, useEffect } from 'react';

export const useIsMount = () => {
  const isMountRef = useRef(true);
// Temp comment
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
