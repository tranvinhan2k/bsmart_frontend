import {
  SocialPayload,
  TabPayload,
  ContractPayload,
  ActionPayload,
  OptionPayload,
} from '~/models';
import { AddressDataPayload } from '~/models/address';
import mentor from '~/assets/images/avatar-mentor-1.jpg';
import cousreImage from '~/assets/images/front-end-course.png';
import { CourseDetailPayload, CoursePayload } from '~/models/courses';

export const AuthorizationActionData: ActionPayload[] = [
  { name: 'Đăng nhập', link: '/login' },
  { name: 'Đăng kí', link: '/register' },
];

export const NavigationActionData: ActionPayload[] = [
  {
    name: 'Trang Chủ',
    link: 'homepage',
  },
  {
    name: 'Về Chúng Tôi',
    link: 'about_us',
  },
  {
    name: 'Khóa Học',
    link: 'course',
  },
  {
    name: 'Giảng viên',
    link: 'mentor-profile/*',
  },
  {
    name: 'Blog',
    link: 'blog',
  },
  {
    isHide: true,
    name: 'Tuyển dụng',
    link: 'recruitment',
  },
  {
    isHide: true,
    name: 'Đăng ký',
    link: 'register',
  },
  {
    isHide: true,
    name: 'Đăng nhập',
    link: 'login',
  },
  {
    isHide: true,
    name: 'Chi Tiết Khóa Học',
    link: 'course/course-detail/:id',
  },
  {
    name: 'Nền tảng LMS',
    link: 'lms',
  },
  {
    isHide: true,
    name: 'Thông báo',
    link: 'annotation',
  },
  {
    isHide: true,
    name: 'Đăng kí khóa học',
    link: 'buy-course',
  },
  {
    isHide: true,
    name: 'Chi Tiết Blog',
    link: '/blog/blog-details/:id',
  },
  {
    isHide: true,
    name: 'Thông tin member',
    link: '/member-details',
  },
  {
    isHide: true,
    name: 'Feedback',
    link: 'feedback',
  },
];

export const MentorNavigationActionData: ActionPayload[] = [
  {
    name: 'Chỉnh sửa thông tin',
    link: 'edit-profile',
  },
  {
    name: 'Quản lí ví tiền',
    link: 'wallet-management',
  },
  {
    name: 'Rút tiền',
    link: 'withdraw',
  },
  {
    name: 'Danh sách khóa học',
    link: 'mentor-course-list',
  },
  {
    name: 'Tạo khóa học',
    link: 'create-course',
  },
  {
    name: 'Giới thiệu giáo viên',
    link: 'mentor-introduce',
  },
  {
    name: 'Liên hệ',
    link: 'contract',
  },
];

export const MemberNavigationActionData: ActionPayload[] = [
  {
    name: 'Chỉnh sửa thông tin',
    link: 'edit-profile',
  },
  {
    name: 'Quản lý ví tiền',
    link: 'wallet-management',
  },
  {
    name: 'Rút tiền',
    link: 'withdraw',
  },
];

export const AddressData: AddressDataPayload[] = [
  {
    id: 0,
    city: 'TP.Hồ Chí Minh',
    addresses: [
      {
        id: 0,
        phone: '096.105.1014',
        address: ' 117 Tân Cảng, Bình Thạnh, TP.HCM',
      },
      {
        id: 1,
        phone: '096.105.1014',
        address: ' 117 Tân Cảng, Bình Thạnh, TP.HCM',
      },
      {
        id: 2,
        phone: '096.105.1014',
        address: ' 117 Tân Cảng, Bình Thạnh, TP.HCM',
      },
    ],
  },
];

export const RegisterTabPayload: TabPayload[] = [
  {
    index: 0,
    label: 'Học Viên',
  },
  {
    index: 1,
    label: 'Thầy Giáo',
  },
];

