import { Box, Grid, Stack, Typography } from '@mui/material';
import { useGetManagedMentorDetails } from '~/hooks/user/useGetManagedMentorDetails';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_LABEL,
} from './style';

interface RequestDateProps {
  idMentor: number;
}

export default function RequestDate({ idMentor }: RequestDateProps) {
  const enum Text {
    mainTitle = 'Thông tin gia nhập',
    labelParticipation = 'Ngày tham gia',
  }
  const { managedMentorDetails } = useGetManagedMentorDetails(idMentor);
  const title0 = managedMentorDetails
    ? [
        {
          id: 0,
          label: Text.labelParticipation,
          value: managedMentorDetails.timeParticipation,
        },
      ]
    : [];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Box mb={2}>
        <Typography sx={SX_FORM_LABEL}>{Text.mainTitle}</Typography>
      </Box>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        columnSpacing={8}
        rowSpacing={2}
      >
        {title0 &&
          title0.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
                <Typography sx={SX_FORM_ITEM_LABEL}>{item.value}</Typography>
              </Stack>
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
}
