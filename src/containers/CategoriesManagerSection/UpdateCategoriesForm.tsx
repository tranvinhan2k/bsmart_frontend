import { Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { UPDATE_CATEGORY_FIELDS } from '~/form/schema';
import { validationSchemaUpdateCategories } from '~/form/validation';
import { useYupValidationResolver } from '~/hooks';
import globalStyles from '~/styles';

interface UpdateCategoriesFormProps {
  row: { id: number; code: string; name: string };
  onSubmit: (data: any) => void;
}

export default function UpdateCategoriesForm({
  row,
  onSubmit,
}: UpdateCategoriesFormProps) {
  const resolverSignIn = useYupValidationResolver(
    validationSchemaUpdateCategories
  );
  const updateCategoryForm = useForm({
    defaultValues: {
      code: row.code,
      name: row.name,
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
          name={UPDATE_CATEGORY_FIELDS.code}
          placeholder="Nhập mã môn học"
        />
        <FormInput
          control={updateCategoryForm.control}
          name={UPDATE_CATEGORY_FIELDS.name}
          placeholder="Nhập tên môn học"
        />
        <Button customVariant="normal" type="submit">
          Cập nhật môn học
        </Button>
      </form>
    </Stack>
  );
}
