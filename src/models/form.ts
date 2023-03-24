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
}
export interface RegisterMentorDataPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
  introduction: string;
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

export interface EditImageProfileFormDataPayload {
  avatar: string;
  identityFront?: string;
  identityBack?: string;
}

export interface EditPersonalProfileFormDataPayload {
  fullName: string;
  birthday: Date | '';
  address: string;
  phone: string;
}

export interface EditMentorProfileFormDataPayload {
  introduce: string;
  skills: { subjectId: number; level: number }[];
  experience: string;
}

export interface EditCertificateProfileFormDataPayload {
  certificates: { file: string | Blob }[];
}

export interface EditAccountProfileFormDataPayload {
  oldPassword: string;
  oldPasswordConfirm: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface EditSocialProfileFormDataPayload {
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
}

export type FormInputVariant =
  | 'text'
  | 'number'
  | 'multiline'
  | 'dropdown'
  | 'radioGroup'
  | 'image'
  | 'multiSelect'
  | 'time'
  | 'file'
  | 'tags'
  | 'modules'
  | 'password'
  | 'date';
