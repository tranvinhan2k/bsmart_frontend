import { MentorProfileStatusType } from '~/constants/profile';
import { OptionPayload, PagingFilterPayload } from './common';
import {
  ActivityKeys,
  ClassStatusKeys,
  CourseStatusKeys,
  FeedbackQuestionTypeKeys,
  FeedbackTypeKeys,
  GenderKeys,
  ImageKeys,
  LevelKeys,
  RoleKeys,
} from './variables';
// eslint-disable-next-line import/no-cycle
import { PagingFilterRequest } from './request';

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
  website: string;
  userImages: ImagePayload[];
  wallet: WalletPayload;
  mentorProfile: MentorProfileIntroducePayload;
  teachInformation?: MentorTeachingInformation;
  isVerified: boolean;
  verified: boolean;
}

export interface RolePayload {
  id: number;
  code: RoleKeys;
  name: string;
}

export interface MentorTeachingInformation {
  numberOfCourse: number;
  numberOfClass: number;
  numberOfMember: number;
  scoreFeedback: number;
  numberOfFeedBack: number;
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
  mentorId: number;
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
  rating: number;
  numOfRating: number;
}
export interface ClassMenuItemPayload {
  code: string;
  id: number;
  imageUrl: string | undefined;
  imageAlt: string | undefined;
  teacherName?: string[];
  name: string | undefined;
  progressValue: number;
  subjectId: number;
  status: ClassStatusKeys;
  startDate: string;
  endDate: string;
  numberOfStudent: number;
  min: number;
  max: number;
}
export interface ClassDetailPayload {
  code: string;
  id: number;
  imageUrl: string | undefined;
  imageAlt: string | undefined;
  teacherName?: string[];
  teacherPhone: string;
  teacherMail: string;
  teacherAlt: string;
  teacherUrl: string;
  name: string | undefined;
  progressValue: number;
  subjectId: number;
  status: ClassStatusKeys;
  startDate: string;
  endDate: string;
  numberOfSlot: number;
  numberOfStudent: number;
  price: number;
  activities: ActivityPayload[];
  timeTablesRequest: { dayOfWeekId: number; slotId: number }[];
  feedback: {
    id: number;
    name: string;
    type: FeedbackTypeKeys;
    totalClassUsed: number;
    isDefault: boolean;
    isFixed: boolean;
    questions: {
      id: number;
      question: string;
      answers: {
        id: number;
        answer: string;
      }[];
    }[];
    default: boolean;
    fixed: boolean;
  };
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
  isFixed: boolean;
}

export type ActivityDetailPayload = Omit<
  ActivityPayload,
  'subActivities' | 'type'
> &
  (
    | {
        type: 'QUIZ';
        detail: ActivityQuizPayload;
      }
    | {
        type: 'LESSON';
        detail: ActivityLessonPayload;
      }
    | {
        type: 'RESOURCE';
        detail: ActivityResourcePayload;
      }
    | {
        type: 'ASSIGNMENT';
        detail: ActivityAssignmentPayload;
      }
  );

export interface ActivityLessonPayload {
  description: string;
}

export interface ActivityResourcePayload {
  file: {
    name: string;
    url: string;
    size: number;
  };
}

export interface ActivityQuizPayload {
  id: number;
  code: string;
  time: number;
  defaultPoint: number;
  isSuffleQuestion: boolean;
  isAllowReview: boolean;
  allowReviewAfterMin: number;
  password: string;
  questionCount: number;
  status: string;
  quizQuestions: {
    id: number;
    question: string;
    questionType: string;
    answers: { id: number; answer: string; right: boolean }[];
  };
}

export interface ActivityAssignmentPayload {
  assignmentId: number;
  description: string;
  editBeForSubmitMin: number;
  maxFileSubmit: number;
  maxFileSize: number;
  note: string;
  attachFiles: {
    name: string;
    url: string;
    size: number;
  }[];
  passPoint: number;
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
  isTookAttendance: boolean;
  date: string;
}

export interface QuizReportStudentPayload {
  id: number;
  name: string;
  point: number;
  correctNumber: number;
  totalQuestion: number;
  submitAt: string;
}
export interface QuizReportTeacherPayload {
  id: number;
  name: string;
  point: number;
  correctNumber: number[];
  totalQuestion: number;
  submitAt: string;
  userId: number;
}
export interface FeedbackReportStudentPayload {
  id: number;
  name: string;
  point: number;
  report: string;
}
export interface NotificationPayload {
  id: number;
  type: string;
  message: string;
}

export interface ApiParamsProps {
  id: number;
  params: PagingFilterRequest;
}

export interface ManagedMentorPayload extends ProfilePayload {
  timeParticipation: string;
  finishedClassCount: number;
  timeSendRequest: string;
  count: number;
}
export interface ManagedMemberPayload extends ProfilePayload {
  timeParticipation: string;
  studyInformation: ManagedMemberStudyInformation;
}
interface ManagedMemberStudyInformation {
  numberOfCourse: number;
  numberOfClass: number;
}

interface FeedbackPayload {
  rating: number;
  rateCount: any;
  numberOfRating: number;
  items: PagingFilterPayload<FeedbackReviewPayload>;
}

interface FeedbackReviewPayload {
  id: number;
  avatarUrl: string;
  avatarAlt: string;
  email: string;
  rating: number;
  feedbackTime: string;
  reviewContent: string;
}

export interface DuplicateClassPayload {
  id: number;
  code: string;
}

export interface MentorProfileUpdateResponse {
  id: number | null;
  userDto: ProfilePayload;
}

export interface ConfigPayload {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  usageLimit: number;
  discountPercent: number;
  expiredLaterDay: number;
  active: boolean;
}
