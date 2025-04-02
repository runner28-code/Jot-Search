import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  candidateChoices,
  companyChoices,
  coordinatorChoices,
  guestChoices
} from '../SideNav/utils';
import Choice from './Choice';
import LoggedOutButtons from './LoggedOutButtons';
import useWindowDimensions from '../../hooks/windowDimensions';
import * as ROUTES from '../../routes';

const baseLinkStyles = 'flex items-center w-full h-20 pl-6 bg-white hover:bg-royalBlue text-royalBlue hover:text-white cursor-pointer ';
const topLinkStyles = baseLinkStyles + 'rounded-tl-xl ';
const bottomLinkStyles = baseLinkStyles + 'rounded-b-xl ';
const spanStyles = 'text-xl font-bold font-spaceGrotesk ';
const hrStyles = 'border-royalBlue ';
const iconStyles = 'w-12 h-12 mr-4 ';

const stylesObject = {
  baseLinkStyles,
  bottomLinkStyles,
  iconStyles,
  spanStyles,
  hrStyles
}

export default function ChoicesContainer(props) {
  const {
    userRole,
    handleOptionClick } = props;
  
  return (<>
    { renderRoleChoices({ userRole, handleOptionClick }) }
    { userRole === 'guest' ? 
      <LoggedOutButtons 
        handleOptionClick={handleOptionClick}
        stylesObject={stylesObject} /> 
      :
      null
    }
  </>)
