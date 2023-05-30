import { Box, Grid, Typography, Stack } from '@mui/material';
import Button from '~/components/atoms/Button';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_LABEL,
  SX_FORM_VALUE,
} from '~/containers/ProcessRegisterRequestDetails/Right/style';

interface BasicInfoProps {
  mentorRequest: any;
}

export default function MentorInfo({ mentorRequest }: BasicInfoProps) {
  const tmpTitle2 = [
    { id: 0, label: 'Giới thiệu', value: mentorRequest.introduce },
    { id: 1, label: 'Kinh nghiệm', value: mentorRequest.experience },
  ];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>Hành động</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            spacing={2}
            mt={4}
          >
            <Button variant="outlined" size="medium" color="success">
              Phê duyệt
            </Button>
            <Button variant="outlined" size="medium" color="error">
              Từ chối
            </Button>
            <Button variant="outlined" size="medium" color="warning">
              Yêu cầu chỉnh sửa
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
