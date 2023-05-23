import { useMutation, useQueryClient } from '@tanstack/react-query';
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
    },
  });
  return mutationResult;
};
