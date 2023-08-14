import { EditAccountProfilePayload } from '~/models/modelAPI/user/account';
import { EditPersonalProfileFormSubmit } from '~/models/modelAPI/user/personal';
import { EditSocialProfilePayload } from '~/models/modelAPI/user/social';
import { LoginRequestPayload } from '~/models/api/auth';
import { ProfileImgType } from '~/constants/profile';
import { RequestRole } from '~/models/role';
import { User, UserPayload } from '~/models/user';
import axiosClient from '~/api/axiosClient';
import { PagingFilterPayload, PagingFilterRequest } from '~/models';
import {
  ClassMenuItemPayload,
  ManagedMemberPayload,
  ManagedMentorPayload,
  MentorProfileUpdateResponse,
  ProfilePayload,
  WeekTimeSlotPayload,
} from '~/models/type';
import { GetUserSchedule, ResponseUserClasses } from '~/models/response';
import { MonthTimeSlotPayload } from '~/components/molecules/schedules/MonthSchedule';
import { compareDate } from '~/utils/date';
import { AttendanceTimeSlotPayload } from '~/pages/mentor_class/MentorClassAttendanceListPage';
import { PromoCodePayload } from '~/pages/member_class/MemberPromoCode';
import { generateMockApi } from '~/utils/common';
import { image } from '~/constants/image';
import { NotificationItemPayload } from '~/HOCs/context/NotificationItem';
import { UseSearchManagedUserPayload } from '~/hooks/user/useSearchManagedUser';
import { IntroduceCodePayload } from '~/pages/CheckoutPage';

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
          id: timetable?.id || 0,
          classId: date.workingClass?.id || -1,
          className: date.workingClass?.code || '',
          date: timetable.date || '',
          dayOfWeekId: new Date(timetable.date || '').getDay() + 1,
          isPresent: true, // TODO chua co
          isTookAttendance: true, // TODO chua co
          link: timetable.classURL || '',
          slotId: timetable.slot?.id || 0,
          attendanceSlotId: timetable?.id || 0,
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

  getProfile(): Promise<ProfilePayload> {
    return axiosClient.get(`${url}/profile`);
  },
  getMentorEditProfile(): Promise<MentorProfileUpdateResponse> {
    return axiosClient.get(`${url}/profile-edit`);
  },
  getIntroduceCode(): Promise<PromoCodePayload[]> {
    const data: PromoCodePayload[] = [
      {
        id: 0,
        code: '1234567',
        classId: 0,
        courseId: 3,
        percent: 0.5,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, quo impedit quibusdam expedita dolore sunt ullam laborum nam incidunt explicabo sint nihil, dolor accusantium necessitatibus aspernatur natus maxime. Consequatur, distinctio! ',
      },
      {
        id: 1,
        code: '1234563',
        classId: 0,
        courseId: 3,
        percent: 0.4,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, quo impedit quibusdam expedita dolore sunt ullam laborum nam incidunt explicabo sint nihil, dolor accusantium necessitatibus aspernatur natus maxime. Consequatur, distinctio! ',
      },
      {
        id: 2,
        code: '1234561',
        courseId: 1,
        classId: 2,
        percent: 0.3,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, quo impedit quibusdam expedita dolore sunt ullam laborum nam incidunt explicabo sint nihil, dolor accusantium necessitatibus aspernatur natus maxime. Consequatur, distinctio! ',
      },
    ];

    return generateMockApi(data);
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
      code: item.code || '',
      imageAlt: item.image?.name || '',
      imageUrl: item.image?.url || '',
      name: item.course?.name,
      progressValue: -1, // TODO: chua co
      status: item?.status || 'ALL',
      subjectId: item.course?.subject?.id || 0,
      teacherName: [item.mentor?.name || ''],
      endDate: item.endDate || '',
      max: item.maxStudent || 0,
      min: item.minStudent || 0,
      numberOfStudent: item.numberOfStudent || 0,
      startDate: item.startDate || '',
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
  updateDegreeRequest(data: EditCertificateProfilePayload): Promise<any> {
    const bodyFormData = new FormData();
    const { userImages } = data;
    userImages.forEach((item) => {
      bodyFormData.append('files', item);
    });
    return axiosClient.post(`image/upload/degree`, bodyFormData, {
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
        date: timeSlot?.date || '',
        slotName: timeSlot.slot?.name || '',
        time: `${timeSlot.slot?.startTime} - ${timeSlot.slot?.endTime}`,
        isPresent: !!timeSlot.present,
        isTookAttendance: !!timeSlot.tookAttendance,
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
  async getUserClassSchedule(id: number): Promise<WeekTimeSlotPayload[]> {
    const response: GetUserSchedule = await axiosClient.get(
      `${url}/timetables`
    );
    const responseClass = response.find((item) => item.workingClass?.id === id);
    const result: WeekTimeSlotPayload[] =
      responseClass?.timeTableResponse?.map((item) => ({
        id: item?.id || 0,
        classId: responseClass.workingClass?.id || 0,
        className: responseClass.workingClass?.code || '',
        date: item?.date || '',
        dayOfWeekId: new Date(item?.date || '').getDay() + 1,
        isPresent: !!item.present,
        isTookAttendance: !!item.tookAttendance,
        link: item.classURL || '',
        slotId: item.slot?.id || 0,
        attendanceSlotId: 0,
      })) || [];
    return result;
  },
  searchManagedUser({
    q = '',
    role = null,
    isVerified = true,
    page = 0,
    size = null,
    sort = [],
  }: UseSearchManagedUserPayload): Promise<PagingFilterPayload<User> | null> {
    const urlSearch = `${url}?q=${q}&role=${role}&isVerified=${isVerified}&page=${page}&size=${size}&sort=${sort}`;
    return axiosClient.get(urlSearch);
  },

  sendMailResetPassword(email: string) {
    // TODO: nhap email xac nhan quen mat khau o day
    return generateMockApi(true);
  },

  getManagedMentorDetails(id: number): Promise<ManagedMentorPayload> {
    return axiosClient.get(`${url}/${id}/mentor`);
  },
  getManagedMemberDetails(id: number): Promise<ManagedMemberPayload> {
    return axiosClient.get(`${url}/${id}/member`);
  },
};

export default accountApi;
