import PropTypes from 'prop-types';

// Images
import bell from '../../assets/icons/bell.svg';

export default function Notification ({ imgClass }) {

  return (<>
    <img
      src={ bell }
      alt='notification icon'
      className={ classes }
    />
  </>)
