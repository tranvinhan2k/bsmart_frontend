import { Box, Button as MuiButton, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import { FontFamily } from '~/assets/variables';
import DialogEditPassword from '~/components/molecules/Dialog/DialogEditPassword';
import { SX_FORM, SX_FORM_TITLE } from './style';

export default function DisplayEditPasswordSection() {
  const [openDialogEditPassword, setOpenDialogEditPassword] =
    useState<boolean>(false);
  const handleOpenDialogEditPassword = () => setOpenDialogEditPassword(true);
  const handleCloseDialogEditPassword = () => setOpenDialogEditPassword(false);

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        Thông tin mật khẩu
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Box mt={4}>
        <MuiButton
          color="miSmartOrange"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleOpenDialogEditPassword}
          sx={{ fontFamily: FontFamily.bold }}
        >
          Cập nhật
        </MuiButton>
      </Box>
      <DialogEditPassword
        open={openDialogEditPassword}
        handleOnClose={handleCloseDialogEditPassword}
      />
    </Box>
  );
}
