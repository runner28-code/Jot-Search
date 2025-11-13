import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { getSavedCompanies } from '../../services/API';

export const prefetchSavedCompanies = async ({userId, count, page}) => {
  await queryClient.prefetchQuery(getCompaniesKey({userId, count, page}), () => getSavedCompanies(userId, count, page));
export const useGetSavedCompanies = ({ count, page, userId, enabled = true }) => {
  const { data, error, isLoading } = useQuery(
    getCompaniesKey({userId, count, page}),
    () => getSavedCompanies(userId, count, page),
    { enabled }
  );

  return { savedCompanies: data, total: data?.total || 0, error, isLoading };
