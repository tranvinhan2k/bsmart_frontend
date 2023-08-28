import axiosClient from '~/api/axiosClient';
import { image } from '~/constants/image';
import { UseSearchManagedClassPayload } from '~/hooks/class/UseSearchManagedClass';
import { UseGetCourseCreateRequestDetailsPayload } from '~/hooks/course/useGetCourseCreateRequestDetails';
import { PagingFilterPayload } from '~/models';
import {
  ClassCreateClassSectionPayload,
  ClassDeleteClassSectionPayload,
  ClassDetailsPayload,
  ClassGetDetailsPayload,
  ClassUpdateClassSectionPayload,
  ManagedClass,
  ManagedClassDetails,
} from '~/models/class';
import { CourseCreateRequestDetails } from '~/models/courses';
import { PagingFilterRequest, PostClassRequest } from '~/models/request';
import {
  GetDuplicateResponse,
  GetFeedbackTemplateNotUse,
  GetStudentList,
  PostTimeTableResponse,
  ResponseDetailClass,
  ResponseMentorCoursePayload,
} from '~/models/response';
import { ClassDetailPayload, DuplicateClassPayload } from '~/models/type';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import { MarkPayload } from '~/pages/member_class/MemberClassMarkReportPage';
import { MarkOfStudentPayload } from '~/pages/mentor_class/MentorClassMarkReportPage';
import { MentorClassMemberDetailPayload } from '~/pages/mentor_class/MentorClassStudentListPage';
import { formatOptionPayload, generateMockApi } from '~/utils/common';

const url = '/classes';

const classApi = {
  // get
  async getDuplicateClasses(classId: number) {
    const response: GetDuplicateResponse[] = await axiosClient.get(
      `${url}/${classId}/duplicate`
    );
    const result: DuplicateClassPayload[] = response.map((item) => ({
      id: item.id || 0,
      code: item.code || '',
    }));
    return result;
  },
  async getManagerFeedbackClass(id: number) {
    const response: {
      notUse: GetFeedbackTemplateNotUse[];
      use: GetFeedbackTemplateNotUse[];
    } = await axiosClient.get(`${url}/feedback-template/${id}`);

    const result: { id: number; code: string; isUsed: boolean }[] = [
      ...response.use.map((item) => ({
        id: item.id || 0,
        code: item.code || '',
        isUsed: true,
      })),
      ...response.notUse.map((item) => ({
        id: item.id || 0,
        code: item.code || '',
        isUsed: false,
      })),
    ];

    return result;
  },

  async changeUrl(params: { id: number; url: string }) {
    return axiosClient.put(
      `${url}/${params.id}/meeting`,
      {},
      {
        params,
      }
    );
  },

  async getStudentMarkReport(params: { classId: number; studentId: number }) {
    const response: Partial<{
      point: number;
      activityId: number;
      type: 'QUIZ' | 'ASSIGNMENT';
    }>[] = await axiosClient.get(`${url}/student-point`, {
      params,
    });

    const result: MarkPayload[] =
      response.map((item) => ({
        id: item.activityId || 0,
        grade: item.point || 0,
        name: item.type || '',
      })) || [];

    return result;
  },

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
        mentorId: response.mentor.id,
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
        courseId: 0,
        courseName: '',
        code: item.code,
        startDate: item.startDate,
        endDate: item.endDate,
        imageAlt: item.image.alt,
        imageUrl: item.image.url,
        imageId: item.image.id,
        maxStudent: item.maxStudent,
        minStudent: item.minStudent,
        numberOfSlot: item.numberOfSlot,
        numberOfStudent: item.numberOfStudent || 0,
        isFullStudent: item.isFullStudent || false,
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
        courseId: 0,
        courseName: '',
        numberOfStudent: 0,
        code: item.code,
        id: item.id,
        endDate: item.endDate,
        startDate: item.startDate,
        numberOfSlot: item.numberOfSlot,
        link: item.classURL,
        level: item.level,
        status: item.status,
        isFullStudent: item.isFullStudent || false,
        purchase: item?.purchase || false,
        imageAlt: item?.image?.name || '',
        imageUrl: item?.image?.url || '',
        imageId: item?.image?.id || '',
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
    return axiosClient.put(`${url}/${id}`, param);
  },
  openClass({ id, params }: { id: number; params: PostTimeTableResponse }) {
    return axiosClient.put(`${url}/${id}/open`, params);
  },

  async getDetailUserClass(id: number): Promise<ClassDetailPayload> {
    const response: ResponseDetailClass = await axiosClient.get(`${url}/${id}`);
    const result: ClassDetailPayload = {
      id: response?.id || 0,
      code: response?.code || '',
      imageAlt: response?.image?.name || '',
      imageUrl: response?.image?.url || '',
      name: response.course?.name || '',
      classURL: response.classURL || '',
      progressValue: response.progress?.percentage || 0,
      status: response?.status || 'ALL',
      subjectId: response.course?.subject?.id || 0,
      teacherName: [response?.mentor?.fullName || ''],
      teacherMail: response.mentor?.email || '',
      teacherPhone: response.mentor?.phone || '',
      teacherUrl: response.mentor?.avatar?.url || '',
      teacherAlt: response.mentor?.avatar?.name || '',
      endDate: response?.endDate || '',
      startDate: response?.startDate || '',
      feedback: {
        id: response.feedback?.id || 0,
        default: response.feedback?.default || false,
        fixed: response.feedback?.fixed || false,
        isDefault: response.feedback?.isDefault || false,
        isFixed: response.feedback?.isFixed || false,
        name: response.feedback?.name || '',
        questions: response.feedback?.questions || [],
        totalClassUsed: response.feedback?.totalClassUsed || 0,
        type: response.feedback?.type || 'COURSE',
      },
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

  getCourseCreateRequestDetails({
    idCourse,
    status,
  }: UseGetCourseCreateRequestDetailsPayload): Promise<
    CourseCreateRequestDetails | undefined
  > {
    const urlGet = `${url}/pending/course/${idCourse}?status=${status}`;
    return axiosClient.get(urlGet);
  },
  searchManagedClass({
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
  getManagedClassDetails(
    idClass: number
  ): Promise<ManagedClassDetails | undefined> {
    const urlGet = `${url}/${idClass}`;
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
