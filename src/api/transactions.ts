import axiosClient from '~/api/axiosClient';
import { OptionPayload } from '~/models';

export interface ResponseTransactionsPayload {
  id: number;
  code: string;
  name: string;
}

const url = `/transactions`;

const transactionsApi = {
  async payQuick(subCourseId: number): Promise<any> {
    return axiosClient.post(`${url}/pay-quick`, { subCourseId });
  },
  async pay(
    data: {
      cartItemId: number;
      subCourseId: number;
    }[]
  ): Promise<any> {
    return axiosClient.post(`${url}/pay`, data);
  },
  async getTransactions(): Promise<any> {
    return axiosClient.post(`${url}`);
  },
  async DepositMoney(): Promise<any> {
    return axiosClient.post(`${url}/deposit`, { amount: 100000000 });
  },
};

export default transactionsApi;
