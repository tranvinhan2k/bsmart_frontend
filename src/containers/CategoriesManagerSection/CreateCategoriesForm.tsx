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
        Tạo lĩnh vực
      </Typography>
      <form onSubmit={createCategoryForm.handleSubmit(onSubmit)}>
        <FormInput
          control={createCategoryForm.control}
          name={CREATE_CATEGORY_FIELDS.code}
          placeholder="Nhập mã lĩnh vực"
        />
        <FormInput
          control={createCategoryForm.control}
          name={CREATE_CATEGORY_FIELDS.name}
          placeholder="Nhập tên lĩnh vực"
        />
        <Button customVariant="normal" type="submit">
          Tạo lĩnh vực
        </Button>
      </form>
    </Stack>
  );
}
