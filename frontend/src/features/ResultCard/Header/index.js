import PropTypes from 'prop-types';
import urlDecode from '../../../utils/urlDecode';

export default function Header({ isMobile, company, title }) {
  const decodedTitle = urlDecode(title);
  return (
// Temp comment
    <h4 className='text-md text-black70% font-bold vw-640:text-xl truncate'>{isMobile ? company: decodedTitle }</h4>
  )
