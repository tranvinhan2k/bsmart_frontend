import { FeedbackPayload } from '~/models/feedback';
import { MentorPayload } from '~/models/mentor';

export interface CoursePayload {
  id: number;
  image: string;
  title: string;
  mentor: string;
  content: string;
  feedback: number;
}
export interface CourseDetailPayload {
  id: number;
  image: string;
  title: string;
  content: string;
  mentorData: MentorPayload;
  feedbackData: FeedbackPayload;
  unitPrice: number;
  field: string;
  numOfRegisterStudent: number;
  numOfOpenClass: number;
  openDate: string;
}
