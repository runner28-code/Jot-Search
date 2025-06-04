import AuthService from '../../services/auth';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

export default function NavBar() {
  
  if ( loggedIn ) {
    return <LoggedInNav />
  } else {
    return <LoggedOutNav />
  }
