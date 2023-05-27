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
    imageUrl: '',
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
          borderRadius: MetricSize.small_5,
          justifyContent: 'space-between',
          height: '100%',
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
        boxShadow: 3,
        borderColor: Color.grey,
        borderRadius: MetricSize.small_5,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: MetricSize.medium_15,
        height: '800px',
      }}
    >
      <Stack>
        <Box
          loading="lazy"
          component="img"
          sx={{
            objectFit: 'fill',
            width: '100%',
            height: '300px',
            borderRadius: MetricSize.small_5,
          }}
          src={item?.imageUrl || image.noCourse}
          alt={item?.images?.[0]?.name}
        />
        <Stack sx={{ paddingX: MetricSize.medium_15 }}>
          <Typography
            sx={{
              fontSize: FontSize.medium_28,
              fontWeight: 'bold',
              fontFamily: FontFamily.bold,
            }}
          >
            {item.courseName || ''}
          </Typography>
          {/* <Typography
          sx={{
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.light,
            color: Color.grey,
          }}
        >{`Mentor ${item.mentorName[0]}`}</Typography> */}
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.light,
              color: Color.grey,
            }}
          >
            {item.courseDescription}
          </Typography>
        </Stack>
      </Stack>

      <Stack padding={1}>
        <Stack marginTop={1}>
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
