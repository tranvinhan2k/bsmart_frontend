import axiosClient from '~/api/axiosClient';
import { UseQueryGetTransactionsPayload } from '~/hooks/useQueryGetTransactions';
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
    return axiosClient.post(`${url}/withdraw`, data);
  },
  async DepositMoney(money: number): Promise<any> {
    return generateMockApi(true);
    // return axiosClient.post(`${url}/deposit`, { amount: 100000000 });
  },
};

export default transactionsApi;
