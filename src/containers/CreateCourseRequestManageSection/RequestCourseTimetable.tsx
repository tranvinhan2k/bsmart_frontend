import { Stack, Typography } from '@mui/material';
import SubCourseTimetable from '~/components/molecules/SubCourseTimetable';
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
      <SubCourseTimetable data={row.timeInWeek as any} />
    </Stack>
  );
}
