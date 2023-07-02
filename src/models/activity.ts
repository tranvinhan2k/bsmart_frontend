export interface ActivityAssignment {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  type: {
    id: number;
    name: ActivityTypeName.ASSIGNMENT;
    code: ActivityTypeCode.ASSIGNMENT;
  };
  isVisible: boolean;
  activityDetail: AssignmentDetail;
}
export interface ActivityQuiz {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  type: {
    id: number;
    name: ActivityTypeName.QUIZ;
    code: ActivityTypeCode.QUIZ;
  };
  isVisible: boolean;
  activityDetail: QuizDetail;
}
export interface ActivityAnnouncement {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  type: {
    id: number;
    name: ActivityTypeName.ANNOUNCEMENT;
    code: ActivityTypeCode.ANNOUNCEMENT;
  };
  isVisible: boolean;
  activityDetail: AnnouncementDetail;
}

export interface ActivityType {
  id: number;
  name: ActivityTypeName;
  code: ActivityTypeCode;
}
export const enum ActivityTypeName {
  ASSIGNMENT = 'assignment',
  QUIZ = 'quiz',
  ANNOUNCEMENT = 'announcement',
}
export const enum ActivityTypeCode {
  ASSIGNMENT = 'ASSIGNMENT',
  QUIZ = 'QUIZ',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}
// export interface Activity {
//   created: string;
//   lastModified: string;
//   createdBy: string;
//   lastModifiedBy: string;
//   id: number;
//   name: string;
//   type: ActivityType;
//   isVisible: boolean;
//   activityDetail: AssignmentDetail | QuizDetail | AnnouncementDetail;
// }

// export interface ActivityType {
//   id: number;
//   name: ActivityTypeName;
//   code: ActivityTypeCode;
// }
// export const enum ActivityTypeName {
//   ASSIGNMENT = 'assignment',
//   QUIZ = 'quiz',
//   ANNOUNCEMENT = 'announcement',
// }
// export const enum ActivityTypeCode {
//   ASSIGNMENT = 'ASSIGNMENT',
//   QUIZ = 'QUIZ',
//   ANNOUNCEMENT = 'ANNOUNCEMENT',
// }

interface AssignmentDetail {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  description: string;
  startDate: string;
  endDate: string;
  editBeForSubmitMin: number;
  maxFileSubmit: number;
  maxFileSize: number;
  status: string;
  assignmentFiles: AssignmentFile[];
}
interface QuizDetail {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  description: string;
  startDate: string;
  endDate: string;
}
interface AnnouncementDetail {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  description: string;
  startDate: string;
  endDate: string;
}

interface AssignmentFile {
  id: number;
  url: string;
  uploadTime: string;
  fileType: string;
  point: number;
  note: string;
  user: User;
  name: string;
}

interface User {
  id: number;
  fullName: string;
  email: string;
  birthday: string;
  address: string;
  phone: string;
  status: boolean;
  roles: Role[];
  twitterLink: string;
  facebookLink: string;
  instagramLink: string;
  userImages: UserImage[];
  wallet: Wallet;
  mentorProfile: MentorProfile;
  isVerified: boolean;
}
interface Role {
  id: number;
  name: string;
  code: string;
}
interface UserImage {
  id: number;
  name: string;
  url: string;
  status: boolean;
  type: string;
}
interface Wallet {
  id: number;
  balance: number;
  previous_balance: number;
  owner_id: number;
}
interface MentorProfile {
  id: number;
  introduce: string;
  workingExperience: string;
  status: string;
  mentorSkills: any[];
}
