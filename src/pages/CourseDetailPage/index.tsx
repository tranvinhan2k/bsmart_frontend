import { Grid, Stack, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Color, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import LazyLoadingScreen from '~/components/atoms/LazyLoadingScreen';
import CarouselCourse from '~/components/molecules/CarouselCourse';
import { CommonCourse } from '~/constants';
import CourseDetailBasicInformationSection from '~/containers/CourseDetailSection/CourseDetailBasicInformationSection';
import {
  useQueryGetCourseDetailByCourseId,
  useQueryGetMentorByMentorId,
  useQueryGetSubCourseByCourseId,
} from '~/hooks';
import globalStyles from '~/styles';
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
        <Grid item xs={12} md={3}>
          <Stack
            sx={{
              position: 'sticky',
              top: '80px',
              margin: 2,
              background: Color.white,
              borderRadius: MetricSize.small_5,
              boxShadow: 2,
              paddingY: 4,
            }}
          >
            <Stack
              sx={{
                paddingX: 4,
              }}
            >
              <Typography sx={globalStyles.textSubTitle}>Mục lục</Typography>
              <Divider />
            </Stack>
            {[
              {
                id: 0,
                name: 'Giới thiệu khóa học',
                link: 'introduce-code',
              },
              {
                id: 1,
                name: 'Giảng viên',
                link: 'mentor',
              },
              {
                id: 2,
                name: 'Khóa học tiêu biểu',
                link: 'popular-course',
              },
            ].map((item) => {
              return (
                <Stack
                  sx={{
                    paddingY: MetricSize.small_10,
                    paddingX: 4,
                    ':hover': {
                      background: Color.whiteSmoke,
                      cursor: 'pointer',
                    },
                  }}
                  key={item.id}
                >
                  <Typography sx={globalStyles.textSmallLight}>
                    {item.name}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Grid>
        <Grid item xs={12} md={9} sx={{ padding: MetricSize.medium_15 }}>
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
          <Stack
            sx={{
              padding: { xs: MetricSize.medium_15, md: '70px' },
            }}
          >
            <CarouselCourse label="Khóa học tiêu biểu" items={CommonCourse} />
          </Stack>
        </Grid>
        {/* <Grid sx={{ order: { xs: -1, md: 1 } }} item xs={12} md={4}>
            <CourseDetailSidebarSection
              image={data.image}
              unitPrice={data.unitPrice}
            />
          </Grid> */}
      </Grid>
    </Stack>
  );
}
