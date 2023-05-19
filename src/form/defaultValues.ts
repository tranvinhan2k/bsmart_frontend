import {
  BuyCourseDataPayload,
  EditAvatarFormDataPayload,
  EditCertificateProfileFormDataPayload,
  EditIdentityBackFormDataPayload,
  EditIdentityFrontFormDataPayload,
  EditMentorProfileFormDataPayload,
  FeedbackMentorDataPayload,
  LoginFormDataPayload,
  RegisterMentorDataPayload,
  RegisterStudentDataPayload,
  WithdrawMoneyFormDataPayload,
} from '~/models/form';

export const defaultValueSignIn: LoginFormDataPayload = {
  email: localStorage.getItem('username') || '',
  password: localStorage.getItem('password') || '',
};
export const defaultValueStudentRegister: RegisterStudentDataPayload = {
  email: '',
  password: '',
  name: '',
  phone: '',
  confirm: '',
  birthDay: '',
  introduce: '',
};
export const defaultValueMentorRegister: RegisterMentorDataPayload = {
  email: '',
  password: '',
  confirm: '',
  birthDay: '',
  introduce: '',
  name: '',
  phone: '',
};
export const defaultValueBuyCourse: BuyCourseDataPayload = {
  email: '',
  name: '',
  paymentMethod: '',
  phone: '',
  voucher: '',
};

export const defaultValueEditAvatar: EditAvatarFormDataPayload = {
  avatar: '',
};
export const defaultValueEditIdentityFront: EditIdentityFrontFormDataPayload = {
  identityFront: '',
};
export const defaultValueEditIdentityBack: EditIdentityBackFormDataPayload = {
  identityBack: '',
};

export const defaultValueEditPersonalProfile = {
  fullName: '',
  birthday: '',
  address: '',
  phone: '',
};

export const defaultValueEditMentorProfile: EditMentorProfileFormDataPayload = {
  introduce: '',
  mentorSkills: [{ id: 0, label: '', value: '' }],
  workingExperience: '',
};

export const defaultValueEditCertificateProfile: EditCertificateProfileFormDataPayload =
  {
    userImages: [''],
  };

export const defaultValueEditAccountProfile = {
  oldPassword: '',
  oldPasswordConfirm: '',
  newPassword: '',
  newPasswordConfirm: '',
};

export const defaultValueEditSocialProfile = {
  facebookLink: '',
  twitterLink: '',
  instagramLink: '',
};

export const defaultValueFeedbackMentor: FeedbackMentorDataPayload = {
  enthusiasmLevel: 5,
  feelingOfTeacher: '',
  mentorId: '',
  subjectId: '',
  supportAnswerQuestion: 'yes',
  supportHomeWork: 'yes',
};

export const defaultValueCreateCourse = {
  code: '',
  name: '',
  level: '',
  imageId: '',
  categoryId: '',
  subjectId: '',
  type: '',
  price: 0,
  minStudent: 0,
  maxStudent: 0,
  startDateExpected: '',
  endDateExpected: '',
  description: '',
  subCourseTile: '',
  numberOfSlot: '',
  timeInWeekRequests: [],
};
export const defaultValueCreateSubCourse = {
  code: '',
  name: '',
  level: '',
  imageId: '',
  type: '',
  price: 0,
  minStudent: 0,
  maxStudent: 0,
  startDateExpected: '',
  endDateExpected: '',
  description: '',
  subCourseTile: '',
  numberOfSlot: 0,
  timeInWeekRequests: [],
};

export const defaultValueTimetable = {
  slot: '',
  dayInWeek: '',
};

export const defaultValueWithdrawMoney: WithdrawMoneyFormDataPayload = {
  amount: 50000,
  bankLinking: '',
  bankAccount: 0,
  bankAccountOwner: '',
  note: '',
};