export const HeaderSocialDataList: SocialPayload[] = [
  { name: 'Twitter', link: 'https://twitter.com', image: 'twitter' },
  { name: 'LinkedIn', link: 'https://www.linkedin.com', image: 'linkedin' },
  { name: 'Dribbble', link: 'https://dribbble.com', image: 'dribbble' },
];
export const FooterSocialDataList: SocialPayload[] = [
  {
    name: 'Facebook',
    link: 'https://facebook.com/',
    image: 'facebook',
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com',
    image: 'twitter',
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/',
    image: 'linkedin',
  },
  {
    name: 'Pinterest',
    link: 'https://pinterest.com/',
    image: 'pinterest',
  },

  {
    name: 'Instagram',
    link: 'https://instagram.com/',
    image: 'instagram',
  },
];

export const HeaderContractDataList: ContractPayload[] = [
  { name: 'Email', image: 'mail', value: 'bsmart@gmail.com' },
  { name: 'Số Điện Thoại', image: 'phone', value: '+98 946005077' },
];
export const FooterContractDataList: ContractPayload[] = [
  { name: 'Địa chỉ', image: 'location', value: '260/19 Tân Binh, Hồ Chí Minh' },
  { name: 'Email', image: 'mail', value: 'bsmart@gmail.com' },
  { name: 'Số điện thoại', image: 'phone', value: '+98 946005077' },
];

export const FieldOptionPayload: OptionPayload[] = [
  {
    id: 0,
    label: 'Front End',
    value: 'fe',
  },
  {
    id: 1,
    label: 'Back End',
    value: 'be',
  },
  {
    id: 2,
    label: 'Devops',
    value: 'devops',
  },
  {
    id: 3,
    label: 'Database',
    value: 'db',
  },
];
export const SubjectOptionPayload: OptionPayload[] = [
  {
    id: 0,
    label: 'Ngôn ngữ C/C++',
    value: 'Ngôn ngữ C/C++',
  },
  {
    id: 1,
    label: 'Javascript',
    value: 'Javascript',
  },
  {
    id: 2,
    label: '.NET Core',
    value: '.NET Core',
  },
  {
    id: 3,
    label: 'ReactJS',
    value: 'ReactJS',
  },
  {
    id: 4,
    label: 'Typescript',
    value: 'Typescript',
  },
  {
    id: 5,
    label: 'NodeJS',
    value: 'NodeJS',
  },
  {
    id: 6,
    label: 'Database Sql',
    value: 'Database Sql',
  },
  {
    id: 7,
    label: 'Database MongoDB',
    value: 'Database MongoDB',
  },
];
export const TypeOptionPayload: OptionPayload[] = [
  {
    id: 0,
    label: 'Online',
    value: 'Online',
  },
  {
    id: 1,
    label: 'Offline',
    value: 'Offline',
  },
];
export const ProvinceOptionPayload: OptionPayload[] = [
  {
    id: 0,
    label: 'Quận 1',
    value: 'Quận 1',
  },
  {
    id: 1,
    label: 'Quận 2',
    value: 'Quận 2',
  },
  {
    id: 2,
    label: 'Quận 3',
    value: 'Quận 3',
  },
  {
    id: 3,
    label: 'Quận 4',
    value: 'Quận 4',
  },
  {
    id: 4,
    label: 'Quận 5',
    value: 'Quận 5',
  },
  {
    id: 5,
    label: 'Quận 6',
    value: 'Quận 6',
  },
  {
    id: 6,
    label: 'Quận 7',
    value: 'Quận 7',
  },
  {
    id: 7,
    label: 'Quận 8',
    value: 'Quận 8',
  },
  {
    id: 8,
    label: 'Quận 9',
    value: 'Quận 9',
  },
  {
    id: 9,
    label: 'Quận 10',
    value: 'Quận 10',
  },
  {
    id: 10,
    label: 'Quận 11',
    value: 'Quận 11',
  },
  {
    id: 11,
    label: 'Quận 12',
    value: 'Quận 12',
  },
  {
    id: 12,
    label: 'Thủ Đức',
    value: 'Thủ Đức',
  },
  {
    id: 13,
    label: 'Bình Chánh',
    value: 'Bình Chánh',
  },
];

export const MentorCourses: CoursePayload[] = [
  {
    id: 0,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện',
    feedback: 5,
    image: cousreImage,
    mentor: 'Cuong',
    title: 'Front End Basic',
  },
  {
    id: 1,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện',
    feedback: 5,
    image: cousreImage,
    mentor: 'Cuong',
    title: 'Front End Basic',
  },
  {
    id: 1,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện',
    feedback: 5,
    image: cousreImage,
    mentor: 'Cuong',
    title: 'Front End Basic',
  },
];

