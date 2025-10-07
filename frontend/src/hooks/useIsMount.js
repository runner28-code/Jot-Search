import { useRef, useEffect } from 'react';

export const useIsMount = () => {
  const isMountRef = useRef(true);
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
