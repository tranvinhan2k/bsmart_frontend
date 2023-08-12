import { Box, Grid, Stack, Typography } from '@mui/material';
import Icon from '~/components/atoms/Icon';
import { useGetCourseCreateRequestDetails } from '~/hooks/course/useGetCourseCreateRequestDetails';
import {
  formatISODateStringToDisplayDate,
  formatISODateStringToDisplayTime,
} from '~/utils/date';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_ITEM_VALUE,
  SX_FORM_LABEL,
} from './style';

interface RequestCourseDateProps {
  idCourse: number;
}

export default function RequestCourseDate({
  idCourse,
}: RequestCourseDateProps) {
  const enum Text {
    mainTitle = 'Thời gian gửi yêu cầu',
    labelSubmitDate = 'Ngày gửi',
    labelSubmitTime = 'Thời gian gửi',
    labelSubmitCount = 'Lần gửi thứ',
    labelSubmitApproved = 'Đã từng phê duyệt',
    labelSubmitApprovedYes = 'Đã từng phê duyệt',
    labelSubmitApprovedNo = 'Chưa từng được phê duyệt',
  }

  const { courseCreateRequestDetails, isLoading } =
    useGetCourseCreateRequestDetails(idCourse);
  const title = courseCreateRequestDetails
    ? [
        {
          id: 0,
          label: Text.labelSubmitDate,
          value: formatISODateStringToDisplayDate(
            courseCreateRequestDetails.timeSendRequest
          ),
        },
        {
          id: 1,
          label: Text.labelSubmitTime,
          value: formatISODateStringToDisplayTime(
            courseCreateRequestDetails.timeSendRequest
          ),
        },
        {
          id: 2,
          label: Text.labelSubmitCount,
          value: courseCreateRequestDetails.count,
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
        {title.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
              <Typography sx={SX_FORM_ITEM_VALUE}>{item.value}</Typography>
            </Stack>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography sx={SX_FORM_ITEM_LABEL}>
              {Text.labelSubmitApproved}:
            </Typography>
            {courseCreateRequestDetails?.approved ? (
              <Icon name="check" size="small_20" color="green" />
            ) : (
              <Icon name="cancelIcon" size="small_20" color="red" />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
