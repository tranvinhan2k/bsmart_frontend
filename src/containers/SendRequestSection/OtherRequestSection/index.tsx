import { Box, Divider, Typography } from '@mui/material';
import { SX_FORM, SX_FORM_TITLE } from './style';

export default function OtherRequestSection() {
  const enum Text {
    sectionLabel = 'Loại đơn khác',
  }

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {Text.sectionLabel}
      </Typography>
    </Box>
  );
}
