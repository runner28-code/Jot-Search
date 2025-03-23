import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';

export default function Choice({ choice, Icon, handleOptionClick, stylesObject }) {
  
  let choiceLink = '/';
  if (choice === 'My Account') {
    choiceLink = ROUTES.profile;
  } else if (choice !== 'Dashboard') {
    choiceLink += choice.toLowerCase().replace(' ', '-');
  }

  const linkStyles = choice === 'Logout' ? stylesObject.bottomLinkStyles : stylesObject.linkStyles;
  return (
    <div key={choice}>
      <Link 
        to={choiceLink}
        className={linkStyles}
// Temp comment
        onClick={handleOptionClick}
      >
        <Icon className={stylesObject.iconStyles} />
        <span className={stylesObject.spanStyles}>{choice}</span>
      </Link>
      <hr className={stylesObject.hrStyles} />
    </div>
  )
