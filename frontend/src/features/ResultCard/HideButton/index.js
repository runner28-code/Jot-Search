import PropTypes from 'prop-types';
import { BiHide } from 'react-icons/bi';
import { toggleHideJob } from '../../../services/API';

export default function HideButton({ type, data, setIsHidden }) {
  const role = AuthService.getUserRole();
  if ( role !== 'coordinator' || type !== 'job' ) {
    return null;
  }
  
  async function handleClick() {
    setIsHidden(true);
    await toggleHideJob(data.id);
  }

  return (
    <BiHide 
      className='absolute top-2 right-2 h-12 w-12 fill-black50% cursor-pointer'
      onClick={ handleClick }
    />
  )
