import axiosClient from '~/api/axiosClient';
import { SlotPayload } from '~/models/slot';

const url = `/slots`;

const slotsApi = {
  getAllSlots(): Promise<SlotPayload[] | undefined> {
    return axiosClient.get(`${url}`);
  },
};

export default slotsApi;
