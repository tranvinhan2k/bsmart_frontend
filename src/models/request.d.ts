import { ClassStatusKeys } from './variables';

export interface PostCourseRequest {
  name: string;
  categoryId: number;
  subjectId: number;
  description: string;
  level: string;
}

export interface PostClassRequest {
  imageId: number;
  price: number;
  minStudent: number;
  maxStudent: number;
  startDate: string;
  endDate: string;
  numberOfSlot: number;
  timeInWeekRequests: {
    dayOfWeekId: number;
    slotId: number;
  }[];
}

export type PostActivityCoursePayload = {
  name: string;
  lessons: {
    description: string;
  }[];
};

export interface PagingFilterRequest {
  q: string;
  page: number;
  size: number;

  sort?: string[];
  status?: ClassStatusKeys;
  categoryId?: number[];
  subjectId?: number[];
  skills?: number[];
}

export interface PutCourseRequest {
  name: string;
  categoryId: number;
  subjectId: number;

  description: string;
  level: string;
}

export interface PostActivityRequest {
  name: string;
  visible?: boolean;
  parentActivityId?: number;
  courseId?: number;
  authorizeClasses?: number[];
}
export interface PostSubmitActivityRequest {
  submittedFiles: string[];
  note: string;
}

export interface PostTimetableRequest {
  startDate: string;
  endDate: string;
  numberOfSlot: number;
  timeInWeekRequests: {
    dayOfWeekId: number;
    slotId: number;
  }[];
}
