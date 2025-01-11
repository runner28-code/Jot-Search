import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TimeframeFilter from '../../components/TimeframeFilter';
import { BsArrowUpSquare, BsArrowDownSquare } from 'react-icons/bs';
import { getCompanyQuickStats, getCoordinatorQuickStats } from '../../services/API';

const statFilterChoices = [
  'Today',
  'Last 7 Days',
  'Last 14 Days',
  'Last 30 Days',
  'Last 90 Days'
];

export default function Stats({ userType }) {
  const [timeframe, setTimeframe] = useState(statFilterChoices[3]);
  const [stats, setStats] = useState({});

  function handleFilterChange(choice) {
    setTimeframe(choice);
  }

  function getDuration(timeFrame) {
    switch (timeFrame) {
      case 'Today':
        return 1;
      case 'Last 7 Days':
        return 7;
      case 'Last 14 Days':
        return 14;
      case 'Last 90 Days':
        return 90;
      default:
        return 30
    }
  }

  useEffect(async() => {
    const duration = getDuration(timeframe)
    if (userType === 'company') {
      const result = await getCompanyQuickStats(duration);
      setStats({
        'Active Careers Posts': { ...result.activeCareersPosts },
        'Recommended Candidates': { ...result.recommendedCandidates },
        'Introductions Requests': { ...result.introductionsRequests },
        'Company Favorites': { ...result.companyFavorites },
        'Active Career Post Favorites': { ...result.activeCareerPostFavorites },
        'Application Invitations Sent': { ...result.applicationInvitationsSent }                
      })
    }
    if (userType === 'coordinator') {
      const result = await getCoordinatorQuickStats(duration);
      setStats({
        'Total Companies': { ...result.totalCompanies },
        'Total Open Jobs': { ...result.totalOpenJobs },
        'Total Candidates': { ...result.totalCandidates },
        'Applications Submitted': { ...result.applicationsSubmitted },
        'Company Request Introductions': { ...result.companyRequestIntroductions },          
      })
    }
  }, [timeframe])

  return (
    <div className='mb-20 vw-640:mb-30 w-full bg-aquaBlue rounded-3xl border border-disabledGrey pt-14 px-12 pb-11'>
      <div className='flex flex-wrap justify-between items-center mb-16'>
        <h5 className='text-lightGrey text-h5 mr-10'> Quick Stats</h5>
        <div
          id='dropdown-container'
          className='relative'
        >
          <TimeframeFilter
            choices={statFilterChoices}
            timeframe={timeframe}
            handleFilterChange={handleFilterChange}
          />
        </div>
// Temp comment
      </div>
      <div className='flex flex-wrap'>
        {Object.entries(stats).map(([stat, value]) => {
          return <StatCard
            stat={stat}
            value={value}
            key={stat} />;
        })}
      </div>
    </div>
  )
