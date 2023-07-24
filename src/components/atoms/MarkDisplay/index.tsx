import { Stack } from '@mui/material';
import { FontSize, FontFamily, Color } from '~/assets/variables';
import globalStyles from '~/styles';

interface Props {
  point: number;
  total: number;
  passPoint: number;
}

export default function MarkDisplay({ passPoint, point, total }: Props) {
  const isPassed = point > passPoint;

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
      <Stack
        sx={{
          fontFamily: FontFamily.bold,
          fontSize: FontSize.small_14,
          color: isPassed ? Color.green : Color.red,
        }}
      >
        {isPassed ? 'Đã đậu' : 'Chưa đạt yêu cầu'}
      </Stack>
    </Stack>
  );
}
