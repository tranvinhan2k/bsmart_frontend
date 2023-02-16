import { Stack, Typography } from '@mui/material';
import { SX_NOT_FOUND_STACK, SX_NOT_FOUND_TEXT } from './styles';

export default function NotFoundPage() {
  return (
    <Stack sx={SX_NOT_FOUND_STACK}>
      <Typography sx={SX_NOT_FOUND_TEXT}>Không tìm thấy trang 404.</Typography>
    </Stack>
  );
}
