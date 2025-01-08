import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// runs action(location) on location, i.e. route, change
export default function useLocationChange(action) {
  useEffect(() => { action(location) }, [location]);
