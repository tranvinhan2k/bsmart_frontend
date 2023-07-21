import { MentorProfileStatusType } from '~/constants/profile';
import { OptionPayload } from './common';
import {
  ActivityKeys,
  ClassStatusKeys,
  CourseStatusKeys,
  GenderKeys,
  ImageKeys,
  LevelKeys,
  RoleKeys,
} from './variables';

export interface RequestOptionPayload {
  id: number;
  code: string;
  name: string;
}

export interface SubjectPayload {
  id: number;
  code: string;
  name: string;
  categoryIds: number[];
}

export interface CategoriesPayload {
  id: number;
  code: string;
  name: string;
}

export interface ProfilePayload {
  id: number;
  fullName: string;
  email: string;
  birthday: string;
  address: string;
  phone: string;
  status: boolean;
  gender: GenderKeys;
  roles: RolePayload[];
  linkedinLink: string;
  facebookLink: string;
  userImages: ImagePayload[];
  wallet: WalletPayload;
  mentorProfile: MentorProfileIntroducePayload;
  isVerified: boolean;
}

export interface RolePayload {
  id: number;
  code: RoleKeys;
  name: string;
}

export interface ImagePayload {
  id: number;
  name: string;
  url: string;
  status: boolean;
  type: ImageKeys;
}
export interface WalletPayload {
  id: number;
  balance: number;
  previous_balance: number;
  owner_id: number;
}

export interface SkillPayload {
  skillId: number;
  name: string;
  yearOfExperiences: number;
}

export interface MentorProfileIntroducePayload {
  id: number;
  introduce: string;
  workingExperience: string;
  status: MentorProfileStatus;
  mentorSkills: SkillPayload[];
}
export type MentorProfileStatus =
  | MentorProfileStatusType.REQUESTING
  | MentorProfileStatusType.WAITING
  | MentorProfileStatusType.EDITREQUEST
  | MentorProfileStatusType.REJECTED
  | MentorProfileStatusType.STARTING;

export interface CoursePayload {
  id: number;
  images: string[];
  courseCode: string;
  courseName: string;
  category: OptionPayload;
  subject: OptionPayload;
  courseDescription: string;
  totalClass: number;
  mentorName: string[];
  mentorAvatar: string;
  mentorDescription: string;
  status: CourseStatusKeys;
  level: LevelKeys;
}

export interface CourseMenuItemPayload {
  id: number;
  imageUrl: string | undefined;
  imageAlt: string | undefined;
  courseCode: string | undefined;
  courseTeacherName?: string[];
  courseName: string | undefined;
  subjectName?: string;
  courseStatus?: CourseStatusKeys;
  totalClass?: number;
  level: LevelKeys;
  courseDescription: string | undefined;
  category: OptionPayload;
  subject: OptionPayload;
}
export interface ClassMenuItemPayload {
  id: number;
  imageUrl: string | undefined;
  imageAlt: string | undefined;
  teacherName?: string[];
  name: string | undefined;
  progressValue: number;
  subjectId: number;
  status: ClassStatusKeys;
}

export type ContentPayload = ActivityPayload[];

export interface ActivityPayload {
  id: number;
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  name: string;
  type: ActivityKeys;
  parentActivityId: number;
  subActivities: ActivityPayload[];
  visible: boolean;
  authorizeClasses: number[];
}

export interface ActivityDetailPayload
  extends Omit<ActivityPayload, 'subActivities'> {
  detail: any;
  description?: string;
}

export interface WeekTimeSlotPayload {
  id: number;
  link: string;
  className: string;
  classId: number;
  slotId: number;
  dayOfWeekId: number;
  attendanceSlotId?: number;
  isPresent: boolean;
  date: string;
}
