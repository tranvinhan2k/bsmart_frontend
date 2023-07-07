import { Stack, Typography } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { ColorKeys } from '~/models/variables';

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
    <Stack
      sx={{
        position: 'relative',
        background: color,
        padding: MetricSize.small_10,
        borderRadius: MetricSize.small_5,
        boxShadow: 3,
        height: undefined,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          color: Color.white,
          padding: MetricSize.small_5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: FontSize.extraLarge_70,
            fontFamily: FontFamily.light,
          }}
          textAlign="center"
        >
          {value || '0'}
        </Typography>
      </Stack>
      <Typography
        sx={{
          color: Color.white,
          fontSize: FontSize.small_18,
          fontFamily: FontFamily.bold,
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
}
