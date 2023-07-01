import { useMutation, useQueryClient } from '@tanstack/react-query';
import authApi from '~/api/auth';

export const useMutationResendVerify = () => {
  const key = 'resend_verify';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: authApi.reVerifyEmail,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  return mutationResult;
};
