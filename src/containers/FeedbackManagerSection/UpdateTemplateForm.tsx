import { Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import InputGroup, { InputData } from '~/components/atoms/FormInput/InputGroup';
import { FeedbackTemplateTypeData } from '~/constants';
import { validationSchemaCreateTemplate } from '~/form/validation';
import { useYupValidationResolver } from '~/hooks';
import globalStyles from '~/styles';

interface UpdateTemplateFormProps {
  row: any;
  onSubmit: any;
}

export default function UpdateTemplateForm({
  row,
  onSubmit,
}: UpdateTemplateFormProps) {
  const resolver = useYupValidationResolver(validationSchemaCreateTemplate);
  const createTemplateForm = useForm({
    defaultValues: {
      name: row.name,
      type: FeedbackTemplateTypeData.find((item) => item.value === row.type),
      questions:
        row.questions.map((item: any, index: number) => ({
          question: item.question,
          answerType: item.answerType,
          answers: item.answers,
          id: index,
        })) || [],
    },
    resolver,
  });

  const InputFormData: InputData[] = [
    {
      name: 'name',
      label: 'Tên bản mẫu',
      placeholder: 'Nhập tên bản mẫu',
      variant: 'text',
    },
    {
      name: 'type',
      label: 'Loại bản mẫu',
      placeholder: 'Nhập loại bản mẫu',
      variant: 'dropdown',
      data: FeedbackTemplateTypeData,
    },
    {
      name: 'questions',
      label: 'Danh sách câu hỏi',
      placeholder: 'Nhập danh sách câu hỏi',
      variant: 'feedbackQuestionChoice',
    },
  ];

  return (
    <Stack
      sx={{
        minWidth: '60vw',
        padding: 1,
      }}
    >
      <Typography sx={globalStyles.textSubTitle}>Cập nhật bản mẫu</Typography>

      <InputGroup
        control={createTemplateForm.control}
        inputList={InputFormData}
      />

      <Stack marginTop={2}>
        <Button
          customVariant="form"
          onClick={createTemplateForm.handleSubmit(onSubmit)}
        >
          Cập nhật bản mẫu
        </Button>
      </Stack>
    </Stack>
  );
}
