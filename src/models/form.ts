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
  introduce: string;
  birthDay: string;
}
export interface RegisterMentorDataPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
  introduce: string;
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
  birthday: Date;
  address: string;
  phone: string;
}

export interface EditAccountProfileFormDefault {
  oldPassword: string;
  oldPasswordConfirm: string;
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
  mentorSkills: { id: number; label: string; value: string }[];
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

export type FormInputVariant =
  | 'text'
  | 'number'
  | 'multiline'
  | 'dropdown'
  | 'dropdownBanks'
  | 'timetable'
  | 'radioGroup'
  | 'image'
  | 'multiSelect'
  | 'time'
  | 'file'
  | 'tags'
  | 'modules'
  | 'password'
  | 'date';
