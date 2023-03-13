import { Box, Divider, Typography, Rating, Stack } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import { CoursePayload } from '~/models/courses';

interface CourseItemProps {
  item: CoursePayload;
  onClick: () => void;
}

export default function CourseItem({ item, onClick }: CourseItemProps) {
  const { content, feedback, image, mentor, title } = item;

  const handleNavigateCourseDetail = () => {
    onClick();
  };

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
            objectFit: 'contain',
            width: '100%',
            borderRadius: MetricSize.small_5,
          }}
          src={image}
          alt={title}
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
        <Stack marginY={1}>
          <Rating name="size-small" defaultValue={feedback} size="small" />
        </Stack>
        <Divider />
        <Stack marginTop={2}>
          <Button onClick={handleNavigateCourseDetail} customVariant="normal">
            Đăng ký
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
