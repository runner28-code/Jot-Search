import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { getCandidatesFull } from '../../services/API';

export const prefetchCandidates = async ({filtersArr, count, page, fields}) => {
  await queryClient.prefetchQuery(getCandidatesKey({filtersArr, count, page}), () => getCandidatesFull(filtersArr, count, page, fields));
}

export const prefetchAllSelectCandidates = async() => {
  const values = { 
    filtersArr: [],
    count: 10000,
    fields: ['firstName', 'lastName', 'name', 'occupation', 'companyName']
  }
  await queryClient.prefetchQuery(getCandidatesKey(values), () => getCandidatesFull(values.filtersArr, values.count, undefined, values.fields));
}

export const useGetCandidates = ({ count, page, fields, filtersArr, enabled = true }) => {
  formatFilters(filtersArr)
  const { data, error, isLoading } = useQuery(
    getCandidatesKey({filtersArr, count, page, fields}),
    () => getCandidatesFull(filtersArr, count, page, fields),
    { enabled }
  );

  return { candidates: data?.candidates, total: data?.total || 0, error, isLoading };
}

const getCandidatesKey = ({filtersArr, count, page}) => {
  return ['candidates', {filtersArr, count, page}];
}

function formatFilters(filtersArr) {
  return filtersArr.forEach(filter => {
    if (filter.key === 'experience') {
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