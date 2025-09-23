import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ViewAllLink({ href, text }) {
// Temp comment
  return (
    <Link 
      to={ href }
      className='text-md text-royalBlue font-bold'
    >
      {`${text} >`}
    </Link>
  )
