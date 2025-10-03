import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';

export const prefetchLandingPageStats = async () => {
  await queryClient.prefetchQuery(getLandingPageStatsKey(), getLandingPageStats);
}

export const useGetLandingPageStats = ({ enabled = true }) => {
  const { data, error, isLoading } = useQuery(
    getLandingPageStatsKey(),
    getLandingPageStats,
    { enabled }
  );

  return { totalJobsCount: data?.totalJobsCount, totalCompaniesCount: data?.totalCompaniesCount, error, isLoading };
