import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { LoadingWrapper } from '~/HOCs';
import MonthSchedule from '~/components/molecules/schedules/MonthSchedule';
import WeekSchedule from '~/components/molecules/schedules/WeekSchedule';
import {
  useDispatchGetAllSlots,
  useEffectScrollToTop,
  useTimeOut,
  useTryCatch,
} from '~/hooks';
import globalStyles from '~/styles';

export default function SchedulePage() {
  const { onSleep } = useTimeOut(1000);
  const { error, handleTryCatch, isLoading } = useTryCatch();

  const { optionSlots } = useDispatchGetAllSlots();
  useEffectScrollToTop();

  return (
    <Stack>
      <Typography sx={globalStyles.textTitle}>
        Lịch làm việc của tuần
      </Typography>
      <LoadingWrapper isLoading={isLoading} error={error}>
        {/* <WeekSchedule
          data={[
            {
              className: 'Joker',
              date: new Date().toISOString(),
              dayOfWeekId: 1,
              id: 0,
              slotId: 1,
              isPresent: true,
              link: 'google.com',
            },
          ]}
        /> */}
        <MonthSchedule
          data={[
            {
              id: 0,
              date: new Date(),
              slots: [optionSlots[0], optionSlots[1]],
            },
            {
              id: 1,
              date: new Date('08/09/2023'),
              slots: [optionSlots[0], optionSlots[1]],
            },
            {
              id: 2,
              date: new Date('08/10/2023'),
              slots: [optionSlots[0], optionSlots[1]],
            },
            {
              id: 3,
              date: new Date('08/11/2023'),
              slots: [...optionSlots],
            },
            {
              id: 4,
              date: new Date('08/12/2023'),
              slots: [optionSlots[0], optionSlots[1]],
            },
          ]}
        />
      </LoadingWrapper>
    </Stack>
  );
}
