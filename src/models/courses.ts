import { FeedbackPayload } from '~/models/feedback';
import { MentorPayload } from '~/models/mentor';
import { CategoryPayload } from './category';
import { ImageType, TimeInWeeks } from './common';
import { SkillPayload, SubjectPayload } from './type';

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

export interface CourseCreateRequestDetails {
  id: number;
  code: string;
  name: string;
  description: string;
  level: string;
  // categoryResponse: CategoryResponse;
  // subjectResponse: SubjectResponse;
  categoryResponse: CategoryPayload;
  subjectResponse: SubjectPayload;
  status: string;
  mentor: Mentor;
  // classes: ClassOfCourseCreateRequestDetails[];
  // activities: ActivityOfCourseCreateRequestDetails[];
  totalClass: number;
  timeSendRequest: string;
  count: number;
  approved: boolean;
}

export interface ClassOfCourseCreateRequestDetails {
  id: number;
  code: string;
  startDate: string;
  endDate: string;
  numberOfStudent: number;
  numberOfSlot: number;
  status: string;
  price: number;
  minStudent: number;
  maxStudent: number;
  image: ImageType;
  timeInWeeks: TimeInWeeks[];
  purchase: boolean;
}

interface Mentor {
  avatar: Avatar;
  email: string;
  id: number;
  introduce: string;
  mentorSkills: SkillPayload[];
  name: string;
}

interface Avatar {
  id: number;
  name: string;
  url: string;
  status: boolean;
  type: string;
}

export interface ActivityOfCourseCreateRequestDetails {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  type: string;
  visible: boolean;
  parentActivityId: number | null;
  subActivities: SubActivityOfCourseCreateRequestDetails[];
}

export interface SubActivityOfCourseCreateRequestDetails {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  type: string;
  visible: boolean;
  parentActivityId: number;
  subActivities: any[];
}
