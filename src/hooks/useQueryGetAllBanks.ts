import { useQuery } from '@tanstack/react-query';
import banksApi from '~/api/banks';

export const useQueryGetAllBanks = () => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['banks'],
    queryFn: () => banksApi.getAllBanks(),
    keepPreviousData: true,
  });
  return {
    banks: data,
    error,
    isLoading,
    refetch,
  };
};
