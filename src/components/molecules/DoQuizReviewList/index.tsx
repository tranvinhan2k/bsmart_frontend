import { Stack } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MetricSize } from '~/assets/variables';
import { DoQuizQuestionPayload } from '~/pages/QuizPage';
import DoQuizQuestion, {
  DoQuizAnswerPayload,
} from '~/components/molecules/DoQuizReviewList/DoQuizQuestion';
import QuizFooter from './QuizFooter';
import QuizHeader from './QuizHeader';

export interface QuizPayload {
  name: string;
  time: number;
  questions: DoQuizQuestionPayload[];
}

interface Props {
  isReview?: boolean;
  initData: QuizPayload;
}

export default function DoQuizReviewList({
  isReview = false,
  initData,
}: Props) {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<QuizPayload>(initData);

  const numberOfChosenQuestion = quiz.questions.reduce((total, item) => {
    const isQuestionChosen = item.answers.find((subItem) => subItem.isChosen);
    if (isQuestionChosen) {
      return total + 1;
    }
    return total;
  }, 0);

  const numberOfTotalQuestion = quiz.questions.length;

  const handleSubmit = () => {
    navigate(`/dashboard/classes/detail/1/activity/1`);
  };

  const handleChangeAnswer = (
    questionIndex: number,
    answers: DoQuizAnswerPayload[]
  ) => {
    const params = quiz.questions.map((item, index) => {
      if (index === questionIndex) {
        return {
          ...item,
          answers,
        };
      }
      return item;
    });

    setQuiz({ ...quiz, questions: params });
  };

  return (
    <Stack
      sx={{
        position: 'relative',
        minHeight: '100vh',
        marginBottom: '100px',
        marginTop: { xs: '100px', md: '0' },
      }}
    >
      <QuizHeader
        isReview={isReview}
        name={quiz.name}
        numberOfChosenQuestion={numberOfChosenQuestion}
        numberOfTotalQuestion={numberOfTotalQuestion}
        timeLeft={120}
      />
      <Stack
        sx={{
          paddingX: { xs: 1, md: MetricSize.large_30 },
        }}
      >
        {quiz.questions.map((item, index) => (
          <DoQuizQuestion
            isReview={isReview}
            isMultipleAnswer={item.isMultipleAnswer}
            key={index}
            answers={item.answers}
            index={index}
            onChangeAnswer={handleChangeAnswer}
            question={item.questionContent}
            total={quiz.questions.length}
          />
        ))}
      </Stack>
      <QuizFooter
        isReview={isReview}
        name={quiz.name}
        numberOfChosenQuestion={numberOfChosenQuestion}
        numberOfTotalQuestion={numberOfTotalQuestion}
        onSubmit={handleSubmit}
      />
    </Stack>
  );
}
