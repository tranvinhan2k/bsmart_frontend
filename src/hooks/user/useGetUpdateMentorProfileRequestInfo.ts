import { useQuery } from '@tanstack/react-query';
import mentorProfileApi from '~/api/mentors';
import { Key } from './key';

export const useGetUpdateMentorProfileRequestInfo = () => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [Key.UseGetUpdateMentorProfileInfoRequest],
    queryFn: () => mentorProfileApi.getUpdateMentorProfileRequestInfo(),
  });

  return {
    requestInfo: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
