import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import inTulsaLogoText from '../../assets/images/intulsa-talent-careers.svg';
import chevronDownBlue from '../../assets/images/down-chevron-blue.svg';
import NavSearch from '../NavSearch';
import * as ROUTES from '../../routes';
import AuthService from '../../services/auth';
import useWindowDimensions from '../../hooks/windowDimensions';
import listenForOutsideClicks from '../../hooks/outsideClickWrapper';
import {
  candidateChoices,
  companyChoices,
  coordinatorChoices,
  guestChoices,
  findSelectedFromPath
} from '../SideNav/utils';
import { useCandidateContext } from '../../services/CandidateContext';

export default function NavBar() {
  const { width } = useWindowDimensions();

  if ( width < 1280 ) {
    return <NavBarLayout />
  } else {
    return <DesktopNavBarLayout />
  }
}

function NavBarLayout() {
  return (
    <nav className='shadow-md bg-white fixed top-0 left-0 right-0 z-50 '>
      <div className='h-30 px-8 flex justify-between items-center'>
        <Link to={ROUTES.root}>
          <img
            className='my-8 w-3/4'
            src={inTulsaLogoText}
            alt='logo'
          />
        </Link>
        {/* Nav Menu */}
        <div className='flex items-center font-spaceGrotesk'>
          <div className='mr-8'>
            { renderNavSearch() }
          </div>
          {/* Dropdown Menu */}
          <DropdownMenu />
        </div>
      </div>
      {/* Nav Search */}
    </nav>
  )
}

const DesktopNavBarLayout = () => {
  return (
    <nav className='h-44 pl-14 pr-10 flex justify-between items-center shadow-md bg-white fixed top-0 left-0 right-0 z-50 test '>
      {/* Logo */}
      <Link to={ROUTES.root}>
        <img
          src={inTulsaLogoText}
          alt='logo'
        />
      </Link>
      {/* Nav Menu */}
      <div className='flex items-center font-spaceGrotesk'>
        <div className='mr-14'>
        </div>
        {/* Dropdown Menu */}
        <DropdownMenu />
      </div>
    </nav>
  )
}

const DropdownMenu = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ firstRender, setFirstRender ] = useState(true);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const { currentUser } = useCandidateContext()
  const menuRef = useRef(null);
  const profile = AuthService.getProfile();
  if ( !profile ) {
    navigate(ROUTES.login);
  }

  const firstname = currentUser?.firstname || '';

  const closeDropdown = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    listenForOutsideClicks(listening, setListening, menuRef, closeDropdown);
  }, [closeDropdown]);

  const handleClick = () => {
    setIsOpen(isOpen => !isOpen);
    if ( firstRender ) {
      setFirstRender(false);
    }
