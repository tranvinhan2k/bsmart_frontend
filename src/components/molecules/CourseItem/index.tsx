import { Box, Chip, Divider, Typography, Rating, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import Button from '~/components/atoms/Button';
import { CoursePayload } from '~/models/courses';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { image } from '~/constants/image';

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
    typeLearn: [],
  },
  isSkeleton = false,
  onClick = () => {},
}: CourseItemProps) {
  const { content, feedback, image: itemImage, mentor, title } = item;

  const handleNavigateCourseDetail = () => {
    onClick();
  };

  if (isSkeleton) {
    return (
      <Stack
        sx={{
          marginTop: MetricSize.medium_15,
          marginLeft: '15px',
          borderColor: Color.grey,
          width: { xs: '100%', md: '32%' },
          borderRadius: MetricSize.small_5,
          justifyContent: 'space-between',
        }}
      >
        <Skeleton height={700} />
      </Stack>
    );
  }

  return (
    <Stack
      sx={{
        background: Color.white,
        marginTop: MetricSize.medium_15,
        marginLeft: '10px',
        borderRadius: MetricSize.medium_15,
        width: { xs: '100%', md: 'calc(50% - 10px)', lg: 'calc(33% - 10px)' },
        justifyContent: 'space-between',
        height: '650px',
        transition: 'box-shadow ease-in 100ms',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <Box
        loading="lazy"
        component="img"
        sx={{
          objectFit: 'fill',
          width: '100%',
          height: '300px',
          borderRadius: MetricSize.small_5,
        }}
        src={itemImage}
        alt={title}
      />
      <Stack
        sx={{
          padding: MetricSize.medium_15,
          height: '200px',
        }}
      >
        <Stack
          sx={{
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Box
            component="img"
            src={image.noAvatar}
            sx={{
              border: 'solid grey',
              borderWidth: 0.5,
              borderRadius: 1000,
              width: '30px',
              height: '30px',
              marginRight: MetricSize.small_10,
            }}
          />
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.regular,
              color: Color.grey,
            }}
          >
            {mentor}
          </Typography>
        </Stack>
        <Typography
          sx={{
            marginTop: MetricSize.small_10,
            fontSize: FontSize.medium_28,
            fontWeight: 'bold',
            fontFamily: FontFamily.bold,
          }}
        >
          {title}
        </Typography>
        <Stack>
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.regular,
            }}
          >
            {content}
          </Typography>
        </Stack>
        <Stack sx={{ flexDirection: 'row' }}>
          {item.typeLearn &&
            item.typeLearn.map((type) => (
              <Chip sx={{ marginRight: 1 }} key={type} label={type} />
            ))}
        </Stack>
      </Stack>
      <Stack padding={2}>
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
