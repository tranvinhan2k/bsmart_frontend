import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';
import { ProfileImgType } from '~/constants/profile';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface CIItemType {
  id: number;
  img: string;
  onClickAction: () => void;
  text: string;
}
interface RequestCIProps {
  row: any;
}

export default function RequestCI({ row }: RequestCIProps) {
  const handleViewImg = (link: string) => window.open(link, '_blank');

  const frontCIUrl =
    row.userImages?.find((img: any) => img?.type === ProfileImgType.FRONTCI)
      ?.url || undefined;
  const backCIUrl =
    row.userImages?.find((img: any) => img?.type === ProfileImgType.BACKCI)
      ?.url || undefined;

  const CI: CIItemType[] = [
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
  ];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>CMND/CCCD</Typography>
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
