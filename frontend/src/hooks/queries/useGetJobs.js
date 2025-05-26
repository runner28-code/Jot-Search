import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { getJobsFull } from '../../services/API';

export const prefetchJobs = async ({filtersArr, count, operator, page}) => {
  await queryClient.prefetchQuery(getJobsKey({filtersArr, count, operator, page}), () => getJobsFull(filtersArr, count, operator, page));
}

export const useGetJobs = ({ count, page, filtersArr, operator, enabled = true }) => {
  formatFilters(filtersArr);
    getJobsKey({filtersArr, count, operator, page}),
    () => getJobsFull(filtersArr, count, operator, page),
    { enabled }
  );

  return { careers: data?.jobs, jobs: data?.jobs, total: data?.total || 0, error, isLoading };
