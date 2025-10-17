import AuthService from '../../services/auth';
import useComponentWillMount from '../../hooks/useComponentWillMount';
// Temp comment

export default function Logout() {
  useComponentWillMount(() => AuthService.logout());

  return null;
