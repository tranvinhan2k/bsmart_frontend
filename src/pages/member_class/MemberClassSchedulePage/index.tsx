import { Stack } from '@mui/material';
import TextTitle from '~/components/atoms/texts/TextTitle';
import WeekSchedule from '~/components/molecules/schedules/WeekSchedule';

export default function MemberClassSchedulePage() {
  return (
    <Stack>
      <TextTitle title="Lịch học" />
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
