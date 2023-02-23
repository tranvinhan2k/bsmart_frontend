import { Advantage } from '~/models/mockData/advantage';
import { BlogPayload } from '~/models/blog';
import { Counter } from '~/models/mockData/counter';
import { Course } from '~/models/mockData/course';
import { LmsBenefit } from '~/models/mockData/lmsBenefit';
import { Reason } from '~/models/mockData/reason';
import { Story } from '~/models/mockData/story';
import img_banner_sub_entryLevel_1 from '~/assets/images/HomePageSection/img_banner_sub_entryLevel_1.jpg';
import img_blog from '~/assets/images/BlogSection/img_blog.jpg';
import img_item_course_1 from '~/assets/images/HomePageSection/img_item_course_1.jpg';
import img_item_story_1 from '~/assets/images/HomePageSection/img_item_story_1.jpg';
import img_item_teacher_1 from '~/assets/images/HomePageSection/img_item_teacher_1.jpg';

export const advantagesOfBsmart: Advantage[] = [
  {
    id: 1,
    title: 'Học theo lộ trình, có định hướng',
    content:
      'BSmart sẽ định hướng và đưa ra các lộ trình học lập trình nhằm phát triển năng lực và niềm đam mê lập trình của bạn để có việc ngay sau học.',
  },
  {
    id: 2,
    title: 'Nền tảng cốt lõi trong lập trình',
    content:
      'BSmart cung cấp những nền tảng, giá trị tư duy cốt lõi nhất trong lập trình. Bạn sẽ tự tin trước sự thay đổi của công nghệ và môi trường làm việc.',
  },
  {
    id: 3,
    title: 'Mài giũa bạn qua thực tế',
    content:
      'Đội ngũ Giảng viên và các Mentor là những người dày dạn kinh nghiệm qua các dự án thực tế tại các công ty lớn sẽ truyền đạt những kinh nghiệm "máu lửa" cho bạn.',
  },
  {
    id: 4,
    title: 'Mentor tận tâm',
    content:
      'Bạn sẽ được giao dự án và làm theo Teamwork ngay từ ngày đầu tiên. Đóng vai trò một thành viên trong qui trình Scrum, Agile. Được Mentor hỗ trợ tân tâm, nhiệt tình.',
  },
  {
    id: 5,
    title: 'Công nghệ mới, thực tế',
    content:
      'Bạn được học và trải nghiệm các công nghệ lập trình mới nhất, chuyên sâu, bám sát nhu cầu tuyển dụng thực tế từ doanh nghiệp.',
  },
  {
    id: 6,
    title: 'Trao tay chìa khóa thành công',
    content:
      'Hướng dẫn viết CV, phỏng vấn. Kết nối doanh nghiệp, gặp gỡ doanh nghiệp, phỏng vấn cùng doanh nghiệp ngay sau khi tốt nghiệp.',
  },
];
export const advantagesOfLms: Advantage[] = [
  {
    id: 1,
    title: 'Quản lý người dùng',
    content:
      'Hỗ trợ doanh nghiệp đăng ký tài khoản người dùng cho nhân sự ở phần mềm. Quản lý người dùng thuận tiện thông qua các nhãn Nhóm và Thuộc tính.',
  },
  {
    id: 2,
    title: 'Quản lý đào tạo trực tuyến',
    content:
      'Tính năng báo cáo đem đến cho doanh nghiệp một góc nhìn tổng quát về độ hiệu quả của chương trình đào tạo trực tuyến của mình.',
  },
  {
    id: 3,
    title: 'Quản lý bài học',
    content:
      'Việc tự tạo ra một khóa học E-learning của chính bạn giờ đây sẽ dễ dàng hơn bao hết. Chúng tôi hỗ trợ video (Mp4, v.v.), PDF, Html và các tệp khác.',
  },
  {
    id: 4,
    title: 'Tính năng thư viện',
    content:
      'Hỗ trợ và góp phần nâng cao trải nghiệm học tập của người dùng, giúp việc tổng hợp và tìm kiếm tài liệu đào tạo trở nên dễ dàng.',
  },
  {
    id: 5,
    title: 'Kiểm tra online',
    content:
      'Kiểm soát chất lượng đào tạo trực tuyến thông qua kiểm tra trực tuyến. Hỗ trợ đa dạng hình thức câu hỏi. Tự động hóa quy trình chấm điểm.',
  },
  {
    id: 6,
    title: 'Quản lý liên lạc',
    content:
      'Nhanh chóng, dễ dàng trao đổi thông tin với người dùng. Thông qua các phương tiện liên lạc của phần mềm như thông báo, bảng tin, email, email tự động.',
  },
  {
    id: 7,
    title: 'Tính năng cộng đồng (SNS)',
    content:
      'Tạo nên môi trường học tập thuận tiện để người dùng có thể trau dồi, chia sẻ kiến thức. Giúp người dùng phát triển và nắm vững kiến thức.',
  },
  {
    id: 8,
    title: 'Xử lý yêu cầu từ người dùng',
    content:
      'Hỗ trợ Quản trị viên hỗ trợ người dùng của doanh nghiệp kịp thời và triệt để với các vấn đề mà họ đang gặp phải.',
  },
  {
    id: 9,
    title: 'Cá nhân hóa giao diện dễ dàng',
    content:
      'Hỗ trợ tùy chỉnh giao diện (logo, màu sắc, v.v) thuận tiện. Giúp phần mềm trở nên phù hợp với nhận diện thương hiệu của doanh nghiệp và người dùng.',
  },
  {
    id: 10,
    title: 'Gửi mail và phát hành tự động',
    content:
      'Tự động hóa tác vụ thường xuyên lặp lại (phát hành khóa học, gửi email nhắc nhở, v.v) góp phần nâng cao trải nghiệm sử dụng phần mềm của Quản trị viên.',
  },
  {
    id: 11,
    title: 'Kiểm soát quá trình học tập của học viên',
    content:
      'Hệ thống quản lý học tập trực tuyến giúp giảng viên có thể đánh giá năng lực của học viên qua từng giai đoạn cụ thể.',
  },
  {
    id: 12,
    title: 'Quản lý lượng người tham gia',
    content:
      'Thông qua mục đăng ký khóa học, phần mềm LMS có thể kiểm soát và quản lý học viên tham gia hệ thống này.',
  },
];

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

