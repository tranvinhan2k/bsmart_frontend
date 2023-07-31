import { Stack, Typography } from '@mui/material';
import { FontFamily } from '~/assets/variables';
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
      <Typography sx={SX_FORM_LABEL}>Danh sách lớp</Typography>
      {row.timeInWeek ? (
        <Timetable data={row.timeInWeek as any} />
      ) : (
        <Typography sx={{ fontFamily: FontFamily.light }}>
          <b style={{ color: 'red' }}>Không tồn tại</b>
        </Typography>
      )}
    </Stack>
  );
}
