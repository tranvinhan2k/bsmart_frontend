import { Stack, Typography } from '@mui/material';
import { FontFamily } from '~/assets/variables';

interface Props {
  name: string;
  time: string;
}

export default function SLotName({ name, time }: Props) {
  return (
    <Stack
      sx={{
        width: { xs: '70px', md: '150px' },
        justifyContent: 'space-around',
      }}
    >
      <Stack
        sx={{
          textAlign: 'center',
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
        }}
      >
        <Typography
          sx={{
            fontSize: '12px',
            fontFamily: FontFamily.bold,
            marginRight: 1,
          }}
        >
          {name.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',
            fontFamily: FontFamily.light,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {` (${time})`}
        </Typography>
      </Stack>
    </Stack>
  );
}
