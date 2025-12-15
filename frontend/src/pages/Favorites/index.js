import { useState } from 'react'

import AuthService from '../../services/auth';
import PageHeader from '../../components/PageHeader';
import { useGetSavedJobs } from '../../hooks/queries/useGetSavedJobs';
import { useGetSavedCompanies } from '../../hooks/queries/useGetSavedCompanies';
import { useGetSavedCandidates } from '../../hooks/queries/useGetSavedCandidates';
import ResultContainer from '../../features/ResultContainer';
import TabContainer from '../../components/TabContainer';
import useWindowDimensions from '../../hooks/windowDimensions';

function renderTabs(role, activeTab, setActiveTab) {
  if (role !== 'candidate') {
    return null;
  }
  return (
    <TabContainer
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      tabChoices={['careers', 'companies']}
      absolute={false}
    />
  )
}

export default function Favorites() {
  const { user_id, role } = AuthService.getProfile();

  const {savedJobs, isLoading: isLoadingJobs, total: totalJobs} = useGetSavedJobs({userId: user_id});
  const {savedCompanies, isLoading: isLoadingCompanies, total: totalCompanies} = useGetSavedCompanies({userId: user_id});
  const {savedCandidates, isLoading: isLoadingCandidates, total: totalCandidates} = useGetSavedCandidates({userId: user_id});
  const [activeTab, setActiveTab] = useState('careers');

  let results, loading, total, type;

  if (role !== 'candidate') {
    results = savedCandidates;
    loading = isLoadingCandidates;
    total = totalCandidates;
    type = 'candidates';
  } else if (activeTab === 'careers') {
    results = savedJobs;
    loading = isLoadingJobs;
    total = totalJobs;
    type = 'job';
  } else {
    results = savedCompanies;
    loading = isLoadingCompanies;
    total = totalCompanies;
    type = 'companies';
  }
  const { width } = useWindowDimensions();

  return (
    <section className={ width >= 990 ? 'mr-20' : ''}>
      <PageHeader headerText='My Favorites' />

      <div className={width <= 990 ? 'px-8' : '' }>
        { renderTabs(role, activeTab, setActiveTab) }
        <ResultContainer
          containerClass={ width <= 990 && role === 'candidate' ? 'flex flex-wrap flex-col gap-[15px]' 
            : role === 'candidate' ? 'grid grid-cols-3 gap-16' 
              : undefined
          }
          results={results}
          loading={loading}
          type={type}
          limit={total}
          active={true}
          compact={true}
          isFavoriteOverride={true}
        />
      </div>
    </section>
  )
}
