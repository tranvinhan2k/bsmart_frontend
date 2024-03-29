import { array, bool, date, mixed, number, object, ref, string } from 'yup';
import 'yup-phone';
import { YupValidationForm } from '~/assets/variables';
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
  CRATE_ASSIGNMENT_DESCRIPTION,
  CRATE_ASSIGNMENT_END_DATE,
  CRATE_ASSIGNMENT_MAX_FILE_SIZE,
  CRATE_ASSIGNMENT_MAX_FILE_SUBMIT,
  CRATE_ASSIGNMENT_NAME,
  CRATE_ASSIGNMENT_START_DATE,
  CREATE_CLASS_SECTIONS_REQUIRED,
  UPDATE_CLASS_SECTIONS_REQUIRED,
  EMAIL_INVALID,
  EMAIL_REQUIRED,
  generateRequiredText,
  IMAGE_FORMAT_NOT_SUPPORT,
  IMAGE_SIZE_TOO_BIG,
  GENDER_REQUIRED,
  MESSAGE_PROCESS_APPROVE_REGISTER_REQUEST_REQUIRED,
  MESSAGE_PROCESS_CREATE_COURSE_REQUEST_REQUIRED,
  NAME_REQUIRED,
  PASSWORD_MATCHED,
  PASSWORD_REQUIRED,
  PHONE_INVALID,
  PHONE_REQUIRED,
  USERNAME_REQUIRED,
  WITHDRAW_AMOUNT_REQUIRED,
  WITHDRAW_BANK_ACCOUNT_OWNER_REQUIRED,
  WITHDRAW_BANK_ACCOUNT_REQUIRED,
  CRATE_ANNOUNCEMENT_CONTENT,
  CRATE_ANNOUNCEMENT_TITLE,
  UPDATE_ANNOUNCEMENT_TITLE,
  UPDATE_ANNOUNCEMENT_CONTENT,
  WORKING_EXPERIENCE_REQUIRED,
  INTRODUCE_REQUIRED,
  YEAR_OF_EXPERIENCES_MINIMUM,
  YEAR_OF_EXPERIENCES_REQUIRED,
  SKILL_REQUIRED,
  CERTIFICATE_MAX_SIZE,
  CERTIFICATE_REQUIRED,
  CONFIRM_PASSWORD_NOT_MATCH_PASSWORD,
  MENTOR_SKILLS_REQUIRED_ONE,
  SKILL_UNIQUE,
  WITHDRAW_MANAGED_UPLOAD_FILE_REQUIRED,
  WITHDRAW_MANAGED_UPLOAD_FILE_FORMAT_NOT_SUPPORT,
  ConfigReferralCode,
} from '~/form/message';

const PHONE_REGEX = /(03|05|07|08|09)+([0-9]{8})\b/;
const URL =
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|\/|\?)*)?$/i;
const FULL_NAME_REGEX =
  /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const TRIM_REGEX = /^[\s\S]*?(?= *$)/;
const FILE_SIZE_2 = 5 * 1024 * 1024; // X * 1024 * 1024 = X MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
const SUPPORTED_FILE_DEGREE_FORMAT = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const SUPPORTED_FILE_XLSX_FORMAT = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];
const FILE_DEGREE_SIZE_BYTES = 10000000; // 1 is 1bytes (?)

export const validationSchemaSignIn = object({
  email: string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
  password: string().required(PASSWORD_REQUIRED),
});
export const validationSchemaFeedbackQuestionChoice = object({
  point: number().required('Số điểm không được để trống'),
  label: string().required('Nội dung không được để trống'),
});
export const validationSchemaCreateTemplate = object({
  name: string().required('Tên bản mẫu không được để trống'),
  type: object()
    .typeError('Loại bản mẫu không hợp lệ')
    .required('Loại bản mẫu không được để trống'),
  questions: YupValidationForm.notEmptyString(
    'Danh sách câu hỏi không được để trống'
  ),
});
export const validationSchemaFeedbackQuestion = object({
  question: string().required('Tên câu hỏi đánh giá không được để trống'),
});

