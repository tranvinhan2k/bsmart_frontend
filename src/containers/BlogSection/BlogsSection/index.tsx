import { Stack, Pagination } from '@mui/material';
import img_banner_sub_typing_1 from '~/assets/images/HomePageSection/img_banner_sub_typing_1.jpg';
import Blog from './Blog';

export default function BlogsSection() {
  return (
    <>
      <Blog
        img={img_banner_sub_typing_1}
        title="Tìm hiểu phát triển ứng dụng web từ các chuyên gia"
        content="Điều quan trọng là phải có một dịch vụ khách hàng tốt, một nhà cung
        cấp dịch vụ khách hàng. Hendrerit của Hạm đội Xe tải trẻ em không có
        thùng. Trong trừ khi hoặc, xe tải hoặc, protein đó, bất động sản hoặc,
        trừ khi. Nhưng giá cả, ligula sollicitudin laoreet viverra, tra tấn
        các thành viên libero leo, eget nhạt nhẽo bây giờ tra tấn eu nibh.
        Không mềm."
      />
      <Blog
        img={img_banner_sub_typing_1}
        title="Tìm hiểu phát triển ứng dụng web từ các chuyên gia"
        content="Điều quan trọng là phải có một dịch vụ khách hàng tốt, một nhà cung
        cấp dịch vụ khách hàng. Hendrerit của Hạm đội Xe tải trẻ em không có
        thùng. Trong trừ khi hoặc, xe tải hoặc, protein đó, bất động sản hoặc,
        trừ khi. Nhưng giá cả, ligula sollicitudin laoreet viverra, tra tấn
        các thành viên libero leo, eget nhạt nhẽo bây giờ tra tấn eu nibh.
        Không mềm."
      />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        padding={2}
      >
        <Pagination count={10} />
      </Stack>
    </>
  );
}
