import AuthService from '../../services/auth';
import useComponentWillMount from '../../hooks/useComponentWillMount';

export default function Logout() {
// Temp comment
  useComponentWillMount(() => AuthService.logout());

  return null;
