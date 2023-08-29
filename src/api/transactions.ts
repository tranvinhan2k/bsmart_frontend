import axiosClient from '~/api/axiosClient';
import { UseMutationProcessWithdrawRequestPayload } from '~/hooks/transaction/useMutationProcessWithdrawRequest';
import { UseSearchManagedWithdrawRequestPayload } from '~/hooks/transaction/useSearchTransaction';
import { UseQueryGetTransactionsPayload } from '~/hooks/useQueryGetTransactions';
import { PagingFilterPayload, PagingFilterRequest } from '~/models';
import { GetTransactionsPayload } from '~/models/response';
import { ManagedWithdrawRequest, YearRevenue } from '~/models/transaction';
import { ManagedUserRevenue } from '~/models/type';
import { PaymentType } from '~/models/variables';
import { RevenuePayload } from '~/pages/admin/AdminManagerRevenuePage/RevenueChart';
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
}

const transactionsApi = {
  async payQuick(data: {
    clazzId: number;
    referalCode: string;
    type: 'BANKING';
    useWallet: boolean;
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

  async getMentorTransactions(params: PagingFilterRequest) {
    const response: PagingFilterPayload<GetTransactionsPayload> =
      await axiosClient.get(`${url}`, {
        params,
      });

    const result: RevenuePayload[] =
      response.items.map((item) => ({
        id: item.id || 0,
        date: item.created || '',
        revenue: item.afterBalance || 0,
        total: item.amount || 0,
        status: item.statusName || '',
        typeOfTransactions: item.typeName || '',
      })) || [];
    return { ...response, items: result };
  },

  async withdrawMoney(data: WithdrawMoneyProfilePayload): Promise<any> {
    return axiosClient.post(`${url}/withdraw`, data);
  },
  async DepositMoney(money: number): Promise<any> {
    return generateMockApi(true);
    // return axiosClient.post(`${url}/deposit`, { amount: 100000000 });
  },

  getYearRevenue(year: number): Promise<YearRevenue[]> {
    return axiosClient.get(`${url}/revenue/year/${year}`);
  },

  postPromoCodeInformation(params: {
    usageLimit: number;
    discountPercent: number;
    expiredLaterDay: string;
  }) {
    return generateMockApi(true);
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

  getManagedUserRevenue(
    userId: number | undefined
  ): Promise<ManagedUserRevenue> {
    return axiosClient.get(`${url}/revenue/user?userId=${userId}`);
  },
};

export default transactionsApi;
