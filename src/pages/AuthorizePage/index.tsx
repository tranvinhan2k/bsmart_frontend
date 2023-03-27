import { Stack, Typography } from '@mui/material';
import { SX_NOT_FOUND_STACK, SX_NOT_FOUND_TEXT } from './styles';

export default function AuthorizePage() {
  return (
    <Stack sx={SX_NOT_FOUND_STACK}>
      <Typography sx={SX_NOT_FOUND_TEXT}>
        {`Bạn không có quyền truy cập trang này `}
      </Typography>
    </Stack>
  );
}
