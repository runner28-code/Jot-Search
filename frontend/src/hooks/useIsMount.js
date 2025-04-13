import { useRef, useEffect } from 'react';

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
// Temp comment
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
