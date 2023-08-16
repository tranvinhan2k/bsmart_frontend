import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';
import { image } from '~/constants/image';
import { ProfileImgType } from '~/constants/profile';
import { useGetMentorProfileUpdateRequestDetails } from '~/hooks/user/UseGetMentorProfileUpdateRequestPayload';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_LABEL,
  SX_USER_AVATAR_CLICKABLE,
} from '../style';
import sx from './style';

interface RequestEditIdentityProps {
  rowId: number;
}

interface CIItemType {
  id: number;
  img: string;
  onClickAction: () => void;
  text: string;
}

export default function RequestEditIdentity({
  rowId,
}: RequestEditIdentityProps) {
  const handleViewImg = (link: string) => window.open(link, '_blank');

  const { updaterRequestDetails, isLoading } =
    useGetMentorProfileUpdateRequestDetails(rowId);

  // const frontCIUrl =
  //   row.userImages?.find((img: any) => img?.type === ProfileImgType.FRONTCI)
  //     ?.url || image.noAvatar;
  // const backCIUrl =
  //   row.userImages?.find((img: any) => img?.type === ProfileImgType.BACKCI)
  //     ?.url || image.noAvatar;

  const CI: CIItemType[] = [
    {
      id: 0,
      img: '',
      onClickAction: () => {},
      text: 'Mặt trước',
    },
    {
      id: 2,
      img: '',
      onClickAction: () => {},
      text: 'Mặt sau',
    },
  ];

  return (
    <Stack sx={sx.wrapperEditSelected}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>Ảnh CMND/CCCD</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction={{ sm: 'column', md: 'row' }}
            justifyContent={{ sm: 'flex-start', md: 'center' }}
            alignItems={{ sm: 'center', md: 'flex-start' }}
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
                <Button>
                  <Avatar variant="rounded" sx={{ width: 200, height: 100 }} />
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