export const validationSchemaCreateCategories = object({
  code: string().required('Mã môn học không được để trống.'),
  name: string().required('Tên môn học không được để trống.'),
});
export const validationSchemaFile = object({
  file: mixed().required('Tệp đính kèm không được để trống.'),
});
export const validationSchemaFiles = object({
  file: YupValidationForm.notEmptyString('Tệp đính kèm không được để trống'),
});
export const validationSchemaAnswer = object({
  answer: string().required('Tên câu trả lời không được để trống.'),
});
export const validationSchemaCreateSubjects = object({
  code: string().required('Mã ngôn ngữ không được để trống.'),
  name: string().required('Tên ngôn ngữ không được để trống.'),
  categoryId: object()
    .typeError('Lĩnh vực không hợp lệ')
    .required(COURSE_CATEGORY_REQUIRED),
});
export const validationSchemaUpdateSubjects = object({
  code: string().required('Mã ngôn ngữ không được để trống.'),
  name: string().required('Tên ngôn ngữ không được để trống.'),
});
export const validationQuizInput = object({
  question: string().required('Tên câu hỏi không được để trống'),
  questionType: string().required('Loại câu hỏi không được để trống'),
  answers: mixed()
    .test(
      'required',
      'Danh sách câu trả lời phải có ít nhất 2 câu trả lời',
      (data: any) => {
        return data?.[0] !== '' && data !== '' && data?.length >= 2;
      }
    )
    .test(
      'haveRightAnswer',
      'Danh sách câu trả lời phài có 1 câu trả lời đúng',
      (data: any) => {
        const isRight = data.findIndex((item: any) => item.right);
        return isRight !== -1;
      }
    ),
});

export const validationFeedbackQuestionInput = object({
  question: string().required('Tên câu hỏi không được để trống'),
  answerType: object().required('Loại câu trả lời không được để trống'),
});

export const validationSchemaUpdateCategories = object({
  code: string().required('Mã môn học không được để trống.'),
  name: string().required('Tên môn học không được để trống.'),
});
export const validationClassContentSection = object({
  name: string().required('Tên học phần không được để trống.'),
});
export const validationClassContentModule = object({
  name: string().required('Tên bài học không được để trống.'),
  description: string().required('Mô tả bài học không được để trống.'),
});
export const validationSendMailForgotPassword = object({
  email: string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
});
export const validationResetPassword = object({
  newPassword: string()
    .matches(PASSWORD_REGEX, PASSWORD_MATCHED)
    .required(PASSWORD_REQUIRED),
  confirm: string()
    .required(CONFIRM_PASSWORD_REQUIRED)
    .oneOf([ref('newPassword')], CONFIRM_PASSWORD_NOT_MATCH),
});
export const validationPassword = object({
  password: string()
    .matches(PASSWORD_REGEX, PASSWORD_MATCHED)
    .required(PASSWORD_REQUIRED),
});
export const validationClassContentResource = object({
  name: string().required('Tên tài nguyên không được để trống.'),
  file: YupValidationForm.notEmptyString('Tệp đính kèm không được để trống'),
});
export const validationClassContentQuiz = object({
  name: string().required('Tên bài kiểm tra không được để trống.'),
  code: string().required('Mã bài kiểm tra không được để trống.'),
  allowReviewAfterMin: number()
    .required('Thời gian không được để trống')
    .typeError('Thời gian không được để trống')
    .min(1, 'Thời gian chờ phài lớn hơn 1 phút'),
  quizQuestions: mixed().test(
    'required',
    'Danh sách câu hỏi phải có ít nhất 5 câu hỏi',
    (data: any) => {
      return data?.[0] !== '' && data !== '' && data?.length >= 5;
    }
  ),
  password: string()
    .matches(PASSWORD_REGEX, PASSWORD_MATCHED)
    .required(PASSWORD_REQUIRED),
});

