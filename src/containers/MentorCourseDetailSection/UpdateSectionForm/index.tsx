import { Stack, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Color, FontSize, FontFamily } from '~/assets/variables';
import FormInput from '~/components/atoms/FormInput';
import { validationClassContentSection } from '~/form/validation';
import { useYupValidationResolver } from '~/hooks';

interface Props {
  section: {
    name: string;
  };
  onSubmit: (data: any) => void;
}

export default function UpdateSectionForm({ section, onSubmit }: Props) {
  const resolver = useYupValidationResolver(validationClassContentSection);

  const hookForm = useForm({
    resolver,
    defaultValues: section,
  });

  return (
    <Stack
      sx={{
        transition: 'all 1000ms ease',
        marginTop: 1,
        background: Color.whiteSmoke,
      }}
    >
      <Typography
        sx={{
          fontSize: FontSize.small_16,
          fontFamily: FontFamily.medium,
          marginBottom: 1,
        }}
      >
        Cập nhật
      </Typography>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        <Stack sx={{ flexGrow: 1, marginRight: 1 }}>
          <FormInput
            placeholder="Nhập tên phần học muốn tạo"
            name="name"
            control={hookForm.control}
          />
        </Stack>
        <Button
          color="secondary"
          sx={{
            color: Color.white,
          }}
          onClick={hookForm.handleSubmit(onSubmit)}
          variant="contained"
        >
          Cập nhật
        </Button>
      </Stack>
    </Stack>
  );
}
