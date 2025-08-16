import AuthService from '../../services/auth';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

export default function NavBar() {
  const loggedIn = AuthService.loggedIn();
  
  if ( loggedIn ) {
    return <LoggedInNav />
  } else {
  }
