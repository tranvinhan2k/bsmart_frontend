import { array, date, mixed, number, object, ref, string } from 'yup';
import 'yup-phone';
import {
  ADDRESS_REQUIRED,
  BIRTHDAY_REQUIRED,
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
  generateRequiredText,
  IMAGE_FORMAT_NOT_SUPPORT,
  IMAGE_SIZE_TOO_BIG,
  NAME_REQUIRED,
  PASSWORD_MATCHED,
  PASSWORD_REQUIRED,
  PHONE_INVALID,
  PHONE_REQUIRED,
  USERNAME_REQUIRED,
  WITHDRAW_AMOUNT_POSITIVE,
  WITHDRAW_AMOUNT_REQUIRED,
  WITHDRAW_BANK_ACCOUNT_OWNER_REQUIRED,
  WITHDRAW_BANK_ACCOUNT_REQUIRED,
} from '~/form/message';

const PHONE_REGEX = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const FILE_SIZE_2 = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

export const validationSchemaSignIn = object({
  email: string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
  password: string().required(PASSWORD_REQUIRED),
});

export const validationSchemaRegisterStudent = object({
  name: string().required(USERNAME_REQUIRED),
  email: string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
  password: string()
    .matches(PASSWORD_REGEX, PASSWORD_MATCHED)
    .required(PASSWORD_REQUIRED),
  confirm: string()
    .required(CONFIRM_PASSWORD_REQUIRED)
    .oneOf([ref('password')], CONFIRM_PASSWORD_NOT_MATCH),
  phone: string().matches(PHONE_REGEX, PHONE_INVALID).required(PHONE_REQUIRED),
});

