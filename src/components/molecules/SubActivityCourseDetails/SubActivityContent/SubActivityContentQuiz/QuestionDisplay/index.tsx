import { Box, Stack } from '@mui/material';
import QuestionAnswer from './QuestionAnswer';
import QuestionTitle from './QuestionTitle';

interface QuestionDisplayProps {
  quizQuestions: any;
}

export default function QuestionDisplay({
  quizQuestions,
}: QuestionDisplayProps) {
  return (
    <Stack ml={1}>
      <Stack spacing={4}>
        {quizQuestions.map((question: any) => (
          <Box key={question.id}>
            <QuestionTitle value={question.question} />
            <Stack paddingLeft={3}>
              {question.answers.map((answer: any) => (
                <QuestionAnswer key={answer.id} value={answer.answer} />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
