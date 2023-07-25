import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { ClassOfCourseCreateRequestDetails } from '~/models/courses';
import { FontFamily } from '~/assets/variables';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import Timetable from '~/components/molecules/Timetable';
import globalStyles from '~/styles';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_ITEM_VALUE,
  SX_REQUEST_TITLE,
} from './style';
import { formatMoney } from '~/utils/money';

interface RequestCourseClassDetailsProps {
  onClose: () => void;
  classDetails: ClassOfCourseCreateRequestDetails;
}
export default function RequestCourseClassDetails({
  onClose,
  classDetails,
}: RequestCourseClassDetailsProps) {
  const tmpDisplayText = [
    {
      id: 0,
      label: 'Mã lớp',
      value: classDetails.code ?? '',
    },
    {
      id: 1,
      label: 'HS tối thiểu',
      value: classDetails.minStudent ?? '',
    },
    {
      id: 2,
      label: 'HS tối đa',
      value: classDetails.maxStudent ?? '',
    },
    {
      id: 3,
      label: 'Ngày bắt đầu (dự kiến)',
      value: formatISODateStringToDisplayDate(classDetails.startDate) ?? '',
    },
    {
      id: 4,
      label: 'Ngày kết thúc (dự kiến)',
      value: formatISODateStringToDisplayDate(classDetails.endDate) ?? '',
    },
    {
      id: 5,
      label: 'Tổng số buổi học',
      value: classDetails.numberOfSlot ?? '',
    },
    {
      id: 7,
      label: 'Số buổi học / Tuần',
      value: classDetails.timeInWeeks.length ?? '',
    },
    {
      id: 6,
      label: 'Giá tiền của lớp',
      value: formatMoney(classDetails.price) ?? '',
    },
  ];

  const timeInWeekRequests = classDetails.timeInWeeks.map((subItem) => ({
    dayOfWeekId: subItem.dayOfWeek.id,
    slotId: subItem.slot.id,
  }));

  return (
    <>
      <Typography sx={SX_REQUEST_TITLE}>Chi tiết lớp</Typography>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        columnSpacing={4}
        rowSpacing={2}
        py={2}
      >
        <Grid item sm={12} md={5} lg={4}>
          <Box sx={globalStyles.boxSticky}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
              sx={SX_BOX_ITEM_WRAPPER}
            >
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                {tmpDisplayText.map((item) => (
                  <Grid item xs={12} key={item.id}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Typography sx={SX_FORM_ITEM_LABEL}>
                        {item.label}:
                      </Typography>
                      <Typography sx={SX_FORM_ITEM_VALUE}>
                        {item.value}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                mt={4}
              >
                <Button
                  color="error"
                  fullWidth
                  variant="contained"
                  onClick={onClose}
                  sx={{ fontFamily: FontFamily.bold }}
                >
                  Hủy
                </Button>
                <Button
                  color="miSmartOrange"
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ fontFamily: FontFamily.bold }}
                >
                  Phê duyệt lớp
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Grid>
        <Grid item sm={12} md={7} lg={8}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            sx={SX_BOX_ITEM_WRAPPER}
          >
            <Typography sx={SX_FORM_ITEM_LABEL}>Thời khóa biểu</Typography>
            <Timetable data={timeInWeekRequests} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
