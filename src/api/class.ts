import axiosClient from '~/api/axiosClient';
import { mockImages, mockLevelData } from '~/constants';
import { image } from '~/constants/image';
import { PagingFilterPayload } from '~/models';
import {
  ClassCreateClassSectionPayload,
  ClassDeleteClassSectionPayload,
  ClassDetailsPayload,
  ClassGetDetailsPayload,
  ClassUpdateClassSectionPayload,
} from '~/models/class';
import { ClassesOfCourseWithCourseDetails } from '~/models/courses';
import { PagingFilterRequest, PostClassRequest } from '~/models/request';
import { ResponseMentorCoursePayload } from '~/models/response';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
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
        images: mockImages,
        mentorAvatar:
          'https://images.pexels.com/photos/5212353/pexels-photo-5212353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        mentorDescription: 'Description teachr',
        mentorName: ['Nguyễn Văn A'],
        status: response.status,
        level: response.level,
        subject: formatOptionPayload(response.subjectResponse),
        totalClass: 0,
      },
      classes: response.classes || [],
      content: response.sections,
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

  getClassesOfCourseWithCourseDetails(
    idCourse: number
  ): Promise<ClassesOfCourseWithCourseDetails | undefined> {
    const urlGet = `${url}/course/${idCourse}`;
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
};

export default classApi;
