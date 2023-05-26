import { Stack, Typography } from '@mui/material';
import { FontFamily, FontSize } from '~/assets/variables';

interface TextLineProps {
  label: string;
  variable: string;
}

export default function TextLine({ label, variable }: TextLineProps) {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        sx={{
          fontFamily: FontFamily.bold,
          fontSize: FontSize.small_18,
        }}
      >
        {`${label}`}
      </Typography>
      <Typography
        sx={{
          fontFamily: FontFamily.light,
          fontSize: FontSize.small_18,
        }}
      >
        {`${variable}`}
      </Typography>
    </Stack>
  );
}
