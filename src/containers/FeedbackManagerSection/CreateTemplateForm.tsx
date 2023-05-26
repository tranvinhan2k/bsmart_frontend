import { Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { FeedbackTypeOptionList, RoleOptionList } from '~/constants';
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

  console.log(feedbackQuestion);

  return (
    <Stack>
      <Typography sx={globalStyles.textSubTitle}>Tạo bản mẫu</Typography>
      <Stack marginTop={2}>
        <FormInput
          name={CREATE_TEMPLATE_FIELDS.templateName}
          control={createTemplateForm.control}
          label="Tên bản mẫu"
          placeholder="Nhập tên bản mẫu"
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          name={CREATE_TEMPLATE_FIELDS.questionList}
          control={createTemplateForm.control}
          label="Danh sách câu hỏi"
          placeholder="Nhập danh sách câu hỏi"
          variant="feedbackTypeChoose"
          data={feedbackQuestion}
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          name={CREATE_TEMPLATE_FIELDS.feedbackType}
          control={createTemplateForm.control}
          label="Loại đánh giá"
          data={FeedbackTypeOptionList}
          variant="dropdown"
          placeholder="Nhập loại đánh giá"
        />
      </Stack>
      <Stack marginTop={2}>
        <FormInput
          name={CREATE_TEMPLATE_FIELDS.permission}
          control={createTemplateForm.control}
          label="Vai Trò"
          placeholder="Nhập vai trò"
          variant="dropdown"
          data={RoleOptionList}
        />
      </Stack>

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
