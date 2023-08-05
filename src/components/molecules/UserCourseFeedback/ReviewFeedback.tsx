import { Avatar, Rating, Stack, Typography } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';
import { TDateISO } from '~/models/date';
import globalStyles from '~/styles';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';

interface Props {
  email: string;
  rating: number;
  date: string;
  review: string;
}

export default function ReviewFeedback({ date, email, rating, review }: Props) {
  return (
    <Stack
      sx={{
        marginTop: 1,
        flexDirection: 'row',
        paddingX: 3,
        paddingY: 2,
        borderRadius: MetricSize.small_5,
        border: '0.5px solid #ddd',
        background: Color.white,
      }}
    >
      <Avatar />
      <Stack paddingX={1}>
        <Typography>{email}</Typography>
        <Rating value={rating} readOnly size="small" />
        <Typography sx={globalStyles.textLowSmallLight}>
          {formatISODateDateToDisplayDateTime(date)}
        </Typography>
        <Typography>{review}</Typography>
      </Stack>
    </Stack>
  );
}
