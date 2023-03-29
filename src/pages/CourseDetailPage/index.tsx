import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MetricSize } from '~/assets/variables';
import LazyLoadingScreen from '~/components/atoms/LazyLoadingScreen';
import CarouselCourse from '~/components/molecules/CarouselCourse';
import { CommonCourse } from '~/constants';
import CourseDetailBasicInformationSection from '~/containers/CourseDetailSection/CourseDetailBasicInformationSection';
import {
  useQueryGetCourseDetailByCourseId,
  useQueryGetMentorByMentorId,
  useQueryGetSubCourseByCourseId,
} from '~/hooks';
import { scrollToTop } from '~/utils/common';

export default function CourseDetailPage() {
  const params = useParams();
  const { id } = params;

  const { error, courseDetail, isLoading } =
    useQueryGetCourseDetailByCourseId(id);
  const { subCourses } = useQueryGetSubCourseByCourseId(id);
  const { mentor } = useQueryGetMentorByMentorId(
    courseDetail?.mentorData.id,
    Boolean(courseDetail?.mentorData.id)
  );

  useEffect(() => {
    scrollToTop();
  }, []);

  if (error) {
    return (
      <Stack
        sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography>{`${error}`}</Typography>
      </Stack>
    );
  }

  if (!courseDetail) return null;

  return isLoading ? (
    <Stack sx={{ height: '100vh' }}>
      <LazyLoadingScreen />
    </Stack>
  ) : (
    <Stack>
      <Grid
        container
        sx={{
          gridAutoFlow: 'dense',
          padding: { xs: MetricSize.medium_15, md: '70px' },
        }}
      >
        <Grid item xs={12} md={12} sx={{ padding: MetricSize.medium_15 }}>
          <CourseDetailBasicInformationSection
            id={Number(id)}
            mentorData={mentor}
            percentOfFeedback={courseDetail.feedbackData.percentOfFeedback}
            numOfRating={courseDetail.feedbackData.numOfRating}
            numOfRegisterStudent={courseDetail.numOfRegisterStudent}
            numOfOpenClass={courseDetail.numOfOpenClass}
            openDate={courseDetail.openDate}
            description={courseDetail.content}
            field={courseDetail.field}
            subCourse={subCourses}
          />
          {/* <CourseDetailFeedbackSection feedbackData={data.feedbackData} /> */}
        </Grid>
        {/* <Grid sx={{ order: { xs: -1, md: 1 } }} item xs={12} md={4}>
            <CourseDetailSidebarSection
              image={data.image}
              unitPrice={data.unitPrice}
            />
          </Grid> */}
      </Grid>
      <Stack
        sx={{
          padding: { xs: MetricSize.medium_15, md: '70px' },
        }}
      >
        <CarouselCourse label="Khóa học tiêu biểu" items={CommonCourse} />
      </Stack>
    </Stack>
  );
}
