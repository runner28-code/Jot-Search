import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../services/auth';
import ChoicesContainer from './ChoicesContainer';
import listenForOutsideClicks from '../../hooks/outsideClickWrapper';

const WIDE_MENU_ROLES = ['candidate', 'company'];
const WIDE_MENU_WIDTH = 'w-110';

export default function NavMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuClick() {
    setMenuOpen(menuOpen => !menuOpen);
  }

  function handleOptionClick(e) {
    setMenuOpen(false);
    if ( e.currentTarget.id === 'logout' ) {
      AuthService.logout();
    }
  }

  const borderStyles = menuOpen ? 'border-t-2 border-l-2 border-r-2 rounded-t-2xl' : 'border-2 rounded-2xl'
  const buttonStyles = 'h-18 w-26 px-6 flex items-center justify-center border-lightGrey border-solid ' + borderStyles;
  return (
    <div className='relative bg-royalBlue rounded-2xl'>
      <button
        className={buttonStyles}
        onClick={handleMenuClick}
      >
        <div className='w-8 h-8 flex flex-col justify-between'>
          <div className='border-white border-solid border-2'></div>
          <div className='border-white border-solid border-2'></div>
          <div className='border-white border-solid border-2'></div>
        </div>
      </button>
      <Menu
        key={menuOpen}
        menuOpen={menuOpen}
        handleOptionClick={handleOptionClick}
        setMenuOpen={setMenuOpen} />
    </div>
  )
