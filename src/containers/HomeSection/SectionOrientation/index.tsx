import { Box, Stack, Typography } from '@mui/material';
import Button from '~/components/atoms/Button';
import { SX } from './style';

export default function SectionOrientation() {
  return (
    <Box sx={SX.BOX}>
      <Box sx={SX.CONTAINER} px={16}>
        <Typography component="h2" sx={SX.H2}>
          Định hướng và Chuẩn hoá lộ trình học tập
        </Typography>
        <Typography component="h2" sx={SX.H2_SUB}>
          Học Thật, Dự Án Thật, Giảng Viên Tận Tâm
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="center"
          alignItems="center"
          spacing={1}
          /*  */
          mt={6}
        >
          <Button customVariant="normal">Xem khoá học</Button>
          <Button customVariant="outlined">Hỗ trợ tư vấn</Button>
        </Stack>
      </Box>
    </Box>
  );
}
