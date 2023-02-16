import { useEffect } from 'react';

import { Stack } from '@mui/material';

import RegisterSection from '~/containers/Register/RegisterSection';

import { scrollToTop } from '~/utils/common';

import { SX_REGISTER_LAYOUT_STACK } from './styles';

export default function RegisterPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <Stack sx={SX_REGISTER_LAYOUT_STACK}>
      <RegisterSection />
    </Stack>
  );
}
