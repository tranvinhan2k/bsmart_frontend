import { Stack, Typography, Divider } from '@mui/material';
import { useEffect } from 'react';
import { LoadingWrapper } from '~/HOCs';
import { Color, MetricSize } from '~/assets/variables';
import CustomTab from '~/components/atoms/CustomTab';
import MonthSchedule from '~/components/molecules/schedules/MonthSchedule';
import WeekSchedule from '~/components/molecules/schedules/WeekSchedule';
import {
  useDispatchGetAllSlots,
  useEffectScrollToTop,
  useQueryGetSchedule,
  useTimeOut,
  useTryCatch,
} from '~/hooks';
import globalStyles from '~/styles';

export default function SchedulePage() {
  const { onSleep } = useTimeOut(1000);
  const { error, handleTryCatch, isLoading } = useTryCatch();

  const { data } = useQueryGetSchedule();
  const { optionSlots } = useDispatchGetAllSlots();
  useEffectScrollToTop();

  return (
    <Stack>
      <Typography sx={globalStyles.textSubTitle}>Lịch làm việc</Typography>

      <Stack
        sx={{
          marginTop: 1,
        }}
      >
        <LoadingWrapper isLoading={isLoading} error={error}>
          <CustomTab
            tabContentList={[
              {
                label: 'Theo tuần',
                data: <WeekSchedule data={data?.week || []} />,
              },
              {
                label: ' Theo tháng',
                data: <MonthSchedule data={data?.month || []} />,
              },
            ]}
          />
        </LoadingWrapper>
      </Stack>
    </Stack>
  );
}