export const CourseList: CoursePayload[] = [
  {
    id: 0,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện',
    feedback: 5,
    image: cousreImage,
    mentor: 'Cuong',
    title: 'Front End Basic',
  },
  {
    id: 1,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện',
    feedback: 5,
    image: cousreImage,
    mentor: 'Cuong',
    title: 'Front End Basic',
  },
  {
    id: 2,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện',
    feedback: 5,
    image: cousreImage,
    mentor: 'Cuong',
    title: 'Front End Basic',
  },
  {
    id: 3,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện',
    feedback: 5,
    image: cousreImage,
    mentor: 'Cuong',
    title: 'Front End Basic',
  },
  {
    id: 4,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện',
    feedback: 5,
    image: cousreImage,
    mentor: 'Cuong',
    title: 'Front End Basic',
  },
  {
    id: 5,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện',
    feedback: 5,
    image: cousreImage,
    mentor: 'Cuong',
    title: 'Front End Basic',
  },
  {
    id: 6,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện',
    feedback: 5,
    image: cousreImage,
    mentor: 'Cuong',
    title: 'Front End Basic',
  },
  {
    id: 7,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện',
    feedback: 5,
    image: cousreImage,
    mentor: 'Cuong',
    title: 'Front End Basic',
  },
  {
    id: 8,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện',
    feedback: 5,
    image: cousreImage,
    mentor: 'Cuong',
    title: 'Front End Basic',
  },
];
export const CourseDetailData: CourseDetailPayload = {
  title: 'Front End Basic',
  content:
    'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện cho trang web hoặc ứng dụng web, giúp người dùng có thể xem và tương tác trực tiếp trên đó. Mục tiêu của việc thiết kế trang web là giúp người dùng dễ dàng sử dụng khi mở trang web',
  field: 'Front End',
  id: 0,
  image: cousreImage,
  numOfOpenClass: 1,
  numOfRegisterStudent: 50,
  openDate: new Date().toISOString(),
  unitPrice: 1200000,
  mentorData: {
    avatar: mentor,
    name: 'Mentor Cuong',
  },
  feedbackData: {
    percentOfFeedback: 5,
    numOfRating: 8,
    starData: [
      {
        starNumber: 5,
        starRating: 8,
      },
    ],
    commentData: [
      {
        id: 0,
        userData: {
          avatar: mentor,
          name: 'Nikola',
        },
        dateUpdate: new Date().toISOString(),
        commentContent:
          'After 1st section I just want to comment that program code in some parts are old and should be changed to new versions. It should be more examples before project section.',
        ratingStar: 5,
      },
      {
        id: 1,
        userData: {
          avatar: mentor,
          name: 'Nikola',
        },
        dateUpdate: new Date().toISOString(),
        commentContent:
          'After 1st section I just want to comment that program code in some parts are old and should be changed to new versions. It should be more examples before project section.',
        ratingStar: 5,
      },
      {
        id: 2,
        userData: {
          avatar: mentor,
          name: 'Nikola',
        },
        dateUpdate: new Date().toISOString(),
        commentContent:
          'After 1st section I just want to comment that program code in some parts are old and should be changed to new versions. It should be more examples before project section.',
        ratingStar: 5,
      },
    ],
  },
};

