import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { LoadingWrapper } from '~/HOCs';
import Schedule from '~/components/molecules/Schedule';
import { useEffectScrollToTop, useTimeOut, useTryCatch } from '~/hooks';
import globalStyles from '~/styles';

export default function SchedulePage() {
  const { onSleep } = useTimeOut(1000);
  const { error, handleTryCatch, isLoading } = useTryCatch();
  useEffectScrollToTop();

  useEffect(() => {
    handleTryCatch(() => onSleep(true));
  });

  return (
    <Stack>
      <Typography sx={globalStyles.textTitle}>
        Lịch làm việc của tuần
      </Typography>
      <LoadingWrapper isLoading={isLoading} error={error}>
        <Schedule
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
        />
      </LoadingWrapper>
    </Stack>
  );
}
