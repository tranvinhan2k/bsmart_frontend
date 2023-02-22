export interface LoginFormDataPayload {
  email: string;
  password: string;
}
export interface RegisterStudentDataPayload {
  name: string;
  email: string;
  password: string;
  confirm: string;
}
export interface RegisterMentorDataPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
  introduction: string;
}

export interface BuyCourseDataPayload {
  name: string;
  phone: string;
  email: string;
  voucher: string;
  paymentMethod: string;
}
