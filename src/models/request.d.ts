// eslint-disable-next-line import/no-cycle
import { PostTimeTableResponse } from './response';
import {
  ClassStatusKeys,
  FeedbackTypeKeys,
  QuizKeys,
  QuizQuestionTypeKeys,
} from './variables';

export interface PostCourseRequest {
  name: string;
  categoryId: number;
  subjectId: number;
  description: string;
  level: string;
}

export interface PostClassRequest {
  imageId: number | undefined;
  price: number;
  minStudent: number;
  maxStudent: number;
  startDate: string;
  endDate: string;
  link: string;
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
  q?: string;
  page: number;
  size?: number;
  sort?: string[];

  categoryId?: number[];
  subjectId?: number[];
  skills?: number[];

  startDate?: string;
  endDate?: string;
  status?: ClassStatusKeys;

  // mentorProfile
  accountStatus?: ClassStatusKeys;

  // STUDENT 1 |TEACHER 2
  asRole?: 1 | 2;

  // feedback
  type?: FeedbackTypeKeys;
  name?: string;
  rate?: number | undefined;

  // assignments
  classIds?: number[];
  classId?: number;
  id?: number;

  isCourse?: boolean;
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
  passPoint: number;
}

export interface PostSubmitActivityRequest {
  submittedFiles: string[];
  password: string;
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

export interface PostSubmitQuizPayload {
  status: QuizKeys;
  submittedQuestions: {
    questionId: number;
    answerId: number[];
  }[];
}

export interface CreateFeedbackPayload {
  name: string;
  type: string;
  questions: {
    question: string;
    answers: {
      answer: string;
    }[];
  }[];
}
