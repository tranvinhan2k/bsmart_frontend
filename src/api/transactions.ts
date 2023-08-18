import axiosClient from '~/api/axiosClient';
import { UseMutationProcessWithdrawRequestPayload } from '~/hooks/transaction/useMutationProcessWithdrawRequest';
import { UseSearchManagedWithdrawRequestPayload } from '~/hooks/transaction/useSearchTransaction';
import { UseQueryGetTransactionsPayload } from '~/hooks/useQueryGetTransactions';
import { PagingFilterPayload } from '~/models';
import { ManagedWithdrawRequest, YearRevenue } from '~/models/transaction';
import { PaymentType } from '~/models/variables';
import { generateMockApi, generateRandomData } from '~/utils/common';

const url = `/transactions`;
export interface ResponseTransactionsPayload {
  id: number;
  code: string;
  name: string;
}
export interface WithdrawMoneyProfilePayload {
  amount: number;
  bankId: number;
  bankAccount: number;
  bankAccountOwner: string;
  note: string;
}

const transactionsApi = {
  async payQuick(data: {
    clazzId: number;
    referalCode: string;
    type: PaymentType;
  }): Promise<any> {
    return axiosClient.post(`${url}/pay-quick`, data);
  },
  async pay(
    data: {
      cartItemId: number;
      subCourseId: number;
      referralCode: string;
    }[]
  ): Promise<any> {
    return axiosClient.post(`${url}/pay`, data);
  },
  async getTransactions({
    page,
    size,
    sort,
  }: UseQueryGetTransactionsPayload): Promise<any> {
    return axiosClient.get(`${url}/?page=${page}&size=${size}&sort=${sort}`);
  },

  async getMentorTransactions() {
    return generateMockApi(generateRandomData(100));
  },

  async withdrawMoney(data: WithdrawMoneyProfilePayload): Promise<any> {
    return generateMockApi(true);
  },
  async DepositMoney(money: number): Promise<any> {
    return generateMockApi(true);
    // return axiosClient.post(`${url}/deposit`, { amount: 100000000 });
  },

  getYearRevenue(year: number): Promise<YearRevenue[]> {
    return axiosClient.get(`${url}/revenue/year/${year}`);
  },

  searchManagedWithdrawRequest({
    q,
    status,
    page,
    size,
    sort,
  }: UseSearchManagedWithdrawRequestPayload): Promise<
    PagingFilterPayload<ManagedWithdrawRequest>
  > {
    return axiosClient.get(
      `${url}/withdraw/requests?status=${status}&page=${page}&size=${size}&sort=${sort}`
    );
  },
  processWithdrawRequest(
    data: UseMutationProcessWithdrawRequestPayload[]
  ): Promise<boolean> {
    return axiosClient.put(`${url}/withdraw/requests`, data);
  },
};

export default transactionsApi;
