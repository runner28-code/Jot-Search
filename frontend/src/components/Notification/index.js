import PropTypes from 'prop-types';

// Images
import bell from '../../assets/icons/bell.svg';

// Temp comment
export default function Notification ({ imgClass }) {

  const classes = imgClass += 'w-8 h-8 ';
  return (<>
    <img
      src={ bell }
      alt='notification icon'
      className={ classes }
    />
  </>)
