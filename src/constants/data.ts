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
import { SidebarNavigationProps } from '~/models/data';
import { LEVEL_LABELS } from './level';

export const courseTypeData = {
  PRIVATE: 'Khóa học riêng tư',
  PUBLIC: 'Khóa học cộng đồng',
};

export const typeData: OptionPayload[] = [
  {
    id: 0,
    label: 'Online',
    value: 'ONLINE',
  },
  {
    id: 1,
    label: 'Offline',
    value: 'OFFLINE',
  },
];

export const mockLevelData: OptionPayload[] = [
  {
    id: 0,
    label: LEVEL_LABELS.BEGINNER,
    value: 'BEGINNER',
  },
  {
    id: 1,
    label: LEVEL_LABELS.INTERMEDIATE,
    value: 'INTERMEDIATE',
  },
  {
    id: 2,
    label: LEVEL_LABELS.ADVANCED,
    value: 'ADVANCED',
  },
  {
    id: 3,
    label: LEVEL_LABELS.EXPERT,
    value: 'EXPERT',
  },
];

export const ClassStatusList: OptionPayload[] = [
  {
    id: 0,
    label: 'Tất cả',
    content: 'Tất cả khóa học của bạn hiện đã tạo.',
    value: 'ALL',
  },
  {
    id: 0,
    label: 'Lớp đang dạy',
    content: 'Lớp đang được dạy.',
    value: 'STARTING',
  },
  {
    id: 1,
    label: 'Lớp đã kết thúc',
    content: 'Lớp đã hết thời gian giảng dạy',
    value: 'CLOSE',
  },
];
export const CourseStatusList: OptionPayload[] = [
  {
    id: 0,
    label: 'Tất cả',
    content: 'Tất cả khóa học của bạn hiện đã tạo.',
    value: 'ALL',
  },
  {
    id: 0,
    label: 'Lớp đang yêu cầu',
    content: 'Lớp được yêu cầu mở nhưng chưa được duyệt.',
    value: 'REQUESTING',
  },
  {
    id: 1,
    label: 'Lớp đã sẵn được duyệt',
    content: 'Lớp đã sẵn được duyệt',
    value: 'WAITING',
  },
  {
    id: 2,
    label: 'Lớp yêu cầu chỉnh sửa',
    content: 'Lớp không hợp lệ, yêu cầu chỉnh sửa lại.',
    value: 'EDITREQUEST',
  },
  {
    id: 3,
    label: 'Lớp bị từ chối',
    content: 'Lớp bị từ chối phê duyệt do vi phạm điều khoản mở lớp.',
    value: 'REJECTED',
  },
  {
    id: 4,
    label: 'Chưa bắt đầu',
    content: 'Lớp đã được duyệt và đang tuyển sinh.',
    value: 'NOTSTART',
  },
  {
    id: 5,
    label: 'Đang dạy',
    content: 'Lớp đang được dạy.',
    value: 'STARTING',
  },
  {
    id: 6,
    label: 'Đã kết thúc',
    content: 'Lớp đã kết thúc.',
    value: 'ENDED',
  },
  {
    id: 7,
    label: 'Đã hủy bỏ',
    content: 'Lớp đã bị hủy bỏ.',
    value: 'CANCEL',
  },
];

export const RoleOptionList: OptionPayload[] = [
  {
    id: 0,
    label: 'Học sinh',
    value: 'STUDENT',
  },
  {
    id: 1,
    label: 'Giáo viên',
    value: 'TEACHER',
  },
];
export const FeedbackTypeOptionList: OptionPayload[] = [
  {
    id: 0,
    label: 'Học kì đầu',
    value: 'SUB_COURSE_FIRST_HALF',
  },
  {
    id: 1,
    label: 'Học kì sau',
    value: 'SECOND_HALF',
  },
];
export const QuestionTypeOptionList: OptionPayload[] = [
  {
    id: 0,
    label: 'Câu hỏi nhiều lựa chọn',
    value: 'MULTIPLE_CHOICE',
  },
  {
    id: 1,
    label: 'Câu hỏi tự trả lời',
    value: 'FILL_THE_ANSWER',
  },
];
export const AuthorizationActionData: ActionPayload[] = [
  {
    id: 0,
    name: 'Đăng nhập',
    link: '/login',
  },
  {
    id: 1,
    name: 'Đăng kí',
    link: '/register',
  },
];

