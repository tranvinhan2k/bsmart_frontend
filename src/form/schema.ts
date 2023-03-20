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

export const EDIT_PERSONAL_PROFILE_FIELDS: EditPersonalProfileFormDataPayload =
  {
    avatar: 'avatar',
    name: 'name',
    birthday: 'birthday',
    address: 'address',
    phone: 'phone',
    identityFront: 'identityFront',
    identityBack: 'identityBack',
  };

export const EDIT_PROFILE_FIELDS: EditAccountProfileFormDataPayload = {
  email: 'email',
  password: 'password',
  confirm: 'confirm',
};

export const EDIT_SOCIAL_PROFILE_FIELDS: EditSocialProfileFormDataPayload = {
  facebook: 'email',
  twitter: 'password',
  instagram: 'confirm',
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
  price: 'price',
  category: 'category',
  subject: 'subject',
  type: 'type',
  minStudent: 'minStudent',
  maxStudent: 'maxStudent',
  startDateExpected: 'startDateExpected',
  endDateExpected: 'endDateExpected',
  description: 'description',
};
