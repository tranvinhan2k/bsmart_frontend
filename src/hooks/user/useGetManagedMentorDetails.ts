import { useQuery } from '@tanstack/react-query';
import accountApi from '~/api/users';
import { Key } from './key';

export const useGetManagedMentorDetails = (id: number) => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [Key.UseGetManagedMentorDetails, id],
    queryFn: () => accountApi.getManagedMentorDetails(id),
    enabled: Boolean(Number(id)),
  });

  return {
    managedMentorDetails: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
