import { Stack, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultValueSignIn } from '~/form/defaultValues';
import { validationSchemaSignIn } from '~/form/validation';
import { SIGN_IN_FIELDS } from '~/form/schema';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Checkbox from '~/components/atoms/Checkbox';
import Link from '~/components/atoms/Link';
import FormInput from '~/components/atoms/FormInput';
import { LoginFormDataPayload } from '~/models/form';
import toast from '~/utils/toast';
import {
  useMutationLogin,
  useMutationProfile,
  useYupValidationResolver,
} from '~/hooks';
import { Role } from '~/models/role';
import { LoginRequestPayload } from '~/models/api/auth';
import { ResponseProfilePayload } from '~/api/users';
import { signIn } from '~/redux/user/slice';

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
  const resolverSignIn = useYupValidationResolver(validationSchemaSignIn);
  const signInHookForm = useForm({
    defaultValues: defaultValueSignIn,
    resolver: resolverSignIn,
  });
  const [isRememberPassword, setRememberPassword] = useState<boolean>(
    localStorage.getItem('isRememberPassword') === 'true'
  );

  const handleGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
    },
  });

  const handleRememberPassword = () => {
    setRememberPassword(!isRememberPassword);
    // TODO: handle remember password
  };

  /* Login with be swagger */
  const { mutateAsync } = useMutationLogin();
  const navigate = useNavigate();
  const getProfileMutation = useMutationProfile();
  const dispatch = useDispatch();

  const handleLoginDataSubmitSuccess = async (data: LoginFormDataPayload) => {
    const params: LoginRequestPayload = {
      email: data.email,
      password: data.password,
    };

    const id = toast.loadToast('Đang đăng nhập...');
    try {
      const signInData = await mutateAsync(params);
      localStorage.setItem('token', signInData.token);
      localStorage.setItem('roles', signInData.roles[0]);

      const responseProfile = await getProfileMutation.mutateAsync();

      const requestProfile: {
        token: string;
        roles: Role;
        profile: ResponseProfilePayload;
      } = {
        token: signInData.token,
        roles: signInData.roles[0],
        profile: responseProfile,
      };
      dispatch(signIn(requestProfile));
      if (isRememberPassword) {
        localStorage.setItem('username', data.email);
        localStorage.setItem('password', data.password);
        localStorage.setItem('isRememberPassword', 'true');
      } else {
        localStorage.setItem('username', '');
        localStorage.setItem('password', '');
        localStorage.setItem('isRememberPassword', 'false');
      }
      signInHookForm.reset();
      toast.updateSuccessToast(id, 'Đăng nhập thành công!');
      navigate('/homepage');
    } catch (error: any) {
      toast.updateFailedToast(
        id,
        `Đăng nhập không thành công: ${error.message}`
      );
    }
  };
  // const token = useSelector((state: RootState) => state.user.token);
  // ('token', token);

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
              variant="password"
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
            onClick={() => handleGoogle()}
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
