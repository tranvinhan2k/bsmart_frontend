import { Grid, Stack, Divider, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import CarouselCourse from '~/components/molecules/CarouselCourse';
import { CommonCourse, mockLevelData } from '~/constants';
import Sidebar from '~/containers/CourseDetailSection/Sidebar';
import { useEffectScrollToTop } from '~/hooks';
import globalStyles from '~/styles';
import Classes from '~/components/molecules/list/Classes';
import Content from '~/components/molecules/Content';
import ImageSlider from '~/components/atoms/ImageSlider';
import { useQueryGetDetailUserCourse } from '~/hooks/course/useQueryGetDetailUserCourse';
import { formatStringToNumber } from '~/utils/number';
import CourseDetail from '~/components/molecules/CourseDetail';

export default function CourseDetailPage() {
  const params = useParams();
  const { id } = params;

  const { data, error, isLoading } = useQueryGetDetailUserCourse(
    formatStringToNumber(id)
  );
  const course = data?.course;
  // const course: CoursePayload = {
  //   images: [
  //     {
  //       id: 0,
  //       name: 'image',
  //       status: true,
  //       type: 'COURSE',
  //       url: image.mockClass,
  //     },
  //     {
  //       id: 1,
  //       name: 'image',
  //       status: true,
  //       type: 'COURSE',
  //       url: image.mockClass,
  //     },
  //     {
  //       id: 2,
  //       name: 'image',
  //       status: true,
  //       type: 'COURSE',
  //       url: image.mockClass,
  //     },
  //   ],
  //   id: 0,
  //   level: 'ADVANCED',
  //   mentorName: ['Lưu Quang Nhật'],
  //   status: 'NOTSTART',
  //   subject: optionSubjects[0],
  //   totalClass: 30,
  //   category: optionCategories[0],
  //   courseCode: 'asdsa321',
  //   courseName: 'Lập trình nhúng Python từ cở bản đến nâng cao',
  //   courseDescription:
  //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit officiis ipsa ipsum magnam consequatur, sed nisi perspiciatis et a aliquid aliquam optio quos amet quod expedita odit facilis mollitia natus? ',
  // };

  const mentor: {
    name: string;
    imageUrl: string;
    description: string;
  } = {
    name: course?.mentorName[0] || '',
    imageUrl: course?.mentorAvatar || '',
    description: course?.courseDescription || '',
  };
  const classes = data?.classes;
  // const classes: DetailCourseClassPayload[] = [
  //   {
  //     id: '0',
  //     code: 'hhhh',
  //     endDate: new Date().toISOString(),
  //     imageAlt: 'logo',
  //     imageUrl: image.mockClass,
  //     maxStudent: 30,
  //     minStudent: 15,
  //     numberOfSlot: 30,
  //     price: 120000,
  //     startDate: new Date().toISOString(),
  //     timeInWeekRequests: [
  //       {
  //         dayOfWeekId: 1,
  //         slotId: 1,
  //       },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     code: 'hhhh',
  //     endDate: new Date().toISOString(),
  //     imageAlt: 'logo',
  //     imageUrl: image.mockClass,
  //     maxStudent: 30,
  //     minStudent: 15,
  //     numberOfSlot: 30,
  //     price: 120000,
  //     startDate: new Date().toISOString(),
  //     timeInWeekRequests: [
  //       {
  //         dayOfWeekId: 1,
  //         slotId: 1,
  //       },
  //     ],
  //   },
  //   {
  //     id: '3',
  //     code: 'hhhh',
  //     endDate: new Date().toISOString(),
  //     imageAlt: 'logo',
  //     imageUrl: image.mockClass,
  //     maxStudent: 30,
  //     minStudent: 15,
  //     numberOfSlot: 30,
  //     price: 120000,
  //     startDate: new Date().toISOString(),
  //     timeInWeekRequests: [
  //       {
  //         dayOfWeekId: 1,
  //         slotId: 1,
  //       },
  //     ],
  //   },
  //   {
  //     id: '4',
  //     code: 'hhhh',
  //     endDate: new Date().toISOString(),
  //     imageAlt: 'logo',
  //     imageUrl: image.mockClass,
  //     maxStudent: 30,
  //     minStudent: 15,
  //     numberOfSlot: 30,
  //     price: 120000,
  //     startDate: new Date().toISOString(),
  //     timeInWeekRequests: [
  //       {
  //         dayOfWeekId: 1,
  //         slotId: 1,
  //       },
  //     ],
  //   },
  // ];
  const sections = data?.content;
  // const sections: SectionPayload[] = [
  //   {
  //     id: 0,
  //     name: 'Giới thiệu kiểm thử 1',
  //     modules: [
  //       {
  //         id: 0,
  //         name: 'Giới thiệu kiểm thử 1',
  //       },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     name: 'Giới thiệu kiểm thử 2',
  //     modules: [
  //       {
  //         id: 0,
  //         name: 'Giới thiệu kiểm thử 2',
  //       },
  //       {
  //         id: 1,
  //         name: 'Giới thiệu kiểm thử 3',
  //       },
  //     ],
  //   },
  // ];

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
              {/* <CourseDetailBasicInformationSection
                id={Number(id)}
                mentorData={mentor}
                percentOfFeedback={courseDetail?.feedbackData.percentOfFeedback}
                numOfRating={courseDetail?.feedbackData.numOfRating}
                numOfRegisterStudent={courseDetail?.numOfRegisterStudent}
                numOfOpenClass={courseDetail?.numOfOpenClass}
                openDate={courseDetail?.openDate}
                description={courseDetail?.content}
                field={courseDetail?.field}
                subCourse={subCourses}
              /> */}
              {/* <CourseDetailFeedbackSection feedbackData={data.feedbackData} /> */}

              <CourseDetail
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
              />
            </Grid>
          </Grid>
        </Stack>
      </LoadingWrapper>
    </Stack>
  );
}
