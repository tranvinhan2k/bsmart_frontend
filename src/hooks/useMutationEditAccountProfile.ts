import { useMutation, useQueryClient } from '@tanstack/react-query';
import { keyMentorProfileUseCheckCompleteness } from './mentorProfile/key';
import accountApi from '~/api/users';

export const useMutationEditAccountProfile = () => {
  const key = 'edit_account_profile';
  const keyGetProfile = '/loginUser';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: accountApi.editAccountProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keyGetProfile] });
      queryClient.invalidateQueries({
        queryKey: [keyMentorProfileUseCheckCompleteness],
      });
    },
  });
  return mutationResult;
};
