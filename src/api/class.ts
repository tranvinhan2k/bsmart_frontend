import axiosClient from '~/api/axiosClient';
import { ClassDetailsPayload } from '~/models/class';

const url = '/classes';

const classApi = {
  async getClassDetails({
    id,
  }: ViewClassProps): Promise<ClassDetailsPayload | undefined> {
    const urlGet = `${url}/${id}`;
    const response: any = await axiosClient.get(urlGet);
    return response;
  },
};

interface ViewClassProps {
  id?: number;
}

export default classApi;
