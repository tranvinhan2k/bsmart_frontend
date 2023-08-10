import { Stack, Typography } from '@mui/material';
import Icon, { IconName } from '~/components/atoms/Icon';
import { MentorProfileStatusType } from '~/constants/profile';
import { ColorKeys } from '~/models/variables';
import { SX_DISPLAY_FIELD_TEXT } from './style';

interface MentorProfileStatusProfileSideBarProps {
  status: MentorProfileStatusType | undefined;
}

export default function MentorProfileStatusProfileSideBar({
  status,
}: MentorProfileStatusProfileSideBarProps) {
  let iconName: IconName;
  let iconColor: ColorKeys;
  let label: string;

  switch (status) {
    case MentorProfileStatusType.REQUESTING:
      iconName = 'driveFileRenameOutlineIcon';
      iconColor = 'orange';
      label = 'Hồ sơ giảng dạy đang hoàn thiện';
      break;
    case MentorProfileStatusType.WAITING:
      iconName = 'sendIcon';
      iconColor = 'orange';
      label = 'Hồ sơ giảng dạy đang chờ duyệt';
      break;
    case MentorProfileStatusType.EDITREQUEST:
      iconName = 'undoIcon';
      iconColor = 'orange';
      label = 'Hồ sơ giảng dạy bị yêu cầu chỉnh sửa';
      break;
    case MentorProfileStatusType.REJECTED:
      iconName = 'cancelIcon';
      iconColor = 'red';
      label = 'Hồ sơ giảng dạy bị từ chối';
      break;
    case MentorProfileStatusType.STARTING:
      iconName = 'check';
      iconColor = 'tertiary';
      label = 'Hồ sơ giảng dạy đã duyệt';
      break;
    default:
      iconName = 'cancelIcon';
      iconColor = 'red';
      label = 'Đã xảy ra lỗi';
      break;
  }
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
      mt={2}
    >
      <Icon name={iconName} size="small" color={iconColor} />
      <Typography textAlign="center" sx={SX_DISPLAY_FIELD_TEXT}>
        {label}
      </Typography>
    </Stack>
  );
}
