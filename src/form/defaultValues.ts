import {
  BuyCourseDataPayload,
  EditAccountProfileFormDataPayload,
  EditPersonalProfileFormDataPayload,
  EditSocialProfileFormDataPayload,
  LoginFormDataPayload,
  RegisterMentorDataPayload,
  RegisterStudentDataPayload,
} from '~/models/form';

export const defaultValueSignIn: LoginFormDataPayload = {
  email: '',
  password: '',
};
export const defaultValueStudentRegister: RegisterStudentDataPayload = {
  email: '',
  password: '',
  name: '',
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

export const defaultValueEditPersonalProfile: EditPersonalProfileFormDataPayload =
  {
    avatar: '',
    name: '',
    birthday: '',
    address: '',
    phone: '',
    identityFront: '',
    identityBack: '',
  };

export const defaultValueEditAccountProfile: EditAccountProfileFormDataPayload =
  {
    email: '',
    password: '',
    confirm: '',
  };

export const defaultValueEditSocialProfile: EditSocialProfileFormDataPayload = {
  facebook: '',
  twitter: '',
  instagram: '',
};

export default {};
