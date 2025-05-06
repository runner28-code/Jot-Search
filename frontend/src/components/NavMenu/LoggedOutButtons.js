import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { MdLogin } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import * as ROUTES from '../../routes';

export default function LoggedOutButtons({ handleOptionClick, stylesObject }) {
  const { pathname } = useLocation();
  const forceShowPages = [ ROUTES.login, ROUTES.signup, ROUTES.landingPage ];
  const linkStyles = forceShowPages.includes(pathname) ? stylesObject.baseLinkStyles : stylesObject.topLinkStyles;
  return (<>
    <Link 
      to={ROUTES.login}
      onClick={handleOptionClick}
      className={linkStyles}
    >
      <MdLogin className={stylesObject.iconStyles} />
      <span className={stylesObject.spanStyles}>Login</span>
    </Link>
    <hr className={stylesObject.hrStyles} />
      to={ROUTES.signup}
      onClick={handleOptionClick}
      className={stylesObject.bottomLinkStyles}
    >
      <FaUserEdit className={stylesObject.iconStyles} />
      <span className={stylesObject.spanStyles}>Signup</span>
    </Link>
  </>)
