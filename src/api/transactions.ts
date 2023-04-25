import axiosClient from '~/api/axiosClient';
import { PaginationPayload } from '~/models';

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
    subCourseId: number;
    referralCode: string;
  }): Promise<any> {
    return axiosClient.post(`${url}/pay-quick`, data);
  },
  async pay(
    data: {
      cartItemId: number;
      referralCode: string;
    }[]
  ): Promise<any> {
    return axiosClient.post(`${url}/pay`, data);
  },
  async getTransactions({ page, size, sort }: PaginationPayload): Promise<any> {
    return axiosClient.get(`${url}/?page=${page}&size=${size}&sort=${sort}`);
  },
  async withdrawMoney(data: WithdrawMoneyProfilePayload): Promise<any> {
    return axiosClient.post(`${url}/withdraw`, data);
  },
  async DepositMoney(): Promise<any> {
    return axiosClient.post(`${url}/deposit`, { amount: 100000000 });
  },
};

export default transactionsApi;