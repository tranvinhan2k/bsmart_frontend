import axiosClient from '~/api/axiosClient';
import { TimeSlotPayload } from '~/components/molecules/schedules/MonthSchedule';
import { OptionPayload, PostTimetableRequest } from '~/models';
import { PostTimeTableResponse } from '~/models/response';

const url = 'time-table';

const timetableApi = {
  // post
  async getTimetable(
    params: PostTimetableRequest
  ): Promise<{ raw: PostTimeTableResponse; timetable: TimeSlotPayload[] }> {
    const response: PostTimeTableResponse = await axiosClient.post(
      `${url}`,
      params
    );
    let result: TimeSlotPayload[] = [];
    response.map((item) => {
      const slots: OptionPayload[] = [];
      const isExisted = result.findIndex(
        (subItem) =>
          new Date(item.date || '').getDate() === subItem.date.getDate() &&
          new Date(item.date || '').getMonth() === subItem.date.getMonth() &&
          new Date(item.date || '').getFullYear() === subItem.date.getFullYear()
      );
      if (isExisted !== -1) {
        result = result.map((subItem, subItemIndex) => {
          if (subItemIndex === isExisted) {
            console.log('hello', subItem);

            return {
              ...subItem,
              slots: [
                ...subItem.slots,
                {
                  id: item.slot?.id || 0,
                  label: `${item.slot?.startTime} - ${item.slot?.endTime}`,
                  value: `${item.slot?.id}` || '',
                },
              ],
            };
          }
          return subItem;
        });
      } else {
        result = [
          ...result,
          {
            id: result.length,
            date: new Date(item.date || ''),
            slots: [
              ...slots,
              {
                id: item.slot?.id || 0,
                label: `${item.slot?.startTime} - ${item.slot?.endTime}`,
                value: `${item.slot?.id}` || '',
              },
            ],
          },
        ];
      }
      return null;
    });
    return {
      raw: response,
      timetable: result,
    };
  },
  async addTimetableToClass({
    id,
    params,
  }: {
    id: number;
    params: PostTimeTableResponse;
  }): Promise<boolean> {
    return axiosClient.post(`${url}/${id}`, params);
  },
};

export default timetableApi;
