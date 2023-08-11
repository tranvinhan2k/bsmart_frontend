import { Button, Stack } from '@mui/material';
import moment from 'moment-timezone';
import { closeUrl, openNewBrowserUrl } from '~/utils/window';

export default function TextSection() {
  let browser: Window | null;

  const handleOpenUrl = () => {
    browser = window.open(
      'https://www.youtube.com/',
      '_blank',
      'height=500, width=500'
    );
  };

  const handleClose = () => {
    browser?.close();
  };

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <Stack
      sx={{
        minHeight: '100vh',
      }}
    >
      {`${new Date()} : ${tz}`}
    </Stack>
  );
}
