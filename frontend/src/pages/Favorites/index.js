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
      absolute={false}
    />
  )
