import axiosClient from '~/api/axiosClient';
import {
  ImagePayload,
  PagingFilterPayload,
  PagingFilterRequest,
  PostCourseRequest,
  PutCourseRequest,
} from '~/models';
import { LevelKeys, TypeLearnKeys } from '~/models/variables';
import { SubCoursePayload } from '~/models/subCourse';
import { ActivityPayload, CourseMenuItemPayload } from '~/models/type';
import {
  GetAllActivitiesResponse,
  GetAllCoursesResponse,
  GetCoursePercentResponse,
} from '~/models/response';
import { formatOptionPayload, generateMockApi } from '~/utils/common';
import { CourseCreateRequestDetails } from '~/models/courses';
import { UseSearchCourseCreateRequestPayload } from '~/hooks/course/useSearchCourseCreateRequest';
import { UseSearchCourseUpdateRequestPayload } from '~/hooks/course/useSearchCourseUpdateRequest';
import { ManageTableDetailsCourseUpdateRequestPayload } from '~/components/molecules/ManageTableDetailsCourseUpdateRequest';
// Define the request payload for fetching courses

export interface ResponseMemberCoursePayload {
  id: number;
  images: ImagePayload[];
  imageUrl: string;
  courseCode: string;
  courseName: string;
  categoryId: number;
  categoryName: string;
  subjectId: number;
  subjectName: string;
  mentorName: string;
  courseDescription: string;
  totalSubCourse: number;
  learns: TypeLearnKeys[];
}

export interface RequestUpdateCoursePayload {
  id: number;
  courseCode: string;
  courseName: string;
  courseDescription: string;
  categoryId: number;
  subjectId: number;
  subCourseTitle: string;
  price: number;
  startDateExpected: string;
  endDateExpected: string;
  minStudent: number;
  maxStudent: number;
  numberOfSlot: number;
  type: TypeLearnKeys;
  level: LevelKeys;
  timeInWeekRequests: {
    dayOfWeekId: number;
    slotId: number;
  }[];
}

export interface ProcessCreateCourseRequestPayload {
  id: number;
  classIds: number[];
  status: string;
  message: string;
}

export interface ResponseGetCoursePayload {
  id: number;
  subCourseId: number;
  courseId: number;
  images: {
    id: number;
    name: string;
    status: boolean;
    type: string;
    url: string;
  }[];
  courseName: string;
  courseCode: string;
  courseDescription: string;
  categoryName: string;
  subjectName: string;
  mentorName: string;
  learns: TypeLearnKeys[];
}

function handleResponseGetActivities(
  data: GetAllActivitiesResponse
): ActivityPayload[] {
  return data.map((item) => ({
    created: item?.created || '',
    createdBy: item?.createdBy || '',
    id: item?.id || -1,
    visible: item?.visible || false,
    lastModified: item?.lastModified || '',
    lastModifiedBy: item?.lastModifiedBy || '',
    name: item?.name || '',
    parentActivityId: item?.parentActivityId || 0,
    subActivities: handleResponseGetActivities(item?.subActivities || []),
    type: item?.type || 'SECTION',
    authorizeClasses: item?.authorizeClasses || [],
    isFixed: !!item?.fixed,
  }));
}

const url = '/courses';

