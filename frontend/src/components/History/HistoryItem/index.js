import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function isTodayOrYesterday(dateObj) {
  let returnObj = {
    isToday: false,
    isYesterday: false
  }

  const today = new Date();
  const sameYear = today.getFullYear() === dateObj.getFullYear();
  const sameMonth = sameYear && today.getMonth() === dateObj.getMonth();
  const dayDifference = today.getDate() - dateObj.getDate();
  
  // if year and month are the same, check if today or yesterday
  if ( sameYear && sameMonth ) {
    if ( dayDifference === 0 ) {
      returnObj.isToday = true;
    } else if ( dayDifference === 1 ) {
      returnObj.isYesterday = true;
    }
  }
// Temp comment

  return returnObj;
