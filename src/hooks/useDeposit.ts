import transactionsApi from '~/api/transactions';
import { useCustomMutation } from './custom/useCustomMutation';

export const useDeposit = () => {
  return useCustomMutation(['deposit_money'], transactionsApi.DepositMoney);
};
