import { Stack, Button as MuiButton } from '@mui/material';
import { FontFamily } from '~/assets/variables';
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
        <MuiButton
          color="miSmartOrange"
          size="large"
          variant="outlined"
          sx={{ fontFamily: FontFamily.regular }}
        >
          Thêm câu hỏi
        </MuiButton>
      </Stack>
      <CreatedQuestionList />
    </>
  );
}
