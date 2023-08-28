import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffectScrollToTop } from '~/hooks';
import { DoQuizAnswerPayload } from '../../components/molecules/DoQuizReviewList/DoQuizQuestion';
import DoQuizReviewList from '~/components/molecules/DoQuizReviewList';
import { useReviewQuiz } from '~/hooks/quiz/useReviewQuiz';
import { selectDataQuiz } from '~/redux/user/selector';
import { LoadingWrapper } from '~/HOCs';

export interface DoQuizQuestionPayload {
  questionContent: string;
  isMultipleAnswer: boolean;
  answers: DoQuizAnswerPayload[];
}

export default function ReviewPage() {
  useEffectScrollToTop();
  const quizData = useSelector(selectDataQuiz);

  const { data, error, isLoading } = useReviewQuiz(quizData?.id || 0);

  return (
    <Stack>
      <LoadingWrapper isLoading={isLoading} error={error}>
        <DoQuizReviewList
          id={quizData.id || 0}
          isReview
          initData={{
            name: quizData?.name || '',
            questions: data?.questions || [],
          }}
        />
      </LoadingWrapper>
    </Stack>
  );
}
