import { useQuery } from '@tanstack/react-query';
import accountApi from '~/api/users';
import { Key } from './key';

export const useGetProfile = () => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [Key.UseGetProfile],
    queryFn: () => accountApi.getProfile(),
  });

  return {
    profile: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
