import { number, object, string } from 'yup';
import {
  EMAIL_INVALID,
  MENTOR_REQUIRED,
  PASSWORD_REQUIRED,
  SUBJECT_REQUIRED,
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
export const validationSchemaBuyCourse = object({
  name: string().required(USERNAME_REQUIRED),
  phone: string().required(USERNAME_REQUIRED),
  email: string().email(EMAIL_INVALID).required(USERNAME_REQUIRED),
  voucher: string().required(PASSWORD_REQUIRED),
});

export const validationSchemaFeedbackMentor = object({
  enthusiasmLevel: string().required(),
  feelingOfTeacher: string(),
  // mentorId: object().required(MENTOR_REQUIRED),
  // subjectId: object().required(SUBJECT_REQUIRED),
  supportAnswerQuestion: string(),
  supportHomeWork: string(),
});
