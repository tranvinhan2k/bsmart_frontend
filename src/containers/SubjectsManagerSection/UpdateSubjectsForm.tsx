import { Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { UPDATE_SUBJECT_FIELDS } from '~/form/schema';
import { validationSchemaUpdateSubjects } from '~/form/validation';
import { useQueryGetAllCategories, useYupValidationResolver } from '~/hooks';
import globalStyles from '~/styles';

interface UpdateSubjectsFormProps {
  row: { id: number; code: string; name: string; categoryId: any };
  onSubmit: (data: any) => void;
}

export default function UpdateSubjectsForm({
  row,
  onSubmit,
}: UpdateSubjectsFormProps) {
  const resolverSignIn = useYupValidationResolver(
    validationSchemaUpdateSubjects
  );

  const { categories } = useQueryGetAllCategories();

  const updateCategoryForm = useForm({
    defaultValues: {
      code: row.code,
      name: row.name,
      categoryId: row.categoryId,
    },
    resolver: resolverSignIn,
  });

  return (
    <Stack>
      <Typography textAlign="center" sx={globalStyles.textSubTitle}>
        Cập nhật môn học
      </Typography>
      <form onSubmit={updateCategoryForm.handleSubmit(onSubmit)}>
        <FormInput
          control={updateCategoryForm.control}
          name={UPDATE_SUBJECT_FIELDS.code}
          placeholder="Nhập mã ngôn ngữ lập trình"
        />
        <FormInput
          control={updateCategoryForm.control}
          name={UPDATE_SUBJECT_FIELDS.name}
          placeholder="Nhập tên ngôn ngữ lập trình"
        />
        <FormInput
          data={categories}
          variant="dropdown"
          control={updateCategoryForm.control}
          name={UPDATE_SUBJECT_FIELDS.categoryId}
          placeholder="Nhập môn học"
        />
        <Button customVariant="normal" type="submit">
          Cập nhật môn học
        </Button>
      </form>
    </Stack>
  );
}
