import {
  BuyCourseDataPayload,
  FeedbackMentorDataPayload,
  LoginFormDataPayload,
  RegisterMentorDataPayload,
  RegisterStudentDataPayload,
} from '~/models/form';

export const SIGN_IN_FIELDS: LoginFormDataPayload = {
  email: 'email',
  password: 'password',
};
export const TIME_TABLE_FIELDS = {
  slot: 'slot',
  dayInWeek: 'dayInWeek',
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

export const EDIT_IMAGE_PROFILE_FIELDS = {
  avatar: 'avatar',
  identityFront: 'identityFront',
  identityBack: 'identityBack',
};

export const EDIT_PERSONAL_PROFILE_FIELDS = {
  fullName: 'fullName',
  birthday: 'birthday',
  address: 'address',
  phone: 'phone',
};

export const EDIT_MENTOR_PROFILE_FIELDS = {
  introduce: 'introduce',
  mentorSkills: 'mentorSkills',
  workingExperience: 'workingExperience',
};

export const EDIT_CERTIFICATE_PROFILE_FIELDS = {
  userImages: 'userImages',
};

export const EDIT_PROFILE_FIELDS = {
  oldPassword: 'oldPassword',
  oldPasswordConfirm: 'oldPasswordConfirm',
  newPassword: 'newPassword',
  newPasswordConfirm: 'newPasswordConfirm',
};

export const EDIT_SOCIAL_PROFILE_FIELDS = {
  facebookLink: 'facebookLink',
  twitterLink: 'twitterLink',
  instagramLink: 'instagramLink',
};

export const WITHDRAW_MONEY_FIELDS = {
  amount: 'amount',
  bankLinking: 'bankLinking',
  bankAccount: 'bankAccount',
  bankAccountOwner: 'bankAccountOwner',
  note: 'note',
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
  code: 'code',
  name: 'name',
  imageId: 'imageId',
  categoryId: 'categoryId',
  subjectId: 'subjectId',
  description: 'description',
};
export const CREATE_SUB_COURSE_FIELDS = {
  level: 'level',
  imageId: 'imageId',
  subjectId: 'subjectId',
  type: 'type',
  price: 'price',
  minStudent: 'minStudent',
  maxStudent: 'maxStudent',
  startDateExpected: 'startDateExpected',
  endDateExpected: 'endDateExpected',
  subCourseTile: 'subCourseTile',
  numberOfSlot: 'numberOfSlot',
  timeInWeekRequests: 'timeInWeekRequests',
};
