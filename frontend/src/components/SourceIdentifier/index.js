import PropTypes from 'prop-types';
import Pill from '../../assets/icons/pill.svg';

export default function SourceIdentifier( type ) {
  return (<>
      <img
        className='w-4 mr-2'
        src={Pill}
      />
      <p className='text-sm text-zinc-700 font-roboto'>{ renderSwitch(type) }</p>
    </span>
  </>)