export const CommonCourse: CoursePayload[] = [
  {
    id: 0,
    image: cousreImage,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện cho trang web hoặc ứng dụng web, giúp người dùng có thể xem và tương tác trực tiếp trên đó. Mục tiêu của việc thiết kế trang web là giúp người dùng dễ dàng sử dụng khi mở trang web',
    feedback: 5,
    mentor: 'Mentor Cuong',
    title: 'Khóa học Devops',
    mentorImage: mentor,
  },
  {
    id: 1,
    image: cousreImage,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện cho trang web hoặc ứng dụng web, giúp người dùng có thể xem và tương tác trực tiếp trên đó. Mục tiêu của việc thiết kế trang web là giúp người dùng dễ dàng sử dụng khi mở trang web',
    feedback: 5,
    mentor: 'Mentor Cuong',
    title: 'Khóa học Devops',
    mentorImage: mentor,
  },
  {
    id: 2,
    image: cousreImage,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện cho trang web hoặc ứng dụng web, giúp người dùng có thể xem và tương tác trực tiếp trên đó. Mục tiêu của việc thiết kế trang web là giúp người dùng dễ dàng sử dụng khi mở trang web',
    feedback: 5,
    mentor: 'Mentor Cuong',
    title: 'Khóa học Devops',
    mentorImage: mentor,
  },
  {
    id: 3,
    image: cousreImage,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện cho trang web hoặc ứng dụng web, giúp người dùng có thể xem và tương tác trực tiếp trên đó. Mục tiêu của việc thiết kế trang web là giúp người dùng dễ dàng sử dụng khi mở trang web',
    feedback: 5,
    mentor: 'Mentor Cuong',
    title: 'Khóa học Devops',
    mentorImage: mentor,
  },
  {
    id: 4,
    image: cousreImage,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện cho trang web hoặc ứng dụng web, giúp người dùng có thể xem và tương tác trực tiếp trên đó. Mục tiêu của việc thiết kế trang web là giúp người dùng dễ dàng sử dụng khi mở trang web',
    feedback: 5,
    mentor: 'Mentor Cuong',
    title: 'Khóa học Devops',
    mentorImage: mentor,
  },
  {
    id: 5,
    image: cousreImage,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện cho trang web hoặc ứng dụng web, giúp người dùng có thể xem và tương tác trực tiếp trên đó. Mục tiêu của việc thiết kế trang web là giúp người dùng dễ dàng sử dụng khi mở trang web',
    feedback: 5,
    mentor: 'Mentor Cuong',
    title: 'Khóa học Devops',
    mentorImage: mentor,
  },
  {
    id: 6,
    image: cousreImage,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện cho trang web hoặc ứng dụng web, giúp người dùng có thể xem và tương tác trực tiếp trên đó. Mục tiêu của việc thiết kế trang web là giúp người dùng dễ dàng sử dụng khi mở trang web',
    feedback: 5,
    mentor: 'Mentor Cuong',
    title: 'Khóa học Devops',
    mentorImage: mentor,
  },
  {
    id: 7,
    image: cousreImage,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện cho trang web hoặc ứng dụng web, giúp người dùng có thể xem và tương tác trực tiếp trên đó. Mục tiêu của việc thiết kế trang web là giúp người dùng dễ dàng sử dụng khi mở trang web',
    feedback: 5,
    mentor: 'Mentor Cuong',
    title: 'Khóa học Devops',
    mentorImage: mentor,
  },
  {
    id: 8,
    image: cousreImage,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện cho trang web hoặc ứng dụng web, giúp người dùng có thể xem và tương tác trực tiếp trên đó. Mục tiêu của việc thiết kế trang web là giúp người dùng dễ dàng sử dụng khi mở trang web',
    feedback: 5,
    mentor: 'Mentor Cuong',
    title: 'Khóa học Devops',
    mentorImage: mentor,
  },
];
export const mockMentorDetailInformationData = {
  imageLink: mentor,
  name: 'Mentor Cuong',
  role: 'Mentor',
  socials: [
    {
      image: 'facebook',
      link: '',
    },
    {
      image: 'twitter',
      link: '',
    },
    {
      image: 'linkedin',
      link: '',
    },
  ],
  gender: 'male',
  dateofBirth: new Date().toISOString(),
  address: 'Tân Bình, Tp. Hồ Chí Minh',
  mail: 'mentor@gmail.com',
  phone: '0946005077',
  walletMoney: 300000,
};

export const mockMentorLatestActivities = [
  {
    id: 0,
    message: 'Đã đăng ký khoá học ReactJS Basic',
    updateDate: new Date().toISOString(),
  },
  {
    id: 1,
    message: 'Đã nhận được 100 BS từ việc chia sẻ khoá học',
    updateDate: new Date().toISOString(),
  },
];
