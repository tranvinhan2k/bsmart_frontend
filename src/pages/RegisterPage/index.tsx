import { Stack } from '@mui/material';
import { MetricSize } from '~/assets/variables';

export default function RegisterPage() {
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          borderRadius: MetricSize.small,
          boxShadow: 5,
          padding: MetricSize.medium,
          margin: MetricSize.medium,
          width: MetricSize.halfWidth,
        }}
      >
        Hello
      </Stack>
    </Stack>
  );
}
