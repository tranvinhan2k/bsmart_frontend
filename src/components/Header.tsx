import { Stack } from '@mui/material';
import { Colors } from '~/assets/variables';

export default function Header() {
  return (
    <Stack sx={{ flex: 1, background: Colors.navy, color: Colors.white }}>
      Header
    </Stack>
  );
}
