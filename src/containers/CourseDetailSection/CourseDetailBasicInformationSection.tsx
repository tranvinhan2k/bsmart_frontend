import { Box, Chip, Divider, Rating, Stack, Typography } from '@mui/material';
import { MentorPayload } from '~/models/mentor';
import {
  Color,
  Common,
  FontFamily,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';

import mentor from '~/assets/images/avatar-mentor-1.jpg';
import { SubCoursePayload } from '~/models/subCourse';
import { PagingFilterPayload } from '~/models';
import SubCourseList from '~/components/molecules/SubCourseList';

interface CourseDetailBasicInformationSectionProps {
  id: number | undefined;
  mentorData: MentorPayload | undefined;
  percentOfFeedback: number;
  numOfRating: number;
  numOfRegisterStudent: number;
  numOfOpenClass: number;
  openDate: string;
  description: string;
  field: string;
  subCourse: PagingFilterPayload<SubCoursePayload> | undefined;
}

export default function CourseDetailBasicInformationSection({
  id,
  description,
  mentorData,
  numOfOpenClass,
  numOfRating,
  numOfRegisterStudent,
  openDate,
  percentOfFeedback,
  field,
  subCourse,
}: CourseDetailBasicInformationSectionProps) {
  const handleShareCourse = () => [];

  return (
    <Stack>
      <Stack
        sx={{
          marginX: { md: '120px' },
        }}
      >
        {subCourse && <SubCourseList courseId={id} data={subCourse} />}
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: 1,
        }}
      >
        {mentorData && (
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              alt="mentor avatar"
              src={mentorData?.avatar || mentor}
              sx={{
                width: IconSize.large,
                height: IconSize.large,
                borderRadius: Common.borderCircle,
              }}
            />
            <Stack
              sx={{
                flexDirection: 'row',
                paddingLeft: MetricSize.medium_15,
                fontSize: FontSize.small_16,
                fontFamily: FontFamily.regular,
                color: Color.grey,
              }}
            >
              <Typography>by</Typography>
              <Typography
                sx={{
                  fontSize: FontSize.small_16,
                  fontFamily: FontFamily.bold,
                  color: Color.black,
                  paddingLeft: MetricSize.small_5,
                }}
              >
                {mentorData?.name || 'Giáo Viên Bsmart'}
              </Typography>
            </Stack>
          </Stack>
        )}
        {/* <Stack sx={{ flexDirection: 'row' }}>
          <Rating color={Color.orange} readOnly value={percentOfFeedback} />
          <Typography
            sx={{ fontSize: FontSize.small_16, fontFamily: FontFamily.regular }}
          >{`(${numOfRating} Ratings)`}</Typography>
        </Stack> */}
        {/* <Stack>
          <Button onClick={handleShareCourse}>
            <Stack
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Icon name="share" size="small" color="navy" />
              <Typography
                sx={{
                  fontFamily: FontFamily.regular,
                  fontSize: FontSize.small_16,
                  paddingX: MetricSize.small_5,
                }}
              >
                Chia sẻ
              </Typography>
            </Stack>
          </Button>
        </Stack> */}
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: MetricSize.medium_15,
        }}
      >
        <Typography
          sx={{ fontSize: FontSize.small_16, fontFamily: FontFamily.regular }}
        >
          Lĩnh vực:
        </Typography>
        <Chip
          sx={{
            marginLeft: MetricSize.medium_15,
            fontSize: FontSize.small_16,
            fontFamily: FontFamily.regular,
            color: Color.grey,
          }}
          label={field}
        />
      </Stack>

      {/* <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: MetricSize.medium_15,
          flexWrap: 'wrap',
        }}
      >
        <Typography
          sx={{
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_16,
            color: Color.orange,
          }}
        >
          {`Số lượng học viên đăng ký : ${numOfRegisterStudent}`}
        </Typography>
        <Typography
          sx={{
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_16,
            color: Color.orange,
          }}
        >
          {`Số lượng lớp đang mở : ${numOfOpenClass}`}
        </Typography>
        <Typography
          sx={{
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_16,
            color: Color.orange,
          }}
        >
          {`Ngày khai giảng lớp học mới: ${formatDate(openDate)}`}
        </Typography>
      </Stack> */}
      <Divider sx={{ marginTop: MetricSize.large_20 }} />
      <Stack>
        <Typography
          sx={{
            fontFamily: FontFamily.bold,
            fontSize: FontSize.small_16,
            marginTop: MetricSize.medium_15,
          }}
        >
          Miêu tả khóa học
        </Typography>
        <Typography
          sx={{
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_16,
            marginTop: MetricSize.medium_15,
            color: Color.grey,
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
}
