import { Alert, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { LoadingWrapper } from '~/HOCs';
import { Color, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import InputGroup, { InputData } from '~/components/atoms/FormInput/InputGroup';
import {
  validationResetPassword,
  validationSendMailForgotPassword,
} from '~/form/validation';
import {
  useMutationResetPassword,
  useMutationSendMailResetPassword,
  useQueryConfirmToken,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import { useBoolean } from '~/hooks/useBoolean';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';

export default function ForgotPasswordPage() {
  const { codeId } = useParams();
  const { value, toggle } = useBoolean(false);
  const resolver = useYupValidationResolver(validationSendMailForgotPassword);
  const { control, handleSubmit } = useForm({
    resolver,
  });
  const resolverPassword = useYupValidationResolver(validationResetPassword);
  const { control: controlPassword, handleSubmit: handleSubmitPassword } =
    useForm({
      resolver: resolverPassword,
    });

  const { mutateAsync: handleSendMail } = useMutationSendMailResetPassword();
  const { mutateAsync: handleResetPassword } = useMutationResetPassword();
  const {
    error,
    isLoading,
    data: isConfirmed,
  } = useQueryConfirmToken(codeId || '');
  const { handleTryCatch } = useTryCatch('gửi mail xác nhận');
  const { handleTryCatch: handleTryCatchResetPassword } =
    useTryCatch('đổi mật khẩu');
  const onSubmitEmail = async (data: any) => {
    await handleTryCatch(async () => {
      await handleSendMail(data.email);
      toggle();
    });
  };

  const onResetPassword = async (data: any) => {
    await handleTryCatchResetPassword(async () =>
      handleResetPassword({
        token: codeId,
        params: {
          password: data.newPassword,
        },
      })
    );
    toggle();
  };

  const inputs: InputData[] = [
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
          transtion: '500ms all ease',
          padding: 3,
          background: Color.white,
          borderRadius: MetricSize.small_5,
          minWidth: '50vw',
        }}
      >
        {
          // eslint-disable-next-line no-nested-ternary
          codeId ? (
            // eslint-disable-next-line no-nested-ternary
            isConfirmed ? (
              value ? (
                <Alert severity="info">
                  Mật khẩu đã được thay đổi thành công
                </Alert>
              ) : (
                <Stack>
                  <LoadingWrapper isLoading={isLoading} error={error}>
                    <Stack>
                      <Typography
                        textAlign="center"
                        sx={globalStyles.textSmallLabel}
                      >
                        Quên mật khẩu
                      </Typography>
                      <InputGroup
                        control={controlPassword}
                        inputList={inputs}
                      />
                      <Button
                        onClick={handleSubmitPassword(
                          onResetPassword,
                          handleConsoleError
                        )}
                        variant="contained"
                        sx={{ marginTop: 1 }}
                      >
                        Đổi mật khẩu
                      </Button>
                    </Stack>
                  </LoadingWrapper>
                </Stack>
              )
            ) : (
              <Stack>Token nhập vào khong chính xác</Stack>
            ) // eslint-disable-next-line no-nested-ternary
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
