import { Stack } from '@mui/material';
import { FontSize, FontFamily, Color } from '~/assets/variables';
import globalStyles from '~/styles';

interface Props {
  point: number;
  total: number;
}

export default function MarkDisplay({ point, total }: Props) {
  return (
    <Stack sx={globalStyles.viewCenter} padding={2}>
      <Stack sx={globalStyles.textSmallLabel}>Điểm số</Stack>
      <Stack
        padding={1}
        sx={{
          fontSize: FontSize.large_35,
          fontFamily: FontFamily.light,
          color: Color.black,
        }}
      >
        {`${point}/${total}`}
      </Stack>
    </Stack>
  );
}
