import { useQuery } from '@tanstack/react-query';
import transactionsApi from '~/api/transactions';
import { Key } from './key';

export const useGetManagedUserRevenue = (id: number | undefined) => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [Key.UseGetManagedUserRevenue, id],
    queryFn: () => transactionsApi.getManagedUserRevenue(id),
    enabled: Boolean(Number(id)),
  });

  return {
    managedUserRevenue: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
