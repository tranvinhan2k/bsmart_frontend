import axiosClient from '~/api/axiosClient';
import { PagingFilterPayload } from '~/models';
import { CoursePayload } from '~/models/courses';
import mockCourse from '~/assets/images/mockCourse.jpg';

export interface RequestGetCoursePayload {
  q: string | undefined;
  categoryId: number[] | undefined;
  subjectId: number[] | undefined;
  types: number[] | undefined;
  provinces: number[] | undefined;

  page: number | undefined;
  size: number | undefined;
  sort: string[] | undefined;
}

export interface ResponseGetCoursePayload {
  imageUrl: string;
  courseName: string;
  categoryName: string;
  subjectName: string;
  mentorName: string;
  courseDescription: string;
}

export function handleResponseGetCourse(
  data?: PagingFilterPayload<ResponseGetCoursePayload>
): PagingFilterPayload<CoursePayload> | null {
  if (!data) {
    return null;
  }
  return {
    ...data,
    items: data.items.map((item, index) => ({
      id: index,
      image: item.imageUrl || mockCourse,
      title: item.courseName,
      mentor: item.mentorName,
      content: item.courseDescription,
      feedback: 50,
    })),
  };
}

const url = `/courses`;

const coursesApi = {
  async getAllCourse(
    data: RequestGetCoursePayload
  ): Promise<PagingFilterPayload<ResponseGetCoursePayload>> {
    return axiosClient.get(`${url}`, { params: data });
  },
};

export default coursesApi;
