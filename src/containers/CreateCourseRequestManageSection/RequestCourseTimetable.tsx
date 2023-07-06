import { Stack, Typography } from '@mui/material';
import Timetable from '~/components/molecules/Timetable';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface RequestCourseTimetableProps {
  row: any;
}

export default function RequestCourseTimetable({
  row,
}: RequestCourseTimetableProps) {
  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Typography sx={SX_FORM_LABEL}>Thời khóa biểu</Typography>
      <Timetable data={row.timeInWeek as any} />
    </Stack>
  );
}
