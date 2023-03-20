import { useMutation, useQueryClient } from '@tanstack/react-query';
import authApi from '~/api/auth';

export const useMutationLogin = () => {
  const key = 'login';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: authApi.signIn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  return mutationResult;
};
