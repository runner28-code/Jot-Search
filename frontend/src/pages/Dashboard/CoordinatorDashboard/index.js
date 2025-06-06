import PropTypes from 'prop-types';
import PageHeader from '../../../components/PageHeader';
import AdvancedSearch from '../../../features/AdvancedSearch';
import Stats from '../../../features/Stats';
import gaugeIcon from '../../../assets/icons/gauge.svg';

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
