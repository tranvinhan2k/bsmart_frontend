import { Grid, Stack } from '@mui/material';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';
import { Color, MetricSize } from '~/assets/variables';
import { mockLevelData } from '~/constants';
import Sidebar from '~/containers/CourseDetailSection/Sidebar';
import { useGetIdFromUrl, useScrollIntoView } from '~/hooks';
import { useQueryGetDetailUserCourse } from '~/hooks/course/useQueryGetDetailUserCourse';
import CourseDetail from '~/components/molecules/CourseDetail';
import { image } from '~/constants/image';
import globalStyles from '~/styles';

export default function CourseDetailPage() {
  const id = useGetIdFromUrl('id');

  const introducePart = useScrollIntoView();
  const contentPart = useScrollIntoView();
  const classesPart = useScrollIntoView();
  const mentorPart = useScrollIntoView();

  const { data, error, isLoading } = useQueryGetDetailUserCourse(id);
  const course = data?.course;

  const mentor: {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
  } = {
    id: course?.mentorId || 0,
    name: course?.mentorName[0] || '',
    imageUrl: course?.mentorAvatar || '',
    description: course?.mentorDescription || '',
  };
  const classes = data?.classes;
  const sections = data?.content;

  const levelOptionPayload = mockLevelData.find(
    (item) => item.value === course?.level
  );

  return (
    <Stack
      sx={{
        minHeight: '100vh',
        background: Color.white4,
      }}
    >
      <LoadingWrapper error={error} isLoading={isLoading}>
        <Stack>
          <Grid
            container
            sx={{
              padding: { xs: MetricSize.medium_15, md: '70px' },
            }}
          >
            <Grid item xs={12} md={8} sx={{ paddingX: MetricSize.medium_15 }}>
              <Stack
                sx={{
                  ...globalStyles.viewRoundedWhiteBody,
                  paddingY: 3,
                }}
              >
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
                  mentorId={mentor.id}
                  mentorImageUrl={mentor.imageUrl}
                  mentorName={mentor.name}
                  sections={sections || []}
                />
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                order: { xs: -1, md: 1 },
              }}
            >
              <Sidebar
                courseName={course?.courseName || ''}
                courseId={course?.id || 0}
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
