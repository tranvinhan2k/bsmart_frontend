import {
  SocialPayload,
  TabPayload,
  ContractPayload,
  ActionPayload,
  CheckBoxPayload,
} from '~/models';
import { AddressDataPayload } from '~/models/address';
import mail from '~/assets/images/icons8_mail_52px.png';
import phone from '~/assets/images/icons8_phone_52px.png';
import location from '~/assets/images/icons8_location_52px.png';
import cousreImage from '~/assets/images/front-end-course.png';
import { CoursePayload } from '~/models/courses';

export const AuthorizationActionData: ActionPayload[] = [
  {
    name: 'Đăng nhập',
    link: '/login',
  },
  {
    name: 'Đăng kí',
    link: '/register',
  },
];

export const NavigationActionData: ActionPayload[] = [
  {
    name: 'Trang Chủ',
    link: '/homepage',
  },
  {
    name: 'Về Chúng Tôi',
    link: '/about_us',
  },
  {
    name: 'Khóa Học',
    link: '/course',
  },
  {
    name: 'Giảng viên',
    link: '/teacher',
  },
  {
    name: 'Blog',
    link: '/blog',
  },
  {
    name: 'Tuyển dụng',
    link: '/recuitment',
  },
  {
    isHide: true,
    name: 'Đăng ký',
    link: '/register',
  },
  {
    isHide: true,
    name: 'Đăng nhập',
    link: '/login',
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
        address: ' 117 Tân Cảng, Bình Thạnh, TPHCM',
      },
      {
        id: 1,
        phone: '096.105.1014',
        address: ' 117 Tân Cảng, Bình Thạnh, TPHCM',
      },
      {
        id: 2,
        phone: '096.105.1014',
        address: ' 117 Tân Cảng, Bình Thạnh, TPHCM',
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
    name: 'Dribbble',
    link: 'https://dribbble.com/',
    image: 'dribbble',
  },
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

export const FieldCheckBoxPayload: CheckBoxPayload[] = [
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
export const SubjectCheckBoxPayload: CheckBoxPayload[] = [
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
export const TypeCheckBoxPayload: CheckBoxPayload[] = [
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
export const ProvinceCheckBoxPayload: CheckBoxPayload[] = [
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
  {
    id: 0,
    label: 'Quận 1',
    value: 'Quận 1',
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
