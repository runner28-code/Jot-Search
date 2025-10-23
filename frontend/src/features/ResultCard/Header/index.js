import PropTypes from 'prop-types';
import urlDecode from '../../../utils/urlDecode';

  const decodedTitle = urlDecode(title);
  return (
    <h4 className='text-md text-black70% font-bold vw-640:text-xl truncate'>{isMobile ? company: decodedTitle }</h4>
  )
