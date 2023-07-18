import {
  DropdownDynamicValueInputBooleanDataPayload,
  DropdownDynamicValueInputNumberDataPayload,
  DropdownDynamicValueInputStringDataPayload,
} from './common';
import { SkillPayload } from './type';

export interface LoginFormDataPayload {
  email: string;
  password: string;
}
export interface RegisterStudentDataPayload {
  name: string;
  email: string;
  password: string;
  confirm: string;
  phone: string;
  gender: string;
  birthDay: string;
}
export interface RegisterMentorDataPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
  gender: string;
  birthDay: string;
}

export interface BuyCourseDataPayload {
  name: string;
  phone: string;
  email: string;
  voucher: string;
  paymentMethod: string;
}
export interface FeedbackMentorDataPayload {
  mentorId: string;
  subjectId: string;
  enthusiasmLevel: number;
  supportAnswerQuestion: string;
  supportHomeWork: string;
  feelingOfTeacher: string;
}

export interface EditAvatarFormDataPayload {
  avatar: string;
}
export interface EditIdentityFrontFormDataPayload {
  identityFront: string;
}
export interface EditIdentityBackFormDataPayload {
  identityBack: string;
}

export interface EditPersonalProfileFormDefault {
  fullName: string;
  birthday: string;
  address: string;
  phone: string;
  gender: DropdownDynamicValueInputStringDataPayload | null;
}

export interface EditPasswordSectionDefault {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface EditSocialProfileFormDefault {
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
}

export interface EditMentorProfileFormDataPayload {
  introduce: string;
  workingExperience: string;
  mentorSkills?: {
    skillId: DropdownDynamicValueInputNumberDataPayload | null;
    yearOfExperiences: number;
  }[];
}

export interface MentorProfile {
  id: number;
  introduce: string;
  mentorSkills: SkillPayload[];
  status: 'REQUESTING';
  workingExperience: string;
}

export interface EditCertificateProfileFormDataPayload {
  userImages: (string | Blob)[];
}
export interface EditCertificateProfileDefaultValuePayload {
  userImages: {
    id: number;
    name: string;
    status: boolean;
    type: string;
    url: string;
  }[];
}
export interface WithdrawMoneyFormDataPayload {
  amount: number;
  bankLinking:
    | {
        bin: string;
        code: string;
        id: number;
        logo: string;
        lookupSupported: number;
        name: string;
        shortName: string;
        transferSupported: number;
      }
    | '';
  bankAccount: number;
  bankAccountOwner: string;
  note: string;
}
export interface BankLinking {
  bin: string;
  code: string;
  id: number;
  logo: string;
  lookupSupported: number;
  name: string;
  shortName: string;
  transferSupported: number;
}
export interface MentorSkills {
  id: number;
  label: string;
  value: string;
}

export interface ProcessRegisterRequestFormDefault {
  id: number;
  status: string;
  message: string;
}
export interface ProcessCreateCourseRequestFormDefault {
  id: number;
  status: string;
  message: string;
}

export interface CreateAssignmentFormDataPayload {
  name: string;
  activityTypeId: number;
  isVisible: boolean;
  classSectionId: number;
  description: string;
  startDate: string;
  endDate: string;
  editBeForSubmitMin: number;
  maxFileSubmit: number;
  maxFileSize: number;
  attachFiles: string[];
  isOverWriteAttachFile: boolean;
}

export interface UpdateAssignmentFormDataPayload {
  name: string;
  activityTypeId: number;
  isVisible: boolean;
  classSectionId: number;
  description: string;
  startDate: string;
  endDate: string;
  editBeForSubmitMin: number;
  maxFileSubmit: number;
  maxFileSize: number;
  attachFiles: string[];
  isOverWriteAttachFile: boolean;
}

export interface CreateAnnouncementFormDataPayload {
  content: string;
  title: string;
  visible: boolean | DropdownDynamicValueInputBooleanDataPayload;
}
export interface UpdateAnnouncementFormDataPayload {
  content: string;
  title: string;
  visible: boolean;
}

export interface CreateClassSectionsFormDefault {
  name: string;
}
export interface UpdateClassSectionsFormDefault {
  name: string;
}

export type FormInputVariant =
  | 'text'
  | 'number'
  | 'editor'
  | 'multiline'
  | 'dropdown'
  | 'dropdownDynamicValue'
  | 'dropdownBanks'
  | 'timetable'
  | 'radioGroup'
  | 'image'
  | 'multiSelect'
  | 'time'
  | 'file'
  | 'files'
  | 'tags'
  | 'modules'
  | 'password'
  | 'feedbackQuestionChoice'
  | 'feedbackTypeChoose'
  | 'datetime'
  | 'boolean'
  | 'quizPicker'
  | 'answerPicker'
  | 'date';