export const NavigationActionData: ActionPayload[] = [
  {
    id: 0,
    name: 'Trang Chủ',
    link: 'homepage',
  },
  {
    id: 1,
    name: 'Về Chúng Tôi',
    link: 'about_us',
  },
  {
    id: 2,
    name: 'Khóa Học',
    link: 'course_menu',
  },
  {
    id: 3,
    isHide: true,
    name: 'Thông tin giáo viên',
    link: 'mentor-profile',
  },
  {
    id: 4,
    name: 'Blog',
    link: 'blog',
  },
  {
    id: 5,
    isHide: true,
    name: 'Tuyển dụng',
    link: 'recruitment',
  },
  {
    id: 6,
    isHide: true,
    name: 'Đăng ký',
    link: 'register',
  },
  {
    id: 7,
    isHide: true,
    name: 'Đăng nhập',
    link: 'login',
  },
  {
    id: 8,
    isHide: true,
    name: 'Chi Tiết Khóa Học',
    link: 'course_menu/course-detail/:id',
  },
  {
    id: 9,
    name: 'Nền tảng LMS',
    link: 'lms',
  },
  {
    id: 10,
    isHide: true,
    name: 'Thông báo',
    link: 'annotation',
  },
  {
    id: 11,
    isHide: true,
    name: 'Đăng kí khóa học',
    link: 'buy-course',
  },
  {
    id: 12,
    isHide: true,
    name: 'Chi Tiết Blog',
    link: 'blog/blog-details/:id',
  },
  {
    id: 13,
    isHide: true,
    name: 'Thông tin member',
    link: 'member-details',
  },
  {
    id: 14,
    isHide: true,
    name: 'Feedback',
    link: 'feedback',
  },
  {
    id: 15,
    name: 'Giảng viên',
    link: 'mentor_menu',
  },
  {
    id: 16,
    isHide: true,
    name: 'Giỏ Hàng',
    link: 'cart',
  },
  {
    id: 17,
    isHide: true,
    name: 'Liên hệ',
    link: 'contact',
  },
  {
    id: 18,
    isHide: true,
    name: 'Thanh Toán',
    link: 'check_out',
  },
  {
    id: 19,
    isHide: true,
    name: 'Xác nhận khóa học',
    link: 'confirm_email/:code',
  },
  {
    id: 28,
    isHide: true,
    name: 'Quản lí đánh giá',
    link: 'feedback_manager',
  },
];

export const MentorNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    link: '',
    name: 'Quản lí thông tin',
    items: [
      {
        id: 0,
        name: 'Chỉnh sửa thông tin',
        link: 'edit-profile',
      },
      {
        id: 1,
        name: 'Quản lí ví tiền',
        link: 'wallet-management',
      },
      {
        id: 2,
        name: 'Rút tiền',
        link: 'withdraw',
      },
    ],
  },
  {
    id: 1,
    link: '',
    name: 'Quản lí học tập',
    items: [
      {
        id: 0,
        name: 'Danh sách khóa học',
        link: 'mentor-course-list',
      },
      {
        id: 1,
        name: 'Tạo khóa học',
        link: 'create-course',
      },
      {
        id: 2,
        name: 'Quản lý tài nguyên',
        link: 'mentor-resource-management',
      },
      {
        id: 3,
        name: 'Quản lý Quiz',
        link: 'mentor-quiz-settings',
      },
      {
        id: 4,
        name: 'Danh sách điểm danh',
        link: 'attendance-list',
      },
      {
        id: 5,
        name: 'Điểm danh của học sinh',
        link: 'view-member-attendance',
      },
      {
        id: 6,
        name: 'Tạo Quiz',
        link: 'mentor-create-quiz',
        isHide: true,
      },
      {
        id: 7,
        name: 'Chi tiết khóa học',
        link: 'mentor_course_detail/:id',
        isHide: true,
      },
      {
        id: 8,
        name: 'Tạo Assignment',
        link: 'mentor-create-assignment',
        isHide: true,
      },
      {
        id: 9,
        name: 'Tạo thông báo',
        link: 'mentor-create-announcement',
        isHide: true,
      },
      {
        id: 10,
        name: 'Điểm danh',
        link: 'take-attendance/:classId/:id',
        isHide: true,
      },
      {
        id: 11,
        name: 'Tạo nội dung khóa học',
        link: 'create-content',
        isHide: true,
      },
      {
        id: 12,
        name: 'Quản lý Assignment',
        link: 'mentor-assignment-settings',
        isHide: true,
      },
      {
        id: 13,
        name: 'Quản lý Announcement',
        link: 'mentor-announcement-settings',
        isHide: true,
      },
      {
        id: 14,
        name: 'Danh sách lớp học',
        link: 'mentor-class-list',
        isHide: true,
      },
    ],
  },
  {
    id: 14,
    name: '',
    link: '',
    isHide: true,
  },
  {
    id: 15,
    name: '',
    link: '',
    isHide: true,
  },
  {
    id: 16,
    name: 'Tùy chỉnh Assignment',
    link: 'mentor-assignment-settings/:id',
    isHide: true,
  },
  {
    id: 17,
    name: 'Xem chi tiết Assignment',
    link: 'mentor-assignment-details/:id',
    isHide: true,
  },
  {
    id: 18,
    name: 'Quản lý Announcement',
    link: 'mentor-announcement-settings',
    isHide: true,
  },
  {
    id: 19,
    name: 'Quản lý Announcement',
    link: 'mentor-announcement-details',
    isHide: true,
  },
];

