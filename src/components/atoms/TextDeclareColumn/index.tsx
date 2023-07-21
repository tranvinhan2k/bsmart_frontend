import { Stack, Typography } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { ColorKeys } from '~/models/variables';
import globalStyles from '~/styles';

interface TextDeclareColumnProps {
  title: string;
  value: string;
  color: string;
}

export default function TextDeclareColumn({
  title,
  value,
  color,
}: TextDeclareColumnProps) {
  return (
    <Stack paddingRight={2}>
      <Typography
        sx={{
          fontSize: '12px',
          fontFamily: FontFamily.regular,
        }}
      >
        {title}
      </Typography>
      <Stack>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: FontSize.small_14,
            fontFamily: FontFamily.bold,
          }}
        >
          {value || '0'}
        </Typography>
      </Stack>
    </Stack>
  );
}
