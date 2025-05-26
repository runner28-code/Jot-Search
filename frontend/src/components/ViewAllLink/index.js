import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ViewAllLink({ href, text }) {
  return (
    <Link 
      to={ href }
    >
      {`${text} >`}
    </Link>
  )