const coursesApi = {
  // get

  async getDetailRequestUpdateCourseContent() {
    const response: ManageTableDetailsCourseUpdateRequestPayload = {
      oldContent: [
        {
          id: 0,
          created: '',
          createdBy: '',
          lastModified: '',
          lastModifiedBy: '',
          name: 'Hello',
          parentActivityId: 0,
          authorizeClasses: [],
          isFixed: false,
          subActivities: [
            {
              id: 0,
              created: '',
              createdBy: '',
              lastModified: '',
              lastModifiedBy: '',
              name: 'Giới thiệu',
              parentActivityId: 0,
              subActivities: [],
              type: 'LESSON',
              visible: false,
              authorizeClasses: [],
              isFixed: false,
            },
            {
              id: 0,
              created: '',
              createdBy: '',
              lastModified: '',
              lastModifiedBy: '',
              name: 'Giới thiệu',
              parentActivityId: 0,
              subActivities: [],
              type: 'LESSON',
              visible: false,
              authorizeClasses: [],
              isFixed: false,
            },
          ],
          type: 'LESSON',
          visible: false,
        },
      ],
      updateContent: [
        {
          id: 0,
          created: '',
          createdBy: '',
          lastModified: '',
          lastModifiedBy: '',
          name: 'Hello',
          parentActivityId: 0,
          authorizeClasses: [],
          isFixed: false,
          subActivities: [
            {
              id: 0,
              created: '',
              createdBy: '',
              lastModified: '',
              lastModifiedBy: '',
              name: 'Giới thiệu',
              parentActivityId: 0,
              subActivities: [],
              type: 'LESSON',
              visible: false,
              authorizeClasses: [],
              isFixed: false,
            },
            {
              id: 0,
              created: '',
              createdBy: '',
              lastModified: '',
              lastModifiedBy: '',
              name: 'Giới thiệu',
              parentActivityId: 0,
              subActivities: [],
              type: 'LESSON',
              visible: false,
              authorizeClasses: [],
              isFixed: false,
            },
          ],
          type: 'LESSON',
          visible: false,
        },
      ],
    };

    return generateMockApi(response);
  },

  async changeCourseStatus(id: number) {
    return axiosClient.put(`${url}/${id}/change-status-waiting`);
  },

  async getAllCourse(
    data: PagingFilterRequest
  ): Promise<PagingFilterPayload<CourseMenuItemPayload> | null> {
    const response: PagingFilterPayload<GetAllCoursesResponse> =
      await axiosClient.get(url, {
        params: data,
        paramsSerializer: { indexes: null },
      });
    const result: CourseMenuItemPayload[] = response.items.map((item) => ({
      id: item?.id || 0,
      imageAlt: item.images?.[0]?.name || '',
      imageUrl: item.images?.[0]?.url || '',
      courseStatus: item.status,
      courseTeacherName: item.mentorName,
      subjectName: item.subjectResponse?.name || '',
      courseDescription: item.courseDescription,
      courseCode: item.courseCode,
      courseName: item.courseName,
      level: item?.level || 'BEGINNER',
      totalClass: item.totalClass,
      category: formatOptionPayload({
        id: item?.categoryResponse?.id || 0,
        code: item?.categoryResponse?.code || '',
        name: item?.categoryResponse?.name || '',
      }),
      subject: formatOptionPayload({
        id: item.subjectResponse?.id || 0,
        code: item.subjectResponse?.code || '',
        name: item.subjectResponse?.name || '',
        categoryIds: item.subjectResponse?.categoryIds || [],
      }),
      numOfRating: item.submissionCount || 0,
      rating: item.averageRate || 0,
    }));
    return { ...response, items: result };
  },
  async getMentorCourses(
    params: PagingFilterRequest
  ): Promise<PagingFilterPayload<CourseMenuItemPayload>> {
    const response: PagingFilterPayload<GetAllCoursesResponse> =
      await axiosClient.get(`${url}/mentor`, {
        params,
        paramsSerializer: { indexes: null },
      });

    const result: CourseMenuItemPayload[] = response.items.map((item) => ({
      id: item?.id || 0,
      imageAlt: item.images?.[0]?.name,
      imageUrl: item.images?.[0]?.url,
      courseStatus: item.status,
      courseTeacherName: item.mentorName,
      subjectName: item?.subjectResponse?.name || '',
      courseDescription: item.courseDescription,
      courseCode: item.courseCode,
      courseName: item.courseName,
      level: item?.level || 'BEGINNER',
      totalClass: item.totalClass,
      category: formatOptionPayload({
        id: item?.categoryResponse?.id || 0,
        code: item?.categoryResponse?.code || '',
        name: item?.categoryResponse?.name || '',
      }),
      subject: formatOptionPayload({
        id: item.subjectResponse?.id || 0,
        code: item.subjectResponse?.code || '',
        name: item.subjectResponse?.name || '',
        categoryIds: item.subjectResponse?.categoryIds || [],
      }),
      numOfRating: item.submissionCount || 0,
      rating: item.averageRate || 0,
    }));

    return { ...response, items: result };
  },
  async getAllCourseActivities(id: number): Promise<ActivityPayload[]> {
    const response: GetAllActivitiesResponse = await axiosClient.get(
      `${url}/${id}/activities`
    );
    const result: ActivityPayload[] = handleResponseGetActivities(response);
    return result;
  },
  getCoursePercent(id: number): Promise<GetCoursePercentResponse | null> {
    return axiosClient.get(`${url}/${id}/completeness`);
  },
  // post
  async createCourse(params: PostCourseRequest): Promise<number> {
    return axiosClient.post(url, params);
  },
  // put
  async updateCourse({ id, param }: { id: number; param: PutCourseRequest }) {
    axiosClient.put(`${url}/${id}`, param);
  },
  putRequestApproval({
    id,
    params,
  }: {
    id: number;
    params: number[];
  }): Promise<number[]> {
    return axiosClient.put(`${url}/${id}/request-approval`, params, {
      paramsSerializer: { indexes: null },
    });
  },
  // delete
  async deleteCourse(id: number): Promise<boolean> {
    const response = await axiosClient.delete(`${url}/${id}`);
    return response;
  },
  async getAllPublicCourse() {
    return axiosClient.get(`${url}/public`);
  },
  async getMemberCourse(
    data: PagingFilterRequest
  ): Promise<PagingFilterPayload<ResponseMemberCoursePayload>> {
    return axiosClient.get(`${url}/member`, {
      params: data,
      paramsSerializer: { indexes: null },
    });
  },
  async getSubCourse(
    id: string
  ): Promise<PagingFilterPayload<SubCoursePayload>> {
    const response: PagingFilterPayload<SubCoursePayload> =
      await axiosClient.get(`${url}/${id}/sub-courses`);
    return response;
  },

  requestSubCourse(id: number) {
    return axiosClient.put(`${url}/${id}/request-approval`);
  },
  deleteSubCourse(id: number) {
    return axiosClient.delete(`${url}/${id}`);
  },
  updateSubCourse(params: RequestUpdateCoursePayload) {
    return axiosClient.put(`${url}/${params.id}`, params);
  },

  blockCourse(id: number) {
    return axiosClient.put(`${url}/${id}/block`);
  },
  unblockCourse(id: number) {
    return axiosClient.put(`${url}/${id}/unblock`);
  },

  searchCourseCreateRequest({
    status,
    q = '',
    page = 0,
    size = null,
    sort = [],
  }: UseSearchCourseCreateRequestPayload): Promise<
    PagingFilterPayload<CourseCreateRequestDetails>
  > {
    const urlSearch = `${url}/pending?status=${status}&q=${q}&page=${page}&size=${size}&sort=${sort}`;
    return axiosClient.get(`${urlSearch}`);
  },
  processCourseCreateRequest(
    data: ProcessCreateCourseRequestPayload
  ): Promise<boolean> {
    return axiosClient.put(`${url}/${data.id}/approval`, {
      classIds: data.classIds,
      status: data.status,
      message: data.message,
    });
  },

  searchCourseUpdateRequest({
    status,
    q = '',
    page = 0,
    size = null,
    sort = [],
  }: UseSearchCourseUpdateRequestPayload): Promise<
    PagingFilterPayload<CourseCreateRequestDetails>
  > {
    const urlSearch = `${url}/pending?status=${status}&p=${q}&page=${page}&size=${size}&sort=${sort}`;
    return axiosClient.get(`${urlSearch}`);
  },
  processCourseUpdateRequest(
    data: ProcessCreateCourseRequestPayload
  ): Promise<boolean> {
    return axiosClient.put(`${url}/${data.id}/approval`, {
      classIds: data.classIds,
      status: data.status,
      message: data.message,
    });
  },
};

export default coursesApi;
