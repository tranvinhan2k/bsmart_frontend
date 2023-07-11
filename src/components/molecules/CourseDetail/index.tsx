import { Stack, Box, Typography, Divider } from '@mui/material';
import { MetricSize, Color, FontFamily, FontSize } from '~/assets/variables';
import ImageSlider from '~/components/atoms/ImageSlider';
import { CommonCourse } from '~/constants';
import globalStyles from '~/styles';
import CarouselCourse from '../CarouselCourse';
import Content from '../Content';
import Classes from '../list/Classes';
import { SectionPayload } from '~/models/section';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';

interface Props {
  images: string[];
  mentorImageUrl: string;
  mentorName: string;
  mentorDescription: string;
  courseName: string;
  courseDescription: string;
  sections: SectionPayload[];
  classes: DetailCourseClassPayload[];
}

export default function CourseDetail({
  classes,
  courseDescription,
  courseName,
  images,
  mentorDescription,
  mentorImageUrl,
  mentorName,
  sections,
}: Props) {
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
          }}
          component="img"
          alt="avatar"
          src={mentorImageUrl}
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
              {` ${mentorName}`}
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
            {courseName}
          </Typography>
          <Stack marginY={3}>
            <Typography sx={globalStyles.textSmallLight}>
              {courseDescription}
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
                  src={mentorImageUrl}
                />
                <Typography sx={globalStyles.textSmallLight}>
                  {mentorName}
                </Typography>
              </Stack>
              <Stack marginY={1}>
                <Typography sx={globalStyles.textSmallLight}>
                  {mentorDescription}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Divider sx={{ marginY: 4 }} />
        </>
        <Stack>
          <CarouselCourse label="Khóa học tiêu biểu" items={CommonCourse} />
        </Stack>
      </Stack>
    </Stack>
  );
}
