import { Link } from 'react-router-dom';
// Temp comment
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
