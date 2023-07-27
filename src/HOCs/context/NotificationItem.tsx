import { Stack, Avatar, Typography } from '@mui/material';
import { MetricSize, FontFamily, FontSize } from '~/assets/variables';
import { image } from '~/constants/image';
import { useBoolean } from '~/hooks/useBoolean';
import globalStyles from '~/styles';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';

export interface NotificationItemPayload {
  avatarUrl: string;
  message: string;
  time: string;
}

export default function NotificationItem({
  avatarUrl,
  message,
  time,
}: NotificationItemPayload) {
  const { value, setTrue } = useBoolean(false);
  return (
    <Stack
      sx={{
        marginTop: 1,
        overflow: 'hidden',
        border: '1px solid #ddd',
        borderRadius: MetricSize.small_5,
        padding: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Avatar
        alt="avatar"
        src={!value ? avatarUrl : image.student}
        onError={setTrue}
      />
      <Stack
        sx={{
          marginLeft: 2,
        }}
      >
        <Typography
          sx={{
            height: '46px',
            overflow: 'hidden',
            ...globalStyles.textTwoLineEllipsis,
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_16,
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
