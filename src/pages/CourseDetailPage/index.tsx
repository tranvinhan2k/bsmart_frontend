import { Grid, Stack } from '@mui/material';
import { useEffect } from 'react';
import { MetricSize } from '~/assets/variables';
import CarouselCourse from '~/components/molecules/CarouselCourse';
import { CommonCourse, CourseDetailData } from '~/constants';
import CourseDetailBasicInformationSection from '~/containers/CourseDetailSection/CourseDetailBasicInformationSection';
import CourseDetailFeedbackSection from '~/containers/CourseDetailSection/CourseDetailFeedbackSection';
import CourseDetailSidebarSection from '~/containers/CourseDetailSection/CourseDetailSidebarSection';
import { scrollToTop } from '~/utils/common';

export default function CourseDetailPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  const data = CourseDetailData;
  return (
    <Stack>
      <Grid
        container
        sx={{
          gridAutoFlow: 'dense',
          padding: { xs: MetricSize.medium_15, md: '70px' },
        }}
      >
        <Grid item xs={12} md={8} sx={{ padding: MetricSize.medium_15 }}>
          <CourseDetailBasicInformationSection
            mentorData={data.mentorData}
            percentOfFeedback={data.feedbackData.percentOfFeedback}
            numOfRating={data.feedbackData.numOfRating}
            numOfRegisterStudent={data.numOfRegisterStudent}
            numOfOpenClass={data.numOfOpenClass}
            openDate={data.openDate}
            description={data.content}
            field={data.field}
          />
          <CourseDetailFeedbackSection feedbackData={data.feedbackData} />
        </Grid>
        <Grid sx={{ order: { xs: -1, md: 1 } }} item xs={12} md={4}>
          <CourseDetailSidebarSection
            image={data.image}
            unitPrice={data.unitPrice}
          />
        </Grid>
      </Grid>
      <Stack>
        <CarouselCourse label="Khóa học tiêu biểu" items={CommonCourse} />
      </Stack>
    </Stack>
  );
}