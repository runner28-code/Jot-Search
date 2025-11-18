import { useEffect } from 'react';

// runs action(location) on location, i.e. route, change
export default function useLocationChange(action) {
  const location = useLocation();
  useEffect(() => { action(location) }, [location]);
