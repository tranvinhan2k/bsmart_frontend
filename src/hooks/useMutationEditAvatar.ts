import { useMutation } from '@tanstack/react-query';
import usersApi from '~/api/users';

export const useMutationEditAvatar = () => {
  const key = 'edit_avatar';

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: usersApi.editImageProfile,
  });
  return mutationResult;
};
