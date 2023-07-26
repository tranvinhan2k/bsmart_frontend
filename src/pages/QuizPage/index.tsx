import { Stack } from '@mui/material';
import { useEffectScrollToTop } from '~/hooks';
import { DoQuizAnswerPayload } from '../../components/molecules/DoQuizReviewList/DoQuizQuestion';
import DoQuizReviewList from '~/components/molecules/DoQuizReviewList';

export interface DoQuizQuestionPayload {
  questionContent: string;
  isMultipleAnswer: boolean;
  answers: DoQuizAnswerPayload[];
}

export interface DoQuizPayload {
  name: string;
  time: number;
  questions: DoQuizQuestionPayload[];
}

const initQuiz: DoQuizPayload = {
  name: 'Kiểm tra kiểm thử 1',
  time: 123,
  questions: [
    {
      questionContent: 'Con gà hay con vịt có trước ?',
      isMultipleAnswer: true,
      answers: [
        {
          id: 0,
          value: 'Con vịt',
          isChosen: false,
          isRight: false,
        },
        {
          id: 1,
          value: 'Con gà',
          isChosen: false,
          isRight: true,
        },
      ],
    },
    {
      questionContent: 'Con gà hay con vịt có trước ?',
      isMultipleAnswer: false,
      answers: [
        {
          id: 0,
          value: 'Con vịt',
          isChosen: false,
          isRight: true,
        },
        {
          id: 1,
          value: 'Con gà',
          isChosen: false,
          isRight: false,
        },
      ],
    },
    {
      questionContent: 'Con gà hay con vịt có trước ?',
      isMultipleAnswer: false,
      answers: [
        {
          id: 0,
          value: 'Con vịt',
          isChosen: false,
        },
        {
          id: 1,
          value: 'Con gà',
          isChosen: false,
        },
      ],
    },
    {
      questionContent: 'Con gà hay con vịt có trước ?',
      isMultipleAnswer: true,
      answers: [
        {
          id: 0,
          value: 'Con vịt',
          isChosen: false,
        },
        {
          id: 1,
          value: 'Con gà',
          isChosen: false,
        },
      ],
    },
  ],
};

export default function QuizPage() {
  useEffectScrollToTop();
  return (
    <Stack>
      <DoQuizReviewList initData={initQuiz} />
    </Stack>
  );
}
