import { useMutation, useQueryClient } from '@tanstack/react-query';
import usersApi from '~/api/users';

export const useMutationEditAvatar = () => {
  const key = 'edit_avatar';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: usersApi.editImageProfile,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['/loginUser']);
    },
  });
  return mutationResult;
};
