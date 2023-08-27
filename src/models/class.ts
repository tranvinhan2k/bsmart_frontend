import { ActivityType } from './activity';
import { ImageType, TimeInWeeks } from './common';
import { ActivityOfCourseCreateRequestDetails } from './courses';
import {
  MentorTeachingInformation,
  ProfilePayload,
  SkillPayload,
} from './type';

export interface ClassDetailsPayload {
  id: number;
  startDate: string;
  endDate: string;
  numberOfStudent: number;
  subCourseName: string;
  mentorName: string;
  classSectionList: ClassSectionList[];
}

interface ClassSectionList {
  id: number;
  name: string;
  classModules: ClassModule[];
  activities: ClassActivityPayload[];
}
interface ClassModule {
  id: number;
  name: string;
}
export interface ClassActivityPayload {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  isVisible: boolean;
  type: ActivityType;
  activityDetail: ActivityDetail;
}
interface ActivityDetail {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface ClassGetDetailsPayload {
  id?: number;
}

export interface ClassCreateClassSectionPayload {
  id: number;
  data: {
    name: string;
  };
}
export interface ClassUpdateClassSectionPayload {
  id: number;
  classSectionId: number;
  data: {
    name: string;
  };
}
export interface ClassDeleteClassSectionPayload {
  id: number;
  classSectionId: number;
}

export interface ManagedClass {
  id: number;
  courseId: number;
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
}

export interface Slot {
  id: number;
  name: string;
  code: string;
  startTime: string;
  endTime: string;
}

export interface ManagedClassDetails {
  id: number;
  code: string;
  startDate: string;
  endDate: string;
  status: string;
  price: number;
  minStudent: number;
  maxStudent: number;
  numberOfSlot: number;
  hasReferralCode: boolean;
  numberReferralCode: string;
  classImage: any;
  // mentor: ProfilePayload;
  mentor: MentorManagedClass;
  activities: ActivityOfCourseCreateRequestDetails[];
  timeInWeeks: TimeInWeeks[];
  course: CourseManagedClassDetails;
  numberOfCurrentStudent: number;
  progress: ProgressManagedClassDetails;
  image: any;
  feedback: any;
}

interface MentorManagedClass {
  id: number;
  name: string;
  email: string;
  introduce: string;
  phone: string;
  timeParticipation: string;
  mentorSkills: SkillPayload[];
  avatar: {
    id: number;
    name: string;
    url: string;
    status: boolean;
    type: 'AVATAR';
  };
  teachInformation: MentorTeachingInformation;
}

interface CourseManagedClassDetails {
  id: number;
  code: string;
  name: string;
  description: string;
  subject: SubjectCourseManagedClassDetails;
}

interface SubjectCourseManagedClassDetails {
  id: number;
  code: string;
  name: string;
  categoryIds: number[];
}

interface ProgressManagedClassDetails {
  currentSlot: number;
  percentage: number;
}
