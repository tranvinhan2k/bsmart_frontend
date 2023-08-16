import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { MetricSize, FontFamily, FontSize, Color } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { NotificationType } from '~/models/variables';
import { selectProfile } from '~/redux/user/selector';
import globalStyles from '~/styles';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';
import toast from '~/utils/toast';

export interface NotificationItemPayload {
  title: string;
  message: string;
  time: string;
  entity: NotificationType;
  entityId: number;
  id: number;
  isRead: boolean;
}

export default function NotificationItem({
  message,
  entity,
  entityId,
  id,
  title,
  time,
  isRead = false,
}: NotificationItemPayload) {
  const profile = useSelector(selectProfile);
  const role = profile.roles?.[0]?.code;
  const handleNavigateLink = () => {
    switch (entity) {
      case 'COURSE':
        window.location.href = `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${entityId}`;
        break;
      case 'CLASS':
        window.location.href = `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_detail}/${entityId}`;
        break;
      case 'MENTOR_PROFILE':
        window.location.href = `/${NavigationLink.mentor_profile}/edit-profile`;
        break;
      case 'TRANSACTION':
        window.location.href = `/${NavigationLink.mentor_profile}/wallet-management`;
        break;
      case 'ACCOUNT':
        window.location.href =
          role === 'TEACHER'
            ? `/${NavigationLink.mentor_profile}`
            : `/${NavigationLink.member_details}`;
        break;
      default:
        toast.notifyErrorToast('Không tìm thấy loại thông báo này.');
        break;
    }
  };

  return (
    <Stack
      onClick={handleNavigateLink}
      sx={{
        background: isRead ? '#eee' : '#fff',
        margin: 1,
        overflow: 'hidden',
        border: '1px solid #ddd',
        borderRadius: MetricSize.small_5,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        height: '100px',
        ':hover': {
          background: '#ddd',
          cursor: 'pointer',
        },
      }}
    >
      <Stack>
        <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="feedback" size="small" color="tertiary" />
          <Typography
            noWrap
            sx={{
              marginLeft: 1,
              color: Color.tertiary,
              fontFamily: FontFamily.bold,
              fontSize: FontSize.small_14,
            }}
          >
            {title}
          </Typography>
        </Stack>
        <Typography
          sx={{
            height: '40px',
            overflow: 'hidden',
            ...globalStyles.textTwoLineEllipsis,
            fontFamily: FontFamily.light,
            fontSize: FontSize.small_14,
          }}
        >
          {message}
        </Typography>
        <Typography noWrap sx={globalStyles.textLowSmallLight}>
          {`${time ? formatISODateDateToDisplayDateTime(time) : ''}`}
        </Typography>
      </Stack>
    </Stack>
  );
}
