import { Stack } from '@mui/material';
import { useEffectScrollToTop } from '~/hooks';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';
import MentorDetailsSection from '~/components/molecules/MentorDetailsSection';

export default function MentorDetailsPage() {
  useEffectScrollToTop();

  return (
    <Stack
      sx={{
        minHeight: '100vh',
      }}
    >
      <LoadingWrapper error={false} isLoading={false}>
        <MentorDetailsSection />
      </LoadingWrapper>
    </Stack>
  );
}
