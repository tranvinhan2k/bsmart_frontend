import { Box, Divider, Typography } from '@mui/material';
import {
  ActivityHistoryActionType,
  ActivityHistoryTypeType,
} from '~/constants/activityHistory';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import { SX_PROFILE_DETAILS, SX_PROFILE_DETAILS_HIGHLIGHTED } from './style';

interface ActivityHistoryProps {
  type: string;
  action: string;
  activityTime: string;
  activityName: string;
}

export default function ActivityHistory({
  type,
  action,
  activityTime,
  activityName,
}: ActivityHistoryProps) {
  let renderItem = null;
  switch (type && action) {
    case ActivityHistoryTypeType.SUBCOURSE && ActivityHistoryActionType.CREATED:
      renderItem = (
        <Typography component="p" sx={SX_PROFILE_DETAILS}>
          Đã tạo khóa học <b>{activityName}</b>
        </Typography>
      );
      break;
    case ActivityHistoryTypeType.SUBCOURSE && ActivityHistoryActionType.DELETED:
      renderItem = (
        <Typography component="p" sx={SX_PROFILE_DETAILS}>
          Đã xóa khóa học <b>{activityName}</b>
        </Typography>
      );
      break;
    default:
      renderItem = <h1>Hành động không hợp lệ</h1>;
      break;
  }

  return (
    <Box mt={2}>
      {renderItem}
      <Typography component="p" sx={SX_PROFILE_DETAILS_HIGHLIGHTED}>
        {formatISODateStringToDisplayDate(activityTime)}
      </Typography>
      <Box mt={2}>
        <Divider />
      </Box>
    </Box>
  );
}
