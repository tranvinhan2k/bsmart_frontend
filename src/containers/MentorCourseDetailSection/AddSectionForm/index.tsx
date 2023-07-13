import { Stack, Typography, Button } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { Color, FontSize, FontFamily } from '~/assets/variables';
import FormInput from '~/components/atoms/FormInput';

interface Props {
  hookForm: UseFormReturn<any, any>;
  onSubmit: (data: any) => void;
}

export default function AddSectionForm({ hookForm, onSubmit }: Props) {
  return (
    <Stack
      sx={{
        transition: 'all 1000ms ease',
        background: Color.whiteSmoke,
      }}
    >
      <Typography
        sx={{
          fontSize: FontSize.small_16,
          fontFamily: FontFamily.medium,
        }}
      >
        Thêm nội dung học phần
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
          Tạo học phần
        </Button>
      </Stack>
    </Stack>
  );
}
