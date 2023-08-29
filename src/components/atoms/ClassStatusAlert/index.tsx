import { Stack, Alert, Box, Button, SxProps, Theme } from '@mui/material';
import { ClassStatusKeys } from '~/models/variables';
import globalStyles from '~/styles';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';

type Props = {
  startDate: string;
} & (
  | {
      status: 'NOTSTART';
      onGetClassSchedule: () => void;
    }
  | {
      status: Exclude<ClassStatusKeys, 'NOTSTART'>;
    }
);

export default function ClassStatusAlert(props: Props) {
  const { status, startDate } = props;
  const wrapperSx: SxProps<Theme> = {
    ...globalStyles.viewRoundedWhiteBody,
    display: status !== 'STARTING' && status !== 'ALL' ? 'flex' : 'none',
  };

  const isTodayGreaterThanStartDate: boolean =
    new Date(startDate).getTime() <= new Date().getTime();

  switch (status) {
    case 'REQUESTING':
      return (
        <Stack sx={wrapperSx}>
          <Alert severity="warning">
            Lớp học chưa được phê duyệt. Vui lòng phê duyệt lớp để thao tác với
            lớp học.
          </Alert>
        </Stack>
      );
    case 'EDITREQUEST':
      return (
        <Stack sx={wrapperSx}>
          <Alert severity="info">
            Lớp học đang bị yêu cầu chỉnh sửa. Vui lòng sang phần khóa học để
            chỉnh sửa.
          </Alert>
        </Stack>
      );
    case 'WAITING':
      return (
        <Stack sx={wrapperSx}>
          <Alert severity="info">
            Lớp học đang được đội ngũ quản lí phê duyệt.
          </Alert>
        </Stack>
      );
    case 'NOTSTART': {
      switch (isTodayGreaterThanStartDate) {
        case false:
          return (
            <Stack sx={wrapperSx}>
              <Alert severity="info">
                {`Lớp học đang chiêu sinh và sẽ mở vào ${formatISODateDateToDisplayDateTime(
                  startDate
                )}`}
              </Alert>
            </Stack>
          );

        default:
          return null;
      }
    }
    case 'CANCEL':
      return (
        <Stack sx={wrapperSx}>
          <Alert severity="info">
            Lớp học đã kết thúc. Mọi thao tác sẽ bị hủy bỏ
          </Alert>
        </Stack>
      );
    default:
      return null;
  }
}
