import { useMutation, useQueryClient } from '@tanstack/react-query';
import transactionsApi from '~/api/transactions';

export const useMutationPay = () => {
  const key = 'pay_cart';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: transactionsApi.pay,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  return mutationResult;
};
