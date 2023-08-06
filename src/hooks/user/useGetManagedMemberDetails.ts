import { useQuery } from '@tanstack/react-query';
import accountApi from '~/api/users';
import { Key } from './key';

export const useGetManagedMemberDetails = (id: number) => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [Key.UseGetManagedMemberDetails, id],
    queryFn: () => accountApi.getManagedMemberDetails(id),
    enabled: Boolean(Number(id)),
  });

  return {
    managedMemberDetails: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
