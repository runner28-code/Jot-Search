import { useRef, useEffect } from 'react';

export const useIsMount = () => {
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
