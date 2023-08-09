import { Stack, Box, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Color, FontSize, FontFamily } from '~/assets/variables';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';

interface Props {
  onSubmit: () => void;
  name: string;
  numberOfChosenQuestion: number;
  numberOfTotalQuestion: number;
  isReview: boolean;
}

export default function QuizFooter({
  name,
  numberOfChosenQuestion,
  numberOfTotalQuestion,
  isReview,
  onSubmit,
}: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleCLose = () => {
    setOpen(!open);
  };

  return (
    <Stack>
      {!isReview && (
        <Box
          sx={{
            marginTop: 4,
            paddingX: 4,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Button onClick={handleCLose} variant="contained" color="success">
            Nộp bài làm
          </Button>
        </Box>
      )}
      <Stack
        sx={{
          display: { xs: 'flex', md: 'none' },
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
            {name}
          </Stack>
          <Stack
            sx={{
              marginTop: 1,
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.regular,
              color: Color.grey,
            }}
          >
            {`${numberOfChosenQuestion}/${numberOfTotalQuestion} câu đã được chọn`}
          </Stack>
        </Stack>
        {!isReview ? (
          <Button onClick={handleCLose} variant="contained" color="success">
            Nộp bài làm
          </Button>
        ) : (
          <Button onClick={() => navigate(-1)} variant="contained">
            Trở về
          </Button>
        )}
        <ConfirmDialog
          open={open}
          handleAccept={onSubmit}
          handleClose={handleCLose}
          title="Xác nhận nộp bài kiểm tra ?"
          content="Bài làm của bạn sẽ được nộp cho giáo viên của bạn. Bạn có chắc chắn nộp bài kiểm tra này không ?"
        />
      </Stack>
    </Stack>
  );
}
