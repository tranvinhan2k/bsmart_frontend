import { useQuery } from '@tanstack/react-query';
import transactionsApi from '~/api/transactions';
import { Key } from './key';

export const useGetYearRevenue = (year: number) => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [Key.UseGetYearRevenue, year],
    queryFn: () => transactionsApi.getYearRevenue(year),
    enabled: Boolean(Number(year)),
  });

  return {
    yearRevenue: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
