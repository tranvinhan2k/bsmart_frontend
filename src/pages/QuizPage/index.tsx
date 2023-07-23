import { Stack } from '@mui/material';
import { useState } from 'react';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import TextPropLine from '~/components/atoms/texts/TextPropLine';
import { useEffectScrollToTop } from '~/hooks';
import DoQuizQuestion, { DoQuizAnswerPayload } from './DoQuizQuestion';

export interface DoQuizQuestionPayload {
  questionContent: string;
  correctAnswerId: number[];
  isMultipleAnswer: boolean;
  answers: DoQuizAnswerPayload[];
}

const initQuiz: {
  name: string;
  time: string;
  questions: DoQuizQuestionPayload[];
} = {
  name: 'Kiểm tra kiểm thử 1',
  time: new Date('7/24/2023').toISOString(),
  questions: [
    {
      questionContent: 'Con gà hay con vịt có trước ?',
      isMultipleAnswer: true,
      answers: [
        {
          id: 0,
          value: 'Con vịt',
        },
        {
          id: 1,
          value: 'Con gà',
        },
      ],
      correctAnswerId: [0],
    },
    {
      questionContent: 'Con gà hay con vịt có trước ?',
      isMultipleAnswer: false,
      answers: [
        {
          id: 0,
          value: 'Con vịt',
        },
        {
          id: 1,
          value: 'Con gà',
        },
      ],
      correctAnswerId: [0],
    },
    {
      questionContent: 'Con gà hay con vịt có trước ?',
      isMultipleAnswer: false,
      answers: [
        {
          id: 0,
          value: 'Con vịt',
        },
        {
          id: 1,
          value: 'Con gà',
        },
      ],
      correctAnswerId: [0],
    },
    {
      questionContent: 'Con gà hay con vịt có trước ?',
      isMultipleAnswer: true,
      answers: [
        {
          id: 0,
          value: 'Con vịt',
        },
        {
          id: 1,
          value: 'Con gà',
        },
      ],
      correctAnswerId: [0],
    },
  ],
};

export default function QuizPage() {
  const [quiz, setQuiz] = useState<{
    name: string;
    time: string;
    questions: DoQuizQuestionPayload[];
  }>(initQuiz);
  useEffectScrollToTop();

  const handleChangeAnswer = (questionIndex: number, answerId: number[]) => {
    const params = quiz.questions.map((item, index) => {
      if (index === questionIndex) {
        return {
          ...item,
          correctAnswerId: answerId,
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
        paddingTop: '40px',
        paddingBottom: '100px',
      }}
    >
      <Stack
        sx={{
          paddingY: 2,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: '10',
          background: Color.white,
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          height: '40px',
        }}
      >
        <TextPropLine icon="time" label="Thời gian còn lại" value="01:00" />
      </Stack>

      <Stack padding={1}>
        {quiz.questions.map((item, index) => (
          <DoQuizQuestion
            isMultipleAnswer={item.isMultipleAnswer}
            key={index}
            answers={item.answers}
            index={index}
            onChangeAnswer={handleChangeAnswer}
            correctAnswerId={item.correctAnswerId}
            question={item.questionContent}
            total={quiz.questions.length}
          />
        ))}
      </Stack>

      <Stack
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: Color.white,
          padding: 2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack>
          <Stack
            sx={{
              marginTop: 1,
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.bold,
            }}
          >
            {quiz.name}
          </Stack>
          <Stack
            sx={{
              marginTop: 1,
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.regular,
              color: Color.grey,
            }}
          >
            40/50 câu đã được chọn
          </Stack>
        </Stack>
        <Button variant="contained" color="success">
          Nộp bài làm
        </Button>
      </Stack>
    </Stack>
  );
}
