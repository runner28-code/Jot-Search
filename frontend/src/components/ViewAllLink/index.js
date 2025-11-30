import { Link } from 'react-router-dom';

export default function ViewAllLink({ href, text }) {
  return (
    <Link 
      to={ href }
      className='text-md text-royalBlue font-bold'
    >
      {`${text} >`}
    </Link>
  )
