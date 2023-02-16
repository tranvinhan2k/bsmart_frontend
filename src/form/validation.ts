import { object, string } from 'yup';
import {
  EMAIL_INVALID,
  PASSWORD_REQUIRED,
  USERNAME_REQUIRED,
} from '~/form/message';

export const validationSchemaSignIn = object({
  email: string().email(EMAIL_INVALID).required(USERNAME_REQUIRED),
  password: string().required(PASSWORD_REQUIRED),
});

export const validationSchemaRegisterStudent = object({
  name: string().required(USERNAME_REQUIRED),
  email: string().email(EMAIL_INVALID).required(USERNAME_REQUIRED),
  password: string().required(PASSWORD_REQUIRED),
  confirm: string().required(PASSWORD_REQUIRED),
});

export const validationSchemaRegisterMentor = object({
  name: string().required(USERNAME_REQUIRED),
  phone: string().required(USERNAME_REQUIRED),
  email: string().email(EMAIL_INVALID).required(USERNAME_REQUIRED),
  password: string().required(PASSWORD_REQUIRED),
  confirm: string().required(PASSWORD_REQUIRED),
  introduction: string().required(PASSWORD_REQUIRED),
});

export default {};
