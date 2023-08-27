import { Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { defaultValueCreateCategory } from '~/form/defaultValues';
import { CREATE_SUBJECT_FIELDS } from '~/form/schema';
import { validationSchemaCreateCategories } from '~/form/validation';
import { useDispatchGetAllCategories, useYupValidationResolver } from '~/hooks';
import globalStyles from '~/styles';

interface CreateSubjectsFormProps {
  onSubmit: (data: any) => void;
}

export default function CreateSubjectsForm({
  onSubmit,
}: CreateSubjectsFormProps) {
  const resolverSignIn = useYupValidationResolver(
    validationSchemaCreateCategories
  );
  const createSubjectForm = useForm({
    defaultValues: defaultValueCreateCategory,
    resolver: resolverSignIn,
  });

  const { optionCategories: categories } = useDispatchGetAllCategories();

  return (
    <Stack>
      <Typography textAlign="center" sx={globalStyles.textSubTitle}>
        Tạo môn học
      </Typography>
      <form onSubmit={createSubjectForm.handleSubmit(onSubmit)}>
        <FormInput
          label="Mã môn học"
          control={createSubjectForm.control}
          name={CREATE_SUBJECT_FIELDS.code}
          placeholder="Nhập mã môn học"
        />
        <Stack marginTop={1} />
        <FormInput
          label="Tên môn học"
          control={createSubjectForm.control}
          name={CREATE_SUBJECT_FIELDS.name}
          placeholder="Nhập tên môn học"
        />
        <Stack marginTop={1} />
        <FormInput
          label="Chọn lĩnh vực"
          data={categories}
          variant="multiSelect"
          control={createSubjectForm.control}
          name={CREATE_SUBJECT_FIELDS.categoryId}
          placeholder="Nhập lĩnh vực"
        />
        <Stack marginTop={1} />
        <Button customVariant="normal" type="submit">
          Tạo môn học
        </Button>
      </form>
    </Stack>
  );
}
