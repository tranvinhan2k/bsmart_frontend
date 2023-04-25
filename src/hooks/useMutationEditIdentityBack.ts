import { useMutation } from '@tanstack/react-query';
import usersApi from '~/api/users';

export const useMutationEditIdentityBack = () => {
  const key = 'edit_identity_back';

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: usersApi.editImageProfile,
  });
  return mutationResult;
};
