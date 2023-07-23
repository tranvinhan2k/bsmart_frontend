import { Button as MuiButton } from '@mui/material';
import { FontFamily } from '~/assets/variables';

export default function MemberUpdateProfileButton() {
  return (
    <MuiButton
      color="miSmartOrange"
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      sx={{ fontFamily: FontFamily.bold }}
    >
      Cập nhật
    </MuiButton>
  );
}
