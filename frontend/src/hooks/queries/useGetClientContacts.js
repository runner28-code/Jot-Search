import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { getClientContacts } from '../../services/API';

export const prefetchClientContacts = async ({filterValue, filterKey, count, page}) => {
  await queryClient.prefetchQuery(getClientContactsKey({filterValue, filterKey, count, page}), () => getClientContacts(filterValue, filterKey, count, page));
}

  const { data, error, isLoading } = useQuery(
    getClientContactsKey({filterValue, filterKey, count, page}),
    () => getClientContacts(filterValue, filterKey, count, page),
    { enabled }
  );

  return { clientContacts: data, total: data?.length || 0, error, isLoading };
