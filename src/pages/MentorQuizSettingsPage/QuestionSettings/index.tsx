import { Stack } from '@mui/material';
import Button from '~/components/atoms/Button';
import CreatedQuestionList from './CreatedQuestionList';

export default function QuestionSettings() {
  return (
    <>
      <Stack
        direction="row-reverse"
        justifyContent="flex-start"
        alignItems="flex-start"
        mb={2}
      >
        <Button variant="outlined">Thêm câu hỏi</Button>
      </Stack>
      <CreatedQuestionList />
    </>
  );
}
