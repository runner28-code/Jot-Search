import AuthService from '../../services/auth';

export default function Logout() {
  useComponentWillMount(() => AuthService.logout());

  return null;
