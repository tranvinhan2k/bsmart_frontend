import axiosClient from '~/api/axiosClient';

const url = `/banks`;

const banksApi = {
  async getAllBanks(): Promise<any> {
    return axiosClient.get(`${url}`);
  },
};

export default banksApi;
