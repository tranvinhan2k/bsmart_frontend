import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaEditMentorProfile } from '~/form/validation';
import { defaultValuesEditMentorProfile } from '~/form/defaultValues';
import FormInput from '~/components/atoms/FormInput';
import Button from '~/components/atoms/Button';

export default function QuestionBankInnerUpdate() {
  const resolverEditPersonalProfile = useYupValidationResolver(
    validationSchemaEditMentorProfile
  );
  const { control } = useForm({
    defaultValues: defaultValuesEditMentorProfile,
    resolver: resolverEditPersonalProfile,
  });

  const types = [
    { id: 0, value: 'Aiken format', label: 'Định dạng Aiken' },
    { id: 1, value: 'Blackboard', label: 'Định dạng Blackboard' },
  ];

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12}>
        <FormInput
          control={control}
          data={types}
          name="type"
          variant="dropdown"
          label="Định dạng file"
          placeholder="Chọn định dạng file"
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput variant="file" control={control} name="file" label="File" />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <Button type="submit" customVariant="normal" size="small">
          Tải lên
        </Button>
      </Grid>
    </Grid>
  );
}
