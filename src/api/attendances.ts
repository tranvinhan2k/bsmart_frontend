import axiosClient from '~/api/axiosClient';

const url = '/attendances';

const attendanceApi = {
  getAttendanceTimetable(timetableId: number): Promise<any> {
    const urlGet = `${url}/${timetableId}`;
    return axiosClient.get(urlGet);
  },
  takeAttendance(param: {
    timeTableId: number;
    details: {
      studentClassId: number;
      attendance: boolean;
      note: string;
    }[];
  }): Promise<any> {
    const urlGet = `${url}`;
    return axiosClient.post(urlGet, param);
  },
};

export default attendanceApi;
