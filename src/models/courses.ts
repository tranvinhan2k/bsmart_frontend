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

export interface ClassesOfCourseWithCourseDetails {
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
  classes: any[];
  sections: any[];
}
// //Test
// interface CategoryResponse {
//   id: number;
//   code: string;
//   name: string;
// }
// //Test
// interface SubjectResponse {
//   id: number;
//   code: string;
//   name: string;
//   categoryIds: number[];
// }
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
