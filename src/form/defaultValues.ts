import {
  BuyCourseDataPayload,
  EditAccountProfileFormDataPayload,
  EditImageProfileFormDataPayload,
  EditCertificateProfileFormDataPayload,
  EditPersonalProfileFormDataPayload,
  EditSocialProfileFormDataPayload,
  FeedbackMentorDataPayload,
  LoginFormDataPayload,
  RegisterMentorDataPayload,
  RegisterStudentDataPayload,
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
};
export const defaultValueMentorRegister: RegisterMentorDataPayload = {
  email: '',
  password: '',
  confirm: '',
  introduction: '',
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

export const defaultValueEditImageProfile: EditImageProfileFormDataPayload = {
  avatar: '',
  identityFront: '',
  identityBack: '',
};

export const defaultValueEditPersonalProfile: EditPersonalProfileFormDataPayload =
  {
    fullName: '',
    birthday: '',
    address: '',
    phone: '',
    introduce: '',
  };

export const defaultValueEditCertificateProfile: EditCertificateProfileFormDataPayload =
  {
    certificate1: '',
    certificate2: '',
    certificate3: '',
    certificate4: '',
    certificate5: '',
  };

export const defaultValueEditAccountProfile: EditAccountProfileFormDataPayload =
  {
    oldPassword: '',
    oldPasswordConfirm: '',
    newPassword: '',
    newPasswordConfirm: '',
  };

export const defaultValueEditSocialProfile: EditSocialProfileFormDataPayload = {
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

export const defaultValueTimetable = {
  slot: '',
  dayInWeek: '',
};
