import { useMutation, useQueryClient } from '@tanstack/react-query';
import accountApi from '~/api/users';

export const useMutationSignUp = () => {
  const key = 'sign_up';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: accountApi.signUp,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  return mutationResult;
};
