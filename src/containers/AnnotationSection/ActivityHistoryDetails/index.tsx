import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import Icon from '~/components/atoms/Icon';
import {
  ActivityHistoryActionType,
  ActivityHistoryTypeType,
} from '~/constants/activityHistory';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import {
  ANNOTATION_CONTENT_CONTENT,
  ANNOTATION_CONTENT_DATE,
  ANNOTATION_CONTENT_TITLE,
  ANNOTATION_CONTENT,
} from './style';

interface ActivityHistoryDetailsProps {
  action: string;
  activityName: string;
  activityTime: string;
  type: string;
}
export default function ActivityHistoryDetails({
  action,
  activityName,
  activityTime,
  type,
}: ActivityHistoryDetailsProps) {
  let renderItem = null;
  switch (type && action) {
    case ActivityHistoryTypeType.SUBCOURSE && ActivityHistoryActionType.CREATED:
      renderItem = (
        <>
          <ListItemAvatar>
            <Avatar>
              <Icon name="imageIcon" size="medium" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography component="p" sx={ANNOTATION_CONTENT_TITLE}>
                  Tạo khóa học
                </Typography>
                <Typography component="p" sx={ANNOTATION_CONTENT_CONTENT}>
                  Đã tạo khóa học <b>{activityName}</b>
                </Typography>
              </>
            }
            secondary={
              <Typography component="p" sx={ANNOTATION_CONTENT_DATE}>
                {formatISODateStringToDisplayDate(activityTime)}
              </Typography>
            }
          />
        </>
      );
      break;
    case ActivityHistoryTypeType.SUBCOURSE && ActivityHistoryActionType.DELETED:
      renderItem = (
        <>
          <ListItemAvatar>
            <Avatar>
              <Icon name="imageIcon" size="medium" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography component="p" sx={ANNOTATION_CONTENT_TITLE}>
                  Xóa khóa học
                </Typography>
                <Typography component="p" sx={ANNOTATION_CONTENT_CONTENT}>
                  Đã xóa khóa học <b>{activityName}</b>
                </Typography>
              </>
            }
            secondary={
              <Typography component="p" sx={ANNOTATION_CONTENT_DATE}>
                {formatISODateStringToDisplayDate(activityTime)}
              </Typography>
            }
          />
        </>
      );
      break;
    default:
      renderItem = (
        <>
          <ListItemAvatar>
            <Avatar>
              <Icon name="imageIcon" size="medium" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography component="p" sx={ANNOTATION_CONTENT_TITLE}>
                  Hành động không hợp lệ
                </Typography>
                <Typography component="p" sx={ANNOTATION_CONTENT_CONTENT}>
                  ???
                </Typography>
              </>
            }
            secondary={
              <Typography component="p" sx={ANNOTATION_CONTENT_DATE}>
                {formatISODateStringToDisplayDate(activityTime)}
              </Typography>
            }
          />
        </>
      );
      break;
  }

  return <ListItem sx={ANNOTATION_CONTENT}>{renderItem}</ListItem>;
}
