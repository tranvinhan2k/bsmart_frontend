import { Box, Typography, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { ResponseMentorCoursePayload } from '~/api/courses';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import { image } from '~/constants/image';

interface MentorCourseItemProps {
  item?: any;
  isSkeleton?: boolean;
  onClick?: () => void;
}

export default function MentorCourseItem({
  item,
  isSkeleton = false,
  onClick = () => {},
}: MentorCourseItemProps) {
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
  console.log(item);

  return (
    <Stack
      sx={{
        marginTop: MetricSize.medium_15,
        marginLeft: '10px',
        border: '1px solid',
        borderColor: Color.grey,
        borderRadius: MetricSize.small_5,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        height: '600px',
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
          src={item?.images?.[0]?.url || image.noCourse}
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
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.light,
              color: Color.grey,
            }}
          >{`Mentor ${item.mentorName[0]}`}</Typography>
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

MentorCourseItem.defaultProps = {
  isSkeleton: false,
  item: undefined,
  onClick: () => {},
};
