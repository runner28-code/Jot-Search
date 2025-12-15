import PropTypes from 'prop-types';
import Pill from '../../assets/icons/pill.svg';

export default function SourceIdentifier( type ) {
  return (<>
    <span className='bg-disabledGrey rounded-md flex items-center h-8 px-4 py-5'>
      <img
        className='w-4 mr-2'
        src={Pill}
      />
      <p className='text-sm text-zinc-700 font-roboto'>{ renderSwitch(type) }</p>
    </span>
  </>)
}
SourceIdentifier.propTypes = {
  type: PropTypes.string
}

function renderSwitch(type) {
  switch(type['type']) {
    case 'getro':
    case 'main':
      return 'Getro Data';
    case 'bullhorn':
    default:
      return 'Bullhorn Data';
  }
}
