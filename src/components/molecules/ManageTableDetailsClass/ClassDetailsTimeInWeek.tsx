import { Grid, Stack, Typography } from '@mui/material';
import { useGetManagedClassDetails } from '~/hooks/class/useGetManagedClassDetails';
import Timetable from '../Timetable';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface ClassDetailsTimeInWeekProps {
  idClass: number;
}

export default function ClassDetailsTimeInWeek({
  idClass,
}: ClassDetailsTimeInWeekProps) {
  const { classDetails, isLoading } = useGetManagedClassDetails(idClass);

  const timeInWeekRequests = classDetails
    ? classDetails.timeInWeeks.map((subItem) => ({
        dayOfWeekId: subItem.dayOfWeek.id,
        slotId: subItem.slot.id,
      }))
    : [];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>Thông tin thời gian biểu</Typography>
        </Grid>
        <Grid item xs={12}>
          <Timetable data={timeInWeekRequests} />
        </Grid>
      </Grid>
    </Stack>
  );
}
