import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stack, Typography, Box } from '@mui/material';
import { defaultValueSignIn } from '~/form/defaultValues';
import { validationSchemaSignIn } from '~/form/validation';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';
import { SIGN_IN_FIELDS } from '~/form/schema';
import { Colors, FontFamilies, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Checkbox from '~/components/atoms/Checkbox';
import Link from '~/components/atoms/Link';
import FormInput from '~/components/atoms/FormInput';

export default function LoginForm() {
  const [isRememberPassword, setRememberPassword] = useState<boolean>(false);
  const resolverSinIn = useYupValidationResolver(validationSchemaSignIn);
  const signInHookForm = useForm({
    defaultValues: defaultValueSignIn,
    resolver: resolverSinIn,
  });

  const handleRememberPassword = () => {
    setRememberPassword(!isRememberPassword);
    // TODO: handle remember password
  };

  const handleGoogle = () => {
    // TODO: handle google
  };

  return (
    <Stack>
      <Typography
        sx={{
          fontFamily: FontFamilies.bold,
          fontSize: FontSize.medium,
          textAlign: 'center',
        }}
      >
        Đăng nhập
      </Typography>
      <Stack sx={{ padding: MetricSize.medium }}>
        <form
          onSubmit={signInHookForm.handleSubmit((data) => {
            console.log(data);
          })}
        >
          <Stack>
            <FormInput
              control={signInHookForm.control}
              name={SIGN_IN_FIELDS.email}
              placeholder="Email"
            />
          </Stack>

          <Stack paddingTop={2}>
            <FormInput
              control={signInHookForm.control}
              name={SIGN_IN_FIELDS.password}
              type="password"
              placeholder="Mật khẩu"
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
              Nhớ mật khẩu
            </Checkbox>

            <Link to="/forgot_password">Quên mật khẩu ?</Link>
          </Stack>
          <Button marginTop="sm_medium" customVariant="form" type="submit">
            Đăng nhập
          </Button>
          <Button
            marginTop="sm_medium"
            customVariant="google"
            onClick={handleGoogle}
          >
            Đăng nhập bằng tài khoản Google
          </Button>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingY: MetricSize.medium,
            }}
          >
            <Typography
              sx={{
                fontFamily: FontFamilies.regular,
                fontSize: FontSize.small,
                color: Colors.black,
              }}
            >
              Bạn chưa có tài khoản ?
            </Typography>
            <Box sx={{ paddingLeft: MetricSize.small }}>
              <Link to="/register">Đăng ký ngay</Link>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
