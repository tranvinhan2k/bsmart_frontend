import transactionsApi from '~/api/transactions';
import { useCustomQuery } from './custom/useCustomQuery';

export const useGetMentorTransactions = () => {
  return useCustomQuery(['get_transactions'], () =>
    transactionsApi.getMentorTransactions()
  );
};
