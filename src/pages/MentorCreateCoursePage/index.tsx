import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Color, MetricSize } from '~/assets/variables';
import CreateCourseForm from '~/components/molecules/FormComponent/CreateCourseForm';
import globalStyles from '~/styles';
import { scrollToTop } from '~/utils/common';

export default function MentorCreateCoursePage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: Color.whiteSmoke,
        borderRadius: MetricSize.small_10,
        padding: MetricSize.medium_15,
        boxShadow: 3,
      }}
    >
      <Typography
        textAlign="center"
        padding={MetricSize.small_10}
        sx={globalStyles.textSubTitle}
      >
        Tạo khóa học mới
      </Typography>
      <CreateCourseForm />
    </Box>
  );
}
