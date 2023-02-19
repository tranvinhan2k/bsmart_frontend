import { Stack } from '@mui/material';
import { MetricSize } from '~/assets/variables';
import RegisterTab from '~/components/molecules/RegisterTab';
import { RegisterTabPayload } from '~/constants';

export default function RegisterSection() {
  // TODO: add logic register
  return (
    <Stack
      sx={{
        borderRadius: MetricSize.small,
        boxShadow: { xs: 0, md: 5 },
        width: { xs: '90vw', md: MetricSize.halfWidth },
      }}
    >
      <RegisterTab registerTabs={RegisterTabPayload} />
    </Stack>
  );
}
