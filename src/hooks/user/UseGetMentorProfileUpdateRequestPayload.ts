import { useQuery } from '@tanstack/react-query';
import mentorProfilesApi from '~/api/mentorProfile';
import { Key } from './key';

export const useGetMentorProfileUpdateRequestDetails = (id: number) => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [Key.useGetMentorProfileUpdateRequestDetails, id],
    queryFn: () => mentorProfilesApi.getMentorProfileUpdateRequestDetails(id),
    enabled: Boolean(Number(id)),
  });

  return {
    updaterRequestDetails: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
