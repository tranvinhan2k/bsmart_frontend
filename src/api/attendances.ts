import axiosClient from '~/api/axiosClient';
import { image } from '~/constants/image';
import { GetAttendanceTimeSLotResponse } from '~/models/response';
import {
  AttendanceMemberResponse,
  AttendanceMemberTimeSlotPayload,
} from '~/pages/mentor_class/MentorTakeAttendancePage';

const url = '/attendances';

const attendanceApi = {
  async getAttendanceTimetable(
    timetableId: number
  ): Promise<AttendanceMemberResponse> {
    const response: GetAttendanceTimeSLotResponse = await axiosClient.get(
      `${url}/${timetableId}`
    );
    const result: AttendanceMemberResponse = {
      name: response.timeTableResponse?.classURL || '',
      total: response.attendanceResponses?.totalItems || 0,
      date: response.timeTableResponse?.date || '',
      endTime: `${response.timeTableResponse?.slot?.endTime}` || '',
      startTime: `${response.timeTableResponse?.slot?.startTime}` || '',
      slots:
        response.attendanceResponses?.items.map((item) => ({
          id: item.id,
          image: image.mockStudent,
          isPresent: item.attendance ? 'PRESENT' : 'ABSENT',
          name: item.student.name,
          note: item.note,
          isHadTakeAttendance: item.hasTookAttendance,
        })) || [],
    };

    return result;
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
