import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
import { MdLogout } from 'react-icons/md';
import { FiEdit as ProfileIcon } from 'react-icons/fi';

export default function LoggedInButtons({ handleOptionClick, stylesObject }) {
  const linkStyles = stylesObject.baseLinkStyles + ' vw-1280:rounded-tl-xl';
  return (<>
    <Link 
      to={ROUTES.profile}
      onClick={handleOptionClick}
      className={linkStyles}
    >
      <ProfileIcon className={stylesObject.iconStyles} />
      <span className={stylesObject.spanStyles}>Profile</span>
    </Link>
    <hr className={stylesObject.hrStyles} />
    <div 
      id='logout'
      onClick={handleOptionClick}
      className={stylesObject.bottomLinkStyles}
    >
      <MdLogout className={stylesObject.iconStyles} />
      <span className={stylesObject.spanStyles}>Logout</span>
    </div>
