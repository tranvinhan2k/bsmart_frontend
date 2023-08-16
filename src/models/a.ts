export interface Root {
  status: string;
  data: Data;
}

export interface Data {
  id: number;
  userDtoEdit: UserDtoEdit;
  userDtoOrigin: UserDtoOrigin;
  differentFields: string[];
}

export interface UserDtoEdit {
  id: number;
  fullName: string;
  email: any;
  birthday: string;
  address: string;
  phone: string;
  status: boolean;
  gender: string;
  roles: Role[];
  linkedinLink: any;
  facebookLink: string;
  website: any;
  userImages: any[];
  wallet: any;
  mentorProfile: MentorProfile;
  teachInformation: any;
  isVerified: boolean;
  finishedClassCount: number;
  timeSendRequest: any;
  count: any;
  verified: boolean;
}

export interface Role {
  id: number;
  name: string;
  code: string;
}

export interface MentorProfile {
  id: number;
  introduce: string;
  workingExperience: string;
  status: string;
  user: any;
  mentorSkills: MentorSkill[];
}

export interface MentorSkill {
  skillId: number;
  name: string;
  yearOfExperiences: number;
}

export interface UserDtoOrigin {
  id: number;
  fullName: string;
  email: string;
  birthday: string;
  address: string;
  phone: string;
  status: boolean;
  gender: string;
  roles: Role2[];
  linkedinLink: any;
  facebookLink: string;
  website: any;
  userImages: UserImage[];
  wallet: Wallet;
  mentorProfile: MentorProfile2;
  teachInformation: TeachInformation;
  isVerified: boolean;
  finishedClassCount: number;
  timeSendRequest: string;
  count: number;
  verified: boolean;
}

export interface Role2 {
  id: number;
  name: string;
  code: string;
}

export interface UserImage {
  id: number;
  name: string;
  url: string;
  status: boolean;
  type: string;
}

export interface Wallet {
  id: number;
  balance: number;
  previous_balance: any;
  owner_id: number;
}

export interface MentorProfile2 {
  id: number;
  introduce: string;
  workingExperience: string;
  status: string;
  user: User;
  mentorSkills: MentorSkill2[];
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  birthday: string;
  address: string;
  phone: string;
  status: boolean;
  gender: string;
  roles: Role3[];
  linkedinLink: any;
  facebookLink: string;
  website: any;
  userImages: UserImage2[];
  wallet: Wallet2;
  mentorProfile: any;
  teachInformation: any;
  isVerified: boolean;
  finishedClassCount: number;
  timeSendRequest: string;
  count: number;
  verified: boolean;
}

export interface Role3 {
  id: number;
  name: string;
  code: string;
}

export interface UserImage2 {
  id: number;
  name: string;
  url: string;
  status: boolean;
  type: string;
}

export interface Wallet2 {
  id: number;
  balance: number;
  previous_balance: any;
  owner_id: number;
}

export interface MentorSkill2 {
  skillId: number;
  name: string;
  yearOfExperiences: number;
}

export interface TeachInformation {
  numberOfCourse: number;
  numberOfClass: number;
  numberOfMember: number;
  scoreFeedback: number;
  numberOfFeedBack: number;
}
