import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  Colors,
  FontFamilies,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';
import close from '~/assets/images/icons8_multiply_52px.png';
import { SIGN_IN_FIELDS } from '~/form/schema';

import Button from '~/components/atoms/Button';
import Checkbox from '~/components/atoms/Checkbox';
import Link from '~/components/atoms/Link';
import FormInput from '~/components/atoms/FormInput';
import { SX_MODAL_CONTAINER } from './styles';

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
  const [isRememberPassword, setRememberPassword] = useState<boolean>(false);
  const handleGoogle = () => {
    // TODO: add google features
  };
  const handleRememberPassword = () => {
    setRememberPassword(!isRememberPassword);
    // TODO: add remember password features
  };

  const handleForgotPassword = () => {};

  return (
    <Modal
      open={visible}
      onClose={onClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={SX_MODAL_CONTAINER}>
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
              fontSize: FontSize.medium_24,
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
                <FormInput
                  control={hookForm.control}
                  name={SIGN_IN_FIELDS.email}
                  placeholder="Email"
                />
              </Stack>

              <Stack paddingTop={2}>
                <FormInput
                  control={hookForm.control}
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
              <Button marginTop="small_10" customVariant="form" type="submit">
                Đăng nhập
              </Button>
              <Button
                marginTop="small_10"
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
                    fontSize: FontSize.small_16,
                    color: Colors.black,
                  }}
                >
                  Bạn chưa có tài khoản ?
                </Typography>
                <Box sx={{ paddingLeft: MetricSize.small_5 }}>
                  <Link to="/register">Đăng ký ngay</Link>
                </Box>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
