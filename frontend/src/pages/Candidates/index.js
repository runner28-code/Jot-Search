import { Navigate } from 'react-router-dom';
import headerIcon from '../../assets/icons/user-folder.png';
import PageHeader from '../../components/PageHeader';
import AdvancedSearch from '../../features/AdvancedSearch';
import AuthService from '../../services/auth';

export default function Candidates() {
  const { role } = AuthService.getProfile();
  if (role === 'candidate') {
    return <Navigate to='/' />
  }

  return (
    <section className='mr-20'>
      <PageHeader
        headerText='Candidates List'
        icon={headerIcon}
      />
      <AdvancedSearch disabledTabs />
    </section>
  )
