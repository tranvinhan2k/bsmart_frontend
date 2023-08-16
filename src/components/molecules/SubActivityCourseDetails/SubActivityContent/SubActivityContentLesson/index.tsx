import { Box, Typography } from '@mui/material';
import { ActivityLessonPayload } from '~/models/type';
import sx from './style';

interface SubActivityContentLessonProps {
  name: string;
  item: ActivityLessonPayload;
}

export default function SubActivityContentLesson({
  name,
  item,
}: SubActivityContentLessonProps) {
  return (
    <>
      <Typography sx={sx.itemLabel}>Tên</Typography>
      <Typography sx={sx.itemValue}>{name}</Typography>
      <Box mt={2}>
        <Typography sx={sx.itemLabel}>Mô tả</Typography>
        <Typography
          sx={sx.itemValue}
          dangerouslySetInnerHTML={{
            __html: item.description,
          }}
        />
      </Box>
    </>
  );
}
