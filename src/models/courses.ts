import { FeedbackPayload } from '~/models/feedback';
import { MentorPayload } from '~/models/mentor';
import { CategoryPayload } from './category';
import { SubjectPayload } from './type';

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
  classes: ClassOfProcessCourseCreateRequest[];
  activities: ActivityOfProcessCourseCreateRequest[];
}

interface ClassOfProcessCourseCreateRequest {
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
  image: ImgClassOfProcessCourseCreateRequest;
  timeInWeeks: any;
  purchase: any;
}
interface ImgClassOfProcessCourseCreateRequest {
  id: number;
  name: string;
  url: string;
  status: boolean;
  type: string;
}

interface Mentor {
  id: number;
  introduce: string;
  mentorSkills: MentorSkill[];
  avatar: Avatar;
}
interface MentorSkill {
  skillId: number;
  name: string;
  yearOfExperiences: number;
}

interface Avatar {
  id: number;
  name: string;
  url: string;
  status: boolean;
  type: string;
}

export interface ActivityOfProcessCourseCreateRequest {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  type: string;
  visible: boolean;
  parentActivityId: any;
  subActivities: SubActivityOfProcessCourseCreateRequest[];
}

export interface SubActivityOfProcessCourseCreateRequest {
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
