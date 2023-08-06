import { Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Color, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import globalStyles from '~/styles';

export default function ForgotPasswordPage() {
  const { control, handleSubmit } = useForm();

  const onSubmit = () => {};

  return (
    <Stack
      sx={{
        padding: 3,
        minHeight: '100vh',

        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          padding: 3,
          background: Color.white,
          borderRadius: MetricSize.small_5,
          minWidth: '50vw',
        }}
      >
        <Typography textAlign="center" sx={globalStyles.textSmallLabel}>
          Quên mật khẩu
        </Typography>
        <Stack marginY={2}>
          <FormInput
            control={control}
            name="email"
            label="Thêm email của bạn"
            placeholder="Nhập email của bạn"
          />
        </Stack>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Gửi xác nhận mật khẩu tới email của bạn
        </Button>
      </Stack>
    </Stack>
  );
}
