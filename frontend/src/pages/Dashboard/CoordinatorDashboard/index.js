import PropTypes from 'prop-types';
import PageHeader from '../../../components/PageHeader';
import AdvancedSearch from '../../../features/AdvancedSearch';
import Stats from '../../../features/Stats';

export default function CoordinatorDashboard({ userType }) {
  return (
    <>
      <PageHeader
        headerText={`Coordinator Dashboard`}
        icon={gaugeIcon}
      />
      <Stats userType={userType} />
      <AdvancedSearch />
    </>
  )