export const MemberNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    name: 'Chỉnh sửa thông tin',
    link: 'edit-profile',
  },
  {
    id: 1,
    name: 'Quản lý ví tiền',
    link: 'wallet-management',
  },
  {
    id: 2,
    name: 'Rút tiền',
    link: 'withdraw',
  },
  {
    id: 3,
    name: 'Danh sách khóa học',
    link: 'member-course-list',
  },
];

export const AdminNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    name: 'Chỉnh sửa thông tin',
    link: 'admin',
  },
  {
    id: 1,
    name: 'Quản lý ví tiền',
    link: 'wallet-management',
  },
  {
    id: 2,
    isHide: true,
    name: 'Quản lí đánh giá',
    link: 'feedback_manager',
  },
  {
    id: 3,
    isHide: true,
    name: 'Quản lí môn học',
    link: 'subject_manager',
  },
  {
    id: 4,
    isHide: true,
    name: 'Quản lí ngôn ngũ lập trình',
    link: 'category_manager',
  },
];

export const ManagerNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    name: 'Chỉnh sửa thông tin',
    link: 'manager',
  },
  {
    id: 1,
    isHide: true,
    name: 'Danh sách tất cả tài khoản',
    link: 'manager-all-account',
  },
  {
    id: 2,
    isHide: true,
    name: 'Danh sách tài khoản cần phê duyệt',
    link: 'manager-process-register-request',
  },
  {
    id: 3,
    isHide: true,
    name: 'Manager phê duyệt tạo tài khoản',
    link: 'manager-process-register-request/:id',
  },
  {
    id: 4,
    isHide: true,
    name: 'Danh sách tất cả khóa học',
    link: 'manager-all-course',
  },
  {
    id: 5,
    isHide: true,
    name: 'Danh sách khóa học cần phê duyệt',
    link: 'manager-process-create-course-request',
  },
  {
    id: 6,
    isHide: true,
    name: 'Manager phê duyệt tạo khóa học',
    link: 'manager-process-create-course-request/:id',
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
    label: 'Giáo viên',
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
    value: 'ONLINE',
  },
  {
    id: 1,
    label: 'Offline',
    value: 'OFFLINE',
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
    typeLearn: ['OFFLINE'],
  },
  {
    id: 1,
    typeLearn: ['OFFLINE'],
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện',
    feedback: 5,
    image: cousreImage,
    mentor: 'Cuong',
    title: 'Front End Basic',
  },
  {
    id: 2,
    typeLearn: ['OFFLINE'],
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
  category: {
    id: 0,
    code: '',
    name: '',
  },
  numOfOpenClass: 1,
  numOfRegisterStudent: 50,
  openDate: new Date().toISOString(),
  unitPrice: 1200000,
  mentorData: {
    id: 1,
    avatar: mentor,
    name: 'Mentor Cuong',
    introduce: '',
    mentorSkills: [
      {
        skillId: 0,
        yearOfExperiences: 0,
      },
    ],
    userId: 0,
    workingExperience: '',
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
    typeLearn: ['OFFLINE'],
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
    typeLearn: ['OFFLINE'],

    image: cousreImage,
    content:
      'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện cho trang web hoặc ứng dụng web, giúp người dùng có thể xem và tương tác trực tiếp trên đó. Mục tiêu của việc thiết kế trang web là giúp người dùng dễ dàng sử dụng khi mở trang web',
    feedback: 5,
    mentor: 'Mentor Cuong',
    title: 'Khóa học Devops',
    mentorImage: mentor,
  },
  {
    typeLearn: ['OFFLINE'],
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
    typeLearn: ['OFFLINE'],
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
    typeLearn: ['OFFLINE'],
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
    typeLearn: ['OFFLINE'],
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
    typeLearn: ['OFFLINE'],
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
    typeLearn: ['OFFLINE'],
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
    typeLearn: ['OFFLINE'],
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
export const mockMentorDetailsInformationData = {
  imageLink: mentor,
  name: 'Mentor Cuong',
  role: 'Mentor',
  socials: [
    {
      image: 'facebook',
      link: '/facebook',
    },
    {
      image: 'twitter',
      link: '/twitter',
    },
    {
      image: 'linkedin',
      link: '/linkedin',
    },
  ],
  gender: 'male',
  dateOfBirth: new Date().toISOString(),
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
export const ADMIN_SIDE_BAR_NAVIGATION: SidebarNavigationProps[] = [
  {
    title: '',
    items: [
      {
        label: 'Trang chủ',
        icon: 'home',
        link: 'homepage',
      },
    ],
  },
  {
    title: 'Quản lý',
    items: [
      {
        label: 'Người dùng',
        icon: 'user',
        link: 'account',
        items: [
          {
            label: 'Tất cả người dùng',
            icon: 'groups',
            link: 'allAccount',
          },
          {
            label: 'Yêu cầu tạo tài khoản',
            icon: 'description',
            link: `allAccount`,
          },
        ],
      },
      {
        label: 'Lớp học',
        icon: 'coPresent',
        link: 'classZ',
        items: [
          {
            label: 'Tất cả lớp học',
            icon: 'class',
            link: 'allClass',
          },
          {
            label: 'Yêu cầu tạo lớp học',
            icon: 'description',
            link: 'allClass',
          },
        ],
      },
      {
        label: 'Chủ đê',
        icon: 'subject',
        link: 'subject',
        items: [
          {
            label: 'Tất cả chủ đề',
            icon: 'account',
            link: 'allSubject',
          },
          {
            label: 'Yêu cầu tạo môn học',
            icon: 'class',
            link: 'classCreateRequest',
          },
        ],
      },
      {
        label: 'Câu hỏi',
        icon: 'question',
        link: 'questionZ',
        items: [
          {
            label: 'Ngân hàng câu hỏi',
            icon: 'dynamicFeed',
            link: 'questionBank',
          },
        ],
      },
      {
        label: 'Blog',
        icon: 'blog',
        link: 'blog',
      },
      {
        label: 'Câu hỏi',
        icon: 'question',
        link: 'question',
      },
      {
        label: 'Đánh giá',
        icon: 'feedback',
        link: 'feedback_manager',
      },
      {
        label: 'Môn Học',
        icon: 'subject',
        link: 'subject_manager',
      },
      {
        label: 'Ngôn ngữ lập trình',
        icon: 'category',
        link: 'category_manager',
      },
    ],
  },
  {
    title: 'Cá nhân',
    items: [
      {
        label: 'Cài đặt',
        icon: 'setting',
        link: 'setting',
      },
    ],
  },
];
export const MANAGER_SIDE_BAR_NAVIGATION: SidebarNavigationProps[] = [
  {
    title: '',
    items: [
      {
        label: 'Trang chủ',
        icon: 'home',
        link: 'homepage',
      },
    ],
  },
  {
    title: 'Quản lý',
    items: [
      {
        label: 'Người dùng',
        icon: 'user',
        link: 'accountZ',
        items: [
          {
            label: 'Tất cả người dùng',
            icon: 'groups',
            link: `/${ManagerNavigationActionData[1].link}`,
          },
          {
            label: 'Yêu cầu tạo tài khoản',
            icon: 'description',
            link: `/${ManagerNavigationActionData[2].link}`,
          },
        ],
      },
      {
        label: 'Lớp học',
        icon: 'coPresent',
        link: 'classZ',
        items: [
          {
            label: 'Tất cả lớp học',
            icon: 'class',
            link: `/${ManagerNavigationActionData[4].link}`,
          },
          {
            label: 'Yêu cầu tạo lớp học',
            icon: 'description',
            link: `/${ManagerNavigationActionData[5].link}`,
          },
        ],
      },
    ],
  },
  {
    title: 'Cá nhân',
    items: [
      {
        label: 'Cài đặt',
        icon: 'setting',
        link: 'setting',
      },
    ],
  },
];
