import { Box } from '@mui/material';
import { MetricSize, Color, FontFamily, FontSize } from '~/assets/variables';
import { CourseStatusList } from '~/constants';
import { CourseStatusKeys } from '~/models/variables';

interface Props {
  courseStatus: CourseStatusKeys | undefined;
}

export default function CourseStatusBar({ courseStatus }: Props) {
  if (!courseStatus) return null;
  return (
    <Box
      sx={{
        position: 'absolute',
        top: MetricSize.small_10,
        left: MetricSize.small_10,
        borderRadius: MetricSize.small_5,
        zIndex: 1,
        paddingX: 1,
        paddingY: 1,
        background: `${Color.navy}AA`,
        backdropFilter: 'blur(5px)',
        color: Color.white,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small_14,
      }}
    >
      {CourseStatusList.find((item) => item.value === courseStatus)?.label}
    </Box>
  );
}
