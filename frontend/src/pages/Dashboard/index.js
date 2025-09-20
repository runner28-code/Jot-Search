import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CandidateDashboard from './CandidateDashboard';
import CompanyDashboard from './CompanyDashboard';
import CoordinatorDashboard from './CoordinatorDashboard';
import AuthService from '../../services/auth';

  let userType = AuthService.getUserRole();

  return (
    <main>
      <DashboardType userType={userType} />
    </main>
  )
