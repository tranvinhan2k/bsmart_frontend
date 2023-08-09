import { useForm } from 'react-hook-form';
import { Grid, Stack, Typography } from '@mui/material';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaEditMentorProfile } from '~/form/validation';
import { defaultValuesEditMentorProfile } from '~/form/defaultValues';
import FormInput from '~/components/atoms/FormInput';
import Button from '~/components/atoms/Button';
import { Color } from '~/assets/variables';
import globalStyles from '~/styles';
import InputGroup, { InputData } from '~/components/atoms/FormInput/InputGroup';

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

  const inputList: InputData[] = [
    {
      name: 'type',
      label: 'Định dạng tệp đính kèm',
      placeholder: 'Chọn định dạng tệp đính kèm',
      data: types,
      variant: 'dropdown',
    },
    {
      name: 'file',
      variant: 'file',
      label: 'Tệp đính kèm',
      placeholder: 'Nhập tệp đính kèm',
    },
  ];

  return (
    <Stack paddingY={2}>
      <Stack marginBottom={1}>
        <Typography sx={globalStyles.textSmallLabel}>
          Thêm câu hỏi từ tệp đính kèm
        </Typography>
      </Stack>
      <InputGroup inputList={inputList} control={control} />
      <Stack>
        <Button
          sx={{
            marginTop: 2,
            color: Color.white,
          }}
          type="submit"
          color="secondary"
          variant="contained"
          size="small"
        >
          Tải lên
        </Button>
      </Stack>
    </Stack>
  );
}
