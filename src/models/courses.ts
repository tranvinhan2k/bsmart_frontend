import { FeedbackPayload } from '~/models/feedback';
import { MentorPayload } from '~/models/mentor';
import { CategoryPayload } from './category';
import { TypeLearnKeys } from './variables';

export interface CoursePayload {
  id: number;
  image: string;
  title: string;
  mentor: string;
  mentorImage?: string;
  content: string;
  feedback: number;
  typeLearn: TypeLearnKeys[];
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
  category: CategoryPayload;
}

export interface CourseModulePayload {
  id: number;
  label: string;
  topic: { id: number; label: string }[];
}
