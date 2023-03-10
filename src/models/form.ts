export interface LoginFormDataPayload {
  email: string;
  password: string;
}
export interface RegisterStudentDataPayload {
  name: string;
  email: string;
  password: string;
  confirm: string;
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

export interface EditPersonalProfileFormDataPayload {
  avatar: string;
  name: string;
  birthday: string;
  address: string;
  phone: string;
  identityFront: string;
  identityBack: string;
}

export interface EditAccountProfileFormDataPayload {
  email: string;
  password: string;
  confirm: string;
}

export interface EditSocialProfileFormDataPayload {
  facebook: string;
  twitter: string;
  instagram: string;
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
