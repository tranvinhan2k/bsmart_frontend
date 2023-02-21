import { Box, CardMedia, Stack, Grid, Typography } from '@mui/material';
import img_banner_sub_typing_1 from '~/assets/images/HomePageSection/img_banner_sub_typing_1.jpg';
import { blogTags } from '~/constants/mockData/blogTags';
import {
  SX_CARD_WRAPPER,
  SX_CARD_LIST_WRAPPER,
  SX_CARD_LIST_TEXT,
  SX_BLOG_TITTLE,
  SX_BLOG_CONTENT,
} from './style';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';

export default function Blog() {
  return (
    <Box sx={SX_CARD_WRAPPER}>
      <CardMedia
        sx={{ height: 440 }}
        image={img_banner_sub_typing_1}
        title="green iguana"
      />
      <Box>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          // rowSpacing={{ xs: 3, md: 0 }}
          // columnSpacing={{ xs: 0, md: 3 }}
          sx={SX_CARD_LIST_WRAPPER}
        >
          {blogTags.map((blogTag) => (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={2}
              key={blogTag.id}
            >
              <Icon name={blogTag.tagImgName} size="medium" color="orange" />
              <Typography component="h3" sx={SX_CARD_LIST_TEXT}>
                {blogTag.tagTittle}
              </Typography>
            </Stack>
          ))}
        </Grid>
        <Typography component="h2" sx={SX_BLOG_TITTLE}>
          Tìm hiểu phát triển ứng dụng web từ các chuyên gia
        </Typography>
        <Typography component="h3" sx={SX_BLOG_CONTENT}>
          Điều quan trọng là phải có một dịch vụ khách hàng tốt, một nhà cung
          cấp dịch vụ khách hàng. Hendrerit của Hạm đội Xe tải trẻ em không có
          thùng. Trong trừ khi hoặc, xe tải hoặc, protein đó, bất động sản hoặc,
          trừ khi. Nhưng giá cả, ligula sollicitudin laoreet viverra, tra tấn
          các thành viên libero leo, eget nhạt nhẽo bây giờ tra tấn eu nibh.
          Không mềm. Cứ như vậy. điện thoại thông minh Nhưng nhu cầu, trước khi
          và vulutate volutpat, eros pede [...]
        </Typography>
      </Box>
      <Box>
        <Button customVariant="normal" fullWidth>
          Đọc thêm
        </Button>
      </Box>
    </Box>
  );
}
