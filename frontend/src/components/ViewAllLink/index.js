import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ViewAllLink({ href, text }) {
  return (
    <Link 
      to={ href }
      className='text-md text-royalBlue font-bold'
    >
      {`${text} >`}
    </Link>
  )
}

ViewAllLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}