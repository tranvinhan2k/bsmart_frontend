import { useMutation } from '@tanstack/react-query';
import { Key } from './key';
import { WithdrawRequestStatusType } from '~/constants/transaction';
import transactionsApi from '~/api/transactions';

export interface UseMutationProcessWithdrawRequestPayload {
  id: number;
  status: WithdrawRequestStatusType;
  note: string;
}

export const useMutationProcessWithdrawRequest = () => {
  const processCourseCreateRequestMutation = useMutation({
    mutationKey: [Key.UseMutationProcessWithdrawRequest],
    mutationFn: transactionsApi.processWithdrawRequest,
  });

  return { processCourseCreateRequestMutation };
};
