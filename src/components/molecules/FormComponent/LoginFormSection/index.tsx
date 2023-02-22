import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stack, Typography, Box } from '@mui/material';
import { defaultValueSignIn } from '~/form/defaultValues';
import { validationSchemaSignIn } from '~/form/validation';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';
import { SIGN_IN_FIELDS } from '~/form/schema';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Checkbox from '~/components/atoms/Checkbox';
import Link from '~/components/atoms/Link';
import FormInput from '~/components/atoms/FormInput';
import { LoginFormDataPayload } from '~/models/form';

const LoginTexts = {
  LOGIN_TITLE: 'Đăng Nhập',
  EMAIL_PLACEHOLDER: 'Email',
  PASSWORD_PLACEHOLDER: 'Mật Khẩu',
  REMEMBER_PASSWORD: 'Nhớ mật khẩu.',
  FORGOT_PASSWORD: 'Quên mật khẩu',
  LOGIN_BUTTON: 'Đăng Nhập',
  GOOGLE_LOGIN_BUTTON: 'Đăng nhập bằng tài khoản Google',
  REGISTER_LINK: 'Bạn chưa có tài khoản ?',
  REGISTER_BUTTON: 'Đăng kí ngay',
};

export default function LoginForm() {
  const resolverSinIn = useYupValidationResolver(validationSchemaSignIn);
  const signInHookForm = useForm({
    defaultValues: defaultValueSignIn,
    resolver: resolverSinIn,
  });
  const [isRememberPassword, setRememberPassword] = useState<boolean>(false);

  const handleRememberPassword = () => {
    setRememberPassword(!isRememberPassword);
    // TODO: handle remember password
  };

  const handleGoogle = () => {
    // TODO: handle google
  };

  const handleLoginDataSubmitSuccess = (data: LoginFormDataPayload) => {
    // TODO: handle submit login
  };

  return (
    <Stack>
      <Typography
        sx={{
          fontFamily: FontFamily.bold,
          fontSize: FontSize.medium_24,
          textAlign: 'center',
        }}
      >
        {LoginTexts.LOGIN_TITLE}
      </Typography>
      <Stack sx={{ padding: MetricSize.medium_15 }}>
        <form
          onSubmit={signInHookForm.handleSubmit(handleLoginDataSubmitSuccess)}
        >
          <Stack>
            <FormInput
              control={signInHookForm.control}
              name={SIGN_IN_FIELDS.email}
              placeholder={LoginTexts.EMAIL_PLACEHOLDER}
            />
          </Stack>

          <Stack paddingTop={2}>
            <FormInput
              control={signInHookForm.control}
              name={SIGN_IN_FIELDS.password}
              type="password"
              placeholder={LoginTexts.PASSWORD_PLACEHOLDER}
            />
          </Stack>
          <Stack
            paddingTop={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Checkbox
              isChecked={isRememberPassword}
              onCheck={handleRememberPassword}
            >
              {LoginTexts.REMEMBER_PASSWORD}
            </Checkbox>

            <Link to="/forgot_password">{LoginTexts.FORGOT_PASSWORD}</Link>
          </Stack>
          <Button marginTop="small_10" customVariant="form" type="submit">
            {LoginTexts.LOGIN_BUTTON}
          </Button>
          <Button
            marginTop="small_10"
            customVariant="google"
            onClick={handleGoogle}
          >
            {LoginTexts.GOOGLE_LOGIN_BUTTON}
          </Button>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingY: MetricSize.medium_15,
            }}
          >
            <Typography
              sx={{
                fontFamily: FontFamily.regular,
                fontSize: FontSize.small_16,
                color: Color.black,
              }}
            >
              {LoginTexts.REGISTER_LINK}
            </Typography>
            <Box sx={{ paddingLeft: MetricSize.small_5 }}>
              <Link to="/register">{LoginTexts.REGISTER_BUTTON}</Link>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
