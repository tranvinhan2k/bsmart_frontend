import { object, string, ref, number, date, mixed } from 'yup';
import {
  CONFIRM_PASSWORD_NOT_MATCH,
  CONFIRM_PASSWORD_REQUIRED,
  COURSE_CATEGORY_REQUIRED,
  COURSE_DESCRIPTION,
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

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

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
  image: mixed()
    .required('Hình ảnh khóa học là bắt buộc')
    .test(
      'fileSize',
      'Dung lượng ảnh quá lớn. Vui lòng chọn hình khác',
      (value: any) => value && value.size <= FILE_SIZE
    )
    .test(
      'fileFormat',
      'Định dạng hình ảnh không hỗ trợ.',
      (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  price: number()
    .min(1000, 'Giá tiền phải lớn hơn 1000')
    .required('Giá tiền là bắt buộc'),
  category: object().required(COURSE_CATEGORY_REQUIRED),
  subject: object().required(COURSE_LANGUAGE_REQUIRED),
  type: object().required(COURSE_TYPE),
  description: string().required(COURSE_DESCRIPTION),
  minStudent: number()
    .required('Số học sinh tối thiểu không được bỏ trống')
    .min(5, 'Học sinh tối thiểu phải lớn hơn 5'),
  maxStudent: number()
    .required('Số học sinh tối đa không được bỏ trống')
    .test(
      'is-greater',
      'Số học sinh tối đa phải lớn hơn số học sinh tối thiểu',
      function (value) {
        const { minStudent } = this.parent;
        return value > minStudent;
      }
    ),
  startDateExpected: date().required(),
  endDateExpected: date()
    .required()
    .test(
      'is-greater',
      'Ngày kết thúc phải lớn hơn ngày bắt đầu',
      function (endDate: Date) {
        const { startDate } = this.parent;

        if (!startDate || !endDate) {
          return true;
        }

        return endDate > startDate;
      }
    ),
});
