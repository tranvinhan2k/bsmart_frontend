import { object, string, ref } from 'yup';
import {
  CONFIRM_PASSWORD_NOT_MATCH,
  CONFIRM_PASSWORD_REQUIRED,
  COURSE_CATEGORY_REQUIRED,
  COURSE_DESCRIPTION,
  COURSE_IMAGE_REQUIRED,
  COURSE_LANGUAGE_REQUIRED,
  COURSE_LEVEL_REQUIRED,
  COURSE_NAME_REQUIRED,
  COURSE_TYPE,
  EMAIL_INVALID,
  EMAIL_REQUIRED,
  PASSWORD_MATCHED,
  PASSWORD_REQUIRED,
  PHONE_INVALID,
  PHONE_REQUIRED,
  USERNAME_REQUIRED,
} from '~/form/message';

export const validationSchemaSignIn = object({
  email: string().email(EMAIL_INVALID).required(USERNAME_REQUIRED),
  password: string().required(PASSWORD_REQUIRED),
});

export const validationSchemaRegisterStudent = object({
  name: string().required(USERNAME_REQUIRED),
  email: string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
  password: string()
    .required(PASSWORD_REQUIRED)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      PASSWORD_MATCHED
    ),
  phone: string()
    .required(PHONE_REQUIRED)
    .matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, PHONE_INVALID),
  confirm: string()
    .required(CONFIRM_PASSWORD_REQUIRED)
    .oneOf([ref('password')], CONFIRM_PASSWORD_NOT_MATCH),
});

export const validationSchemaRegisterMentor = object({
  name: string().required(USERNAME_REQUIRED),
  email: string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
  password: string()
    .required(PASSWORD_REQUIRED)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      PASSWORD_MATCHED
    ),
  phone: string()
    .required(PHONE_REQUIRED)
    .matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, PHONE_INVALID),
  confirm: string()
    .required(CONFIRM_PASSWORD_REQUIRED)
    .oneOf([ref('password')], CONFIRM_PASSWORD_NOT_MATCH),
});
export const validationSchemaBuyCourse = object({
  name: string().required(USERNAME_REQUIRED),
  phone: string().required(USERNAME_REQUIRED),
  email: string().email(EMAIL_INVALID).required(USERNAME_REQUIRED),
  voucher: string().required(PASSWORD_REQUIRED),
});

export const validationSchemaEditPersonalProfile = object({
  avatar: string().required(),
  name: string().required(),
  birthday: string().required(),
  address: string().required(),
  phone: string().required(),
  identity: string().required(),
});

export const validationSchemaEditAccountProfile = object({
  email: string().email(EMAIL_INVALID).required(USERNAME_REQUIRED),
  password: string().required(PASSWORD_REQUIRED),
  confirm: string().required(PASSWORD_REQUIRED),
});

export const validationSchemaEditSocialProfile = object({
  facebook: string(),
  twitter: string(),
  instagram: string(),
});

export const validationSchemaFeedbackMentor = object({
  enthusiasmLevel: string().required(),
  feelingOfTeacher: string(),
  // mentorId: object().required(MENTOR_REQUIRED),
  // subjectId: object().required(SUBJECT_REQUIRED),
  supportAnswerQuestion: string(),
  supportHomeWork: string(),
});

export const validationSchemaCreateCourse = object({
  name: string().required(COURSE_NAME_REQUIRED),
  level: string().required(COURSE_LEVEL_REQUIRED),
  image: string().required(COURSE_IMAGE_REQUIRED),
  category: object().required(COURSE_CATEGORY_REQUIRED),
  programmingLanguage: object().required(COURSE_LANGUAGE_REQUIRED),
  type: object().required(COURSE_TYPE),
  courseDescription: string().required(COURSE_DESCRIPTION),
});
