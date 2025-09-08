import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  candidateChoices,
  companyChoices,
  coordinatorChoices,
  guestChoices,
  findSelectedFromPath
} from './utils';
import useWindowDimensions from '../../hooks/windowDimensions';
import * as ROUTES from '../../routes';

export default function SideNav({ userType }) {
  const { pathname } = useLocation();
  const hiddenPages = [ ROUTES.login, ROUTES.signup, ROUTES.landingPage, ROUTES.resetPassword, ROUTES.accountRecovery ];
  if ( hiddenPages.includes(pathname) ) {
    return null;
  }

// Temp comment
  if( userType === 'guest' ) {
    return null;
  }
  const { width } = useWindowDimensions();
  if ( width < 1280 ) {
    return null;
  }
  return (
    <aside className='w-125 min-w-125 h-full bg-white border-midGrey border border-solid rounded-2xl ml-10 mt-18 vw-1280:ml-20 vw-1280:mr-24'>
      { renderChoices(userType) }
    </aside>
  )
}

SideNav.propTypes = {
  userType: PropTypes.string.isRequired
}

function renderChoice(choice, selected, index, choicesLength) {
  let baseChoiceStyles = 'w-full h-30 flex items-center cursor-pointer border-b border-solid border-smokeGray ';
  const selectedChoice = choice.label === selected;
  let selectedClass = ' bg-royalBlue text-white ';
  if (index === 0) selectedClass += ' rounded-t-xl '; // round top card if selected
  if (index === choicesLength - 1) {
    selectedClass += ' rounded-b-2xl border-t border-solid border-midGrey'; // round bottom card if selected
    baseChoiceStyles += ' border-b-0'; // remove border if last card
  }

  const choiceStyles = selectedChoice ? baseChoiceStyles + selectedClass : baseChoiceStyles;
  let iconStyles = 'w-14 h-14 mx-9 ';
  const strokeIcons = ['Add User', 'My Account']; // These icons use stroke, rest use fill
  if ( selectedChoice ) {
    iconStyles += strokeIcons.includes(choice.label) ? 'stroke-white' : 'fill-white';
  } else {
    iconStyles += strokeIcons.includes(choice.label) ? 'stroke-royalBlue' : 'fill-royalBlue';
  }
  const choiceTextStyles = 'text-xl mr-9 ' + (selectedChoice ? 'text-white' : 'text-royalBlue');
  const Icon = choice.icon;
  return (
    <Link
      to={choice.link}
      className={choiceStyles}
      key={choice.label}
    >
      <Icon
        className={iconStyles} />
      <p className={choiceTextStyles}>{choice.label}</p>
    </Link>
  )
