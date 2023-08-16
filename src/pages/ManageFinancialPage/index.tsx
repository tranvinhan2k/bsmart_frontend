import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { scrollToTop } from '~/utils/common';

export default function ManageFinancialPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Box p={4}>
      <Box pb={2}>
        <Typography
          sx={{
            fontSize: 26,
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          Quản lý tài chính
        </Typography>
      </Box>
    </Box>
  );
}
