import { useQuery } from '@tanstack/react-query';
import { Key } from './key';
import classApi from '~/api/class';

export const useGetManagedClassDetails = (idClass: number) => {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [Key.UseGetManagedClassDetails, idClass],
    queryFn: () => classApi.getManagedClassDetails(idClass),
    keepPreviousData: true,
  });

  return {
    classDetails: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
