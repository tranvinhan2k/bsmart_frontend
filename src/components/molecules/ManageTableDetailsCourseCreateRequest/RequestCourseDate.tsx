import { Box, Grid, Stack, Typography } from '@mui/material';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_LABEL,
} from './style';

interface RequestCourseDateProps {
  idCourse: number;
}

export default function RequestCourseDate({
  idCourse,
}: RequestCourseDateProps) {
  const tmpTitle = [
    {
      id: 0,
      label: 'Ngày gửi',
      value: '',
    },
    {
      id: 1,
      label: 'Lần gửi thứ',
      value: '',
    },
  ];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Box mb={2}>
        <Typography sx={SX_FORM_LABEL}>Thời gian gửi yêu cầu</Typography>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        columnSpacing={8}
        rowSpacing={2}
      >
        {tmpTitle.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
