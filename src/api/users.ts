import { EditAccountProfilePayload } from '~/models/modelAPI/user/account';
import { EditPersonalProfileFormSubmit } from '~/models/modelAPI/user/personal';
import { EditSocialProfilePayload } from '~/models/modelAPI/user/social';
import { LoginRequestPayload } from '~/models/api/auth';
import { ProfileImgType } from '~/constants/profile';
import { RequestRole, Role } from '~/models/role';
import {
  GetAllUserPayload,
  GetAllUserReturnPayload,
  UserPayload,
} from '~/models/user';
import axiosClient from '~/api/axiosClient';
import { PagingFilterPayload, PagingFilterRequest } from '~/models';
import {
  ClassMenuItemPayload,
  ProfilePayload,
  WeekTimeSlotPayload,
} from '~/models/type';
import { GetUserSchedule, ResponseUserClasses } from '~/models/response';
import { MonthTimeSlotPayload } from '~/components/molecules/schedules/MonthSchedule';
import { compareDate, formatDate } from '~/utils/date';
import { image } from '~/constants/image';
import { AttendanceTimeSlotPayload } from '~/pages/mentor_class/MentorClassAttendanceListPage';

const url = `/users`;
const urlAuth = `/auth`;

export interface RequestRegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: RequestRole;
  gender: string;
  birthDay: string;
}

export interface EditCertificateProfilePayload {
  userImages: (string | Blob)[];
  degreeIdsToDelete?: number[];
}
export interface EditImageProfilePayload {
  file: string | Blob;
  imageType:
    | ProfileImgType.AVATAR
    | ProfileImgType.FRONTCI
    | ProfileImgType.BACKCI;
}

export interface EditMentorProfilePayload {
  introduce: string;
  mentorSkills: Array<any>;
  workingExperience: string;
}

export interface ResponseProfilePayload {
  id: number;
  username: string;
  introduce: string;
  fullName: string;
  email: string;
  birthday: string;
  gender: string;
  address: string;
  phone: string;
  status: boolean;
  isVerified: boolean;
  roles: [
    {
      id: number;
      name: string;
      code: string;
    }
  ];
  twitterLink: string;
  facebookLink: string;
  instagramLink: string;
  userImages: [
    {
      id: number;
      name: string;
      url: string;
      type: string;
    }
  ];
  wallet: {
    id: number;
    balance: number;
    previous_balance: number;
    owner_id: number;
  };
}

export interface UserResponsePayload {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  birthday: string;
  address: string;
  phone: string;
  status: true;
  roles: [
    {
      id: number;
      name: string;
      code: string;
    }
  ];
  twitterLink: string;
  facebookLink: string;
  instagramLink: string;
  userImages: [
    {
      id: number;
      name: string;
      url: string;
    }
  ];
  wallet: {
    id: number;
    balance: number;
    previous_balance: number;
    owner_id: number;
  };
}

const formatScheduleToWeekSchedule = (response: GetUserSchedule) => {
  let result: WeekTimeSlotPayload[] = [];
  response.map((date) => {
    date.timeTableResponse?.map((timetable) => {
      result = [
        ...result,
        {
          id: timetable.id || -1,
          classId: date.workingClass?.id || -1,
          className: date.workingClass?.course?.code || '',
          date: timetable.date || '',
          dayOfWeekId: new Date(timetable.date || '').getDay() + 1,
          isPresent: true,
          link: timetable.classURL || '',
          slotId: timetable.slot?.id || 0,
          attendanceSlotId: 0,
        },
      ];
      return null;
    });
    return null;
  });
  return result;
};

const formatScheduleToMonthSchedule = (response: GetUserSchedule) => {
  let result: MonthTimeSlotPayload[] = [];
  response.map((date) => {
    date.timeTableResponse?.map((timetable) => {
      const isExisted = result.findIndex((item) =>
        compareDate(item.date, new Date(timetable.date || ''))
      );
      if (isExisted !== -1) {
        const isSlotExisted = result[isExisted].slots.findIndex(
          (item) =>
            (item.id === timetable?.slot?.id || -1) &&
            item.value === date.workingClass?.course?.code
        );
        if (isSlotExisted === -1) {
          result[isExisted] = {
            ...result[isExisted],
            slots: [
              ...result[isExisted].slots,
              {
                id: timetable.slot?.id || 0,
                label: `${timetable.slot?.startTime} - ${timetable.slot?.endTime}`,
                value: `${date.workingClass?.course?.code}`,
              },
            ],
          };
        }
      } else {
        result = [
          ...result,
          {
            id: timetable.id || 0,
            date: new Date(timetable.date || ''),
            slots: [
              {
                id: timetable.slot?.id || 0,
                label: `${timetable.slot?.startTime} - ${timetable.slot?.endTime}`,
                value: `${date.workingClass?.course?.code}`,
              },
            ],
          },
        ];
      }
      return null;
    });
    return null;
  });
  return result;
};