export const validationSchemaRegisterMentor = object({
  name: string().required(USERNAME_REQUIRED),
  email: string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
  password: string()
    .matches(PASSWORD_REGEX, PASSWORD_MATCHED)
    .required(PASSWORD_REQUIRED),
  phone: string().matches(PHONE_REGEX, PHONE_INVALID).required(PHONE_REQUIRED),
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
export const validationSchemaEditAvatar = object({
  avatar: mixed()
    .required(generateRequiredText('Hình ảnh đại diện'))
    .test(
      'fileSize',
      IMAGE_SIZE_TOO_BIG,
      (value: any) => value && value.size <= FILE_SIZE_2
    )
    .test(
      'fileFormat',
      IMAGE_FORMAT_NOT_SUPPORT,
      (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});
export const validationSchemaEditIdentityFront = object({
  identityFront: mixed()
    .required(generateRequiredText('Căn cước công dân (mặt trước)'))
    .test(
      'fileSize',
      IMAGE_SIZE_TOO_BIG,
      (value: any) => value && value.size <= FILE_SIZE_2
    )
    .test(
      'fileFormat',
      IMAGE_FORMAT_NOT_SUPPORT,
      (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});
export const validationSchemaEditIdentityBack = object({
  identityBack: mixed()
    .required(generateRequiredText('Căn cước công dân (mặt sau)'))
    .test(
      'fileSize',
      IMAGE_SIZE_TOO_BIG,
      (value: any) => value && value.size <= FILE_SIZE_2
    )
    .test(
      'fileFormat',
      IMAGE_FORMAT_NOT_SUPPORT,
      (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

export const validationSchemaEditPersonalProfile = object({
  fullName: string().required(NAME_REQUIRED),
  birthday: date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required(BIRTHDAY_REQUIRED),
  address: string().required(ADDRESS_REQUIRED),
  phone: string().required(PHONE_REQUIRED),
});

export const validationSchemaEditMentorProfile = object({
  introduce: string().required(),
  mentorSkills: array(),
  workingExperience: string(),
});

export const validationSchemaEditCertificateProfile = object({
  userImages: array(),
});

export const validationSchemaEditAccountProfile = object({
  oldPassword: string()
    .required(PASSWORD_REQUIRED)
    .matches(PASSWORD_REGEX, PASSWORD_MATCHED),
  oldPasswordConfirm: string()
    .required(CONFIRM_PASSWORD_REQUIRED)
    .oneOf([ref('oldPassword')], CONFIRM_PASSWORD_NOT_MATCH),
  newPassword: string()
    .required(PASSWORD_REQUIRED)
    .matches(PASSWORD_REGEX, PASSWORD_MATCHED),
  newPasswordConfirm: string()
    .required(CONFIRM_PASSWORD_REQUIRED)
    .oneOf([ref('newPassword')], CONFIRM_PASSWORD_NOT_MATCH),
});

export const validationSchemaEditSocialProfile = object({
  facebook: string(),
  twitter: string(),
  instagram: string(),
});
export const validationSchemaTimeTable = object({
  slot: object().required('Hãy nhập khung giờ học của bạn'),
  dayInWeek: object().required('Hãy nhập thứ của bạn'),
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
  code: string().required('Mã khóa học là bắt buộc'),
  name: string().required(COURSE_NAME_REQUIRED),
  subjectId: object()
    .typeError('Ngôn ngữ không hợp lệ')
    .required(COURSE_LANGUAGE_REQUIRED),
  categoryId: object()
    .typeError('Lĩnh vực không hợp lệ')
    .required(COURSE_CATEGORY_REQUIRED),
  description: string().required(COURSE_DESCRIPTION),
});
export const validationSchemaCreateSubCourse = object({
  subCourseTile: string().required('Tên khóa học phụ là bắt buộc'),
  numberOfSlot: number()
    .required('Số lượng học sinh không được để trống')
    .min(30, 'Học sinh tối thiểu phải lớn hơn 30'),
  level: string().required(COURSE_LEVEL_REQUIRED),
  imageId: mixed()
    .required('Hình ảnh khóa học là bắt buộc')
    .test(
      'fileSize',
      'Dung lượng ảnh quá lớn. Vui lòng chọn hình khác',
      (value: any) => value && value.size <= FILE_SIZE_2
    )
    .test(
      'fileFormat',
      'Định dạng hình ảnh không hỗ trợ.',
      (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  price: number()
    .min(1000, 'Giá tiền phải lớn hơn 1000')
    .required('Giá tiền là bắt buộc'),
  type: object().typeError('Hình thức không hợp lệ').required(COURSE_TYPE),
  minStudent: number()
    .required('Số học sinh tối thiểu không được bỏ trống')
    .min(5, 'Học sinh tối thiểu phải lớn hơn 5'),
  maxStudent: number()
    .required('Số học sinh tối đa không được bỏ trống')
    .min(5, 'Học sinh tối thiểu phải lớn hơn 5')
    .test(
      'is-greater',
      'Số học sinh tối đa phải lớn hơn số học sinh tối thiểu',
      function (value) {
        const { minStudent } = this.parent;
        return value > minStudent;
      }
    ),
  startDateExpected: date()
    .typeError('Ngày phải hợp lệ (DD/MM/YYYY)')
    .required('Ngày không được để trống'),
  timeInWeekRequests: array().required('Thời khóa biểu là bắt buộc.'),
  endDateExpected: date()
    .typeError('Ngày phải hợp lệ (DD/MM/YYYY)')
    .required('Ngày không được để trống')
    .test(
      'is-greater',
      'Ngày kết thúc phải lớn hơn ngày bắt đầu',
      function (endDate: Date) {
        const { startDateExpected } = this.parent;

        if (!startDateExpected || !endDate) {
          return true;
        }

        return endDate > startDateExpected;
      }
    ),
});

export const validationSchemaWithdrawMoney = object({
  amount: number()
    .required(WITHDRAW_AMOUNT_REQUIRED)
    .positive(WITHDRAW_AMOUNT_POSITIVE),
  bankLinking: object(),
  bankAccount: number().required(WITHDRAW_BANK_ACCOUNT_REQUIRED),
  bankAccountOwner: string().required(WITHDRAW_BANK_ACCOUNT_OWNER_REQUIRED),
  note: string(),
});
