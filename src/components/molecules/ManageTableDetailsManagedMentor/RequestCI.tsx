import { Avatar, Button, Grid, Stack, Typography } from '@mui/material';
import { ProfileImgType } from '~/constants/profile';
import { useGetManagedMentorDetails } from '~/hooks/user/useGetManagedMentorDetails';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface CIItemType {
  id: number;
  img: string | undefined;
  onClickAction: () => void;
  text: string;
}

interface RequestCIProps {
  idMentor: number;
}

export default function RequestCI({ idMentor }: RequestCIProps) {
  const enum Text {
    mainTitle = 'Ảnh CMND/CCCD',
  }
  const { managedMentorDetails } = useGetManagedMentorDetails(idMentor);

  const handleViewImg = (link: string | undefined) => {
    if (link) window.open(link, '_blank');
  };
  const frontCIUrl = managedMentorDetails
    ? managedMentorDetails.userImages?.find(
        (img: any) => img?.type === ProfileImgType.FRONTCI
      )?.url
    : undefined;
  const backCIUrl = managedMentorDetails
    ? managedMentorDetails.userImages?.find(
        (img: any) => img?.type === ProfileImgType.BACKCI
      )?.url
    : undefined;

  const CI: CIItemType[] = managedMentorDetails
    ? [
        {
          id: 0,
          img: frontCIUrl,
          onClickAction: () => handleViewImg(frontCIUrl),
          text: 'Mặt trước',
        },
        {
          id: 2,
          img: backCIUrl,
          onClickAction: () => handleViewImg(backCIUrl),
          text: 'Mặt sau',
        },
      ]
    : [];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>{Text.mainTitle}</Typography>
        </Grid>
        <Grid item xs={12}>
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
                  <Avatar
                    src={item.img}
                    variant="rounded"
                    sx={{
                      width: 300,
                      height: 170,
                      boxShadow: 3,
                    }}
                  />
                </Button>
                <Typography sx={SX_FORM_LABEL}>{item.text}</Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
