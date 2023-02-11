import { Box, Button, Stack, Typography } from '@mui/material';
import {
  SX_BUTTON_PRIMARY,
  SX_BUTTON_SECONDARY,
} from '~/containers/IndexSection/style';
import { SX_BOX, SX_TYPOGRAPHY_H2, SX_TYPOGRAPHY_H2_SUB } from './style';

export default function Section8Orientation() {
  return (
    <Box sx={SX_BOX}>
      <Box sx={{ position: 'relative', textAlign: 'center' }} px={16}>
        <Typography component="h2" sx={SX_TYPOGRAPHY_H2}>
          Định hướng và Chuẩn hoá lộ trình học tập
        </Typography>
        <Typography component="h2" sx={SX_TYPOGRAPHY_H2_SUB}>
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
          <Button component="a" sx={SX_BUTTON_PRIMARY}>
            Xem khoá học
          </Button>
          <Button component="a" sx={SX_BUTTON_SECONDARY}>
            Hỗ trợ tư vấn
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