export const counters: Counter[] = [
  {
    id: 1,
    title: '35,535+',
    desc: 'Sinh viên đã đăng ký',
  },
  {
    id: 2,
    title: '35+',
    desc: 'Giảng viên đã đăng ký',
  },
  {
    id: 3,
    title: '66%',
    desc: 'Tỷ lệ thành công',
  },
];

export const courseStandoutList: Course[] = [
  {
    id: 1,
    title: 'Khoá học Devops',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    rating: 5,
    img_course: img_item_course_1,
    img_teacher: img_item_teacher_1,
  },
  {
    id: 2,
    title: 'Khoá học Devops',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    rating: 5,
    img_course: img_item_course_1,
    img_teacher: img_item_teacher_1,
  },
  {
    id: 3,
    title: 'Khoá học Devops',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    rating: 5,
    img_course: img_item_course_1,
    img_teacher: img_item_teacher_1,
  },
  {
    id: 4,
    title: 'Khoá học Devops',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    rating: 5,
    img_course: img_item_course_1,
    img_teacher: img_item_teacher_1,
  },
];

export const lmsBenefitOfStudentList: LmsBenefit[] = [
  {
    id: 1,
    title: 'Cá nhân hóa cho từng học viên',
    img: img_banner_sub_entryLevel_1,
    desc: 'Hướng đến môi trường học tập số hoá, quá trình học tập của học viên được đảm bảo. Chương trình học tập của mỗi học viên được ghi nhận cụ thể và chi tiết. Hệ thống LMS còn tạo môi trường tương tác giữa người học với người học, hay với giảng viên đơn giản, nhanh chóng và liên tục.',
  },
  {
    id: 2,
    title: 'Quản lý thời gian hiệu quả',
    img: img_banner_sub_entryLevel_1,
    desc: 'Hướng đến môi trường học tập số hoá, quá trình học tập của học viên được đảm bảo. Chương trình học tập của mỗi học viên được ghi nhận cụ thể và chi tiết. Hệ thống LMS còn tạo môi trường tương tác giữa người học với người học, hay với giảng viên đơn giản, nhanh chóng và liên tục.',
  },
  {
    id: 3,
    title: 'Thoải mái không gian học tập',
    img: img_banner_sub_entryLevel_1,
    desc: 'Hướng đến môi trường học tập số hoá, quá trình học tập của học viên được đảm bảo. Chương trình học tập của mỗi học viên được ghi nhận cụ thể và chi tiết. Hệ thống LMS còn tạo môi trường tương tác giữa người học với người học, hay với giảng viên đơn giản, nhanh chóng và liên tục.',
  },
  {
    id: 4,
    title: 'Cập nhật nhanh chóng chi tiết từng khóa học',
    img: img_banner_sub_entryLevel_1,
    desc: 'Hướng đến môi trường học tập số hoá, quá trình học tập của học viên được đảm bảo. Chương trình học tập của mỗi học viên được ghi nhận cụ thể và chi tiết. Hệ thống LMS còn tạo môi trường tương tác giữa người học với người học, hay với giảng viên đơn giản, nhanh chóng và liên tục.',
  },
];
export const lmsBenefitOfTeacherList: LmsBenefit[] = [
  {
    id: 1,
    title: 'Tương tác với học viên',
    img: img_banner_sub_entryLevel_1,
    desc: 'Hướng đến môi trường học tập số hoá, quá trình học tập của học viên được đảm bảo. Chương trình học tập của mỗi học viên được ghi nhận cụ thể và chi tiết. Hệ thống LMS còn tạo môi trường tương tác giữa người học với người học, hay với giảng viên đơn giản, nhanh chóng và liên tục.',
  },
  {
    id: 2,
    title: 'Cá nhân hóa cho từng học viên',
    img: img_banner_sub_entryLevel_1,
    desc: 'Hướng đến môi trường học tập số hoá, quá trình học tập của học viên được đảm bảo. Chương trình học tập của mỗi học viên được ghi nhận cụ thể và chi tiết. Hệ thống LMS còn tạo môi trường tương tác giữa người học với người học, hay với giảng viên đơn giản, nhanh chóng và liên tục.',
  },
  {
    id: 3,
    title: 'Đánh giá học viên dễ dàng',
    img: img_banner_sub_entryLevel_1,
    desc: 'Hướng đến môi trường học tập số hoá, quá trình học tập của học viên được đảm bảo. Chương trình học tập của mỗi học viên được ghi nhận cụ thể và chi tiết. Hệ thống LMS còn tạo môi trường tương tác giữa người học với người học, hay với giảng viên đơn giản, nhanh chóng và liên tục.',
  },
  {
    id: 4,
    title: 'Cập nhật nhanh chóng chi tiết từng khóa học ',
    img: img_banner_sub_entryLevel_1,
    desc: 'Hướng đến môi trường học tập số hoá, quá trình học tập của học viên được đảm bảo. Chương trình học tập của mỗi học viên được ghi nhận cụ thể và chi tiết. Hệ thống LMS còn tạo môi trường tương tác giữa người học với người học, hay với giảng viên đơn giản, nhanh chóng và liên tục.',
  },
];

export const reasonWhyBsmartList: Reason[] = [
  {
    id: 1,
    title: 'High Quality Courses',
    desc: 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
  },
  {
    id: 2,
    title: 'Expert Instructors',
    desc: 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
  },
  {
    id: 3,
    title: 'Life Time Access',
    desc: 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
  },
];

export const storyOfStudentList: Story[] = [
  {
    id: 1,
    img: img_item_story_1,
    name: 'Susan',
    field: 'Front-end',
    desc: 'Bé có thể tự tạo nên dự án riêng và học cách quản lý, phát triển dự án',
  },
  {
    id: 2,
    img: img_item_story_1,
    name: 'Susan',
    field: 'Front-end',
    desc: 'Bé có thể tự tạo nên dự án riêng và học cách quản lý, phát triển dự án',
  },
  {
    id: 3,
    img: img_item_story_1,
    name: 'Susan',
    field: 'Front-end',
    desc: 'Bé có thể tự tạo nên dự án riêng và học cách quản lý, phát triển dự án',
  },
  {
    id: 4,
    img: img_item_story_1,
    name: 'Susan',
    field: 'Front-end',
    desc: 'Bé có thể tự tạo nên dự án riêng và học cách quản lý, phát triển dự án',
  },
];
