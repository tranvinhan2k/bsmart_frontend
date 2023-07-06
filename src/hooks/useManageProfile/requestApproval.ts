import { useMutation, useQueryClient } from '@tanstack/react-query';
import mentorProfilesApi from '~/api/mentorProfile';
import { keyRequestApproval, keyCheckMentorProfilesCompleteness } from './key';

export const useRequestApproval = () => {
  const queryClient = useQueryClient();

  const requestApproval = useMutation({
    mutationKey: [keyRequestApproval],
    mutationFn: mentorProfilesApi.requestApproval,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [keyCheckMentorProfilesCompleteness],
      }),
  });

  return requestApproval;
};
