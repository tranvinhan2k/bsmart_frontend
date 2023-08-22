import { Stack, Typography, Divider } from '@mui/material';
import { LoadingWrapper } from '~/HOCs';
import TextTitle from '~/components/atoms/texts/TextTitle';
import WeekSchedule from '~/components/molecules/schedules/WeekSchedule';
import { useGetClassSchedule, useGetIdFromUrl } from '~/hooks';
import globalStyles from '~/styles';

export default function MentorSchedulePage() {
  const id = useGetIdFromUrl('id');
  const { data, error, isLoading } = useGetClassSchedule(id);

  return (
    <Stack>
      <TextTitle title="Lịch học của lớp" />
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <LoadingWrapper
          error={error}
          isLoading={isLoading}
          isEmptyCourse={data?.length === 0}
        >
          <WeekSchedule data={data || []} />
        </LoadingWrapper>
        {/* <WeekSchedule data={data} /> */}
      </Stack>
    </Stack>
  );
}
