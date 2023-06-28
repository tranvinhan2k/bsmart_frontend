import { Stack } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';
import RegisterTab from '~/components/molecules/RegisterTab';
import { RegisterTabPayload } from '~/constants';

export default function RegisterSection() {
  // TODO: add logic register
  return (
    <Stack
      sx={{
        borderRadius: MetricSize.small_5,
        width: { xs: '90vw', md: MetricSize.halfWidth },
        background: Color.white,
      }}
    >
      <RegisterTab registerTabs={RegisterTabPayload} />
    </Stack>
  );
}
