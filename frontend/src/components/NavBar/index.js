import AuthService from '../../services/auth';
import LoggedInNav from './LoggedInNav';

export default function NavBar() {
  const loggedIn = AuthService.loggedIn();
  
  if ( loggedIn ) {
    return <LoggedInNav />
  } else {
    return <LoggedOutNav />
  }
