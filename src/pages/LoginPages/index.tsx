import { useEffect } from 'react';

import { Stack } from '@mui/material';
import LoginForm from '~/components/molecules/FormComponent/LoginForm';
import { SX_LOGIN_LAYOUT_STACK } from './styles';
import { scrollToTop } from '~/utils/common';

export default function LoginPages() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <Stack sx={SX_LOGIN_LAYOUT_STACK}>
      <LoginForm />
    </Stack>
  );
}
