import axiosClient from '~/api/axiosClient';
import { image } from '~/constants/image';
import { UseSearchManagedClassPayload } from '~/hooks/class/UseSearchManagedClass';
import { PagingFilterPayload } from '~/models';
import {
  ClassCreateClassSectionPayload,
  ClassDeleteClassSectionPayload,
  ClassDetailsPayload,
  ClassGetDetailsPayload,
  ClassUpdateClassSectionPayload,
  ManagedClass,
} from '~/models/class';
import { CourseCreateRequestDetails } from '~/models/courses';
import { PagingFilterRequest, PostClassRequest } from '~/models/request';
import {
  GetStudentList,
  PostTimeTableResponse,
  ResponseDetailClass,
  ResponseMentorCoursePayload,
} from '~/models/response';
import { ClassDetailPayload } from '~/models/type';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import { MentorClassMemberDetailPayload } from '~/pages/mentor_class/MentorClassStudentListPage';
import { formatOptionPayload } from '~/utils/common';

const url = '/classes';

const classApi = {
  // get
  async getUserDetailCourse(id: number) {
    const response = await axiosClient.get(`${url}/course/${id}`);
    const result: ResponseMentorCoursePayload = {
      course: {
        id: response.id,
        category: formatOptionPayload(response.categoryResponse),
        courseCode: response.code,
        courseDescription: response.description,
        courseName: response.name,
        images: response.classes?.map((item: any) => item?.image?.url),
        mentorAvatar: response.mentor.avatar.url,
        mentorDescription: response.mentor.introduce,
        mentorName: [response.mentor.name],
        status: response.status,
        level: response.level,
        subject: formatOptionPayload(response.subjectResponse),
        totalClass: 0,
      },
      classes: (response.classes as any[]).map((item) => ({
        id: item.id,
        code: item.code,
        startDate: item.startDate,
        endDate: item.endDate,
        imageAlt: item.image.alt,
        imageUrl: item.image.url,
        maxStudent: item.maxStudent,
        minStudent: item.minStudent,
        numberOfSlot: item.numberOfSlot,
        purchase: item.purchase || false,
        price: item.price,
        status: item.status,
        timeInWeekRequests: item.timeInWeeks.map((subItem: any) => ({
          dayOfWeekId: subItem.dayOfWeek.id,
          slotId: subItem.slot.id,
        })),
      })),
      content: (response.activities as any[]).map((item) => ({
        id: item.id,
        authorizeClasses: item.authorizeClasses,
        created: item.created,
        createdBy: item.createBy,
        lastModified: item.lastModified,
        lastModifiedBy: item.lastModifiedBy,
        name: item.name,
        parentActivityId: item.parentActivityId,
        subActivities: item.subActivities,
        type: item.type,
        visible: item.visible,
        isFixed: item.fixed,
      })),
    };
    return result;
  },
  getCourseClasses({
    id,
    filterParam,
  }: {
    id: number;
    filterParam: PagingFilterRequest;
  }): Promise<PagingFilterPayload<DetailCourseClassPayload>> {
    return axiosClient.get(`${url}/course/${id}/mentor`, {
      params: filterParam,
      paramsSerializer: { indexes: null },
    });
  },
  async getMentorClassStudentList({
    id,
    params,
  }: {
    id: number;
    params: PagingFilterRequest;
  }) {
    const response: PagingFilterPayload<GetStudentList> = await axiosClient.get(
      `${url}/${id}/members`,
      {
        params,
      }
    );
    const result: MentorClassMemberDetailPayload[] = response.items.map(
      (item) => ({
        id: item?.id || 0,
        avatar: item.images?.url || '',
        dayOfBirth: new Date('01/01/2000').toISOString(),
        email: item?.email || '',
        name: item?.name || '',
        phone: '',
      })
    );

    return { ...response, items: result };
  },
  async getMentorCourseCLasses({
    id,
    params,
  }: {
    id: number;
    params: PagingFilterRequest;
  }): Promise<PagingFilterPayload<DetailCourseClassPayload>> {
    const response = await axiosClient.get(`${url}/course/${id}/mentor`, {
      params,
    });
    const result: DetailCourseClassPayload[] = (response.items as any[]).map(
      (item) => ({
        code: item.code,
        id: item.id,
        endDate: item.endDate,
        startDate: item.startDate,
        numberOfSlot: item.numberOfStudent,
        level: item.level,
        status: item.status,
        purchase: item?.purchase || false,
        imageAlt: item.image.name,
        imageUrl: item.image.url,
        maxStudent: item.maxStudent,
        minStudent: item.minStudent,
        price: item.price,
        timeInWeekRequests: item.timeInWeeks.map((subItem: any) => ({
          dayOfWeekId: subItem.dayOfWeek.id,
          slotId: subItem.slot.id,
        })),
      })
    );
    return { ...response, items: result };
  },
  // post
  addClassForCourse({
    id,
    param,
  }: {
    id: number;
    param: PostClassRequest;
  }): Promise<number> {
    return axiosClient.post(`${url}/course/${id}`, param);
  },
  // put
  updateClassForCourse({ id, param }: { id: number; param: PostClassRequest }) {
    return axiosClient.put(`${url}/course/${id}`, param);
  },
  openClass({ id, params }: { id: number; params: PostTimeTableResponse }) {
    return axiosClient.put(`${url}/${id}/open`, params);
  },

  async getDetailUserClass(id: number): Promise<ClassDetailPayload> {
    const response: ResponseDetailClass = await axiosClient.get(`${url}/${id}`);
    const result: ClassDetailPayload = {
      id: response?.id || 0,
      code: response?.code || '',
      imageAlt: response?.classImage?.name || '',
      imageUrl: response?.classImage?.url || '',
      name: response.course?.name || '',
      progressValue: response.progress?.percentage || 0,
      status: response?.status || 'ALL',
      subjectId: response.course?.subject?.id || 0,
      teacherName: [response?.mentor?.fullName || ''],
      endDate: response?.endDate || '',
      startDate: response?.startDate || '',
      numberOfSlot: response?.numberOfSlot || 0,
      numberOfStudent: response.numberOfCurrentStudent || 0,
      price: response?.price || 0,
      timeTablesRequest:
        response.timeInWeeks?.map((item) => ({
          dayOfWeekId: item.dayOfWeek?.id || 0,
          slotId: item.slot?.id || 0,
        })) || [],
      activities:
        response.activities?.map((item) => ({
          id: item?.id || 0,
          authorizeClasses: [],
          created: item?.created || '',
          createdBy: item?.createdBy || '',
          isFixed: false,
          lastModified: item?.lastModified || '',
          lastModifiedBy: item?.lastModifiedBy || '',
          name: item?.name || '',
          parentActivityId: item?.parentActivityId || 0,
          type: item?.type || 'SECTION',
          visible: !!item?.visible,
          subActivities: item?.subActivities || [],
        })) || [],
    };
    return result;
  },

  getClassDetails({
    id,
  }: ClassGetDetailsPayload): Promise<ClassDetailsPayload | undefined> {
    const urlGet = `${url}/${id}`;
    return axiosClient.get(urlGet);
  },
  createClassSections({
    id,
    data,
  }: ClassCreateClassSectionPayload): Promise<any> {
    const urlPost = `${url}/${id}/class-sections`;
    return axiosClient.post(urlPost, data);
  },

  updateClassSections({
    id,
    classSectionId,
    data,
  }: ClassUpdateClassSectionPayload): Promise<any> {
    const urlPut = `${url}/${id}/class-sections/${classSectionId}`;
    return axiosClient.put(urlPut, data);
  },

  deleteClassSections({
    id,
    classSectionId,
  }: ClassDeleteClassSectionPayload): Promise<any> {
    const urlDelete = `${url}/${id}/class-sections/${classSectionId}`;
    return axiosClient.delete(urlDelete);
  },

  getCourseCreateRequestDetails(
    idCourse: number
  ): Promise<CourseCreateRequestDetails | undefined> {
    const urlGet = `${url}/pending/course/${idCourse}`;
    return axiosClient.get(urlGet);
  },
  searchManageClass({
    status,
    q = '',
    page = 0,
    size = null,
    sort = [],
  }: UseSearchManagedClassPayload): Promise<
    PagingFilterPayload<ManagedClass> | undefined
  > {
    const urlGet = `${url}/manager?status=${status}&page=${page}&size=${size}&sort=${sort}`;
    return axiosClient.get(urlGet);
  },

  async getMentorClassAttendances({
    id,
  }: ClassGetDetailsPayload): Promise<any> {
    const urlGet = `${url}/${id}/time-tables`;
    const response: any = await axiosClient.get(urlGet, {
      params: {
        id,
      },
    });
    return response;
  },

  // delete
  deleteCourseClass(id: number) {
    return axiosClient.delete(`${url}/${id}`);
  },
};

export default classApi;
