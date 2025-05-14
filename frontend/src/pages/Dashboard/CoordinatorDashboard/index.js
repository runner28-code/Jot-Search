import PropTypes from 'prop-types';
import PageHeader from '../../../components/PageHeader';
import AdvancedSearch from '../../../features/AdvancedSearch';
import Stats from '../../../features/Stats';
import gaugeIcon from '../../../assets/icons/gauge.svg';

export default function CoordinatorDashboard({ userType }) {
  return (
    <>
      <PageHeader
        headerText={`Coordinator Dashboard`}
      />
      <Stats userType={userType} />
      <AdvancedSearch />
    </>
  )
