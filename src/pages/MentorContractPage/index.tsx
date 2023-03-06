import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { scrollToTop } from '~/utils/common';

export default function MentorContractPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <Stack>MentorContractPage</Stack>;
}
