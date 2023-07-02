import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { useEffect } from 'react';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import CreateCourseForm from '~/components/molecules/FormComponent/CreateCourseForm';
import { scrollToTop } from '~/utils/common';

const steps = [
  'Tạo khóa học mới',
  'Tạo thời khóa biểu',
  'Tạo nội dung môn học',
];

export default function MentorCreateCoursePage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <Box
      sx={{
        borderRadius: MetricSize.small_10,
        padding: { xs: '0', md: MetricSize.medium_15 },
        width: '100%',
      }}
    >
      <Stepper
        sx={{
          color: Color.orange,
          '.css-1m13l5j-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed': {
            color: Color.green,
          },
          '.css-1m13l5j-MuiSvgIcon-root-MuiStepIcon-root.Mui-active': {
            color: Color.orange,
          },
        }}
        activeStep={0}
        alternativeLabel
      >
        {steps.map((label) => (
          <Step
            sx={{
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.light,
            }}
            key={label}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <CreateCourseForm />
    </Box>
  );
}
