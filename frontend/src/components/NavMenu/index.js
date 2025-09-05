import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ChoicesContainer from './ChoicesContainer';
import listenForOutsideClicks from '../../hooks/outsideClickWrapper';

const WIDE_MENU_ROLES = ['candidate', 'company'];
const WIDE_MENU_WIDTH = 'w-110';

export default function NavMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuClick() {
    setMenuOpen(menuOpen => !menuOpen);
