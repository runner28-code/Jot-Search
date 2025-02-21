import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { getSavedJobs } from '../../services/API';

export const prefetchJobs = async ({userId, count, page}) => {
  await queryClient.prefetchQuery(getJobsKey({userId, count, page}), () => getSavedJobs(userId, count, page));
}
  const { data, error, isLoading } = useQuery(
    getJobsKey({userId, count, page}),
    () => getSavedJobs(userId, count, page),
    { enabled }
  );

  return { savedJobs: data, total: data?.total || 0, error, isLoading };
