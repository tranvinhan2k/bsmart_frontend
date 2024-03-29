import {
  BuyCourseDataPayload,
  CreateAnnouncementFormDataPayload,
  CreateAssignmentFormDataPayload,
  EditAvatarFormDataPayload,
  EditCertificateProfileDefaultValuePayload,
  EditIdentityBackFormDataPayload,
  EditIdentityFrontFormDataPayload,
  EditMentorProfileFormDataPayload,
  EditPersonalProfileFormDefault,
  FeedbackMentorDataPayload,
  LoginFormDataPayload,
  UpdateAnnouncementFormDataPayload,
  UpdateMentorProfileRequestProfileFormDefault,
  WithdrawMoneyFormDataPayload,
} from '~/models/form';

export const defaultValueSignIn: LoginFormDataPayload = {
  email: localStorage.getItem('username') || '',
  password: localStorage.getItem('password') || '',
};
export const defaultValueStudentRegister = {
  email: '',
  password: '',
  name: '',
  phone: '',
  confirm: '',
  birthDay: '',
  gender: null,
};
export const defaultValueMentorRegister = {
  email: '',
  password: '',
  confirm: '',
  birthDay: '',
  name: '',
  phone: '',
  gender: null,
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

export const defaultValueEditPersonalProfile: EditPersonalProfileFormDefault = {
  fullName: '',
  birthday: '',
  address: '',
  phone: '',
  gender: null,
};
export const defaultValueUpdateMentorProfileRequest: UpdateMentorProfileRequestProfileFormDefault =
  {
    avatar: '',
    //
    fullName: '',
    birthday: '',
    address: '',
    phone: '',
    gender: null,
    //
    identityFront: '',
    identityBack: '',
    //
    introduce: '',
    workingExperience: '',
    mentorSkills: [{ skillId: null, yearOfExperiences: 0 }],
    degreeList: [],
  };

export const defaultValuesEditMentorProfile: EditMentorProfileFormDataPayload =
  {
    introduce: '',
    mentorSkills: [{ skillId: null, yearOfExperiences: 0 }],
    // mentorSkills: [],
    workingExperience: '',
  };
// export const defaultValuesUpdateMentorProfileRequest: UpdateMentorProfileRequestFormDataPayload =
//   {
//     // mentorSkills: [{ skillId: null, yearOfExperiences: 0 }],
//     mentorSkills: [],
//   };

export const defaultValueEditCertificateProfile: EditCertificateProfileDefaultValuePayload =
  {
    userImages: [],
  };
export const defaultValuesUpdateDegreeRequest: EditCertificateProfileDefaultValuePayload =
  {
    userImages: [],
  };

export const defaultValueEditAccountProfile = {
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

export const defaultValueEditSocialProfile = {
  website: '',
  linkedinLink: '',
  facebookLink: '',
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
  level: '',
  imageId: '',
  type: '',
  price: 0,
  minStudent: 0,
  maxStudent: 0,
  startDateExpected: '',
  endDateExpected: '',
  subCourseTile: '',
  numberOfSlot: 0,
  timeInWeekRequests: [],
};

export const defaultValueTimetable = {
  slot: '',
  dayOfWeek: '',
};

export const defaultValueWithdrawMoney: WithdrawMoneyFormDataPayload = {
  amount: 0,
  bankLinking: '',
  bankAccount: 0,
  bankAccountOwner: '',
  note: '',
};

export const defaultValueCreateCategory = {
  code: '',
  name: '',
};
export const defaultValueUpdateCategory = {
  code: '',
  name: '',
};

export const defaultValueEditCreateAssignment: CreateAssignmentFormDataPayload =
  {
    name: '',
    activityTypeId: 0,
    isVisible: true,
    classSectionId: 0,
    description: '',
    startDate: '',
    endDate: '',
    editBeForSubmitMin: 0,
    maxFileSubmit: 1,
    maxFileSize: 10,
    attachFiles: [],
  };
export const defaultValueUpdateAssignment: CreateAssignmentFormDataPayload = {
  name: '',
  activityTypeId: 0,
  isVisible: true,
  classSectionId: 0,
  description: '',
  startDate: '',
  endDate: '',
  editBeForSubmitMin: 0,
  maxFileSubmit: 1,
  maxFileSize: 10,
  attachFiles: [],
};

export const defaultValueCreateAnnouncement: CreateAnnouncementFormDataPayload =
  {
    content: '',
    title: '',
    visible: true,
  };
export const defaultValueUpdateAnnouncement: UpdateAnnouncementFormDataPayload =
  {
    content: '',
    title: '',
    visible: true,
  };

export const defaultValueCreateClassSections = {
  name: '',
};
export const defaultValueUpdateClassSections = {
  name: '',
};

export const defaultValueApproveRegisterRequest = {
  message: 'Chúc mừng bạn đã trờ thành giảng viên hợp tác với Mismart',
};
export const defaultValueRejectRegisterRequest = {
  message: 'Thông tin vi phạm bao gồm:',
};
export const defaultValueEditRequestRegisterRequest = {
  message: 'Thông tin cần chỉnh sửa bao gồm:',
};
export const defaultValueProcessWithdrawRequest = {
  file: '',
};

export const defaultValueConfigReferralCode = {
  usageLimit: 0,
  discountPercent: 0,
  expiredLaterDay: 0,
};
