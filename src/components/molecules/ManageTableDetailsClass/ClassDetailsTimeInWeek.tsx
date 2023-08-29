import { Grid, Stack, Typography } from '@mui/material';
import { useGetManagedClassDetails } from '~/hooks/class/useGetManagedClassDetails';
import Timetable from '../Timetable';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface ClassDetailsTimeInWeekProps {
  idClass: number;
  scrollRef: any;
}

export default function ClassDetailsTimeInWeek({
  idClass,
  scrollRef,
}: ClassDetailsTimeInWeekProps) {
  const { classDetails, isLoading } = useGetManagedClassDetails(idClass);

  const timeInWeekRequests = classDetails
    ? classDetails.timeInWeeks.map((subItem) => ({
        dayOfWeekId: subItem.dayOfWeek.id,
        slotId: subItem.slot.id,
      }))
    : [];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER} ref={scrollRef}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>
            Thời khóa biểu mặc định hàng tuần từ thứ 2 đến thứ 7 hàng tuần
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Timetable data={timeInWeekRequests} />
        </Grid>
      </Grid>
    </Stack>
  );
}
