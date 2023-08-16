import { Button, Stack } from '@mui/material';
import moment from 'moment-timezone';
import { formatDate, generateEndDate } from '~/utils/date';

export default function TextSection() {
  let browser: Window | null;
  interface TimeSlot {
    dayOfWeekId: number;
    slotId: number;
  }

  interface Payload {
    numberOfSlot: number;
    startDate: string;
    timeInWeekRequests: TimeSlot[];
  }

  const payload: Payload = {
    numberOfSlot: 2,
    startDate: '2023-08-30T17:00:00.000Z',
    timeInWeekRequests: [
      {
        dayOfWeekId: 6, // Saturday
        slotId: 2,
      },
      {
        dayOfWeekId: 2, // Saturday
        slotId: 2,
      },
      {
        dayOfWeekId: 6, // Tuesday
        slotId: 2,
      },
    ],
  };

  const endDate = generateEndDate(payload);
  console.log('Generated endDate:', endDate);

  return (
    <Stack
      sx={{
        minHeight: '100vh',
      }}
    >
      {`${formatDate(payload.startDate)} - ${formatDate(endDate)} - ${
        payload.numberOfSlot
      }`}
    </Stack>
  );
}
