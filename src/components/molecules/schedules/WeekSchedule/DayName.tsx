import { Stack, Typography } from '@mui/material';
import globalStyles from '~/styles';

interface Props {
  dayOfWeek: string;
  day: number;
}

export default function DayName({ day, dayOfWeek }: Props) {
  return (
    <Stack
      sx={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={globalStyles.textLowSmallLight}
      >{`${dayOfWeek}`}</Typography>
      <Typography sx={globalStyles.textSmallLabel}>{`${day}`}</Typography>
    </Stack>
  );
}
