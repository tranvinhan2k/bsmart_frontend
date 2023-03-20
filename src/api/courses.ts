import axiosClient from '~/api/axiosClient';
import { PagingFilterPayload } from '~/models';
import { CourseDetailPayload, CoursePayload } from '~/models/courses';
import mockCourse from '~/assets/images/mockCourse.jpg';
import { TypeLearnKeys } from '~/models/variables';
import { SubCoursePayload } from '~/models/subCourse';

// Define the request payload for fetching courses
export interface RequestGetCoursePayload {
  q?: string;
  categoryId?: number[];
  subjectId?: number[];
  types?: number[];
  provinces?: number[];

  page?: number;
  size?: number;
  sort?: string[];
}

export interface RequestCreateCoursePayload {
  name: string;
  level: string;
  imageId: number;
  categoryId: number;
  subjectId: number;
  type: TypeLearnKeys;
  price: number;
  minStudent: number;
  maxStudent: number;
  startDateExpected: string;
  endDateExpected: string;
  description: string;
}

// Define the response payload for fetching a course
export interface ResponseGetCoursePayload {
  id: number;
  subCourseId: number;
  courseId: number;
  imageUrl: string;
  courseName: string;
  courseCode: string;
  courseDescription: string;
  categoryName: string;
  subjectName: string;
  mentorName: string;
  learns: TypeLearnKeys[];
}

interface ResponseCourseDetailPayload {
  id: number;
  name: string;
  code: string;
  description: string;
  subject: {
    id: number;
    code: string;
    name: string;
    categoryId: number;
  };
  category: {
    id: number;
    code: string;
    name: string;
  };
  mentorId: number;
}

/**
 * Transforms a response payload into the desired format for rendering a course detail page
 */
function handleResponseGetDetailCourse(data: ResponseCourseDetailPayload) {
  if (!data) {
    return null;
  }
  const responseData: CourseDetailPayload = {
    content: data.description || '',
    id: data.id || 0,
    image: mockCourse, // TODO: api have no image
    numOfOpenClass: 0, // TODO : back end not have it yet
    numOfRegisterStudent: 0, // TODO: no number student
    title: data.name || '',
    unitPrice: 0, // TODO: no price
    openDate: new Date().toISOString(), // TODO: no opendate
    field: data.subject?.name || '',
    mentorData: {
      id: data.mentorId,
      avatar: '',
      name: '',
    },
    category: data.category,
    feedbackData: {
      commentData: [],
      numOfRating: 50,
      percentOfFeedback: 0.5,
      starData: [
        {
          starNumber: 0,
          starRating: 0,
        },
      ],
    },
  };
  return responseData;
}

/**
 * Transforms a response payload into the desired format for rendering a list of courses
 */
function handleResponseGetCourse(
  data?: PagingFilterPayload<ResponseGetCoursePayload>
): PagingFilterPayload<CoursePayload> | null {
  if (!data) {
    return null;
  }
  return {
    ...data,
    items: data.items.map(
      ({
        id,
        imageUrl,
        courseName,
        mentorName,
        courseDescription,
        learns,
      }) => ({
        id,
        image: imageUrl || mockCourse,
        title: courseName,
        mentor: mentorName,
        content: courseDescription,
        feedback: 50,
        typeLearn: learns,
      })
    ),
  };
}

const url = '/courses';

// Define a module for fetching courses
const coursesApi = {
  async getAllCourse(
    data: RequestGetCoursePayload
  ): Promise<PagingFilterPayload<CoursePayload> | null> {
    const response: PagingFilterPayload<ResponseGetCoursePayload> =
      await axiosClient.get(url, { params: data });
    return handleResponseGetCourse(response);
  },

  async getDetailCourse(id: string): Promise<CourseDetailPayload | null> {
    const response: ResponseCourseDetailPayload = await axiosClient.get(
      `${url}/${id}`
    );
    return handleResponseGetDetailCourse(response);
  },
  async getSubCourse(
    id: string
  ): Promise<PagingFilterPayload<SubCoursePayload>> {
    const response: PagingFilterPayload<SubCoursePayload> =
      await axiosClient.get(`${url}/${id}/sub-courses`);
    return response;
  },
  async createCourse(params: RequestCreateCoursePayload): Promise<any> {
    const response: any = await axiosClient.post(url, params);
    return response;
  },
};

export default coursesApi;
