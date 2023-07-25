import { Grid, Typography, Stack } from '@mui/material';
import {
  SX_FORM_ITEM_LABEL_BOLD,
  SX_FORM_ITEM_LABEL_LIGHT,
} from '~/containers/ProcessCourseCreateRequestDetails/style';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_LABEL,
} from '~/containers/ProcessRegisterRequestDetails/Right/style';

interface RequestDateProps {
  mentorRequest: any;
}

export default function RequestDate({ mentorRequest }: RequestDateProps) {
  const tmpTitle = [
    {
      id: 0,
      label: 'Ngày gửi yêu cầu',
      value: mentorRequest.createDate,
    },
  ];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid mb={4} container>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>Thời gian đăng ký</Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            columnSpacing={8}
            rowSpacing={2}
            mt={1}
          >
            {tmpTitle.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Typography sx={SX_FORM_ITEM_LABEL_BOLD}>
                    {item.label}:
                  </Typography>
                  <Typography sx={SX_FORM_ITEM_LABEL_LIGHT}>
                    {item.value}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}
