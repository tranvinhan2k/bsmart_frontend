import { Grid, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';
import { MetricSize } from '~/assets/variables';
import { mockLevelData } from '~/constants';
import Sidebar from '~/containers/CourseDetailSection/Sidebar';
import { useEffectScrollToTop, useScrollIntoView } from '~/hooks';
import { useQueryGetDetailUserCourse } from '~/hooks/course/useQueryGetDetailUserCourse';
import { formatStringToNumber } from '~/utils/number';
import CourseDetail from '~/components/molecules/CourseDetail';

export default function CourseDetailPage() {
  const params = useParams();
  const { id } = params;

  const introducePart = useScrollIntoView();
  const contentPart = useScrollIntoView();
  const classesPart = useScrollIntoView();
  const mentorPart = useScrollIntoView();

  const { data, error, isLoading } = useQueryGetDetailUserCourse(
    formatStringToNumber(id)
  );
  const course = data?.course;

  const mentor: {
    name: string;
    imageUrl: string;
    description: string;
  } = {
    name: course?.mentorName[0] || '',
    imageUrl: course?.mentorAvatar || '',
    description: course?.mentorDescription || '',
  };
  const classes = data?.classes;
  const sections = data?.content;

  const levelOptionPayload = mockLevelData.find(
    (item) => item.value === course?.level
  );

  useEffectScrollToTop();

  return (
    <Stack
      sx={{
        minHeight: '100vh',
      }}
    >
      <LoadingWrapper error={error} isLoading={isLoading}>
        <Stack>
          <Grid
            container
            sx={{
              gridAutoFlow: 'dense',
              padding: { xs: MetricSize.medium_15, md: '70px' },
            }}
          >
            <Grid item xs={12} md={8} sx={{ paddingX: MetricSize.medium_15 }}>
              <CourseDetail
                introduceRef={introducePart.ref}
                classesRef={classesPart.ref}
                contentRef={contentPart.ref}
                mentorRef={mentorPart.ref}
                classes={classes || []}
                courseDescription={course?.courseDescription || ''}
                courseName={course?.courseName || ''}
                images={course?.images || []}
                mentorDescription={mentor.description}
                mentorImageUrl={mentor.imageUrl}
                mentorName={mentor.name}
                sections={sections || []}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Sidebar
                level={course?.level || 'BEGINNER'}
                levelLabel={levelOptionPayload?.label || ''}
                classes={classes || []}
                categoryName={course?.category.label || ''}
                subjectName={course?.subject.label || ''}
                scrollClasses={classesPart.executeScroll}
                scrollContent={contentPart.executeScroll}
                scrollIntroduce={introducePart.executeScroll}
                scrollMentor={mentorPart.executeScroll}
              />
            </Grid>
          </Grid>
        </Stack>
      </LoadingWrapper>
    </Stack>
  );
}
