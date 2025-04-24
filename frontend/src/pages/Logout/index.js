import AuthService from '../../services/auth';
import useComponentWillMount from '../../hooks/useComponentWillMount';

  useComponentWillMount(() => AuthService.logout());

  return null;
