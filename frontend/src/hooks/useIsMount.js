import { useRef, useEffect } from 'react';

export const useIsMount = () => {
// Temp comment
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
