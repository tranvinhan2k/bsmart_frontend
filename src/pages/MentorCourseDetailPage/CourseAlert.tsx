import { Alert, Button } from '@mui/material';
import { FontSize, FontFamily } from '~/assets/variables';
import { CourseStatusKeys } from '~/models/variables';

interface Props {
  status: CourseStatusKeys;
}

export default function CourseAlert({ status }: Props) {
  switch (status) {
    case 'EDITREQUEST':
      return (
        <Alert sx={{ marginY: 1 }} severity="warning">
          Hệ thống yêu cầu chỉnh sửa một số nội dung trước khi phê duyệt lại.
          Vui lòng xem mục{' '}
          <span
            style={{
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.bold,
            }}
          >
            Yêu cầu chỉnh sửa
          </span>{' '}
          để biết thêm chi tiết.
        </Alert>
      );
    case 'REJECTED':
      return (
        <Alert sx={{ marginY: 1 }} severity="error">
          Khóa học đã bị từ chối. Nội dung sẽ bị khóa vĩnh viễn
        </Alert>
      );
    case 'NOTSTART':
      return (
        <Alert sx={{ marginY: 1 }} severity="success">
          Khóa học đã được phê duyệt thành công
        </Alert>
      );
    case 'WAITING':
      return (
        <Alert sx={{ marginY: 1 }} severity="info">
          Khóa học đang được phê duyệt. Quản lí sẽ phê duyệt khóa học trong 48h
          tới.
        </Alert>
      );
    default:
      return null;
      break;
  }
}
