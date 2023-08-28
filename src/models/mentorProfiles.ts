import { ImagePayload } from './common';
import { ProfilePayload, SkillPayload } from './type';
// import {
//   MentorTeachingInformation,
//   ProfilePayload,
//   RolePayload,
//   SkillPayload,
//   WalletPayload,
// } from './type';

export interface CheckCompletenessReturnPayload {
  percentComplete: number;
  missingInformation: [
    {
      requiredInfo: RequiredInfo;
      optionalInfo: OptionalInfo;
    }
  ];
  allowSendingApproval: boolean;
}
export interface UpdateMentorProfileRequestSubmitPayload {
  skillIds: number[];
  degreeIds: number[];
}

export interface RequiredInfo {
  fields: Field[];
}

export interface OptionalInfo {
  fields: Field[];
}

export interface Field {
  field:
    | 'address'
    | 'AVATAR'
    | 'BACKCI'
    | 'FRONTCI'
    | 'DEGREE'
    | 'introduce'
    | 'workingExperience'
    | 'skills';
  name: string;
}

export interface MentorProfileRequestInfoPayload {
  mentorSkillRequest: SkillPayload[];
  degreeRequest: ImagePayload[];
  created: string;
  totalSkillRequest: number;
  totalDegreeRequest: number;
}

export interface MentorDetailsPayload {
  id: number;
  introduce: string;
  workingExperience: string;
  status: string;
  user: ProfilePayload;
  mentorSkills: SkillPayload[];
  averageRate: number;
  submissionCount: number;
}

// export interface User {
//   id: number;
//   fullName: string;
//   email: string;
//   birthday: string;
//   address: string;
//   phone: string;
//   status: boolean;
//   gender: string;
//   roles: RolePayload[];
//   linkedinLink: any;
//   facebookLink: any;
//   website: any;
//   userImages: ImagePayload[];
//   wallet: WalletPayload;
//   mentorProfile: any;
//   teachInformation: MentorTeachingInformation;
//   isVerified: boolean;
//   verified: boolean;
// }

export interface MentorProfileUpdateDetailsResponse {
  id: number;
  userDtoEdit: UserDto;
  userDtoOrigin: UserDto;
  differentFields: string[];
}

interface UserDto extends ProfilePayload {
  finishedClassCount: number;
  timeSendRequest: string | null;
  count: number | null;
}
