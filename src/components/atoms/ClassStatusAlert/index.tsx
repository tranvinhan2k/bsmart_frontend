import {
  Stack,
  Alert,
  Box,
  Button,
  FormHelperText,
  SxProps,
  Theme,
} from '@mui/material';
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
  console.log('date greater', isTodayGreaterThanStartDate);

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
      const { onGetClassSchedule } = props;

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
          return (
            <Stack sx={wrapperSx}>
              <Alert severity="warning">
                Lớp học đã tới thời gian bắt đầu. Tuy nhiên, số lượng học sinh
                chưa đủ để tự động mở lớp. Vui lòng tùy chọn thao tác với lớp
                học nếu không lớp học sẽ tự động hủy trong 48h tiếp theo.
              </Alert>
              <Box marginTop={1}>
                <Stack sx={globalStyles.viewFlexRowCenter}>
                  <Button
                    onClick={onGetClassSchedule}
                    variant="contained"
                    color="success"
                  >
                    Mở lớp
                  </Button>
                </Stack>
              </Box>
            </Stack>
          );
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
      break;
  }
}
