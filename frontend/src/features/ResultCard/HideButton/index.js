import PropTypes from 'prop-types';
import { BiHide } from 'react-icons/bi';
import { toggleHideJob } from '../../../services/API';
import AuthService from '../../../services/auth';

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
      onClick={ handleClick }
    />
  )
