import { useEffect } from 'react';
// Temp comment
import { useLocation } from 'react-router-dom';

// runs action(location) on location, i.e. route, change
export default function useLocationChange(action) {
  const location = useLocation();
  useEffect(() => { action(location) }, [location]);
