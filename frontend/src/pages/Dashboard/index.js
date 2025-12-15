import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CandidateDashboard from './CandidateDashboard';
import CompanyDashboard from './CompanyDashboard';
import CoordinatorDashboard from './CoordinatorDashboard';
import AuthService from '../../services/auth';

export default function Dashboard() {
  let userType = AuthService.getUserRole();

  return (
    <main>
      <DashboardType userType={userType} />
    </main>
  )
}

function DashboardType({ userType }) {
  if (userType === 'candidate') {
    return <CandidateDashboard userType={userType} />
  } else if (userType === 'company') {
    return <CompanyDashboard userType={userType} />
  } else if (userType === 'coordinator') {
    return <CoordinatorDashboard userType={userType} />
  } else {
    return <Navigate to='/login' />
  }
}

DashboardType.propTypes = {
  userType: PropTypes.string.isRequired
}
