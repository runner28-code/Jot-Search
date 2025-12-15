import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { getJobsFull } from '../../services/API';

export const prefetchJobs = async ({filtersArr, count, operator, page}) => {
  await queryClient.prefetchQuery(getJobsKey({filtersArr, count, operator, page}), () => getJobsFull(filtersArr, count, operator, page));
}

export const useGetJobs = ({ count, page, filtersArr, operator, enabled = true }) => {
  formatFilters(filtersArr);
  const { data, error, isLoading } = useQuery(
    getJobsKey({filtersArr, count, operator, page}),
    () => getJobsFull(filtersArr, count, operator, page),
    { enabled }
  );

  return { careers: data?.jobs, jobs: data?.jobs, total: data?.total || 0, error, isLoading };
}

const getJobsKey = ({filtersArr, count, operator, page}) => {
  return ['jobs', {filtersArr, count, operator, page}];
}

function formatFilters(filtersArr) {
  return filtersArr.forEach(filter => {
    if (filter.key === 'years experience') {
      filter.key = 'yearsRequired';
      switch(filter.value) {
        case '0-1':
          filter.value = [0,1];
          break;
        case '2-4':
          filter.value = [2,3,4];
          break;
        case '5-10':
          filter.value = [5,6,7,8,9,10];
          break;
        case '11+':
          filter.value = [11,12,13,14,15,16,17,18,19,20];
          break;
        default:
          filter.value = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
          break;
      }
    }
    return;
  });
}