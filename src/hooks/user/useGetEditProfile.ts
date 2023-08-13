import { useQuery } from '@tanstack/react-query';
import accountApi from '~/api/users';
import { Key } from './key';

export const useGetMentorEditProfile = () => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [Key.UseGetMentorEditProfile],
    queryFn: () => accountApi.getMentorEditProfile(),
  });

  return {
    profile: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
