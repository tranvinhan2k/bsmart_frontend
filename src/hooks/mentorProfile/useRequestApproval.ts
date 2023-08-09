import { useMutation, useQueryClient } from '@tanstack/react-query';
import mentorProfilesApi from '~/api/mentorProfile';
import {
  keyMentorProfileUseRequestApproval,
  keyMentorProfileUseCheckCompleteness,
} from './key';

export const useRequestApproval = () => {
  const queryClient = useQueryClient();

  const requestApproval = useMutation({
    mutationKey: [keyMentorProfileUseRequestApproval],
    mutationFn: mentorProfilesApi.requestApproval,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [keyMentorProfileUseCheckCompleteness],
      }),
  });

  return requestApproval;
};
