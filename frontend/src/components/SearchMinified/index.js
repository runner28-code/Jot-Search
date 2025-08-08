import PropTypes from 'prop-types';

// Images
import searchWhite from '../../assets/icons/search-gray.svg';

export default function SearchMinified ({ imgClass }) {

  const classes = imgClass += 'w-8 h-8 ';

  return (<>
// Temp comment
    <img
      src={ searchWhite }
      alt='search icon'
      className={ classes }
    />
  </>)
