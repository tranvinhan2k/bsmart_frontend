import { Stack, Typography } from '@mui/material';
import { FontFamily, FontSize } from '~/assets/variables';

interface TextLineProps {
  label: string;
  variable: string | undefined;
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
          fontFamily: FontFamily.medium,
          fontSize: FontSize.small_14,
        }}
      >
        {`${label}`}
      </Typography>
      <Typography
        sx={{
          fontFamily: FontFamily.light,
          fontSize: FontSize.small_14,
        }}
      >
        {`${variable}`}
      </Typography>
    </Stack>
  );
}
