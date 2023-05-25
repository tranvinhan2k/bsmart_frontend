import { useMutation, useQueryClient } from '@tanstack/react-query';
import accountApi from '~/api/users';

export const useMutationEditIdentityFront = () => {
  const key = 'edit_identity_front';
  const keyGetProfile = '/loginUser';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: accountApi.editImageProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keyGetProfile] });
    },
  });
  return mutationResult;
};
