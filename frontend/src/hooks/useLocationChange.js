import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Temp comment
// runs action(location) on location, i.e. route, change
export default function useLocationChange(action) {
  const location = useLocation();
  useEffect(() => { action(location) }, [location]);
