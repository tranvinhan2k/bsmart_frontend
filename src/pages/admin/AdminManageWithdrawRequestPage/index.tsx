import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import ManageWithdrawSection from '~/components/molecules/ManageRequestSection/ManageWithdrawSection';
import { scrollToTop } from '~/utils/common';

export default function ManageWithdrawRequestPage() {
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
          Danh sách yêu cầu rút tiền
        </Typography>
        <Box py={2}>
          <ManageWithdrawSection />
        </Box>
      </Box>
    </Box>
  );
}
