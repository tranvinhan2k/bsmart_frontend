import { BlogPayload } from '~/models/blog';
import img_blog from '~/assets/images/BlogSection/img_blog.jpg';

export const blogList: BlogPayload[] = [
  {
    id: 0,
    img: img_blog,
    tagAuthorName: 'BSMART',
    tagDate: new Date().toISOString(),
    tagSummary: 'LẬP TRÌNH & THIẾT KẾ WEB',
    title: 'Tìm hiểu phát triển ứng dụng web từ các chuyên gia',
    contentShort:
      'Sau khi nộp đơn, bạn sẽ phải chờ khoảng 2 tuần đến 1 tháng để trường xét duyệt hồ sơ. Một vài trường sẽ tổ chức một buổi phỏng vấn ngắn (Qua skype hoặc điện thoại) để đánh giá bạn. Mình từng phỏng vấn với 1 ông bên Dundee hỏi về công việc, 1 ông bên York hỏi về kiến thức lập trình, 1 ông bên Lancaster phỏng vấn gần 1 tiếng để được nhận vào suất học bổng 16000 bảng. Đa phần các trường khác chỉ xét hồ sơ, nếu thấy ok sẽ gửi cho bạn offer letter mời nhập học.',
    content: 'Long content',
  },
  {
    id: 1,
    img: img_blog,
    tagAuthorName: 'BSMART',
    tagDate: new Date().toISOString(),
    tagSummary: 'LẬP TRÌNH & THIẾT KẾ WEB',
    title: 'Tìm hiểu phát triển ứng dụng web từ các chuyên gia',
    contentShort:
      'Sau khi nộp đơn, bạn sẽ phải chờ khoảng 2 tuần đến 1 tháng để trường xét duyệt hồ sơ. Một vài trường sẽ tổ chức một buổi phỏng vấn ngắn (Qua skype hoặc điện thoại) để đánh giá bạn. Mình từng phỏng vấn với 1 ông bên Dundee hỏi về công việc, 1 ông bên York hỏi về kiến thức lập trình, 1 ông bên Lancaster phỏng vấn gần 1 tiếng để được nhận vào suất học bổng 16000 bảng. Đa phần các trường khác chỉ xét hồ sơ, nếu thấy ok sẽ gửi cho bạn offer letter mời nhập học.',
    content: 'Long content',
  },
];