export const validationAddPromoCode = object({
  code: string().required('Mã giới thiệu không hợp lệ.'),
});
export const validationCheckUrl = object({
  link: string()
    .matches(URL, 'Đường dẫn không hợp lệ.')
    .required('Đường dẫn không được để trống.'),
});
export const validationAssignment = object({
  note: string().required('Ghi chú không được để trống.'),
  attachFiles: object().required('Tệp đính kèm không được để trống.'),
});
export const validationPaymentPrice = object({
  price: number()
    .required('Số tiền không được để trống.')
    .typeError('Số tiền không được để trống.'),
});
export const validationClassListFilter = object({
  startDate: date().typeError('Ngày phải hợp lệ (DD/MM/YYYY)'),
  endDate: date()
    .typeError('Ngày phải hợp lệ (DD/MM/YYYY)')
    .test(
      'is-greater',
      'Ngày kết thúc phài lớn hơn ngày bắt đầu',
      function (endDate) {
        const startDateExpected = this.parent.startDate;

        if (!startDateExpected || !endDate) {
          return true;
        }

        return (
          new Date(endDate).getTime() > new Date(startDateExpected).getTime()
        );
      }
    ),
  subjectId: YupValidationForm.notEmptyString(
    'Danh sách môn học không đươc để trống'
  ),
});

export const validationRating = object({
  ratingPoint: number()
    .typeError('Số điểm đánh giá không được để trống')
    .required('Số điểm đánh giá không được để trống'),
  description: string()
    .required('Nhận xét không được để trống')
    .test('len', 'Nhận xét phải có hơn 20 kí tự', (val) => val.length > 20),
});

export const validationIntroduce = object({
  introduce: string().required('Mã giới thiệu chưa nhập vào để thêm'),
});
export const validationIntroduceCodeInformation = object({
  usageLimit: number()
    .required('Số lượt dùng không được để trống')
    .typeError('Số lượt dùng không được để trống'),
  discountPercent: number()
    .required('Số lượt dùng không được để trống')
    .typeError('Số lượt dùng không được để trống')
    .min(0, 'Phần trăm phải lớn hơn hoặc bằng 0')
    .max(100, 'Phần trăm phải nhỏ hơn hoặc bằng 100'),
  expiredLaterDay: date()
    .typeError('Ngày hết hạn không hợp lệ (DD/MM/YYYY)')
    .required('Ngày hết hạn không được để trống'),
});

export const validationClassContentAssignment = object({
  name: string().required('Tên bài tập không được để trống.'),
  description: string().required('Tên bài tập không được để trống.'),
  editBeForSubmitMin: number()
    .required('Thời gian cho phép không được để trống')
    .typeError('Thời gian cho phép không được để trống')
    .min(5, 'Thời gian cho phép làm bài phài lớn hơn 5 phút'),
  maxFileSubmit: number()
    .typeError('Số lượng không được để trống')
    .required('Số lượng không được để trống')
    .min(1, 'Số lượng phài lớn hơn 1'),
  maxFileSize: number()
    .typeError('Dung lượng không được để trống')
    .required('Dung lượng không được để trống')
    .max(30, 'Dung lượng phài nhỏ hơn 30MB'),
  password: string()
    .matches(PASSWORD_REGEX, PASSWORD_MATCHED)
    .required(PASSWORD_REQUIRED),
  passPoint: number()
    .typeError('Điểm đạt yêu cầu không được để trống')
    .required('Điểm đạt yêu cầu không được để trống')
    .min(1, 'Điểm đạt yêu cầu lớn hơn hoặc bằng 1')
    .max(10, 'Điểm đạt yêu cầu nhỏ hơn hoặc bằng 10'),
  attachFiles: object().required('Tệp đính kèm không được để trống.'),
});

export const validationSchemaRegisterStudent = object({
  name: string()
    .matches(
      FULL_NAME_REGEX,
      'Họ và tên phải có chữ đầu viết hoa và là tên Tiếng Việt.'
    )
    .max(40)
    .required(USERNAME_REQUIRED),
  email: string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
  password: string()
    .matches(PASSWORD_REGEX, PASSWORD_MATCHED)
    .required(PASSWORD_REQUIRED),
  confirm: string()
    .required(CONFIRM_PASSWORD_REQUIRED)
    .oneOf([ref('password')], CONFIRM_PASSWORD_NOT_MATCH),
  phone: string().matches(PHONE_REGEX, PHONE_INVALID).required(PHONE_REQUIRED),
  gender: object().required('Giới tính không được để trống'),
  birthDay: string()
    .required(BIRTHDAY_REQUIRED)
    .test('greater', 'Học sinh phải lớn hơn 10 tuổi', (value: any) => {
      return new Date().getFullYear() - new Date(value).getFullYear() > 10;
    }),
  isPolicy: bool().oneOf(
    [true],
    'Bạn phải đồng ý với Điều khoản dịch vụ để tham gia hệ thống.'
  ),
});

