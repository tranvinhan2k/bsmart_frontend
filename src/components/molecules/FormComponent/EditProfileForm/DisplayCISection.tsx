import {
  Box,
  Button,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import DialogEditIdCardBack from '~/components/molecules/Dialog/DialogEditIdCardBack';
import DialogEditIdCardFront from '~/components/molecules/Dialog/DialogEditIdCardFront';
import { image } from '~/constants/image';
import { ProfileImgType } from '~/constants/profile';
import { useGetProfile } from '~/hooks/user/useGetProfile';
import { SX_FORM, SX_FORM_LABEL, SX_FORM_TITLE } from './style';

export default function DisplayCISection() {
  const { profile: dataGetProfile } = useGetProfile();

  const [openDialogUpdateIDCardFront, setOpenDialogUpdateIDCardFront] =
    useState<boolean>(false);
  const handleOpenDialogUpdateIDCardFront = () =>
    setOpenDialogUpdateIDCardFront(true);
  const handleCloseDialogUpdateIDCardFront = () =>
    setOpenDialogUpdateIDCardFront(false);

  const [openDialogUpdateIDCardBack, setOpenDialogUpdateIDCardBack] =
    useState<boolean>(false);
  const handleOpenDialogUpdateIDCardBack = () =>
    setOpenDialogUpdateIDCardBack(true);
  const handleCloseDialogUpdateIDCardBack = () =>
    setOpenDialogUpdateIDCardBack(false);

  interface CIItemType {
    id: number;
    img: string;
    onClickAction: () => void;
    text: string;
    toolTipArrowPlacement: TooltipProps['placement'];
  }

  const CI: CIItemType[] = [
    {
      id: 0,
      img:
        dataGetProfile?.userImages?.find(
          (img: any) => img?.type === ProfileImgType.FRONTCI
        )?.url || image.noAvatar,
      onClickAction: handleOpenDialogUpdateIDCardFront,
      text: 'Mặt trước',
      toolTipArrowPlacement: 'bottom',
    },
    {
      id: 2,
      img:
        dataGetProfile?.userImages?.find(
          (img: any) => img?.type === ProfileImgType.BACKCI
        )?.url || image.noAvatar,
      onClickAction: handleOpenDialogUpdateIDCardBack,
      text: 'Mặt sau',
      toolTipArrowPlacement: 'bottom',
    },
  ];

  return (
    <>
      <Box sx={SX_FORM}>
        <Box mb={2}>
          <Typography component="h3" sx={SX_FORM_TITLE}>
            Thông tin chứng minh thư
          </Typography>
        </Box>
        <Stack
          direction={{ md: 'column', lg: 'row' }}
          justifyContent={{ md: 'flex-start', lg: 'center' }}
          alignItems={{ md: 'center', lg: 'flex-start' }}
          spacing={2}
        >
          {CI.map((item) => (
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              key={item.id}
            >
              <Button onClick={item.onClickAction} sx={{ borderRadius: 5 }}>
                <Tooltip
                  title="Cập nhật"
                  arrow
                  placement={item.toolTipArrowPlacement}
                >
                  <Box
                    alt="mentor avatar"
                    component="img"
                    src={item.img}
                    sx={{
                      width: '100%',
                      maxWidth: 370,
                      height: 250,
                      borderRadius: 5,
                    }}
                    onClick={item.onClickAction}
                  />
                </Tooltip>
              </Button>
              <Typography sx={SX_FORM_LABEL}>{item.text}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
      <DialogEditIdCardFront
        open={openDialogUpdateIDCardFront}
        handleOnClose={handleCloseDialogUpdateIDCardFront}
      />
      <DialogEditIdCardBack
        open={openDialogUpdateIDCardBack}
        handleOnClose={handleCloseDialogUpdateIDCardBack}
      />
    </>
  );
}
