import {
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

export default {};
