import { Box, Typography, Stack } from '@mui/material';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface RequestDateProps {
  row: any;
}

export default function RequestDate({ row }: RequestDateProps) {
  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Box mb={4}>
        <Typography sx={SX_FORM_LABEL}>Thời gian gửi yêu cầu</Typography>
      </Box>
    </Stack>
  );
}
