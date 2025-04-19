import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { getSavedCandidates } from '../../services/API';

export const prefetchCandidates = async ({userId, count, page}) => {
  await queryClient.prefetchQuery(getCandidatesKey({userId, count, page}), () => getSavedCandidates(userId, count, page));
}
  const { data, error, isLoading } = useQuery(
    getCandidatesKey({userId, count, page}),
    () => getSavedCandidates(userId, count, page),
    { enabled }
  );

  return { savedCandidates: data, total: data?.total || 0, error, isLoading };
