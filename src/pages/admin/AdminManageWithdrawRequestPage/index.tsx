import { Box, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import ManageWithdrawSection from '~/components/molecules/ManageRequestSection/ManageWithdrawSection';
import globalStyles from '~/styles';
import { scrollToTop } from '~/utils/common';

export default function ManageWithdrawRequestPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack p={3}>
      <Typography
        sx={{
          ...globalStyles.textTitle,
          lineHeight: 1,
        }}
      >
        Danh sách yêu cầu rút tiền
      </Typography>
      <Stack marginTop={1} sx={globalStyles.viewRoundedWhiteBody}>
        <ManageWithdrawSection />
      </Stack>
    </Stack>
  );
}
