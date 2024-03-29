// account validate
export const USERNAME_REQUIRED = 'Tên đăng nhập không được để trống.';
export const PASSWORD_REQUIRED = 'Mật khẩu không được để trống.';
export const PASSWORD_MATCHED =
  'Mật khẩu phải từ 8 chữ cái trở lên, có ít nhất 1 chữ cái viết hoa, 1 chữ cái thường, 1 số và 1 kí tự đặt biệt.';
export const CONFIRM_PASSWORD_REQUIRED =
  'Xác nhận mật khẩu không được để trống.';
export const CONFIRM_PASSWORD_NOT_MATCH_PASSWORD =
  'Xác nhận mật khẩu mới không được trùng mật cũ';
export const CONFIRM_PASSWORD_NOT_MATCH =
  'Xác nhận mật khẩu mới không giống nhau';
export const MESSAGE_PROCESS_APPROVE_REGISTER_REQUEST_REQUIRED =
  'Hãy nhập tin nhắn tới người dùng';
export const MESSAGE_PROCESS_UPDATE_MENTOR_PROFILE_REQUEST_REQUIRED =
  'Hãy nhập tin nhắn tới giảng viên';
export const CRATE_ASSIGNMENT_NAME = 'Hãy nhập tên assignment';
export const CRATE_ASSIGNMENT_DESCRIPTION = 'Hãy nhập mô tả assignment';
export const CRATE_ASSIGNMENT_START_DATE = 'Hãy nhập ngày bắt đầu assignment';
export const CRATE_ASSIGNMENT_END_DATE = 'Hãy nhập kết thúc assignment';
export const CRATE_ASSIGNMENT_MAX_FILE_SUBMIT =
  'Hãy nhập số lượng file tối đa được nộp';
export const CRATE_ASSIGNMENT_MAX_FILE_SIZE =
  'Hãy nhập kích thước file tối đa được nộp';

export const CRATE_ANNOUNCEMENT_TITLE = 'Hãy nhập tên cho thông báo';
export const CRATE_ANNOUNCEMENT_CONTENT = 'Hãy nhập mô tả cho thông báo';
export const UPDATE_ANNOUNCEMENT_TITLE = CRATE_ANNOUNCEMENT_TITLE;
export const UPDATE_ANNOUNCEMENT_CONTENT = CRATE_ANNOUNCEMENT_CONTENT;

// class validate
export const CREATE_CLASS_SECTIONS_REQUIRED = 'Hãy nhập tên hoạt động mới';
export const UPDATE_CLASS_SECTIONS_REQUIRED = 'Hãy nhập tên hoạt động mới';

// information validate
export const NAME_REQUIRED = 'Họ và tên không được để trống.';
export const BIRTHDAY_REQUIRED = 'Ngày sinh không được để trống.';
export const ADDRESS_REQUIRED = 'Địa chỉ không được để trống.';
export const PHONE_REQUIRED = 'Số điện thoại không được để trống.';
export const GENDER_REQUIRED = 'Giới tính không được để trống.';

export const INTRODUCE_REQUIRED = 'Giới thiệu không được để trống';
export const WORKING_EXPERIENCE_REQUIRED = 'Kinh nghiệm không được để trống';
export const MENTOR_SKILLS_REQUIRED_ONE = 'Tối thiểu một chuyên môn';
export const SKILL_REQUIRED = 'Kĩ năng không được để trống';
export const SKILL_UNIQUE = 'Có kĩ năng trùng lặp. Hãy chọn lại';
export const YEAR_OF_EXPERIENCES_REQUIRED = 'Số năm không được để trống';
export const YEAR_OF_EXPERIENCES_MINIMUM = 'Số năm lớn hơn 0';

export const EMAIL_INVALID = 'Email không hợp lệ.';
export const EMAIL_REQUIRED = 'Email không được để trống.';
export const CERTIFICATE_REQUIRED = 'File không được để trống';
export const CERTIFICATE_MAX_SIZE = 'File tối đa 2MB';
export const CERTIFICATE_FORMAT_INCORRECT = 'File sai định dạng';

export const PHONE_INVALID = 'Số điện thoại không hợp lệ.';
export const MENTOR_REQUIRED = 'Giáo viên cần đánh giá không được để trống.';
export const SUBJECT_REQUIRED = 'Môn học không được để trống.';
export const IMAGE_SIZE_TOO_BIG =
  'Dung lượng ảnh quá lớn. Vui lòng chọn hình khác.';
export const IMAGE_FORMAT_NOT_SUPPORT = 'Định dạng hình ảnh không hỗ trợ.';

export const generateRequiredText = (text: string) => {
  return `${text} là bắt buộc`;
};

// course
export const COURSE_NAME_REQUIRED = 'Tên khoá học không được để trống';
export const COURSE_LEVEL_REQUIRED = 'Trình độ không được để trống';
export const COURSE_IMAGE_REQUIRED = 'Hình ảnh khoá học không được để trống';
export const COURSE_CATEGORY_REQUIRED = 'Lĩnh vực không được để trống';
export const COURSE_LANGUAGE_REQUIRED =
  'Ngôn ngữ lập trình không được để trống';
export const COURSE_TYPE = 'Hình thức học không được để trống';
export const COURSE_DESCRIPTION = 'Miêu tả khoá học không được để trống';
export const MESSAGE_PROCESS_CREATE_COURSE_REQUEST_REQUIRED =
  'Hãy nhập tin nhắn tới giảng viên';
// money
export const WITHDRAW_AMOUNT_REQUIRED = 'Số tiền không được để trống';
export const WITHDRAW_AMOUNT_POSITIVE = 'Số tiền phải là số dương';
export const WITHDRAW_BANK_LINKING_REQUIRE = 'Hãy chọn ngân hàng';
export const WITHDRAW_BANK_ACCOUNT_REQUIRED =
  'Số tài khoản không được để trống';
export const WITHDRAW_BANK_ACCOUNT_OWNER_REQUIRED =
  'Tên chủ khoản không được để trống';
export const WITHDRAW_MANAGED_UPLOAD_FILE_REQUIRED = 'Tệp không được để trống';
export const WITHDRAW_MANAGED_UPLOAD_FILE_FORMAT_NOT_SUPPORT =
  'Định dạng không hỗ trợ';

export const enum ConfigReferralCode {
  usageLimitRequired = 'Số lượt dùng giảm không được để trống',
  usageLimitMin = 'Số lượt dùng giảm phải là số lớn hơn 1',
  //
  discountPercentRequired = 'Phần trăm giảm không được để trống',
  discountPercentMin = 'Phần trăm giảm phải nằm trong khoảng 1-100%',
  discountPercentMax = 'Phần trăm giảm phải nằm trong khoảng 1-100%',
  //
  expiredLaterDateRequired = 'Thời gian hết hạn không được để trống',
  expiredLaterDateMin = 'Thời gian hết hạn không được lớn hơn 1',
}

export const TRY_CATCH_AXIOS_DEFAULT_ERROR = 'BE ko trả lỗi, Msg từ FE';
export const MSG_BE_MISSING_FIELD = 'BE trả thiếu field';
