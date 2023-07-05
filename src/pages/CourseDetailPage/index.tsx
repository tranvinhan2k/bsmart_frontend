import { Grid, Stack, Divider, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '~/HOCs/LoadingWrapper';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import LazyLoadingScreen from '~/components/atoms/LazyLoadingScreen';
import CarouselCourse from '~/components/molecules/CarouselCourse';
import { CommonCourse, mockLevelData } from '~/constants';
import { image } from '~/constants/image';
import CourseDetailBasicInformationSection from '~/containers/CourseDetailSection/CourseDetailBasicInformationSection';
import Sidebar from '~/containers/CourseDetailSection/Sidebar';
import {
  useEffectScrollToTop,
  useQueryGetCourseDetailByCourseId,
  useQueryGetMentorByMentorId,
  useQueryGetSubCourseByCourseId,
  useTimeOut,
  useTryCatch,
} from '~/hooks';
import { OptionPayload } from '~/models';
import globalStyles from '~/styles';
import { scrollToTop } from '~/utils/common';

export default function CourseDetailPage() {
  const params = useParams();
  const { id } = params;

  const { onSleep } = useTimeOut(1000);
  const { handleTryCatch, error, isLoading } = useTryCatch();

  // const { error, courseDetail, isLoading } =
  //   useQueryGetCourseDetailByCourseId(id);
  // const { subCourses } = useQueryGetSubCourseByCourseId(id);
  // const { mentor } = useQueryGetMentorByMentorId(
  //   courseDetail?.mentorData.id,
  //   Boolean(courseDetail?.mentorData.id)
  // );

  // const course = {
  //   percentOfFeedback={courseDetail?.feedbackData.percentOfFeedback}
  //   numOfRating={courseDetail?.feedbackData.numOfRating}
  //   numOfRegisterStudent={courseDetail?.numOfRegisterStudent}
  //   numOfOpenClass={courseDetail?.numOfOpenClass}
  //   openDate={courseDetail?.openDate}
  //   description={courseDetail?.content}
  //   field={courseDetail?.field}
  // }
  // const mentor ;
  // const classes;

  const course: {
    price: number;
    numOfSlot: number;
    level: OptionPayload;
    startDate: string;
    endDate: string;
    categoryName: string;
    subjectName: string;
    image: string;
    name: string;
    description: string;
    knowledge: string;
  } = {
    categoryName: 'Front End',
    endDate: new Date().toISOString(),
    level: mockLevelData[0],
    numOfSlot: 30,
    price: 120000,
    startDate: new Date().toISOString(),
    subjectName: 'Java',
    image: image.mockClass,
    name: 'Lập trình nhúng Python từ cở bản đến nâng cao',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit officiis ipsa ipsum magnam consequatur, sed nisi perspiciatis et a aliquid aliquam optio quos amet quod expedita odit facilis mollitia natus? ',
    knowledge:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit officiis ipsa ipsum magnam consequatur, sed nisi perspiciatis et a aliquid aliquam optio quos amet quod expedita odit facilis mollitia natus? ',
  };

  const mentor: {
    name: string;
    imageUrl: string;
    description;
  } = {
    name: 'Trần Văn Anh',
    imageUrl: image.noAvatar,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit officiis ipsa ipsum magnam consequatur, sed nisi perspiciatis et a aliquid aliquam optio quos amet quod expedita odit facilis mollitia natus? ',
  };

  useEffectScrollToTop();

  useEffect(() => {
    handleTryCatch(() => onSleep(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                <Box
                  sx={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 16 / 9,
                    objectFit: 'cover',
                    background: Color.grey,
                    borderRadius: MetricSize.small_10,
                  }}
                  component="img"
                  alt="ảnh nền khóa học"
                  src={image.mockClass}
                />
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
                      {course.name}
                    </Typography>
                    <Stack marginY={3}>
                      <Typography sx={globalStyles.textSmallLight}>
                        {course.description}
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
                  <Stack marginBottom={3}>
                    <iframe
                      style={{
                        width: '100%',
                        height: undefined,
                        aspectRatio: 16 / 9,
                      }}
                      src="https://www.youtube.com/embed/ZaVG2p-T9O4"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    />
                  </Stack>
                  {course.knowledge && (
                    <>
                      <Stack marginTop={1}>
                        <Typography sx={globalStyles.textSmallLabel}>
                          Kiến thức học được
                        </Typography>
                        <Typography sx={globalStyles.textSmallLight}>
                          {course.knowledge}
                        </Typography>
                      </Stack>
                      <Divider sx={{ marginY: 4 }} />
                    </>
                  )}
                  <>
                    <Stack>
                      <Typography sx={globalStyles.textSmallLabel}>
                        Khung chương trình
                      </Typography>
                      <Stack
                        sx={{
                          marginTop: 1,
                          background: Color.white,
                          padding: 2,
                          borderRadius: MetricSize.small_5,
                        }}
                      >
                        Hello
                      </Stack>
                    </Stack>
                    <Divider sx={{ marginY: 4 }} />
                  </>
                  <Stack>
                    <Typography sx={globalStyles.textSmallLabel}>
                      Danh sách lớp học
                    </Typography>
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
                              objectFit: 'contain',
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
                  <Stack
                    sx={{
                      marginLeft: -1,
                    }}
                  >
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
                categoryName={course?.categoryName}
                endDate={course?.endDate}
                level={course?.level}
                numOfSlot={course?.numOfSlot}
                price={course?.price}
                startDate={course?.startDate}
                subjectName={course?.subjectName}
              />
            </Grid>
          </Grid>
        </Stack>
      </LoadingWrapper>
    </Stack>
  );
}
