import { Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { UPDATE_SUBJECT_FIELDS } from '~/form/schema';
import { validationSchemaUpdateSubjects } from '~/form/validation';
import { useDispatchGetAllCategories, useYupValidationResolver } from '~/hooks';
import globalStyles from '~/styles';

interface UpdateSubjectsFormProps {
  row: { id: number; code: string; name: string; categoryIds: any };
  onSubmit: (data: any) => void;
}

export default function UpdateSubjectsForm({
  row,
  onSubmit,
}: UpdateSubjectsFormProps) {
  const resolverSignIn = useYupValidationResolver(
    validationSchemaUpdateSubjects
  );

  const { optionCategories: categories } = useDispatchGetAllCategories();

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
        <Stack marginTop={1} />
        <FormInput
          label="Mã môn học"
          control={updateCategoryForm.control}
          name={UPDATE_SUBJECT_FIELDS.code}
          placeholder="Nhập mã môn học"
        />
        <Stack marginTop={1} />
        <FormInput
          label="Tên môn học"
          control={updateCategoryForm.control}
          name={UPDATE_SUBJECT_FIELDS.name}
          placeholder="Nhập tên môn học"
        />
        <Stack marginTop={1} />

        <FormInput
          label="Chọn lĩnh vực"
          data={categories}
          variant="multiSelect"
          control={updateCategoryForm.control}
          name={UPDATE_SUBJECT_FIELDS.categoryId}
          placeholder="Nhập lĩnh vực"
        />
        <Stack marginTop={1} />

        <Button customVariant="normal" type="submit">
          Cập nhật môn học
        </Button>
      </form>
    </Stack>
  );
}
