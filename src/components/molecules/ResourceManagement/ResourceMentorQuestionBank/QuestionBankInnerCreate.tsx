import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '~/components/atoms/FormInput';
import { validationSchemaEditMentorProfile } from '~/form/validation';
import { defaultValueEditMentorProfile } from '~/form/defaultValues';
import { useYupValidationResolver } from '~/hooks';

export default function QuestionBankInnerCreate() {
  const resolverEditPersonalProfile = useYupValidationResolver(
    validationSchemaEditMentorProfile
  );
  const { control } = useForm({
    defaultValues: defaultValueEditMentorProfile,
    resolver: resolverEditPersonalProfile,
  });

  const types = [
    { id: 0, value: 'Trắc nghiệm', label: 'Trắc nghiệm' },
    { id: 1, value: 'Tự luận', label: 'Tự luận' },
  ];

  return (
    <>
      <Typography>Loại câu hỏi</Typography>
      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <FormInput
            control={control}
            data={types}
            name="type"
            variant="dropdown"
            placeholder="Chọn loại câu hỏi"
          />
        </Grid>
      </Grid>
    </>
  );
}
