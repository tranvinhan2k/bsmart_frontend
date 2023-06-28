import React from 'react';

import { Stack } from '@mui/material';
import { scrollToTop } from '~/utils/common';

export default function DashboardPage() {
  React.useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack
      sx={{
        height: '100vh',
      }}
    >
      DashBoard
    </Stack>
  );
}
