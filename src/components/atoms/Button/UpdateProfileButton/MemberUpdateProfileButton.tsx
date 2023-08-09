import { Button as MuiButton } from '@mui/material';
import { FontFamily } from '~/assets/variables';

interface MemberUpdateProfileButtonProps {
  isFormDisabled: boolean;
}

export default function MemberUpdateProfileButton({
  isFormDisabled,
}: MemberUpdateProfileButtonProps) {
  return (
    <MuiButton
      color="miSmartOrange"
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      disabled={isFormDisabled}
      sx={{ fontFamily: FontFamily.bold }}
    >
      Cập nhật
    </MuiButton>
  );
}
