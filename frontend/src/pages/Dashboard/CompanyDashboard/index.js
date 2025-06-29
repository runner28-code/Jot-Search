import AssistanceCard from './AssistanceCard';
import gaugeIcon from '../../../assets/icons/gauge.svg';
import PageHeader from '../../../components/PageHeader';
import AdvancedSearch from '../../../features/AdvancedSearch';
import Stats from '../../../features/Stats';
import AuthService from '../../../services/auth';

export default function CompanyDashboard({userType}) {
  const profile = AuthService.getProfile();
  const headerStyles = 'font-spaceGrotesk font-bold text-h1 text-royalBlue ';
  return (
    <>
      <PageHeader
        headerText={profile.firstname + ' Dashboard'}
        icon={gaugeIcon}
      />
      <Stats
        headerStyles={headerStyles}
        userType={userType}
      />
      <AssistanceCard />
      <h2 className='mt-22 font-spaceGrotesk font-semibold text-h5 text-charcoal'>Search</h2>
      <AdvancedSearch />
    </>
  )
