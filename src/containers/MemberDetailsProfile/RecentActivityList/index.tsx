import { Box, Divider, Typography, Stack } from '@mui/material';
import {
  SX_WRAPPER,
  SX_TITLE,
  SX_PROFILE_DETAILS,
  SX_PROFILE_DETAILS_HIGHLIGHTED,
} from './style';

export default function RecentActivityList() {
  return (
    <Stack sx={SX_WRAPPER}>
      <Typography component="h4" sx={SX_TITLE}>
        Các hoạt động gần đây
      </Typography>
      <Box mt={2}>
        <Typography component="p" sx={SX_PROFILE_DETAILS}>
          Đã đăng ký khoá học Front End Basic
        </Typography>
        <Typography component="p" sx={SX_PROFILE_DETAILS_HIGHLIGHTED}>
          01/01/2023
        </Typography>
        <Box mt={2}>
          <Divider />
        </Box>
      </Box>
      <Box mt={2}>
        <Typography component="p" sx={SX_PROFILE_DETAILS}>
          Đã đăng ký khoá học Front End Basic
        </Typography>
        <Typography component="p" sx={SX_PROFILE_DETAILS_HIGHLIGHTED}>
          01/01/2023
        </Typography>
        <Box mt={2}>
          <Divider />
        </Box>
      </Box>
    </Stack>
  );
}
