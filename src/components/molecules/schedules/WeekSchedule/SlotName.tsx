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
        width: '150px',
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
            fontFamily: FontFamily.light,
          }}
        >
          <span
            style={{
              fontFamily: FontFamily.bold,
              marginRight: 2,
            }}
          >
            {name.toUpperCase()}
          </span>
          {` (${time})`}
        </Typography>
      </Stack>
    </Stack>
  );
}
