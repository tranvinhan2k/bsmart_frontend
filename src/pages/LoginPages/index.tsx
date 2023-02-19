import { useEffect } from 'react';

import { Stack } from '@mui/material';
import { scrollToTop } from '~/utils/common';
import LoginSection from '~/containers/LoginSection';
import { MetricSize } from '~/assets/variables';

export default function LoginPages() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: MetricSize.large,
      }}
    >
      <LoginSection />
    </Stack>
  );
}
