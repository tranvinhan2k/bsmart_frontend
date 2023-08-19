import { NotificationItemPayload } from '~/HOCs/context/NotificationItem';
import { axiosClient } from './axiosClient';
import { GetAllNotificationResponse } from '~/models/response';
import { PagingFilterPayload, PagingFilterRequest } from '~/models';

const url = '/notification';

const notificationApi = {
  postReadNotifications(params: number[]) {
    return axiosClient.put(
      `${url}`,
      {},
      {
        params: {
          ids: params,
        },
        paramsSerializer: { indexes: null },
      }
    );
  },
  async getNotifications({
    params,
  }: {
    params: PagingFilterRequest;
  }): Promise<PagingFilterPayload<NotificationItemPayload>> {
    const response: PagingFilterPayload<GetAllNotificationResponse> =
      await axiosClient.get(url, {
        params,
      });

    const result: NotificationItemPayload[] =
      response?.items
        ?.map((item) => ({
          id: item.id || 0,
          entity: item?.entity || 'CLASS',
          entityId: item.entityId || 0,
          message: item.viContent || '',
          time: item?.created || new Date('01/01/2000').toISOString(),
          title: item.viTitle || '',
          isRead: item.read || false,
        }))
        .sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        ) || [];
    // const notifications: NotificationItemPayload[] = [
    //   {
    //     entity: 'CLASS',
    //     id: 0,
    //     title: 'Class Item',
    //     message:
    //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea dolorum quisquam eveniet rerum, earum dolores ullam, excepturi placeat temporibus molestias nesciunt inventore iusto ad rem vitae consequuntur expedita officiis labore? ',
    //     time: new Date().toISOString(),
    //   },
    //   {
    //     entity: 'COURSE',
    //     id: 1,
    //     title: 'Course Item',
    //     message:
    //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea dolorum quisquam eveniet rerum, earum dolores ullam, excepturi placeat temporibus molestias nesciunt inventore iusto ad rem vitae consequuntur expedita officiis labore? ',
    //     time: new Date().toISOString(),
    //   },
    //   {
    //     entity: 'MENTOR_PROFILE',
    //     id: 5,
    //     title: 'Mentor Profile Item',
    //     message:
    //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea dolorum quisquam eveniet rerum, earum dolores ullam, excepturi placeat temporibus molestias nesciunt inventore iusto ad rem vitae consequuntur expedita officiis labore? ',
    //     time: new Date().toISOString(),
    //   },
    //   {
    //     entity: 'TRANSACTION',
    //     id: 6,
    //     title: 'Transaction Item',
    //     message:
    //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea dolorum quisquam eveniet rerum, earum dolores ullam, excepturi placeat temporibus molestias nesciunt inventore iusto ad rem vitae consequuntur expedita officiis labore? ',
    //     time: new Date().toISOString(),
    //   },
    // ];
    return { ...response, items: result };
  },
};

export default notificationApi;
