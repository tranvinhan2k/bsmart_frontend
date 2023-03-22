import { useMutation, useQueryClient } from '@tanstack/react-query';
import transactionsApi from '~/api/transactions';

export const useMutationPayQuick = () => {
  const key = 'pay_quick';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: transactionsApi.payQuick,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  return mutationResult;
};
