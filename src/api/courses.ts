import axiosClient from '~/api/axiosClient';
import {
  ImagePayload,
  PagingFilterPayload,
  RequestPagingFilterPayload,
} from '~/models';
import { CourseDetailPayload, CoursePayload } from '~/models/courses';
import mockCourse from '~/assets/images/mockCourse.jpg';
import { LevelKeys, TypeLearnKeys } from '~/models/variables';
import { SubCoursePayload } from '~/models/subCourse';

// Define the request payload for fetching courses

export interface RequestGetCoursePayload extends RequestPagingFilterPayload {
  q?: string | undefined;
  categoryId?: number[] | undefined;
  subjectId?: number[] | undefined;
  types?: string[] | undefined;
  provinces?: number[] | undefined;
}
export interface RequestCreateCoursePayload {
  code: string;
  name: string;
  categoryId: number;
  subjectId: number;
  description: string;
  subCourseRequests: SubCoursePayload[];
}
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
export interface ResponseMentorCoursePayload {
  id: number;
  status: string;
  level: string;
  referenceDiscount: number;
  subject: {
    id: number;
    code: string;
    name: string;
    categoryId: number;
  };
  mentorId: number;
  mentor: {
    id: number;
    introduce: string;
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
        type: string;
      }
    ];
    wallet: {
      id: number;
      balance: number;
      previous_balance: number;
      owner_id: number;
    };
    mentorProfile: {
      id: number;
      introduce: string;
      workingExperience: string;
      userId: number;
      mentorSkills: [
        {
          skillId: number;
          yearOfExperiences: number;
        }
      ];
    };
  };
  image: {
    id: number;
    name: string;
    url: string;
    type: string;
  };
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
      introduce: '',
      mentorSkills: [
        {
          skillId: 0,
          yearOfExperiences: 0,
        },
      ],
      userId: 0,
      workingExperience: '',
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

const coursesApi = {
  async getAllCourse(
    data: RequestGetCoursePayload
  ): Promise<PagingFilterPayload<CoursePayload> | null> {
    const response: PagingFilterPayload<ResponseGetCoursePayload> =
      await axiosClient.get(url, {
        params: data,
        paramsSerializer: { indexes: null },
      });
    return handleResponseGetCourse(response);
  },
  async getMemberCourse(
    data: RequestPagingFilterPayload
  ): Promise<PagingFilterPayload<ResponseMemberCoursePayload>> {
    return axiosClient.get(`${url}/member`, {
      params: data,
      paramsSerializer: { indexes: null },
    });
  },
  async getMentorCourse(
    data: RequestPagingFilterPayload
  ): Promise<PagingFilterPayload<ResponseMentorCoursePayload>> {
    return axiosClient.get(`${url}/mentor`, {
      params: data,
      paramsSerializer: { indexes: null },
    });
  },
  async getDetailCourse(id: number): Promise<CourseDetailPayload | null> {
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
  async requestSubCourse(id: number): Promise<any> {
    const response: any = await axiosClient.put(
      `${url}/${id}/request-approval`
    );
    return response;
  },
  async deleteSubCourse(id: number): Promise<any> {
    const response: any = await axiosClient.delete(`${url}/${id}`);
    return response;
  },
  async updateSubCourse(params: RequestUpdateCoursePayload): Promise<any> {
    const response: any = await axiosClient.put(`${url}/${params.id}`, params);
    return response;
  },
};

export default coursesApi;