const accountApi = {
  signUp(data: RequestRegisterPayload): Promise<UserPayload[]> {
    return axiosClient.post(`${url}/register`, data);
  },
  signIn(data: LoginRequestPayload): Promise<any> {
    return axiosClient.post(`${urlAuth}/login`, data);
  },

  // get
  getProfile(config: any): Promise<any> {
    return axiosClient.get(`${url}/profile`, config);
  },
  getUserById(id: number): Promise<any> {
    return axiosClient.get(`${url}/${id}`);
  },
  async getTokenProfile(): Promise<ProfilePayload> {
    const response = await axiosClient.get(`${url}/profile`);
    const result: ProfilePayload = response;
    return result;
  },
  async getUserClass(
    params: PagingFilterRequest
  ): Promise<PagingFilterPayload<ClassMenuItemPayload>> {
    const response: PagingFilterPayload<ResponseUserClasses> =
      await axiosClient.get(`${url}/classes`, {
        params,
        paramsSerializer: { indexes: null },
      });
    const result: ClassMenuItemPayload[] = response.items.map((item) => ({
      id: item.id || 0,
      imageAlt: 'class image', // TODO: chua co
      imageUrl: image.mockClass, // TODO: chua co
      name: item.course?.name,
      progressValue: 50, // TODO: chua co
      status: 'NOTSTART', // TODO: chua co
      subjectId: 1,
      teacherName: [item.mentorName || ''],
    }));
    return { ...response, items: result };
  },
  editAccountProfile(data: EditAccountProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/password`, data);
  },
  async editImageProfile(data: EditImageProfilePayload): Promise<any> {
    const bodyFormData = new FormData();
    const { file, imageType } = data;

    bodyFormData.append('file', file);
    bodyFormData.append('imageType', imageType);

    return axiosClient.post(`${url}/upload-image`, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  editCertificateProfile(data: EditCertificateProfilePayload): Promise<any> {
    const bodyFormData = new FormData();
    const { userImages, degreeIdsToDelete } = data;
    userImages.forEach((item) => {
      bodyFormData.append('files', item);
    });
    if (degreeIdsToDelete) {
      bodyFormData.append('degreeIdsToDelete', degreeIdsToDelete as any); // CORRECT WAY
    }
    return axiosClient.post(`${url}/upload-degree`, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  editMentorProfile(data: EditMentorProfilePayload): Promise<any> {
    return axiosClient.put(`/mentor-profiles`, data);
  },
  editMentorPersonalProfile(data: EditPersonalProfileFormSubmit): Promise<any> {
    return axiosClient.put(`${url}/mentor-personal`, data);
  },
  editMemberPersonalProfile(data: EditPersonalProfileFormSubmit): Promise<any> {
    return axiosClient.put(`${url}/member-personal`, data);
  },
  editSocialProfile(data: EditSocialProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/social`, data);
  },
  async getMentorData(id: string): Promise<any> {
    return axiosClient.get(`${url}/${id}`);
  },
  async getMentorClasses(data: PagingFilterRequest): Promise<any> {
    return axiosClient.get(`${url}/classes`, {
      params: data,
      paramsSerializer: { indexes: null },
    });
  },
  async getClassAttendance(id: number): Promise<AttendanceTimeSlotPayload[]> {
    const response: GetUserSchedule = await axiosClient.get(
      `${url}/timetables`
    );

    const selectedClassResponse = response.find(
      (item) => item.workingClass?.id === id
    );

    const result: AttendanceTimeSlotPayload[] =
      selectedClassResponse?.timeTableResponse?.map((timeSlot) => ({
        id: timeSlot.id || 0,
        date: formatDate(timeSlot.date || '') || '',
        slotName: timeSlot.slot?.name || '',
        time: `${timeSlot.slot?.startTime} - ${timeSlot.slot?.endTime}`,
      })) || [];

    return result;
  },
  async getUserSchedule(): Promise<{
    week: WeekTimeSlotPayload[];
    month: MonthTimeSlotPayload[];
  }> {
    const response: GetUserSchedule = await axiosClient.get(
      `${url}/timetables`
    );

    const result = {
      week: formatScheduleToWeekSchedule(response),
      month: formatScheduleToMonthSchedule(response),
    };

    return result;
  },
  getAllUser({
    q,
    role,
    isVerified,
    page,
    size,
    sort,
  }: GetAllUserPayload): Promise<PagingFilterPayload<GetAllUserReturnPayload> | null> {
    const urlSearch = `${url}?q=${q}&role=${role}&isVerified=${isVerified}&page=${page}&size=${size}&sort=${sort}`;
    return axiosClient.get(urlSearch);
  },
};

export default accountApi;
