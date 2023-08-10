import { Stack, Typography } from '@mui/material';
import CustomModal from '~/components/atoms/CustomModal';
import { QuizQuestionPayload } from '~/components/atoms/FormInput/QuizInput';
import TextPropLine from '~/components/atoms/texts/TextPropLine';
import { QuestionTypeOptionList } from '~/constants';
import globalStyles from '~/styles';

interface Props {
  open: boolean;
  onClose: () => void;
  question: QuizQuestionPayload;
}

export default function ViewQuizQuestions({ question, open, onClose }: Props) {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="Chi tiết bản mẫu đánh giá"
    >
      <Stack
        sx={{
          width: '100%',
        }}
      >
        <Stack>
          <Typography
            sx={{
              ...globalStyles.textSmallLabel,
              marginY: 1,
            }}
          >
            Thông tin chung
          </Typography>

          <TextPropLine
            icon="quiz"
            label="Tên câu hỏi"
            value={question.question}
          />
          <TextPropLine
            icon="quiz"
            label="Định dạng câu hỏi"
            value={
              question.questionType === 'SINGLE'
                ? 'Câu hỏi một lựa chọn'
                : 'Câu hỏi nhiều lựa chọn'
            }
          />
        </Stack>
        <Stack>
          <Typography
            sx={{
              ...globalStyles.textSmallLabel,
              marginY: 1,
            }}
          >
            Thông tin câu trả lời
          </Typography>
          {question.answers.map((item, index) => (
            <TextPropLine
              key={index}
              icon="question"
              label={item?.answer || ''}
              value={item?.right ? 'Đúng' : ''}
            />
          ))}
        </Stack>
      </Stack>
    </CustomModal>
  );
}
