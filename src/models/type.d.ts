import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import { OptionPayload } from './common';
import { SectionPayload } from './section';
import {
  AccountStatusKeys,
  CourseStatusKeys,
  CourseTypeKeys,
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
  status: AccountStatusKeys;
  mentorSkills: SkillPayload[];
}

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
  courseTeacherName?: string[];
  courseName: string | undefined;
  subjectName?: string;
  courseStatus?: CourseStatusKeys;
  totalClass?: number;
  level: LevelKeys;
  courseDescription: string | undefined;
}

export type ContentPayload = SectionPayload[];
