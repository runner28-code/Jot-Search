import PropTypes from 'prop-types';
import Home from '../../../assets/icons/home.svg';
import AdvancedSearch from '../../../features/AdvancedSearch';
import CareerFavorite from '../../../components/CareerFavorite';
import CompanyFavorite from '../../../components/CompanyFavorite';
import PendingApplications from '../../../components/PendingApplications';
import InvitationsToApply from '../../../components/InvitationsToApply';

export default function CandidateDashboard() {
  const headerStyles = 'font-spaceGrotesk font-bold text-h1 text-royalBlue ';
  return (
    <>
      <div className='flex items-center justify-start mb-12 pt-8 px-4'>
        <img
          src={Home}
          alt='Home Icon'
        />
        <h1 className='ml-8 text-royalBlue text-lg vw-1280:text-[32px] font-spaceGrotesk'>My Dashboard</h1>
      </div>
      <div className='px-4'>
        <InvitationsToApply />
        <PendingApplications />
        <CareerFavorite />
        <CompanyFavorite />
        <h1 className={headerStyles}>Search</h1>
        <AdvancedSearch />
    </>
  )
