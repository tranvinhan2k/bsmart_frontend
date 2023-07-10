import { Grid, Stack, Divider, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import CarouselCourse from '~/components/molecules/CarouselCourse';
import { CommonCourse, mockLevelData } from '~/constants';
import { image } from '~/constants/image';
import Sidebar from '~/containers/CourseDetailSection/Sidebar';
import {
  useDispatchGetAllCategories,
  useDispatchGetAllSubjects,
  useEffectScrollToTop,
  useTimeOut,
  useTryCatch,
} from '~/hooks';
import globalStyles from '~/styles';
import { DetailCourseClassPayload } from '../MentorCourseDetailPage';
import Classes from '~/components/molecules/list/Classes';
import { SectionPayload } from '~/models/section';
import Content from '~/components/molecules/Content';
import ImageSlider from '~/components/atoms/ImageSlider';
import { LevelKeys } from '~/models/variables';
import { CoursePayload } from '~/models/type';
import { useQueryGetDetailUserCourse } from '~/hooks/course/useQueryGetDetailUserCourse';
import { formatStringToNumber } from '~/utils/number';

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

              <Stack>
                <ImageSlider slides={course?.images || []} />
                <Stack
                  paddingX={5}
                  sx={{
                    marginTop: '-60px',
                  }}
                >
                  <Box
                    sx={{
                      width: '120px',
                      height: undefined,
                      aspectRatio: 1,
                      borderRadius: MetricSize.small_5,
                      background: Color.white,
                      boxShadow: 3,
                      zIndex: 2,
                      objectFit: 'cover',
                    }}
                    component="img"
                    alt="avatar"
                    src={mentor.imageUrl}
                  />
                  <Stack marginTop={2}>
                    <Typography sx={globalStyles.textLowSmallLight}>
                      Khóa học của
                      <span
                        style={{
                          fontFamily: FontFamily.medium,
                          fontSize: FontSize.small_14,
                          color: Color.black,
                        }}
                      >
                        {` ${mentor.name}`}
                      </span>
                    </Typography>
                  </Stack>
                  <Stack marginTop={2}>
                    <Typography
                      sx={{
                        lineHeight: 0.98,
                        fontSize: FontSize.large_45,
                        fontFamily: FontFamily.regular,
                      }}
                    >
                      {course?.courseName}
                    </Typography>
                    <Stack marginY={3}>
                      <Typography sx={globalStyles.textSmallLight}>
                        {course?.courseDescription}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  paddingX={5}
                  sx={{
                    marginTop: 2,
                  }}
                >
                  {/* <Stack marginBottom={3}>
                    <iframe
                      style={{
                        width: '100%',
                        height: undefined,
                        aspectRatio: 16 / 9,
                      }}
                      src="https://www.youtube-nocookie.com/embed/ZaVG2p-T9O4"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </Stack>
                  <Stack marginTop={1}>
                    <Typography sx={globalStyles.textSmallLabel}>
                      Kiến thức học được
                    </Typography>
                    <Typography sx={globalStyles.textSmallLight}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Fugit officiis ipsa ipsum magnam consequatur, sed nisi
                      perspiciatis et a aliquid aliquam optio quos amet quod
                      expedita odit facilis mollitia natus?
                    </Typography>
                  </Stack>
                  <Divider sx={{ marginY: 4 }} /> */}
                  <>
                    <Stack>
                      <Typography sx={globalStyles.textSmallLabel}>
                        Khung chương trình
                      </Typography>
                      <Stack
                        sx={{
                          marginTop: 1,
                          paddingX: 2,
                          background: Color.white,
                          borderRadius: MetricSize.small_5,
                        }}
                      >
                        <Content sections={sections || []} />
                      </Stack>
                    </Stack>
                    <Divider sx={{ marginY: 3 }} />
                  </>
                  <Stack>
                    <Typography sx={globalStyles.textSmallLabel}>
                      Danh sách lớp học
                    </Typography>
                    <Stack marginTop={1}>
                      <Classes classes={classes} />
                    </Stack>
                  </Stack>
                  <Divider sx={{ marginY: 4 }} />
                  <>
                    <Stack>
                      <Typography sx={globalStyles.textSmallLabel}>
                        Về giáo viên
                      </Typography>
                      <Stack
                        sx={{
                          marginTop: 1,
                        }}
                      >
                        <Stack
                          sx={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: 1000,
                              width: '50px',
                              aspectRatio: 1,
                              height: undefined,
                              objectFit: 'cover',
                              background: Color.white,
                              marginRight: 1,
                            }}
                            component="img"
                            alt="giao vien"
                            src={mentor.imageUrl}
                          />
                          <Typography sx={globalStyles.textSmallLight}>
                            {mentor.name}
                          </Typography>
                        </Stack>
                        <Stack marginY={1}>
                          <Typography sx={globalStyles.textSmallLight}>
                            {mentor.description}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Divider sx={{ marginY: 4 }} />
                  </>
                  <Stack>
                    <CarouselCourse
                      label="Khóa học tiêu biểu"
                      items={CommonCourse}
                    />
                  </Stack>
                </Stack>
              </Stack>
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
