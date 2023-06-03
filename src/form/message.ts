// account validate
export const USERNAME_REQUIRED = 'Tên đăng nhập không được để trống.';
export const PASSWORD_REQUIRED = 'Mật khẩu không được để trống.';
export const PASSWORD_MATCHED =
  'Mật khẩu phải từ 8 chữ cái trở lên, có ít nhất 1 chữ cái viết hoa, 1 chữ cái thường, 1 số và 1 kí tự đặt biệt.';
export const CONFIRM_PASSWORD_REQUIRED =
  'Xác nhận mật khẩu không được để trống.';
export const CONFIRM_PASSWORD_NOT_MATCH =
  'Xác nhận mật khẩu không giống với mật khẩu bạn đã nhập.';
export const MESSAGE_PROCESS_APPROVE_REGISTER_REQUEST_REQUIRED =
  'Hãy nhập tin nhắn tới người dùng';
// information validate
export const NAME_REQUIRED = 'Họ và tên không được để trống.';
export const BIRTHDAY_REQUIRED = 'Ngày sinh không được để trống.';
export const ADDRESS_REQUIRED = 'Địa chỉ không được để trống.';
export const PHONE_REQUIRED = 'Số điện thoại không được để trống.';
export const INTRODUCE_REQUIRED = 'Giới thiệu bản thân không được để trống.';

export const EMAIL_INVALID = 'Email không hợp lệ.';
export const EMAIL_REQUIRED = 'Email không được để trống.';

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
