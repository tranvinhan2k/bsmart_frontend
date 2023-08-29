import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Icon from '~/components/atoms/Icon';
import Timetable from '~/components/molecules/Timetable';
import { ClassOfCourseCreateRequestDetails } from '~/models/courses';
import { handleViewImgFromUrl } from '~/utils/common';
import { handleCopyToClipboard } from '~/utils/commonComp';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import RequestCourseClassStudentList from '../ManageTableSupport/RequestCourseClassStudentList';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_ITEM_VALUE,
  SX_REQUEST_TITLE,
} from './style';

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
        {
          id: 2,
          label: 'Giá tiền của lớp',
          value: formatMoney(classDetails.price) ?? '',
        },
      ],
    },
    {
      id: 1,
      subItem: [
        {
          id: 0,
          label: 'Ngày bắt đầu',
          value: formatISODateStringToDisplayDate(classDetails.startDate) ?? '',
        },
        {
          id: 1,
          label: 'Ngày kết thúc',
          value: formatISODateStringToDisplayDate(classDetails.endDate) ?? '',
        },
        {
          id: 2,
          label: 'Tổng số buổi học',
          value: classDetails.numberOfSlot ?? '',
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
      <Typography sx={SX_REQUEST_TITLE}>
        Chi tiết lớp #{classCode}
        <IconButton
          size="small"
          onClick={() => handleCopyToClipboard(classCode)}
        >
          <Icon name="contentCopyIcon" size="medium" color="blue" />
        </IconButton>
      </Typography>

      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        columnSpacing={4}
        rowSpacing={2}
        py={2}
      >
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Button
              fullWidth
              onClick={() => handleViewImgFromUrl(classDetails?.image?.url)}
            >
              <Avatar
                variant="rounded"
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  aspectRatio: 16 / 9,
                }}
                src={classDetails?.image?.url}
              />
            </Button>
          </Grid>
          {displayText.map((item) => (
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} key={item.id}>
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
        <Grid item xs={12}>
          <RequestCourseClassStudentList idClass={classDetails.id} />
        </Grid>
      </Grid>
    </>
  );
}
