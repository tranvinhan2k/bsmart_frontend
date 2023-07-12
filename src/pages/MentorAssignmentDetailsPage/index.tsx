import { useParams } from 'react-router-dom';
import { Box, Button as MuiButton, Stack, Typography } from '@mui/material';
import { useManageActivity } from '~/hooks/useManageActivity';
import Icon, { IconName } from '~/components/atoms/Icon';
import {
  SX_WRAPPER,
  SX_HEADER_TITLE,
  SX_FORM_ITEM_LABEL,
  SX_FORM_ITEM_VALUE,
} from './style';
import { formatISODateStringToDisplayDateTime } from '~/utils/date';
import { formatStringToNumber } from '~/utils/number';

export default function MentorAssignmentDetailsPage() {
  const { id } = useParams();
  const { activity } = useManageActivity(formatStringToNumber(id));

  interface DisplayTextListProps {
    id: number;
    label: string;
    value: string | number;
    icon: IconName;
  }

  // const displayTextList1: DisplayTextListProps[] = activity
  //   ? [
  //       {
  //         id: 0,
  //         label: 'Ngày tạo',
  //         value: formatISODateStringToDisplayDateTime(activity.created),
  //         icon: 'calendarMonth',
  //       },
  //       {
  //         id: 2,
  //         label: 'Mô tả',
  //         value: activity.activityDetail?.description,
  //         icon: 'description',
  //       },
  //     ]
  //   : [];

  // const displayTextList2: DisplayTextListProps[] = activity
  //   ? [
  //       {
  //         id: 0,
  //         label: 'Ngày bắt đầu',
  //         value: formatISODateStringToDisplayDateTime(
  //           activity.activityDetail?.startDate
  //         ),
  //         icon: 'calendarMonth',
  //       },
  //       {
  //         id: 1,
  //         label: 'Ngày kết thúc',
  //         value: formatISODateStringToDisplayDateTime(
  //           activity.activityDetail?.endDate
  //         ),
  //         icon: 'calendarMonth',
  //       },
  //       {
  //         id: 2,
  //         label: 'editBeForSubmitMin',
  //         value: activity.activityDetail?.editBeForSubmitMin,
  //         icon: 'groups',
  //       },
  //       {
  //         id: 3,
  //         label: 'Số file tối đa nộp',
  //         value: activity.activityDetail?.maxFileSubmit,
  //         icon: 'groups',
  //       },
  //       {
  //         id: 4,
  //         label: 'Dung lượng tối đa mỗi file (MB)',
  //         value: activity.activityDetail?.maxFileSize,
  //         icon: 'groups',
  //       },
  //     ]
  //   : [];
  return (
    <Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={SX_WRAPPER}
      >
        <Box mt={2} px={2}>
          <Typography sx={SX_HEADER_TITLE}>
            {activity ? activity.name : ''}
          </Typography>
        </Box>
        <Box mt={4} mb={1} px={2}>
          {/* {displayTextList1.map((item) => (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              key={item.id}
              py={1}
            >
              <Icon name={item.icon} size="small" />
              <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
              <Typography sx={SX_FORM_ITEM_VALUE}>{item.value}</Typography>
            </Stack>
          ))} */}
        </Box>
        <Box mt={4} mb={1} px={2}>
          {/* {displayTextList2.map((item) => (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              key={item.id}
              py={1}
            >
              <Icon name={item.icon} size="small" />
              <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
              <Typography sx={SX_FORM_ITEM_VALUE}>{item.value}</Typography>
            </Stack>
          ))} */}
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <MuiButton variant="outlined" color="miSmartOrange">
            Quay về
          </MuiButton>
          <MuiButton variant="outlined" color="miSmartOrange">
            Chỉnh sửa
          </MuiButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
