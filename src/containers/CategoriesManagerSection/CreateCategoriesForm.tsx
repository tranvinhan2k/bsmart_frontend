import { Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { defaultValueCreateCategory } from '~/form/defaultValues';
import { CREATE_CATEGORY_FIELDS } from '~/form/schema';
import { validationSchemaCreateCategories } from '~/form/validation';
import { useYupValidationResolver } from '~/hooks';
import globalStyles from '~/styles';

interface CreateCategoriesFormProps {
  onSubmit: (data: any) => void;
}

export default function CreateCategoriesForm({
  onSubmit,
}: CreateCategoriesFormProps) {
  const resolverSignIn = useYupValidationResolver(
    validationSchemaCreateCategories
  );
  const createCategoryForm = useForm({
    defaultValues: defaultValueCreateCategory,
    resolver: resolverSignIn,
  });

  return (
    <Stack>
      <Typography textAlign="center" sx={globalStyles.textSubTitle}>
        Tạo môn học
      </Typography>
      <Stack marginTop={1} />
      <FormInput
        control={createCategoryForm.control}
        name={CREATE_CATEGORY_FIELDS.code}
        placeholder="Nhập mã môn học"
      />
      <Stack marginTop={1} />
      <FormInput
        control={createCategoryForm.control}
        name={CREATE_CATEGORY_FIELDS.name}
        placeholder="Nhập tên môn học"
      />
      <Stack marginTop={1} />
      <Button
        variant="contained"
        onClick={createCategoryForm.handleSubmit(onSubmit)}
      >
        Tạo môn học
      </Button>
    </Stack>
  );
}
