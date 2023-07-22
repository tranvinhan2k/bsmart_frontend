import { Divider, Stack, Typography } from '@mui/material';
import { LoadingWrapper } from '~/HOCs';
import ReturnLink from '~/components/atoms/ReturnLink';
import { ActivityData } from '~/constants';
import { useGetDetailActivity, useGetIdFromUrl } from '~/hooks';
import globalStyles from '~/styles';

export default function MemberClassModulesPage() {
  const moduleId = useGetIdFromUrl('moduleId');
  const { activity, error, isLoading } = useGetDetailActivity(moduleId);

  const activityData = ActivityData.find(
    (item) => item.type === activity?.type
  );
  return (
    <Stack>
      <ReturnLink />
      <LoadingWrapper error={error} isLoading={isLoading}>
        <Typography sx={globalStyles.textSubTitle}>
          {activityData?.label}
        </Typography>
        <Divider />
        <Stack marginTop={1}>Hello</Stack>
      </LoadingWrapper>
    </Stack>
  );
}
