import axiosClient from '~/api/axiosClient';
import { DayOfWeekPayload } from '~/models/dayOfWeek';

const url = `/day-of-week`;

const dayOfWeeksApi = {
  getAllDayOfWeeks(): Promise<DayOfWeekPayload[] | undefined> {
    return axiosClient.get(`${url}`);
  },
};

export default dayOfWeeksApi;
