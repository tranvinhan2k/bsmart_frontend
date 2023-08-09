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
        right: 0,
        top: MetricSize.small_10,
        borderTopLeftRadius: '2px',
        borderBottomLeftRadius: '2px',
        zIndex: 1,
        paddingX: 2,
        paddingY: '5px',
        background: `#fe6132`,
      }}
    >
      <Stack sx={{ flexDirection: 'row', alignItem: 'center' }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: FontFamily.medium,
            fontSize: '12px',
            color: Color.white,
          }}
        >
          {LEVEL_LABELS[level].toUpperCase()}
        </Typography>
      </Stack>
    </Box>
  );
}
