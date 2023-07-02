import axiosClient from '~/api/axiosClient';
import { PagingFilterPayload } from '~/models';
import { ActivityHistoryPayload } from '~/models/activityHistory';

const url = '/activity-history';

const activityHistoryApi = {
  async getActivityHistory({
    page = 0,
    size = 0,
    sort = '',
  }: GetActivityHistoryProps): Promise<
    PagingFilterPayload<ActivityHistoryPayload> | undefined
  > {
    const urlGet = `${url}?page=${page}&size=${size}&sort=${sort}`;
    const response: PagingFilterPayload<ActivityHistoryPayload> | undefined =
      await axiosClient.get(`${urlGet}`);
    return response;
  },
};

interface GetActivityHistoryProps {
  status?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export default activityHistoryApi;
