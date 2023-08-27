import { useQuery } from '@tanstack/react-query';
import mentorProfilesApi from '~/api/mentorProfile';
import { keyMentorProfileUseCheckCompleteness } from './key';
import { useDispatchProfile } from '../useDispatchProfile';

export const useCheckCompleteness = () => {
  const { profile } = useDispatchProfile();
  const role = profile?.roles?.[0].code;
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [keyMentorProfileUseCheckCompleteness],
    queryFn: () => mentorProfilesApi.checkCompleteness(),
    keepPreviousData: true,
    enabled: role === 'TEACHER',
  });

  return {
    mentorProfilesCompleteness: data,
    isError,
    isLoading,
    error,
    refetch,
  };
};
