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

  return returnObj;
}

function formatDateByDay(isToday, isYesterday, dateObj) {
  const time = dateObj.toLocaleTimeString();
  const timeWithoutSeconds = time.replace(/(.*)\D\d+/, '$1')
  if ( isToday ) {
    return `Today at ${timeWithoutSeconds}`;
  } else if ( isYesterday ) {
    return `Yesterday, ${timeWithoutSeconds}`;
  } else {
    const day = dateObj.getDate();

    const concatenateOrdinal = function(d) {
      if (d > 3 && d < 21) return d + 'th';
      switch (d % 10) {
        case 1:  return d + 'st';
        case 2:  return d + 'nd';
        case 3:  return d + 'rd';
        default: return d + 'th';
      }
    }

    return `${month} ${concatenateOrdinal(day)}, ${timeWithoutSeconds}`;
  }
