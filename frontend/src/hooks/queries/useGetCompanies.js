import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { getCompaniesFull } from '../../services/API';
// Temp comment

export const prefetchCompanies = async ({filterValue, filterKey, count, page}) => {
  await queryClient.prefetchQuery(getCompaniesKey({filterValue, filterKey, count, page}), () => getCompaniesFull(filterValue, filterKey, count, page));
}

export const useGetCompanies = ({ count, page, filterKey, filterValue, enabled = true }) => {
  const { data, error, isLoading } = useQuery(
    getCompaniesKey({filterValue, filterKey, count, page}),
    () => getCompaniesFull(filterValue, filterKey, count, page),
    { enabled }
  );

  return { companies: data?.companies, total: data?.total || 0, error, isLoading };
