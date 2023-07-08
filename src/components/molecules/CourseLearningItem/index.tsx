import {
  Box,
  Divider,
  LinearProgress,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import { CoursePayload } from '~/models/courses';

interface CourseItemProps {
  item: CoursePayload;
  onClick: () => void;
}

export default function CourseLearningItem({ item, onClick }: CourseItemProps) {
  const { content, feedback, images, mentor, title } = item;

  const handleNavigateCourseDetail = () => {
    onClick();
  };

  return (
    <Stack
      sx={{
        marginTop: MetricSize.medium_15,
        border: '1px solid',
        borderColor: Color.grey,
        // width: { xs: '100%', md: '32%' },
        borderRadius: MetricSize.small_5,
      }}
    >
      <Box component="img" src={images[0].url} alt={title} />
      <Stack sx={{ padding: MetricSize.medium_15 }}>
        <Typography>{title}</Typography>
        <Typography>{`Mentor ${mentor}`}</Typography>
        <Rating name="size-small" defaultValue={feedback} size="small" />
      </Stack>
      <Stack padding={2}>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          spacing={2}
          mt={2}
        >
          <Typography>Tiến độ</Typography>
          <Typography>90%</Typography>
        </Stack>
        <Box mt={2}>
          <LinearProgress
            variant="determinate"
            color="inherit"
            value={90}
            sx={{
              color: Color.tertiary,
              height: '1rem',
              borderRadius: MetricSize.small_5,
            }}
          />
        </Box>
        <Stack marginTop={2}>
          <Button onClick={handleNavigateCourseDetail} customVariant="outlined">
            Link liên kết
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
