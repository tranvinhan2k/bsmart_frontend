export interface PostCoursePayload {
  name: string;
  categoryId: number;
  subjectId: number;
  description: string;
}

export interface PostClassPayload {
  level: string;
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
}[];
