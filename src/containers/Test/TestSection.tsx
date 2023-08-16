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

  return (
    <Stack
      sx={{
        minHeight: '100vh',
      }}
    >
      h
    </Stack>
  );
}
