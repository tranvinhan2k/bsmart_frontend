import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MetricSize } from '~/assets/variables';
import { DoQuizQuestionPayload } from '~/pages/QuizPage';
import DoQuizQuestion, {
  DoQuizAnswerPayload,
} from '~/components/molecules/DoQuizReviewList/DoQuizQuestion';
import QuizFooter from './QuizFooter';
import QuizHeader from './QuizHeader';
import { useSubmitQuiz } from '~/hooks/quiz/useSubmitQuiz';
import { useTryCatch } from '~/hooks';
import { PostSubmitQuizPayload } from '~/models';
import { useCountdown } from '~/hooks/useCountDown';
import { saveDataQuiz } from '~/redux/user/slice';

export interface QuizPayload {
  name: string;
  time: number;
  questions: DoQuizQuestionPayload[];
}

interface Props {
  isReview?: boolean;
  initData: QuizPayload;
  id: number;
}

export default function DoQuizReviewList({
  isReview = false,
  initData,
  id,
}: Props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<QuizPayload>(initData);
  const { mutateAsync: handleSubmitQuiz } = useSubmitQuiz();
  const { handleTryCatch } = useTryCatch('nộp bài làm');
  const [intervalValue, setIntervalValue] = useState<number>(1000);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: initData.time * 60,
      intervalMs: intervalValue,
    });

  const numberOfChosenQuestion = quiz.questions.reduce((total, item) => {
    const isQuestionChosen = item.answers.find((subItem) => subItem.isChosen);
    if (isQuestionChosen) {
      return total + 1;
    }
    return total;
  }, 0);

  const numberOfTotalQuestion = quiz.questions.length;

  const handleSubmit = async () => {
    const quizParams: PostSubmitQuizPayload = {
      status: 'DONE',
      submittedQuestions: quiz.questions.map((item) => ({
        questionId: item.id,
        answerId:
          item.answers
            .filter((subItem) => subItem.isChosen)
            .map((answers) => answers.id) || [],
      })),
    };
    await handleTryCatch(() =>
      handleSubmitQuiz({
        id,
        params: quizParams,
      })
    );
    dispatch(
      saveDataQuiz({
        quizId: 0,
        quizTime: 0,
        quizPassword: '',
        quizName: '',
      })
    );
    navigate(-1);
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

  useEffect(() => {
    startCountdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (count === 0) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

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
        timeLeft={count}
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
