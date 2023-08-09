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
  dayOfWeek: 'dayOfWeek',
};
export const CREATE_CATEGORY_FIELDS = {
  code: 'code',
  name: 'name',
};
export const CREATE_TEMPLATE_FIELDS = {
  templateName: 'templateName',
  questionList: 'questionList',
  feedbackType: 'feedbackType',
  permission: 'permission',
};
export const FEEDBACK_QUESTION_FIELDS = {
  point: 'point',
  label: 'label',
};
export const CREATE_FEEDBACK_QUESTION = {
  question: 'question',
  possibleAnswer: 'possibleAnswer',
  questionType: 'questionType',
};
export const UPDATE_CATEGORY_FIELDS = {
  code: 'code',
  name: 'name',
};
export const CREATE_SUBJECT_FIELDS = {
  code: 'code',
  name: 'name',
  categoryId: 'categoryId',
};
export const UPDATE_SUBJECT_FIELDS = {
  code: 'code',
  name: 'name',
  categoryId: 'categoryId',
};
export const REGISTER_STUDENT_FIELDS: RegisterStudentDataPayload = {
  name: 'name',
  email: 'email',
  password: 'password',
  confirm: 'confirm',
  phone: 'phone',
  birthDay: 'birthDay',
  gender: 'gender',
};
export const REGISTER_MENTOR_FIELDS: RegisterMentorDataPayload = {
  name: 'name',
  phone: 'phone',
  email: 'email',
  password: 'password',
  confirm: 'confirm',
  gender: 'gender',
  birthDay: 'birthDay',
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
  website: 'website',
  linkedinLink: 'linkedinLink',
  facebookLink: 'facebookLink',
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
  level: 'level',
};
export const CREATE_CLASS_FIELDS = {
  imageId: 'imageId',
  level: 'level',
  imageUrl: 'imageUrl',
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
