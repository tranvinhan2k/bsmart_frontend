import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/atoms/Button';
import { SX } from './style';
import { NavigationLink } from '~/constants/routeLink';

export default function SectionOrientation() {
  const navigate = useNavigate();

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
          <Button
            onClick={() => {
              navigate(NavigationLink.course_menu);
            }}
            customVariant="normal"
          >
            Xem khoá học
          </Button>
          <Button customVariant="outlined">Hỗ trợ tư vấn</Button>
        </Stack>
      </Box>
    </Box>
  );
}
