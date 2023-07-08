import axiosClient from '~/api/axiosClient';
import {
  ImagePayload,
  PagingFilterPayload,
  PagingRequestPayload,
  PostCoursePayload,
} from '~/models';
import { CourseDetailPayload } from '~/models/courses';
import mockCourse from '~/assets/images/mockCourse.jpg';
import { LevelKeys, TypeLearnKeys } from '~/models/variables';
import { SubCoursePayload } from '~/models/subCourse';
import { CoursePayload } from '~/models/type';
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
export interface ProcessCreateCourseRequestPayload {
  id: number;
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

const url = '/courses';

const coursesApi = {
  // get
  async getAllCourse(
    data: PagingRequestPayload
  ): Promise<PagingFilterPayload<CoursePayload> | null> {
    const response = await axiosClient.get(url, {
      params: data,
      paramsSerializer: { indexes: null },
    });
    const result: CoursePayload[] = (response.items as any[]).map(
      (item: any) => ({
        id: item.id,
        content: item.content,
        courseCode: item.courseCode,
        courseDescription: item.courseDescription,
        courseName: item.courseName,
        images: item.images,
        mentorName: item.mentorName,
        subjectId: item.subjectId,
        subjectName: item.subjectName,
        totalClass: item.totalClass,
        status: item.status,
      })
    );
    return { ...response, items: result };
  },
  async getMentorCourses(
    params: PagingRequestPayload
  ): Promise<PagingFilterPayload<CoursePayload>> {
    const response = await axiosClient.get(`${url}/mentor`, {
      params,
      paramsSerializer: { indexes: null },
    });

    const result: CoursePayload[] = (response.items as any[]).map(
      (item: any) => ({
        id: item.id,
        content: item.content,
        courseCode: item.courseCode,
        courseDescription: item.courseDescription,
        courseName: item.courseName,
        images: item.images,
        mentorName: item.mentorName,
        subjectId: item.subjectId,
        subjectName: item.subjectName,
        totalClass: item.totalClass,
        status: item.status,
      })
    );

    return { ...response, items: result };
  },
  async getAllPublicCourse() {
    return axiosClient.get(`${url}/public`);
  },
  async getMemberCourse(
    data: PagingRequestPayload
  ): Promise<PagingFilterPayload<ResponseMemberCoursePayload>> {
    return axiosClient.get(`${url}/member`, {
      params: data,
      paramsSerializer: { indexes: null },
    });
  },
  async getMentorCourse(
    data: PagingRequestPayload
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
  async createCourse(params: PostCoursePayload): Promise<any> {
    const response: any = await axiosClient.post(url, params);
    return response;
  },
  // TODO: tạm thời đóng chức năng public course, có thể mở lại
  // async createPublicCourse(params: PostCoursePayload): Promise<any> {
  //   const { id, ...newParams } = params;
  //   const response: any = await axiosClient.post(`${url}/public-course/${id}`, {
  //     ...newParams,
  //   });
  //   return response;
  // },
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
