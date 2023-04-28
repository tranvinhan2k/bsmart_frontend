import axiosClient from '~/api/axiosClient';
import { BankDataPayload } from '~/models/data';

const url = `/banks`;

const banksApi = {
  async getAllBanks(): Promise<BankDataPayload> {
    return axiosClient.get(`${url}`);
  },
};

export default banksApi;
