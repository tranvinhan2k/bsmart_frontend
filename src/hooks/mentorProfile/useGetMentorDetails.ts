import { useQuery } from '@tanstack/react-query';
import mentorProfilesApi from '~/api/mentorProfile';
import { Key } from './key';

export const useGetMentorDetails = (id: number) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [Key.UseGetMentorDetails, id],
    queryFn: () => mentorProfilesApi.getMentorDetails(id),
    enabled: Boolean(Number(id)),
  });

  return {
    mentorDetails: data,
    isError,
    isLoading,
    error,
    refetch,
  };
};
