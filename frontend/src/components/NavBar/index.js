import AuthService from '../../services/auth';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

  const loggedIn = AuthService.loggedIn();
  
  if ( loggedIn ) {
    return <LoggedInNav />
  } else {
    return <LoggedOutNav />
  }
