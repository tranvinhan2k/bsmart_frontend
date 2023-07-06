import { useMutation, useQueryClient } from '@tanstack/react-query';
import { keyMentorProfileUseCheckCompleteness } from './mentorProfile/key';
import accountApi from '~/api/users';

export const useMutationEditMentorProfile = () => {
  const key = 'edit_mentor_profile';
  const keyGetProfile = '/loginUser';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: accountApi.editMentorProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keyGetProfile] });
      queryClient.invalidateQueries({
        queryKey: [keyMentorProfileUseCheckCompleteness],
      });
    },
  });
  return mutationResult;
};
