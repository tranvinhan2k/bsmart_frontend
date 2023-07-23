import { PostTimeTableResponse } from './response';
import { ClassStatusKeys, QuizQuestionTypeKeys } from './variables';

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
  // timeTableRequest: PostTimeTableResponse;
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
  size?: number;
  sort?: string[];

  categoryId?: number[];
  subjectId?: number[];
  skills?: number[];

  startDate?: string;
  endDate?: string;
  status?: ClassStatusKeys;

  // STUDENT 1 |TEACHER 0
  asRole?: 1 | 0;
}

export interface PutCourseRequest {
  name: string;
  categoryId: number;
  subjectId: number;

  description: string;
  level: string;
}

// post
export interface PostActivityRequest {
  name: string;
  visible: boolean;
  parentActivityId?: number;
  courseId: number;
  authorizeClasses: number[];
  file?: string | Blob;
  description?: string;
}
export interface PostAssignmentRequest extends PostActivityRequest {
  startDate: string;
  endDate: string;
  editBeForSubmitMin: number;
  maxFileSubmit: number;
  maxFileSize: number;
  attachFiles: Blob[];
  isOverWriteAttachFile: boolean;
  passPoint: number;
  overWriteAttachFile: boolean;
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

export interface PostQuizQuestionPayload {
  subjectId: number;
  question: string;
  questionType: QuizQuestionTypeKeys;
  isShared: boolean;
  answers: {
    answer: string;
    isRight: boolean;
    key: string;
  }[];
}