export const validationSchemaRegisterMentor = object({
  name: string()
    .matches(
      FULL_NAME_REGEX,
      'Họ và tên phải có chữ đầu viết hoa và là tên Tiếng Việt.'
    )
    .max(40)
    .required(USERNAME_REQUIRED),
  email: string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
  password: string()
    .matches(PASSWORD_REGEX, PASSWORD_MATCHED)
    .required(PASSWORD_REQUIRED),
  phone: string().matches(PHONE_REGEX, PHONE_INVALID).required(PHONE_REQUIRED),
  confirm: string()
    .required(CONFIRM_PASSWORD_REQUIRED)
    .oneOf([ref('password')], CONFIRM_PASSWORD_NOT_MATCH),
  gender: object().required('Giới tính không được để trống'),
  birthDay: string()
    .required(BIRTHDAY_REQUIRED)
    .test('greater', 'Giáo viên phải lớn hơn 18 tuổi', (value: any) => {
      return new Date().getFullYear() - new Date(value).getFullYear() > 17;
    }),
  isPolicy: bool().oneOf(
    [true],
    'Bạn phải đồng ý với Điều khoản dịch vụ để tham gia hệ thống.'
  ),
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
    .test('fileSize', IMAGE_SIZE_TOO_BIG, (value: any) => {
      return value && value.size <= FILE_SIZE_2;
    }),
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
  gender: object().required(GENDER_REQUIRED),
});

export const validationSchemaEditMentorProfile = object({
  introduce: string().required(INTRODUCE_REQUIRED),
  mentorSkills: array(
    object({
      skillId: object({
        id: number().required('Thiếu Id'),
      })
        .typeError(SKILL_REQUIRED)
        .required(SKILL_REQUIRED),
      yearOfExperiences: number()
        .typeError(YEAR_OF_EXPERIENCES_REQUIRED)
        .required(YEAR_OF_EXPERIENCES_REQUIRED)
        .min(1, YEAR_OF_EXPERIENCES_MINIMUM),
    })
  )
    .test('Unique', SKILL_UNIQUE, (value) => {
      try {
        if (value) {
          const skillList = value.map((item) => item.skillId.id);
          return new Set(skillList).size === value?.length;
        }
        return false;
      } catch (error) {
        return false;
      }
    })
    .required()
    .min(1, MENTOR_SKILLS_REQUIRED_ONE),
  workingExperience: string().required(WORKING_EXPERIENCE_REQUIRED),
});
export const validationSchemaUpdateMentorProfileRequest = object({
  mentorSkills: array(
    object({
      skillId: object({
        id: number().required('Thiếu Id'),
      })
        .typeError(SKILL_REQUIRED)
        .required(SKILL_REQUIRED),
      yearOfExperiences: number()
        .typeError(YEAR_OF_EXPERIENCES_REQUIRED)
        .required(YEAR_OF_EXPERIENCES_REQUIRED)
        .min(1, YEAR_OF_EXPERIENCES_MINIMUM),
    })
  )
    .test('Unique', SKILL_UNIQUE, (value) => {
      try {
        if (value) {
          const skillList = value.map((item) => item.skillId.id);
          return new Set(skillList).size === value?.length;
        }
        return false;
      } catch (error) {
        return false;
      }
    })
    .required()
    .min(1, MENTOR_SKILLS_REQUIRED_ONE),
});

