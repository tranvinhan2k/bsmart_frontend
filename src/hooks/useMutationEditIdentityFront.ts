import { useMutation } from '@tanstack/react-query';
import usersApi from '~/api/users';

export const useMutationEditIdentityFront = () => {
  const key = 'edit_identity_front';

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: usersApi.editImageProfile,
  });
  return mutationResult;
};
