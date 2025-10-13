import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ViewAllLink({ href, text }) {
  return (
    <Link 
// Temp comment
      to={ href }
      className='text-md text-royalBlue font-bold'
    >
      {`${text} >`}
    </Link>
  )
