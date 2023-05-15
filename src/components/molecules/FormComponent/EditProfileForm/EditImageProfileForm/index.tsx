import { Box, Divider, Typography, Stack } from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import accountApi from '~/api/users';
import Button from '~/components/atoms/Button';
import { SX_FORM, SX_FORM_TITLE } from '../style';
import DialogUpdateAvatar from './DialogUpdateAvatar';
import DialogUpdateIdCard from './DialogUpdateIdCard';

export default function EditImageProfileForm() {
  const token =
    useSelector((state: RootState) => state.user.token) ||
    localStorage.getItem('token');
  const queryKey = ['/loginUser'];
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data: dataGetProfile } = useQuery(
    queryKey,
    () => accountApi.getProfile(config),
    {
      enabled: Boolean(token),
    }
  );

  const [openDialogUpdateAvatar, setOpenDialogUpdateAvatar] =
    useState<boolean>(false);
  const handleOpenDialogUpdateAvatar = () => setOpenDialogUpdateAvatar(true);
  const handleCloseDialogUpdateAvatar = () => setOpenDialogUpdateAvatar(false);
  const [openDialogUpdateIDCard, setOpenDialogUpdateIDCard] =
    useState<boolean>(false);
  const handleOpenDialogUpdateIDCard = () => setOpenDialogUpdateIDCard(true);
  const handleCloseDialogUpdateIDCard = () => setOpenDialogUpdateIDCard(false);

  return (
    <>
      <Box sx={SX_FORM}>
        <Typography component="h3" sx={SX_FORM_TITLE}>
          Thông tin ảnh
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        {dataGetProfile && (
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <Button
              customVariant="normal"
              onClick={handleOpenDialogUpdateAvatar}
              size="small"
            >
              Cập nhật ảnh đại diện
            </Button>
            <Button
              customVariant="normal"
              onClick={handleOpenDialogUpdateIDCard}
              size="small"
            >
              Cập nhật CMND
            </Button>
          </Stack>
        )}
      </Box>
      <DialogUpdateAvatar
        open={openDialogUpdateAvatar}
        handleOnClose={handleCloseDialogUpdateAvatar}
        dataGetProfile={dataGetProfile}
      />
      <DialogUpdateIdCard
        open={openDialogUpdateIDCard}
        handleOnClose={handleCloseDialogUpdateIDCard}
        dataGetProfile={dataGetProfile}
      />
    </>
  );
}