export const validationSchemaUpdateMentorProfileRequest2 = object({
  // avatar: mixed()
  //   .required(generateRequiredText('Hình ảnh đại diện'))
  //   .test(
  //     'fileSize',
  //     IMAGE_SIZE_TOO_BIG,
  //     (value: any) => value && value.size <= FILE_SIZE_2
  //   )
  //   .test(
  //     'fileFormat',
  //     IMAGE_FORMAT_NOT_SUPPORT,
  //     (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
  //   ),
  // //
  fullName: string().required(NAME_REQUIRED),
  // birthday: date()
  //   .nullable()
  //   .transform((curr, orig) => (orig === '' ? null : curr))
  //   .required(BIRTHDAY_REQUIRED),
  // address: string().required(ADDRESS_REQUIRED),
  // phone: string().required(PHONE_REQUIRED),
  // gender: object().required(GENDER_REQUIRED),
  // //
  // identityFront: mixed()
  //   .required(generateRequiredText('Căn cước công dân (mặt trước)'))
  //   .test(
  //     'fileSize',
  //     IMAGE_SIZE_TOO_BIG,
  //     (value: any) => value && value.size <= FILE_SIZE_2
  //   )
  //   .test(
  //     'fileFormat',
  //     IMAGE_FORMAT_NOT_SUPPORT,
  //     (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
  //   ),
  // identityBack: mixed()
  //   .required(generateRequiredText('Căn cước công dân (mặt sau)'))
  //   .test(
  //     'fileSize',
  //     IMAGE_SIZE_TOO_BIG,
  //     (value: any) => value && value.size <= FILE_SIZE_2
  //   )
  //   .test(
  //     'fileFormat',
  //     IMAGE_FORMAT_NOT_SUPPORT,
  //     (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
  //   ),
  // //
  // introduce: string().required(INTRODUCE_REQUIRED),
  // workingExperience: string().required(WORKING_EXPERIENCE_REQUIRED),
  // mentorSkills: array(
  //   object({
  //     skillId: object({
  //       id: number().required('Thiếu Id'),
  //     })
  //       .typeError(SKILL_REQUIRED)
  //       .required(SKILL_REQUIRED),
  //     yearOfExperiences: number()
  //       .typeError(YEAR_OF_EXPERIENCES_REQUIRED)
  //       .required(YEAR_OF_EXPERIENCES_REQUIRED)
  //       .min(1, YEAR_OF_EXPERIENCES_MINIMUM),
  //   })
  // )
  //   .test('Unique', SKILL_UNIQUE, (value) => {
  //     try {
  //       if (value) {
  //         const skillList = value.map((item) => item.skillId.id);
  //         return new Set(skillList).size === value?.length;
  //       }
  //       return false;
  //     } catch (error) {
  //       return false;
  //     }
  //   })
  //   .required()
  //   .min(1, MENTOR_SKILLS_REQUIRED_ONE),
});
export const validationSchemaEditCertificateProfile = object({
  userImages: array(
    mixed().test(
      'FILE_PRE',
      CERTIFICATE_MAX_SIZE,
      (value: any) =>
        !value ||
        (value && value?.size <= FILE_DEGREE_SIZE_BYTES) ||
        (value && value?.type === 'DEGREE')
    )
    // .test(
    //   'FILE_FORMAT',
    //   CERTIFICATE_FORMAT_INCORRECT,
    //   (value: any) =>
    //     !value ||
    //     (value && SUPPORTED_FILE_DEGREE_FORMAT.includes(value?.type)) ||
    //     (value && value?.type === 'DEGREE')
    // )
  )
    .required()
    .min(1, CERTIFICATE_REQUIRED),
});
export const validationSchemaUpdateDegreeRequest = object({
  userImages: array(
    mixed().test(
      'FILE_PRE',
      CERTIFICATE_MAX_SIZE,
      (value: any) =>
        !value ||
        (value && value?.size <= FILE_DEGREE_SIZE_BYTES) ||
        (value && value?.type === 'DEGREE')
    )
    // .test(
    //   'FILE_FORMAT',
    //   CERTIFICATE_FORMAT_INCORRECT,
    //   (value: any) =>
    //     !value ||
    //     (value && SUPPORTED_FILE_DEGREE_FORMAT.includes(value?.type)) ||
    //     (value && value?.type === 'DEGREE')
    // )
  )
    .required(CERTIFICATE_REQUIRED)
    .min(1, CERTIFICATE_REQUIRED),
});

export const validationSchemaEditAccountProfile = object({
  oldPassword: string()
    .required(PASSWORD_REQUIRED)
    .matches(PASSWORD_REGEX, PASSWORD_MATCHED),
  newPassword: string()
    .required(PASSWORD_REQUIRED)
    .matches(PASSWORD_REGEX, PASSWORD_MATCHED)
    .notOneOf([ref('oldPassword')], CONFIRM_PASSWORD_NOT_MATCH_PASSWORD),
  newPasswordConfirm: string()
    .required(CONFIRM_PASSWORD_REQUIRED)
    .oneOf([ref('newPassword')], CONFIRM_PASSWORD_NOT_MATCH),
});

