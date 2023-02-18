import { Stack, Box } from '@mui/material';
import Divider from '@mui/material/Divider/Divider';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Colors, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import { CoursePayload } from '~/models/courses';

interface CourseItemProps {
  item: CoursePayload;
}

export default function CourseItem({ item }: CourseItemProps) {
  const { content, feedback, image, mentor, title } = item;
  return (
    <Stack
      sx={{
        marginTop: MetricSize.medium,
        border: '1px solid',
        borderColor: Colors.grey,
        width: { xs: '100%', md: '32%' },
        borderRadius: MetricSize.small,
      }}
    >
      <Box component="img" src={image} alt={title} />
      <Stack sx={{ padding: MetricSize.medium }}>
        <Typography>{title}</Typography>
        <Typography>{`Mentor ${mentor}`}</Typography>
        <Typography>{content}</Typography>
        <Rating name="size-small" defaultValue={feedback} size="small" />
      </Stack>
      <Stack padding={2}>
        <Divider />
        <Stack marginTop={2}>
          <Button customVariant="normal">Đăng ký</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
