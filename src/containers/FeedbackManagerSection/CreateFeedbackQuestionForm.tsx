import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { QuestionTypeOptionList } from '~/constants';
import { CREATE_FEEDBACK_QUESTION } from '~/form/schema';
import { validationSchemaFeedbackQuestion } from '~/form/validation';
import { useYupValidationResolver } from '~/hooks';
import globalStyles from '~/styles';

interface CreateFeedbackQuestionFormProps {
  onSubmit: (data: any) => void;
}

export default function CreateFeedbackQuestionForm({
  onSubmit,
}: CreateFeedbackQuestionFormProps) {
  const [showChooseAnswer, setShowChooseAnswer] = useState<boolean>(false);
  const resolverCreateFeedbackQuestion = useYupValidationResolver(
    validationSchemaFeedbackQuestion
  );
  const createFeedbackQuestionForm = useForm({
    defaultValues: {
      question: '',
    },
    resolver: resolverCreateFeedbackQuestion,
  });
  const texts = {
    title: 'Thêm câu hỏi đánh giá',
  };

  const typeWatch = createFeedbackQuestionForm.watch(
    CREATE_FEEDBACK_QUESTION.questionType
  );

  useEffect(() => {
    console.log(typeWatch);

    if (typeWatch) {
      setShowChooseAnswer(typeWatch.value === 'MULTIPLE_CHOICE');
    }
  }, [typeWatch]);

  return (
    <Stack>
      <Typography sx={globalStyles.textSubTitle}>{texts.title}</Typography>
      <FormInput
        label="Tên câu hỏi"
        placeholder="Nhập tên câu hỏi"
        control={createFeedbackQuestionForm.control}
        name={CREATE_FEEDBACK_QUESTION.question}
      />
      <Stack paddingTop={2}>
        <FormInput
          label="Loại câu hỏi"
          placeholder="Thêm loại câu hỏi"
          data={QuestionTypeOptionList}
          variant="dropdown"
          control={createFeedbackQuestionForm.control}
          name={CREATE_FEEDBACK_QUESTION.questionType}
        />
      </Stack>
      {showChooseAnswer && (
        <Stack paddingTop={2}>
          <FormInput
            variant="feedbackQuestionChoice"
            label="Danh sách câu trả lời"
            placeholder="Thêm danh sách lựa chọn"
            control={createFeedbackQuestionForm.control}
            name={CREATE_FEEDBACK_QUESTION.possibleAnswer}
          />
        </Stack>
      )}
      <Button
        marginTop="medium_15"
        customVariant="form"
        onClick={createFeedbackQuestionForm.handleSubmit(onSubmit)}
      >
        Thêm câu hỏi
      </Button>
    </Stack>
  );
}
