import { Box, Stack, Typography } from '@mui/material';
import { MetricSize, Color, FontFamily } from '~/assets/variables';
import { LEVEL_LABELS } from '~/constants/level';
import { LevelKeys } from '~/models/variables';

interface Props {
  level: LevelKeys | undefined;
}

export default function LevelBar({ level }: Props) {
  if (!level) return null;
  return (
    <Box
      sx={{
        position: 'absolute',
        right: MetricSize.small_10,
        top: MetricSize.small_10,
        borderRadius: MetricSize.small_5,
        zIndex: 1,
        padding: 1,
        background: `${Color.border}`,
      }}
    >
      <Stack sx={{ flexDirection: 'row', alignItem: 'center' }}>
        <Typography
          sx={{
            fontFamily: FontFamily.medium,
            fontSize: '13px',
          }}
        >
          {LEVEL_LABELS[level].toUpperCase()}
        </Typography>
      </Stack>
    </Box>
  );
}
