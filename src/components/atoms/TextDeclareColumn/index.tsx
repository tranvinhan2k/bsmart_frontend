import { Stack, Typography } from '@mui/material';
import { FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { ColorKeys } from '~/models/variables';

interface TextDeclareColumnProps {
  title: string;
  value: string;
  color: ColorKeys;
}

export default function TextDeclareColumn({
  title,
  value,
  color,
}: TextDeclareColumnProps) {
  return (
    <Stack>
      <Typography
        sx={{
          color,
          fontSize: FontSize.small_18,
          fontFamily: FontFamily.light,
        }}
      >
        {title}
      </Typography>
      <Stack
        sx={{
          color,
          padding: MetricSize.small_5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: FontSize.medium_28,
            fontFamily: FontFamily.light,
          }}
          textAlign="center"
        >
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
}
