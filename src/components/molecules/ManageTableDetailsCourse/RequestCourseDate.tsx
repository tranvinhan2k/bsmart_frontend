import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import {
  useGetCourseCreateRequestDetails,
  UseGetCourseCreateRequestDetailsPayload,
} from '~/hooks/course/useGetCourseCreateRequestDetails';
import { formatISODateStringToDisplayDateTime } from '~/utils/date';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_ITEM_VALUE,
  SX_FORM_LABEL,
} from './style';

export default function RequestCourseDate({
  idCourse,
  status,
}: UseGetCourseCreateRequestDetailsPayload) {
  const { courseCreateRequestDetails, isLoading } =
    useGetCourseCreateRequestDetails({ idCourse, status });

  const title = [
    {
      id: 0,
      label: 'Thời gian phê duyệt',
      value: '',
    },
  ];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Box mb={2}>
        <Typography sx={SX_FORM_LABEL}>Thông tin bắt đầu</Typography>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        columnSpacing={8}
        rowSpacing={2}
      >
        {title.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
              {isLoading ? (
                <Skeleton sx={{ width: '50%' }} />
              ) : (
                <Typography sx={SX_FORM_ITEM_VALUE}>{item.value}</Typography>
              )}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
