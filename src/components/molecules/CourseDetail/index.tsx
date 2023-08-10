import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import ImageSlider from '~/components/atoms/ImageSlider';
import { CommonCourse } from '~/constants';
import { image } from '~/constants/image';
import { NavigationLink } from '~/constants/routeLink';
import { ActivityPayload, FeedbackPayload } from '~/models/type';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import globalStyles from '~/styles';
import CarouselCourse from '../CarouselCourse';
import Content from '../Content';
import Classes from '../list/Classes';
import UserCourseFeedback from '../UserCourseFeedback';

interface Props {
  images: string[];
  mentorId: number;
  mentorImageUrl: string;
  mentorName: string;
  mentorDescription: string;
  courseName: string;
  courseDescription: string;
  introduceRef: any;
  contentRef: any;
  classesRef: any;
  mentorRef: any;
  sections: ActivityPayload[];
  classes: DetailCourseClassPayload[];
}

export default function CourseDetail({
  classes,
  courseDescription,
  courseName,
  images,
  mentorDescription,
  mentorId,
  mentorImageUrl,
  mentorName,
  introduceRef,
  contentRef,
  classesRef,
  mentorRef,
  sections,
}: Props) {
  const [error, setError] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);

  const mentorDetailsLink = `/${NavigationLink.mentor_menu_details}/${mentorId}`;
  const navigate = useNavigate();
  const handleNavigateMentorDetails = () => {
    navigate(mentorDetailsLink);
  };

  return (
    <Stack>
      <ImageSlider slides={images || []} />
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
            cursor: 'pointer',
          }}
          component="img"
          alt="avatar"
          onError={() => setError(true)}
          onClick={handleNavigateMentorDetails}
          src={!error ? mentorImageUrl : image.noAvatar}
        />
        <Stack marginTop={2}>
          <Typography sx={globalStyles.textLowSmallLight}>
            Khóa học của{' '}
            <Link
              href={mentorDetailsLink}
              sx={{
                fontFamily: FontFamily.medium,
                fontSize: FontSize.small_14,
                color: Color.black,
              }}
              underline="hover"
            >{`${mentorName}`}</Link>
          </Typography>
        </Stack>
        <Stack marginTop={2}>
          <Typography
            sx={{
              lineHeight: 0.98,
              fontSize: FontSize.large_45,
              fontFamily: FontFamily.dosis,
            }}
          >
            {courseName}
          </Typography>
          <Stack ref={classesRef}>
            <Typography sx={globalStyles.textCourseSmallLabel}>
              Danh sách lớp học
            </Typography>
            <Stack marginTop={1}>
              <Classes classes={classes} />
            </Stack>
          </Stack>
          <Divider sx={{ marginY: 3 }} />

          <Stack ref={introduceRef}>
            <Typography sx={globalStyles.textCourseSmallLabel}>
              Mô tả khóa học
            </Typography>
            <Stack
              sx={{
                padding: 2,
                borderRadius: MetricSize.small_5,
                border: '1px solid #ddd',
              }}
            >
              <Stack
                sx={{
                  transition: 'all 500ms ease',
                  position: 'relative',
                  maxHeight: !openDescription ? '300px' : '100%',
                  overflow: 'hidden',
                }}
              >
                <Stack
                  sx={{
                    transition: 'all 500ms ease',
                    opacity: openDescription ? 0 : 1,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: `linear-gradient(0deg, ${Color.white} 0%, rgba(253,187,45,0) 100%)`,
                  }}
                />
                <Typography
                  marginTop={1}
                  sx={globalStyles.textSmallLight}
                  dangerouslySetInnerHTML={{
                    __html: courseDescription,
                  }}
                />
              </Stack>
              <Button
                onClick={() => setOpenDescription(!openDescription)}
                variant="text"
              >
                {openDescription ? 'Thu Gọn' : 'Xem Thêm'}
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Divider sx={{ marginY: 0 }} />
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

        <Stack ref={contentRef}>
          <Typography sx={globalStyles.textCourseSmallLabel}>
            Khung chương trình
          </Typography>
          <Stack
            sx={{
              marginTop: 1,
              borderRadius: MetricSize.small_5,
            }}
          >
            <Content readOnly sections={sections || []} />
          </Stack>
        </Stack>
        <Divider sx={{ marginY: 3 }} />

        <Stack ref={mentorRef}>
          <Typography sx={globalStyles.textCourseSmallLabel}>
            Về giáo viên
          </Typography>
          <Stack marginTop={1} sx={globalStyles.viewRoundedBorderBody}>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  borderRadius: 1000,
                  boxShadow: 1,
                  width: '50px',
                  aspectRatio: 1,
                  height: undefined,
                  objectFit: 'cover',
                  background: Color.white,
                  marginRight: 1,
                  cursor: 'pointer',
                }}
                component="img"
                alt="giao vien"
                onError={() => setError(true)}
                onClick={handleNavigateMentorDetails}
                src={!error ? mentorImageUrl : image.noAvatar}
              />
              <Link
                href={mentorDetailsLink}
                sx={globalStyles.textSmallLabel}
                underline="hover"
              >{`${mentorName}`}</Link>
            </Stack>
            <Stack marginY={2}>
              <Typography
                sx={globalStyles.textSmallLight}
                dangerouslySetInnerHTML={{
                  __html: mentorDescription,
                }}
              />
            </Stack>
          </Stack>
        </Stack>
        <Divider sx={{ marginY: 2 }} />
        <Stack>
          <Typography sx={globalStyles.textCourseSmallLabel}>
            Đánh giá từ học sinh
          </Typography>
          <UserCourseFeedback />
        </Stack>
        <Divider sx={{ marginY: 4 }} />

        <Stack>
          <CarouselCourse label="Khóa học tiêu biểu" />
        </Stack>
      </Stack>
    </Stack>
  );
}
