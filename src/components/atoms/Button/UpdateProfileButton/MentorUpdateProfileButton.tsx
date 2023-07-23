import { Button as MuiButton, Tooltip } from '@mui/material';
import { FontFamily } from '~/assets/variables';
import { MentorProfileStatusType } from '~/constants/profile';

interface MentorUpdateProfileButtonProps {
  status: MentorProfileStatusType | undefined;
}

export default function MentorUpdateProfileButton({
  status,
}: MentorUpdateProfileButtonProps) {
  let labelButton: string;
  let labelTooltip: string;
  let isDisabled: boolean;

  switch (status) {
    case MentorProfileStatusType.REQUESTING:
      labelButton = 'Cập nhật';
      labelTooltip = 'Gửi hô sơ giảng dạy cho quản trị viên phê duyệt';
      isDisabled = false;
      break;
    case MentorProfileStatusType.WAITING:
      labelButton = 'Không thể cập nhật';
      labelTooltip = 'Đã gửi hồ sơ giảng dạy cho quản trị viên phê duyệt';
      isDisabled = true;
      break;
    case MentorProfileStatusType.EDITREQUEST:
      labelButton = 'Cập nhật';
      labelTooltip = 'Gửi hô sơ giảng dạy cho quản trị viên phê duyệt';
      isDisabled = false;
      break;
    case MentorProfileStatusType.REJECTED:
      labelButton = 'Trạng thái không cho phép';
      labelTooltip = 'Hồ sơ giảng dạy đã bị từ chối ';
      isDisabled = true;
      break;
    case MentorProfileStatusType.STARTING:
      labelButton = 'Đã phê duyệt';
      labelTooltip = 'Không thể chỉnh sửa vì hồ sơ giảng dạy đã được phê duyệt';
      isDisabled = true;
      break;
    default:
      labelButton = 'Đã xảy ra lỗi';
      labelTooltip = 'hãy liên hệ với bộ phận chăm sóc khách hàng';
      isDisabled = true;
      break;
  }
  return (
    <Tooltip title={labelTooltip} arrow>
      <span>
        <MuiButton
          color="miSmartOrange"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={isDisabled}
          sx={{ fontFamily: FontFamily.bold }}
        >
          {labelButton}
        </MuiButton>
      </span>
    </Tooltip>
  );
}
