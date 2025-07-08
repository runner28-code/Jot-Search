import PropTypes from 'prop-types';
import pyramid from '../../assets/icons/pyramid-alt.svg';

export default function FeaturedTag ({ hide, addClass }) {
  let classes = 'flex items-center px-8 py-2 bg-emerald-400 rounded-full text-white text-sm ';
  const allClasses = classes += addClass;
  if( hide ) {
    return null;
  }
  return (
    <span className={ allClasses }>
      <img
        className='mr-6'
        src={pyramid}
        alt='featured icon'
      InTulsa Featured
    </span>
  )
