import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffectScrollToTop } from '~/hooks';
import { DoQuizAnswerPayload } from '../../components/molecules/DoQuizReviewList/DoQuizQuestion';
import DoQuizReviewList from '~/components/molecules/DoQuizReviewList';
import { useDoQuiz } from '~/hooks/quiz/useDoQuiz';
import { selectDataQuiz } from '~/redux/user/selector';
import { LoadingWrapper } from '~/HOCs';

export interface DoQuizQuestionPayload {
  questionContent: string;
  isMultipleAnswer: boolean;
  answers: DoQuizAnswerPayload[];
  id: number;
}

export interface DoQuizPayload {
  name: string;
  time: number;
  questions: DoQuizQuestionPayload[];
}

export default function QuizPage() {
  useEffectScrollToTop();

  const quizData = useSelector(selectDataQuiz);

  const { data, error, isLoading } = useDoQuiz({
    id: quizData.id || 0,
    password: quizData.password || '',
  });

  return (
    <Stack>
      <LoadingWrapper error={error} isLoading={isLoading}>
        <DoQuizReviewList
          id={quizData.id || 0}
          initData={{
            name: quizData.name || '',
            time: quizData.time || 0,
            questions: data?.questions || [],
          }}
        />
      </LoadingWrapper>
    </Stack>
  );
}
