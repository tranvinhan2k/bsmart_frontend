import { Box, Typography, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { ResponseMemberCoursePayload } from '~/api/courses';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import { image } from '~/constants/image';

interface MemberCourseItemProps {
  item?: ResponseMemberCoursePayload;
  isSkeleton?: boolean;
  onClick?: () => void;
}

export default function MemberCourseItem({
  item = {
    categoryName: '',
    courseCode: '',
    courseDescription: '',
    id: 0,
    courseName: '',
    images: [
      {
        id: 0,
        name: '',
        url: image.noCourse,
      },
    ],
    mentorName: '',
    categoryId: 0,
    subjectId: 0,
    learns: [],
    subjectName: '',
    totalSubCourse: 0,
  },
  isSkeleton = false,
  onClick = () => {},
}: MemberCourseItemProps) {
  const {
    courseDescription: content,
    images,
    mentorName: mentor,
    courseName: title,
  } = item;

  const handleNavigateCourseDetail = () => {
    onClick();
  };

  if (isSkeleton) {
    return (
      <Stack
        sx={{
          marginTop: MetricSize.medium_15,
          marginLeft: '10px',
          borderColor: Color.grey,
          width: { xs: '100%', md: '32%' },
          borderRadius: MetricSize.small_5,
          justifyContent: 'space-between',
        }}
      >
        <Skeleton height={400} />
      </Stack>
    );
  }

  return (
    <Stack
      sx={{
        marginTop: MetricSize.medium_15,
        marginLeft: '10px',
        border: '1px solid',
        borderColor: Color.grey,
        width: { xs: '100%', md: '32%' },
        borderRadius: MetricSize.small_5,
        justifyContent: 'space-between',
      }}
    >
      <Stack>
        <Box
          loading="lazy"
          component="img"
          sx={{
            objectFit: 'fill',
            width: '100%',
            height: '200px',
            borderRadius: MetricSize.small_5,
          }}
          src={images[0].url}
          alt={images[0].name}
        />
        <Stack sx={{ padding: MetricSize.medium_15 }}>
          <Typography
            sx={{
              fontSize: FontSize.medium_28,
              fontWeight: 'bold',
              fontFamily: FontFamily.bold,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.light,
              color: Color.grey,
            }}
          >{`Mentor ${mentor}`}</Typography>
          <Stack sx={{ flexDirection: 'row' }}>{item.learns[0]}</Stack>
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.regular,
            }}
          >
            {content}
          </Typography>
        </Stack>
      </Stack>

      <Stack padding={2}>
        {/* <Stack marginY={1}>
          <Rating name="size-small" defaultValue={feedback} size="small" />
        </Stack> */}
        {/* <Divider /> */}
        <Stack marginTop={2}>
          <Button onClick={handleNavigateCourseDetail} customVariant="normal">
            Xem chi tiết
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

MemberCourseItem.defaultProps = {
  isSkeleton: false,
  item: undefined,
  onClick: () => {},
};
