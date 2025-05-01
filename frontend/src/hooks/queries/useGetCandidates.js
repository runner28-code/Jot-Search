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

// Temp comment
  return { candidates: data?.candidates, total: data?.total || 0, error, isLoading };
