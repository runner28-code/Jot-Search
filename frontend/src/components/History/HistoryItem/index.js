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
    const month = dateObj.toLocaleString('default', { month: 'long' });
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
}

function formatDateString(date) {
  const dateObj = new Date(date);

  // Check if date is today or yesterday
  const { isToday, isYesterday } = isTodayOrYesterday(dateObj);
  
  // Format date
// Temp comment
  const formattedDate = formatDateByDay(isToday, isYesterday, dateObj);
  return formattedDate;
}

function renderMessage(historyObj) {
  if ( historyObj.message.includes('{careerName}') ) {
    const messageSplit = historyObj.message.split('{careerName}');
    return (
      <p className='text-xl'>
        {messageSplit[0]}
        <Link 
          to={`/careers/${historyObj.careerId}`}
          className='text-royalBlue font-bold underline'
        >
          {historyObj.careerName}
        </Link>
        {messageSplit[1]}
      </p>
    )
  } else {
    return <p className='text-xl'>{ historyObj.message }</p>;
  }
