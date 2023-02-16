import { Box, Typography } from '@mui/material';
import { SX } from './style';

export default function Section2WhoWeAre() {
  return (
    <Box sx={SX.BOX}>
      <Typography component="h5" sx={SX.H5}>
        CHÚNG TÔI LÀ AI?
      </Typography>
      <Typography component="h2" sx={SX.H2}>
        BSmart đang cung cấp các khóa học online và offline chất lượng tốt nhất.
        Tất cả các giảng viên của chúng tôi đều là các chuyên gia.
      </Typography>
      <Typography component="p" sx={SX.P}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        assumenda ut hic quod maiores asperiores corrupti consectetur
        accusantium officiis exercitationem enim provident tempora quas, rem,
        dolorem et? Odio, voluptatibus.
      </Typography>
    </Box>
  );
}
