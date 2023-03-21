import { Stack } from '@mui/material';
import { MetricSize } from '~/assets/variables';
import FeedbackMentorForm from '~/components/molecules/FormComponent/FeedbackMentorForm';

export default function FeedbackSection() {
  return (
    <Stack
      sx={{
        borderRadius: '5px',
        border: '1px solid grey',
        padding: MetricSize.medium_15,
      }}
    >
      <FeedbackMentorForm />
    </Stack>
  );
}
