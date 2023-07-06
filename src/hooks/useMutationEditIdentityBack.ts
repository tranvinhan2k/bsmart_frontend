import { useMutation, useQueryClient } from '@tanstack/react-query';
import { keyMentorProfileUseCheckCompleteness } from './mentorProfile/key';
import accountApi from '~/api/users';

export const useMutationEditIdentityBack = () => {
  const key = 'edit_identity_back';
  const keyGetProfile = '/loginUser';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: accountApi.editImageProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keyGetProfile] });
      queryClient.invalidateQueries({
        queryKey: [keyMentorProfileUseCheckCompleteness],
      });
    },
  });
  return mutationResult;
};
