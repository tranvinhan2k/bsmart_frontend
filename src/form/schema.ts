import {
  BuyCourseDataPayload,
  EditPersonalProfileFormDataPayload,
  EditAccountProfileFormDataPayload,
  EditSocialProfileFormDataPayload,
  FeedbackMentorDataPayload,
  LoginFormDataPayload,
  RegisterMentorDataPayload,
  RegisterStudentDataPayload,
} from '~/models/form';

export const SIGN_IN_FIELDS: LoginFormDataPayload = {
  email: 'email',
  password: 'password',
};
export const REGISTER_STUDENT_FIELDS: RegisterStudentDataPayload = {
  name: 'name',
  email: 'email',
  password: 'password',
  confirm: 'confirm',
  phone: 'phone',
};
export const REGISTER_MENTOR_FIELDS: RegisterMentorDataPayload = {
  name: 'name',
  phone: 'phone',
  email: 'email',
  password: 'password',
  confirm: 'confirm',
  introduction: 'introduction',
};
export const BUY_COURSE_FIELDS: BuyCourseDataPayload = {
  name: 'name',
  phone: 'phone',
  email: 'email',
  voucher: 'voucher',
  paymentMethod: 'paymentMethod',
};
export const defaultValueFeedbackMentor: FeedbackMentorDataPayload = {
  enthusiasmLevel: 5,
  feelingOfTeacher: '',
  mentorId: '',
  subjectId: '',
  supportAnswerQuestion: 'yes',
  supportHomeWork: 'yes',
};

export const EDIT_PERSONAL_PROFILE_FIELDS = {
  avatar: 'avatar',
  fullName: 'fullName',
  birthday: 'birthday',
  address: 'address',
  phone: 'phone',
  identityFront: 'identityFront',
  identityBack: 'identityBack',
};

export const EDIT_CERTIFICATE_PROFILE_FIELDS = {
  certificate1: 'certificate1',
  certificate2: 'certificate2',
  certificate3: 'certificate3',
  certificate4: 'certificate4',
  certificate5: 'certificate5',
};

export const EDIT_PROFILE_FIELDS: EditAccountProfileFormDataPayload = {
  oldPassword: 'oldPassword',
  oldPasswordConfirm: 'oldPasswordConfirm',
  newPassword: 'newPassword',
  newPasswordConfirm: 'newPasswordConfirm',
};

export const EDIT_SOCIAL_PROFILE_FIELDS: EditSocialProfileFormDataPayload = {
  facebookLink: 'facebookLink',
  twitterLink: 'twitterLink',
  instagramLink: 'instagramLink',
};

export const FEEDBACK_MENTOR_FIELDS = {
  enthusiasmLevel: 'enthusiasmLevel',
  feelingOfTeacher: 'feelingOfTeacher',
  mentorId: 'mentorId',
  subjectId: 'subjectId',
  supportAnswerQuestion: 'supportAnswerQuestion',
  supportHomeWork: 'supportHomeWork',
};
export const CREATE_COURSE_FIELDS = {
  name: 'name',
  level: 'level',
  image: 'image',
  category: 'category',
  programmingLanguage: 'programmingLanguage',
  type: 'type',
  courseDescription: 'courseDescription',
};
