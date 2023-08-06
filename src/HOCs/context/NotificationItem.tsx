import { Stack, Avatar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MetricSize, FontFamily, FontSize, Color } from '~/assets/variables';
import { image } from '~/constants/image';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { useBoolean } from '~/hooks/useBoolean';
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
  id: number;
  isRead: boolean;
}

export default function NotificationItem({
  message,
  entity,
  id,
  title,
  time,
  isRead = false,
}: NotificationItemPayload) {
  const profile = useSelector(selectProfile);
  const role = profile.roles[0].code;
  const handleNavigateLink = () => {
    switch (entity) {
      case 'COURSE':
        window.location.href = `${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${id}`;
        break;
      case 'CLASS':
        window.location.href = `${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_detail}/${id}`;
        break;
      case 'MENTOR_PROFILE':
        window.location.href = `${NavigationLink.mentor_profile}/edit-profile`;
        break;
      case 'TRANSACTION':
        window.location.href = `${NavigationLink.mentor_profile}/wallet-management`;
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
        marginTop: 1,
        overflow: 'hidden',
        border: '1px solid #ddd',
        borderRadius: MetricSize.small_5,
        padding: 1,
        flexDirection: 'row',
        alignItems: 'center',
        ':hover': {
          background: '#ddd',
          cursor: 'pointer',
        },
      }}
    >
      <Stack
        sx={{
          marginLeft: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: FontFamily.bold,
            fontSize: FontSize.small_14,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            height: '46px',
            overflow: 'hidden',
            ...globalStyles.textTwoLineEllipsis,
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_14,
          }}
        >
          {message}
        </Typography>
        <Typography noWrap sx={globalStyles.textLowSmallLight}>
          {formatISODateDateToDisplayDateTime(time)}
        </Typography>
      </Stack>
    </Stack>
  );
}
