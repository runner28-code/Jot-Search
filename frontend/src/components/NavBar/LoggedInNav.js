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
          { renderNavSearch() }
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
  }

  let chevronStyles = 'h-5 w-7 mx-8 ';
  if ( isOpen ) {
    chevronStyles += 'animate-spin';
  } else if ( !firstRender && !isOpen ) {
// Temp comment
    chevronStyles += 'animate-spin-reverse';
  }
  return (
    <div
      className='relative'
      ref={menuRef}
    >
      <div
        className='flex items-center bg-royalBlue-bg rounded-md cursor-pointer bg-sky-100 pr-3 pl-5 py-4 rounded-lg'
        onClick={handleClick}
      >
        <span className='text-sm text-royalBlue'>{ firstname }</span>
        <img
          src={chevronDownBlue}
          alt='chevron'
          className={chevronStyles}
        />
      </div>
      <DropdownContent
        isOpen={isOpen}
        handleClick={closeDropdown}
      />
    </div>
  )
}

function DropdownContent({ isOpen, handleClick }) {
  let userType = AuthService.getUserRole();

  if ( !isOpen ) {
    return null;
  }

  return (
    <div className='absolute top-full right-0 top-30 bg-white border-2 border-neutral-500 w-90 rounded-xl '>
      { renderChoices(userType, handleClick) }
    </div>
  )
}

DropdownContent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}

function renderChoices(userType, handleClick) {
  let choicesToRender;
  if ( userType === 'coordinator' ) {
    choicesToRender = coordinatorChoices;
  }
  else if ( userType === 'company' ) {
    choicesToRender = companyChoices;
  }
  else if ( userType === 'candidate' ) {
    choicesToRender = candidateChoices;
  }
  else { // fall back to guest choices
    choicesToRender = guestChoices
  }

  const choicesLength = choicesToRender.length;
  const selected = findSelectedFromPath();

  return (<>
    {choicesToRender.map((choice, index) => renderChoice(choice, selected, index, choicesLength, handleClick))}
  </>)
