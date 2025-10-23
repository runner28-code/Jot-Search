import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { getLandingPageStats } from '../../services/API';

export const prefetchLandingPageStats = async () => {
}

export const useGetLandingPageStats = ({ enabled = true }) => {
  const { data, error, isLoading } = useQuery(
    getLandingPageStatsKey(),
    getLandingPageStats,
    { enabled }
  );

  return { totalJobsCount: data?.totalJobsCount, totalCompaniesCount: data?.totalCompaniesCount, error, isLoading };
