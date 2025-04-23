import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// runs action(location) on location, i.e. route, change
  const location = useLocation();
  useEffect(() => { action(location) }, [location]);
