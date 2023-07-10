import { ClassStatusKeys } from './variables';

export interface PostCoursePayload {
  name: string;
  categoryId: number;
  subjectId: number;
  description: string;
  level: string;
}

export interface PostClassPayload {
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

export interface PagingRequestPayload {
  q: string;
  page: number;
  size: number;

  sort?: string[];
  status?: ClassStatusKeys;
  categoryId?: number[];
  subjectId?: number[];
  skills?: number[];
}

export interface PutCoursePayload {
  name: string;
  categoryId: number;
  subjectId: number;
  description: string;
  level: string;
}
