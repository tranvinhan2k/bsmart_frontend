import {
  SocialPayload,
  TabPayload,
  ContractPayload,
  OptionPayload,
  ImagePayload,
} from '~/models';
import { AddressDataPayload } from '~/models/address';
import mentor from '~/assets/images/avatar-mentor-1.jpg';
import cousreImage from '~/assets/images/front-end-course.png';
import { CourseDetailPayload } from '~/models/courses';
import { SidebarNavigationProps } from '~/models/data';
import { LEVEL_LABELS } from './level';
import { ActivityPayload, CoursePayload } from '~/models/type';
import { IconName } from '~/components/atoms/Icon';
import { ActivityKeys } from '~/models/variables';
import { ActivityLink } from './routeLink';

export const ActivityData: {
  type: ActivityKeys;
  icon: IconName;
  label: string;
  link: string;
}[] = [
  {
    type: 'LESSON',
    icon: 'lesson',
    label: 'Bài học',
    link: ActivityLink.lesson,
  },
  {
    type: 'ASSIGNMENT',
    icon: 'assignment',
    label: 'Bài tập',
    link: ActivityLink.assignment,
  },
  {
    type: 'QUIZ',
    icon: 'quiz',
    label: 'Kiểm tra',
    link: ActivityLink.quiz,
  },
  {
    type: 'RESOURCE',
    icon: 'resource',
    label: 'Tài nguyên',
    link: ActivityLink.resource,
  },
];

export const courseTypeData = {
  PRIVATE: 'Khóa học riêng tư',
  PUBLIC: 'Khóa học cộng đồng',
};

export const mockImages: string[] = [
  'https://images.pexels.com/photos/5427648/pexels-photo-5427648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

export type CourseTypeDataKeys = keyof typeof courseTypeData;

export const genderData: OptionPayload[] = [
  {
    id: 0,
    label: 'Nam',
    value: 'MALE',
  },
  {
    id: 1,
    label: 'Nữ',
    value: 'FEMALE',
  },
];

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
    id: 3,
    label: 'Lớp chưa phê duyệt',
    content: 'Lớp đang chờ phê duyệt',
    value: 'REQUESTING',
  },
  {
    id: 4,
    label: 'Lớp đợi phê duyệt',
    content: 'Lớp đang chờ phê duyệt',
    value: 'WAITING',
  },
  {
    id: 5,
    label: 'Lớp đang chiêu sinh',
    content: 'Lớp đang chờ phê duyệt',
    value: 'NOTSTART',
  },
  {
    id: 1,
    label: 'Lớp đang dạy',
    content: 'Lớp đang được dạy.',
    value: 'STARTING',
  },
  {
    id: 2,
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
    id: 1,
    label: 'Chưa yêu cầu phê duyệt',
    content: 'Lớp chưa gửi yêu cầu.',
    value: 'REQUESTING',
  },
  {
    id: 2,
    label: 'Chờ phê duyệt',
    content: 'Lớp đã gửi yêu cầu phê duyệt',
    value: 'WAITING',
  },
  {
    id: 3,
    label: 'Yêu cầu chỉnh sửa',
    content: 'Lớp không hợp lệ, yêu cầu chỉnh sửa lại.',
    value: 'EDITREQUEST',
  },
  {
    id: 4,
    label: 'Từ chối',
    content: 'Lớp bị từ chối phê duyệt do vi phạm điều khoản mở lớp.',
    value: 'REJECTED',
  },
  {
    id: 5,
    label: 'Đã phê duyệt',
    content: 'Lớp đã được phê duyệt thành công và đang tuyển sinh.',
    value: 'NOTSTART',
  },
  {
    id: 6,
    label: 'Đang dạy',
    content: 'Lớp đang được dạy.',
    value: 'STARTING',
  },
  {
    id: 7,
    label: 'Đã kết thúc',
    content: 'Lớp đã kết thúc.',
    value: 'ENDED',
  },
  {
    id: 8,
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

export const CommonCourse: CoursePayload[] = Array(5).fill({
  id: 0,
  images: [],
  courseDescription:
    'Khóa học Frontend là quy trình sử dụng các ngôn ngữ HTML, CSS, JavaScript để thiết kế, xây dựng giao diện cho trang web hoặc ứng dụng web, giúp người dùng có thể xem và tương tác trực tiếp trên đó. Mục tiêu của việc thiết kế trang web là giúp người dùng dễ dàng sử dụng khi mở trang web',
  mentorName: ['Nhân Trần'],
  courseName: 'Khóa học FrontEnd',
  courseCode: '123',
  status: 'NOTSTART',
  subjectId: 0,
  subjectName: 'Java',
  totalClass: 10,
});

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

export const ClassMemberStatusList: OptionPayload[] = [
  // ClassStatusList
  {
    id: 0,
    label: 'Đang theo',
    content: 'Lớp đang tham gia',
    value: 'ALL',
  },
  {
    id: 1,
    label: 'Hoàn thành',
    content: 'Lớp đã tham gia.',
    value: 'FINISHED',
  },
  {
    id: 2,
    label: 'Bị Hủy',
    content: 'Lớp đã không thể mở',
    value: 'CLOSE',
  },
];
