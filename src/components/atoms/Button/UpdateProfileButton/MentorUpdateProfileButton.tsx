import { Button as MuiButton, Tooltip } from '@mui/material';
import { FontFamily } from '~/assets/variables';
import { MentorProfileStatusType } from '~/constants/profile';

interface MentorUpdateProfileButtonProps {
  status: MentorProfileStatusType | undefined;
  isFormDisabled: boolean;
}

export default function MentorUpdateProfileButton({
  status,
  isFormDisabled,
}: MentorUpdateProfileButtonProps) {
  let labelButton: string;
  let isDisabled: boolean;

  switch (status) {
    case MentorProfileStatusType.REQUESTING:
      labelButton = 'Cập nhật';
      isDisabled = false;
      break;
    case MentorProfileStatusType.WAITING:
      labelButton = 'Đang chờ duyệt';
      isDisabled = true;
      break;
    case MentorProfileStatusType.EDITREQUEST:
      labelButton = 'Cập nhật';
      isDisabled = false;
      break;
    case MentorProfileStatusType.REJECTED:
      labelButton = 'Trạng thái không cho phép';
      isDisabled = true;
      break;
    case MentorProfileStatusType.STARTING:
      labelButton = 'Đã phê duyệt';
      isDisabled = true;
      break;
    default:
      labelButton = 'Đã xảy ra lỗi';
      isDisabled = true;
      break;
  }
  return (
    <MuiButton
      color="miSmartOrange"
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      disabled={isDisabled || isFormDisabled}
      sx={{ fontFamily: FontFamily.bold }}
    >
      {labelButton}
    </MuiButton>
  );
}
