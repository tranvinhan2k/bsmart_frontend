import { Button, Stack } from '@mui/material';
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

  return (
    <Stack
      sx={{
        minHeight: '100vh',
      }}
    >
      <Button variant="contained" onClick={handleOpenUrl}>
        Open Url
      </Button>
      <Button variant="contained" onClick={handleClose}>
        CLose Url
      </Button>
    </Stack>
  );
}
