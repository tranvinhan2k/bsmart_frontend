import { Stack, Typography, Divider } from '@mui/material';
import TextTitle from '~/components/atoms/texts/TextTitle';
import WeekSchedule from '~/components/molecules/schedules/WeekSchedule';
import globalStyles from '~/styles';

export default function MentorSchedulePage() {
  return (
    <Stack>
      <TextTitle title="Lịch làm việc" />
      <Stack>
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
              classId: 0,
              attendanceSlotId: 0,
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}
