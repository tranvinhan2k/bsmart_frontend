import { Alert, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Color, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import InputGroup, { InputData } from '~/components/atoms/FormInput/InputGroup';
import {
  validationClassContentModule,
  validationSendMailForgotPassword,
} from '~/form/validation';
import {
  useGetIdFromUrl,
  useMutationSendMailResetPassword,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import { useBoolean } from '~/hooks/useBoolean';
import globalStyles from '~/styles';

export default function ForgotPasswordPage() {
  const code = useGetIdFromUrl('codeId');
  const { value, toggle } = useBoolean(false);
  const resolver = useYupValidationResolver(validationSendMailForgotPassword);
  const { control, handleSubmit } = useForm({
    resolver,
  });

  const { mutateAsync: handleSendMail } = useMutationSendMailResetPassword();
  const { error, handleTryCatch, isLoading } = useTryCatch('gửi mail xác nhận');
  const onSubmitEmail = async (data: any) => {
    await handleTryCatch(async () => {
      await handleSendMail(data.email);
      toggle();
    });
  };

  const inputs: InputData[] = [
    {
      name: 'password',
      label: 'Mật khẩu cũ',
      placeholder: 'Nhập mật khẩu cũ',
      variant: 'password',
    },
    {
      name: 'newPassword',
      label: 'Mật khẩu mới',
      placeholder: 'Nhập mật khẩu mới',
      variant: 'password',
    },
    {
      name: 'confirm',
      label: 'Xác nhận mật khẩu',
      placeholder: 'Nhập xác nhận mật khẩu',
      variant: 'password',
    },
  ];

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
          minHeight: '30vh',
        }}
      >
        {
          // eslint-disable-next-line no-nested-ternary
          code ? (
            <Stack>
              <Typography textAlign="center" sx={globalStyles.textSmallLabel}>
                Quên mật khẩu
              </Typography>
              <InputGroup control={control} inputList={inputs} />
              <Button variant="contained" sx={{ marginTop: 1 }}>
                Đổi mật khẩu
              </Button>
            </Stack>
          ) : value ? (
            <Alert severity="info">
              Email xác nhận đã được gửi tới email của bạn. Vui lòng kiểm tra
              email và xác nhận thay đổi mật khẩu
            </Alert>
          ) : (
            <Stack>
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
              <Button variant="contained" onClick={handleSubmit(onSubmitEmail)}>
                Gửi xác nhận mật khẩu tới email của bạn
              </Button>
            </Stack>
          )
        }
      </Stack>
    </Stack>
  );
}
