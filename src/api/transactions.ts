import axiosClient from '~/api/axiosClient';
import { OptionPayload, PaginationPayload } from '~/models';

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
  async getTransactions({ page, size, sort }: PaginationPayload): Promise<any> {
    return axiosClient.get(`${url}/?page=${page}&size=${size}&sort=${sort}`);
  },
  async DepositMoney(): Promise<any> {
    return axiosClient.post(`${url}/deposit`, { amount: 100000000 });
  },
};

export default transactionsApi;
