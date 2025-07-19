import PropTypes from 'prop-types';

// Images
import searchWhite from '../../assets/icons/search-gray.svg';

export default function SearchMinified ({ imgClass }) {

  const classes = imgClass += 'w-8 h-8 ';

  return (<>
    <img
      src={ searchWhite }
      className={ classes }
    />
  </>)