export const validationSchemaEditSocialProfile = object({
  website: string(),
  linkedinLink: string(),
  facebookLink: string(),
});
export const validationSchemaTimeTable = object({
  slot: object()
    .typeError('Ngày của tuần không hợp lệ')
    .required('Hãy nhập khung giờ học của bạn'),
  dayOfWeek: object()
    .typeError('Giờ học không phù hợp')
    .required('Hãy nhập thứ của bạn'),
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
  subjectId: object()
    .typeError('Ngôn ngữ không hợp lệ')
    .required(COURSE_LANGUAGE_REQUIRED),
  categoryId: object()
    .typeError('Lĩnh vực không hợp lệ')
    .required(COURSE_CATEGORY_REQUIRED),
  description: string().required(COURSE_DESCRIPTION),
  level: string().required(COURSE_LEVEL_REQUIRED),
});
export const validationSchemaCreateSubCourse = object({
  numberOfSlot: number()
    .required('Số lượng học sinh không được để trống')
    .typeError('Số lượng học sinh không được để trống')
    .min(1, 'Số buổi học tối thiểu phải lớn hơn 30'),
  price: number().required('Giá tiền là bắt buộc'),
  link: string()
    .matches(URL, 'Đường dẫn không hợp lệ.')
    .required('Đường dẫn không được để trống.'),
  minStudent: number()
    .typeError('Số học sinh tối thiểu không được bỏ trống')
    .required('Số học sinh tối thiểu không được bỏ trống')
    .min(1, 'Học sinh tối thiểu phải lớn hơn 0'),
  maxStudent: number()
    .typeError('Số học sinh tối đa không được bỏ trống')
    .required('Số học sinh tối đa không được bỏ trống')
    .min(1, 'Học sinh tối đa phải lớn hơn 0')
    .test(
      'is-greater',
      'Số học sinh tối đa phải lớn hơn số học sinh tối thiểu',
      function (value) {
        const { minStudent } = this.parent;
        return value >= minStudent;
      }
    ),
  startDateExpected: date()
    .typeError('Ngày phải hợp lệ (DD/MM/YYYY)')
    .required('Ngày không được để trống'),
  timeInWeekRequests: array()
    .min(1, 'Thời khóa biểu phải có ít nhất một giá trị')
    .required('Thời khóa biểu là bắt buộc.'),
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

export const validationSchemaUpdateWaitingCourse = object({
  subjectId: object()
    .typeError('Ngôn ngữ không hợp lệ')
    .required(COURSE_LANGUAGE_REQUIRED),
  categoryId: object()
    .typeError('Lĩnh vực không hợp lệ')
    .required(COURSE_CATEGORY_REQUIRED),
  subCourseTitle: string().required('Tên khóa học phụ là bắt buộc'),
  numberOfSlot: number()
    .required('Số lượng học sinh không được để trống')
    .typeError('Số lượng học sinh không được để trống')
    .min(30, 'Số buổi học tối thiểu phải lớn hơn 30'),
  price: number().required('Giá tiền là bắt buộc'),
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
  timeInWeekRequests: array()
    .min(1, 'Thời khóa biểu phải có ít nhất một giá trị')
    .required('Thời khóa biểu là bắt buộc.'),
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
export const validationSchemaUpdateWaitingCoursePrivate = object({
  courseCode: string().required('Mã khóa học là bắt buộc'),
  courseName: string().required('Tên khóa học là bắt buộc'),
  courseDescription: string().required('Giới thiệu khóa học là bắt buộc'),
  subjectId: object()
    .typeError('Ngôn ngữ không hợp lệ')
    .required(COURSE_LANGUAGE_REQUIRED),
  categoryId: object()
    .typeError('Lĩnh vực không hợp lệ')
    .required(COURSE_CATEGORY_REQUIRED),
  subCourseTitle: string().required('Tên khóa học phụ là bắt buộc'),
  numberOfSlot: number()
    .required('Số lượng học sinh không được để trống')
    .typeError('Số lượng học sinh không được để trống')
    .min(30, 'Số buổi học tối thiểu phải lớn hơn 30'),
  level: string().required(COURSE_LEVEL_REQUIRED),
  price: number().required('Giá tiền là bắt buộc'),
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
  amount: number().required(WITHDRAW_AMOUNT_REQUIRED),
  bankLinking: object(),
  bankAccount: number().required(WITHDRAW_BANK_ACCOUNT_REQUIRED),
  bankAccountOwner: string().required(WITHDRAW_BANK_ACCOUNT_OWNER_REQUIRED),
});

export const validationSchemaProcessRegisterRequest = object({
  message: string().required(MESSAGE_PROCESS_APPROVE_REGISTER_REQUEST_REQUIRED),
});
export const validationSchemaProcessUpdateMentorProfileRequest = object();
export const validationSchemaApproveCreateCourseRequest = object({
  message: string().required(MESSAGE_PROCESS_CREATE_COURSE_REQUEST_REQUIRED),
});

export const validationSchemaCreateAssignment = object({
  name: string().required(CRATE_ASSIGNMENT_NAME),
  // activityTypeId: number().required(),
  // isVisible: bool().required(),
  // classSectionId: number().required(),
  description: string().required(CRATE_ASSIGNMENT_DESCRIPTION),
  startDate: string().required(CRATE_ASSIGNMENT_START_DATE),
  endDate: string().required(CRATE_ASSIGNMENT_END_DATE),
  // editBeForSubmitMin: number().required(),
  maxFileSubmit: number().required(CRATE_ASSIGNMENT_MAX_FILE_SUBMIT),
  maxFileSize: number().required(CRATE_ASSIGNMENT_MAX_FILE_SIZE),
  // attachFiles: string().required(),
});

export const validationSchemaUpdateAssignment = object({
  name: string().required(CRATE_ASSIGNMENT_NAME),
  // activityTypeId: number().required(),
  // isVisible: bool().required(),
  // classSectionId: number().required(),
  description: string().required(CRATE_ASSIGNMENT_DESCRIPTION),
  startDate: string().required(CRATE_ASSIGNMENT_START_DATE),
  endDate: string().required(CRATE_ASSIGNMENT_END_DATE),
  // editBeForSubmitMin: number().required(),
  maxFileSubmit: number().required(CRATE_ASSIGNMENT_MAX_FILE_SUBMIT),
  maxFileSize: number().required(CRATE_ASSIGNMENT_MAX_FILE_SIZE),
  // attachFiles: string().required(),
});

export const validationSchemaCreateAnnouncement = object({
  content: string().required(CRATE_ANNOUNCEMENT_CONTENT),
  title: string().required(CRATE_ANNOUNCEMENT_TITLE),
});
export const validationSchemaUpdateAnnouncement = object({
  content: string().required(UPDATE_ANNOUNCEMENT_TITLE),
  title: string().required(UPDATE_ANNOUNCEMENT_CONTENT),
});

export const validationSchemaCreateClassSections = object({
  name: string().required(CREATE_CLASS_SECTIONS_REQUIRED),
});
export const validationSchemaUpdateClassSections = object({
  name: string().required(UPDATE_CLASS_SECTIONS_REQUIRED),
});

export const validationSchemaManagedWithdrawUpload = object({
  file: mixed()
    .required(generateRequiredText(WITHDRAW_MANAGED_UPLOAD_FILE_REQUIRED))
    .test(
      'fileFormat',
      WITHDRAW_MANAGED_UPLOAD_FILE_FORMAT_NOT_SUPPORT,
      (value: any) => value && SUPPORTED_FILE_XLSX_FORMAT.includes(value.type)
    ),
});

export const validationSchemaConfigReferralCode = object({
  usageLimit: number()
    .typeError(ConfigReferralCode.usageLimitMin)
    .required(ConfigReferralCode.discountPercentRequired)
    .min(1, ConfigReferralCode.usageLimitMin),
  discountPercent: number()
    .typeError(ConfigReferralCode.discountPercentMin)
    .required(ConfigReferralCode.discountPercentRequired)
    .min(1, ConfigReferralCode.discountPercentMin)
    .max(100, ConfigReferralCode.discountPercentMax),
  expiredLaterDay: number()
    .typeError(ConfigReferralCode.expiredLaterDateMin)
    .required(ConfigReferralCode.expiredLaterDateRequired)
    .min(1, ConfigReferralCode.expiredLaterDateMin),
});
