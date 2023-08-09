import { Stack, Typography } from '@mui/material';
import { LoadingWrapper } from '~/HOCs';
import CustomTab from '~/components/atoms/CustomTab';
import MonthSchedule from '~/components/molecules/schedules/MonthSchedule';
import WeekSchedule from '~/components/molecules/schedules/WeekSchedule';
import { useEffectScrollToTop, useQueryGetSchedule } from '~/hooks';
import globalStyles from '~/styles';

export default function SchedulePage() {
  const { data, error, isLoading } = useQueryGetSchedule();

  useEffectScrollToTop();
  return (
    <Stack>
      <Typography sx={globalStyles.textSubTitle}>Lịch học</Typography>

      <Stack
        sx={{
          marginTop: 1,
        }}
      >
        <LoadingWrapper
          isLoading={isLoading}
          error={error}
          isEmptyCourse={data?.week.length === 0 || data?.month.length === 0}
        >
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
