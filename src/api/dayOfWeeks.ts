import axiosClient from '~/api/axiosClient';
import { DayInWeekPayload } from '~/models/dayInWeek';

const url = `/day-of-week`;

const dayOfWeeksApi = {
  getAllDayInWeeks(): Promise<DayInWeekPayload[] | undefined> {
    return axiosClient.get(`${url}`);
  },
};

export default dayOfWeeksApi;
