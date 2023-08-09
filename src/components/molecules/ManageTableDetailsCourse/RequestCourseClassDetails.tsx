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
  const classCode = classDetails.code ?? '';

  const displayText = [
    {
      id: 0,
      subItem: [
        {
          id: 0,
          label: 'Học sinh tối thiểu',
          value: classDetails.minStudent ?? '',
        },
        {
          id: 1,
          label: 'Học sinh tối đa',
          value: classDetails.maxStudent ?? '',
        },
      ],
    },
    {
      id: 1,
      subItem: [
        {
          id: 0,
          label: 'Ngày bắt đầu (dự kiến)',
          value: formatISODateStringToDisplayDate(classDetails.startDate) ?? '',
        },
        {
          id: 1,
          label: 'Ngày kết thúc (dự kiến)',
          value: formatISODateStringToDisplayDate(classDetails.endDate) ?? '',
        },
      ],
    },
    {
      id: 2,
      subItem: [
        {
          id: 0,
          label: 'Tổng số buổi học',
          value: classDetails.numberOfSlot ?? '',
        },
        {
          id: 1,
          label: 'Giá tiền của lớp',
          value: formatMoney(classDetails.price) ?? '',
        },
      ],
    },
  ];

  const timeInWeekRequests = classDetails.timeInWeeks.map((subItem) => ({
    dayOfWeekId: subItem.dayOfWeek.id,
    slotId: subItem.slot.id,
  }));

  return (
    <>
      <Typography sx={SX_REQUEST_TITLE}>Chi tiết lớp {classCode}</Typography>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        columnSpacing={4}
        rowSpacing={2}
        py={2}
      >
        <Grid item xs={12} container spacing={2}>
          {displayText.map((item) => (
            <Grid item md={12} lg={4} key={item.id}>
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
                  {item.subItem.map((subItem) => (
                    <Grid item xs={12} key={subItem.id}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Typography sx={SX_FORM_ITEM_LABEL}>
                          {subItem.label}:
                        </Typography>
                        <Typography sx={SX_FORM_ITEM_VALUE}>
                          {subItem.value}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            sx={SX_BOX_ITEM_WRAPPER}
          >
            <Typography sx={SX_FORM_ITEM_LABEL}>
              Thời khóa biểu mặc định hàng tuần từ thứ 2 đến thứ 7 hàng tuần
            </Typography>
            <Timetable data={timeInWeekRequests} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
