import useComponentWillMount from '../../hooks/useComponentWillMount';

export default function Logout() {
  useComponentWillMount(() => AuthService.logout());

  return null;
