export const enum ProfileImgType {
  AVATAR = 'AVATAR',
  FRONTCI = 'FRONTCI',
  BACKCI = 'BACKCI',
  DEGREE = 'DEGREE',
}
export const enum FeedbackQuestionType {
  MULTIPLE_CHOICE = 'Câu hỏi nhiều lựa chọn',
  FILL_THE_ANSWER = 'Câu hỏi tự nhập',
}
export const enum MentorProfileStatusType {
  REQUESTING = 'REQUESTING',
  WAITING = 'WAITING',
  EDITREQUEST = 'EDITREQUEST',
  REJECTED = 'REJECTED',
  STARTING = 'STARTING',
}
export const enum MentorProfileStatusLabel {
  REQUESTING = 'Chưa gửi yêu cầu phê duyệt',
  WAITING = 'Đang gửi yêu cầu phê duyệt',
  EDITREQUEST = 'Được yêu cầu chỉnh sửa',
  REJECTED = 'Yêu cầu bị từ chối',
  STARTING = 'Đã phê duyệt',
}
export const enum MentorProfileUpdateStatusType {
  CREATING = 'CREATING',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
export const enum MentorProfileUpdateStatusLabel {
  CREATING = 'Chưa gửi',
  PENDING = 'Chờ duyệt',
  REJECTED = 'Yêu cầu bị từ chối',
  APPROVED = 'Đã phê duyệt',
}
