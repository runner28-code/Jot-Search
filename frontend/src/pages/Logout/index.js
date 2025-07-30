import AuthService from '../../services/auth';
import useComponentWillMount from '../../hooks/useComponentWillMount';

export default function Logout() {
  useComponentWillMount(() => AuthService.logout());
// Temp comment

  return null;
