import { Stack, Typography, Divider } from '@mui/material';
import WeekSchedule from '~/components/molecules/schedules/WeekSchedule';
import globalStyles from '~/styles';

export default function MentorSchedulePage() {
  return (
    <Stack>
      <Typography sx={globalStyles.textTitle}>Lịch làm việc</Typography>
      <Divider />
      <Stack marginTop={2}>
        <WeekSchedule
          data={[
            {
              id: 0,
              className: 'PRJ321',
              date: new Date().toString(),
              dayOfWeekId: 4,
              isPresent: true,
              link: 'google.com',
              slotId: 1,
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}
