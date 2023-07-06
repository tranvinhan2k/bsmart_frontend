import { useQuery } from '@tanstack/react-query';
import mentorProfilesApi from '~/api/mentorProfile';
import { keyCheckMentorProfilesCompleteness } from './key';

export const useCheckCompleteness = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [keyCheckMentorProfilesCompleteness],
    queryFn: () => mentorProfilesApi.checkCompleteness(),
    keepPreviousData: true,
  });

  return {
    mentorProfilesCompleteness: data,
    isError,
    isLoading,
    error,
    refetch,
  };
};
