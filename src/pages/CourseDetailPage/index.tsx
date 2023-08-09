import { Grid, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';
import { MetricSize } from '~/assets/variables';
import { mockLevelData } from '~/constants';
import Sidebar from '~/containers/CourseDetailSection/Sidebar';
import {
  useEffectScrollToTop,
  useGetCourseFeedback,
  useGetIdFromUrl,
  useScrollIntoView,
} from '~/hooks';
import { useQueryGetDetailUserCourse } from '~/hooks/course/useQueryGetDetailUserCourse';
import { formatStringToNumber } from '~/utils/number';
import CourseDetail from '~/components/molecules/CourseDetail';

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
  const {
    data: feedbacks,
    handleChangeNumberOfStar,
    handleChangePage,
  } = useGetCourseFeedback(id);

  const levelOptionPayload = mockLevelData.find(
    (item) => item.value === course?.level
  );

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
                mentorId={mentor.id}
                mentorImageUrl={mentor.imageUrl}
                mentorName={mentor.name}
                sections={sections || []}
                feedbackError={error}
                feedbacks={
                  feedbacks || {
                    items: {
                      currentPage: 0,
                      first: false,
                      items: [],
                      last: false,
                      pageItemSize: 0,
                      pageSize: 0,
                      totalItems: 0,
                      totalPages: 0,
                    },
                    numberOfRating: 0,
                    rating: 0,
                  }
                }
                isFeedbackLoading={isLoading}
                onFeedbackChangePage={handleChangePage}
                onFeedbackChangeStar={handleChangeNumberOfStar}
              />
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
