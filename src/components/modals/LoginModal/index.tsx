import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Link,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { NavLink } from 'react-router-dom';
import {
  Colors,
  Common,
  FontFamilies,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';
import close from '~/assets/images/icons8_multiply_52px.png';
import { SIGN_IN_FIELDS } from '~/form/schema';

import google from '~/assets/images/icons8_google_480px.png';

interface LoginModalProps {
  visible: boolean;
  hookForm: UseFormReturn;
  onClick: () => void;
}

export default function LoginModal({
  visible,
  hookForm,
  onClick,
}: LoginModalProps) {
  return (
    <Modal
      open={visible}
      onClose={onClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          borderRadius: Common.borderRadius,
          background: Colors.white,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          padding: MetricSize.large,
        }}
      >
        <Stack sx={{ width: '100%', alignItems: 'flex-end' }}>
          <IconButton onClick={onClick} sx={{ alignSelf: 'right' }}>
            <img
              src={close}
              alt="close button"
              style={{ width: IconSize.small, height: IconSize.small }}
            />
          </IconButton>
        </Stack>
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
              onSubmit={hookForm.handleSubmit((data) => {
                console.log(data);
              })}
            >
              <Stack>
                <FormControl>
                  <input
                    style={{
                      borderRadius: Common.borderRadius,
                      borderColor: Colors.neutral,
                      borderWidth: 1,
                      padding: MetricSize.sm_medium,
                      fontFamily: FontFamilies.regular,
                      fontSize: FontSize.small,
                    }}
                    type="text"
                    placeholder="Email"
                    {...hookForm.register(SIGN_IN_FIELDS.email)}
                  />
                  {hookForm?.formState?.errors?.[SIGN_IN_FIELDS.email] && (
                    <FormHelperText error>
                      {`${
                        hookForm.formState.errors[SIGN_IN_FIELDS.email]?.message
                      }`}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>

              <Stack paddingTop={2}>
                <FormControl>
                  <input
                    style={{
                      borderRadius: Common.borderRadius,
                      borderColor: Colors.neutral,
                      borderWidth: 1,
                      padding: MetricSize.sm_medium,
                      fontFamily: FontFamilies.regular,
                      fontSize: FontSize.small,
                    }}
                    type="password"
                    placeholder="Mật khẩu"
                    {...hookForm.register(SIGN_IN_FIELDS.password)}
                  />
                  {hookForm?.formState?.errors?.[SIGN_IN_FIELDS.password] && (
                    <FormHelperText error>
                      {`${
                        hookForm.formState.errors[SIGN_IN_FIELDS.password]
                          ?.message
                      }`}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>
              <Stack
                paddingTop={1}
                flexDirection="row"
                justifyContent="space-between"
              >
                <Stack flexDirection="row">
                  <input type="checkbox" />
                  <Typography
                    sx={{
                      fontFamily: FontFamilies.regular,
                      fontSize: FontSize.small,
                      color: Colors.grey,
                    }}
                  >
                    Nhớ mật khẩu
                  </Typography>
                </Stack>
                <NavLink
                  to="/forgot_password"
                  style={{ textDecoration: 'none' }}
                >
                  <Stack
                    sx={{
                      fontFamily: FontFamilies.regular,
                      fontSize: FontSize.small,
                      color: Colors.orange,
                    }}
                  >
                    Quên mật khẩu ?
                  </Stack>
                </NavLink>
              </Stack>
              <Button
                sx={{
                  marginTop: MetricSize.medium,
                  background: Colors.orange,
                  fontFamily: FontFamilies.bold,
                  fontSize: FontSize.small,
                  width: '100%',
                  color: Colors.white,
                }}
                variant="contained"
                type="submit"
              >
                Đăng nhập
              </Button>
              <Button
                sx={{
                  marginTop: MetricSize.medium,
                  background: Colors.white,
                  fontFamily: FontFamilies.bold,
                  fontSize: FontSize.small,
                  color: Colors.black,
                  width: '100%',
                  justifyContent: 'space-between',
                }}
                variant="contained"
                type="submit"
              >
                <Stack sx={{ alignSelf: 'flex-start' }}>
                  <img
                    src={google}
                    alt="google"
                    style={{ width: IconSize.medium, height: IconSize.medium }}
                  />
                </Stack>
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
                  <NavLink to="/register" style={{ textDecoration: 'none' }}>
                    <Typography
                      sx={{
                        fontFamily: FontFamilies.regular,
                        fontSize: FontSize.small,
                        color: Colors.orange,
                      }}
                    >
                      Đăng ký ngay
                    </Typography>
                  </NavLink>
                </Box>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
