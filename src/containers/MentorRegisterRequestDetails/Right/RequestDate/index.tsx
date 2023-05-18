import { Box, Typography, Stack } from '@mui/material';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_LABEL,
} from '~/containers/MentorRegisterRequestDetails/Right/style';

interface RequestDateProps {
  mentorRequest: any;
}

export default function RequestDate({ mentorRequest }: RequestDateProps) {
  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Box mb={4}>
        <Typography sx={SX_FORM_LABEL}>Thời gian đăng ký</Typography>
      </Box>
    </Stack>
  );
}
