import { Stack } from '@mui/material';
import TextTitle from '~/components/atoms/texts/TextTitle';
import FeedbackTable from '~/components/molecules/FeedbackTable';
import { useGetIdFromUrl, useQueryMentorFeedback } from '~/hooks';
import globalStyles from '~/styles';

export interface MentorFeedbackListPayload {
  id: number;
  name: string;
  point: number;
  report: string;
  feedbackAnswers: {
    id: number;
    question: string;
    answer: string;
  }[];
}

export default function MentorClassFeedbacksPage() {
  const id = useGetIdFromUrl('id');
  const { data, error, isLoading } = useQueryMentorFeedback(id);

  return (
    <Stack>
      <TextTitle title="Danh sách đánh giá từ học sinh" />
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <FeedbackTable data={data || []} error={error} isLoading={isLoading} />
      </Stack>
    </Stack>
  );
}
