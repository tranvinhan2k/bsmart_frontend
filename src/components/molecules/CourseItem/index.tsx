import { Box, Chip, Divider, Typography, Rating, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import Button from '~/components/atoms/Button';
import { CoursePayload } from '~/models/courses';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

interface CourseItemProps {
  item?: CoursePayload;
  isSkeleton?: boolean;
  onClick?: () => void;
}

export default function CourseItem({
  item = {
    content: '',
    feedback: 0,
    id: 0,
    image: '',
    mentor: '',
    title: '',
    mentorImage: '',
    typeLearn: [''],
  },
  isSkeleton = false,
  onClick = () => {},
}: CourseItemProps) {
  const { content, feedback, image, mentor, title } = item;

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
            height: '200px',
            borderRadius: MetricSize.small_5,
          }}
          src={image}
          alt={title}
        />
        <Stack sx={{ padding: MetricSize.medium_15, height: '200px' }}>
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
          >
            Mentor {mentor}
          </Typography>
          <Stack sx={{ flexDirection: 'row' }}>
            {item.typeLearn &&
              item.typeLearn.map((type) => (
                <Chip sx={{ marginRight: 1 }} key={type} label={type} />
              ))}
          </Stack>
          <Stack
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '150px',
            }}
          >
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
      </Stack>

      <Stack padding={2}>
        <Stack marginY={1}>
          <Rating
            name="size-small"
            defaultValue={feedback}
            disabled
            size="small"
          />
        </Stack>
        <Divider />
        <Stack marginTop={2}>
          <Button onClick={handleNavigateCourseDetail} customVariant="normal">
            Xem chi tiết
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

CourseItem.defaultProps = {
  isSkeleton: false,
  item: undefined,
  onClick: () => {},
};
