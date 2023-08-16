import { Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import InputGroup, { InputData } from '~/components/atoms/FormInput/InputGroup';
import {
  FeedbackTemplateTypeData,
  FeedbackTypeOptionList,
  RoleOptionList,
} from '~/constants';
import { CREATE_TEMPLATE_FIELDS } from '~/form/schema';
import { validationSchemaCreateTemplate } from '~/form/validation';
import { useYupValidationResolver } from '~/hooks';
import { useQueryGetAllQuestion } from '~/hooks/useQueryGetAllQuestions';
import globalStyles from '~/styles';

interface CreateTemplateFormProps {
  onSubmit: any;
}

export default function CreateTemplateForm({
  onSubmit,
}: CreateTemplateFormProps) {
  const { error, feedbackQuestion, isLoading } = useQueryGetAllQuestion();
  const resolver = useYupValidationResolver(validationSchemaCreateTemplate);
  const createTemplateForm = useForm({
    defaultValues: {},
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
        minWidth: '70vw',
      }}
    >
      <InputGroup
        control={createTemplateForm.control}
        inputList={InputFormData}
      />
      <Stack marginTop={2}>
        <Button
          customVariant="form"
          onClick={createTemplateForm.handleSubmit(onSubmit)}
        >
          Tạo bản mẫu
        </Button>
      </Stack>
    </Stack>
  );
}
