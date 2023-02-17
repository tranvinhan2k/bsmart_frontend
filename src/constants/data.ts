import {
  SocialPayload,
  TabPayload,
  ContractPayload,
  ActionPayload,
} from '~/models';
import { AddressDataPayload } from '~/models/address';
import twitter from '~/assets/images/icons8_twitter_26px.png';
import linkedin from '~/assets/images/icons8_linkedin_26px.png';
import dribbble from '~/assets/images/icons8_dribbble_26px.png';
import facebook from '~/assets/images/icons8_facebook_52px.png';
import instagram from '~/assets/images/icons8_instagram_52px.png';
import pinterest from '~/assets/images/icons8_pinterest_52px.png';
import mail from '~/assets/images/icons8_mail_52px.png';
import phone from '~/assets/images/icons8_phone_52px.png';
import location from '~/assets/images/icons8_location_52px.png';

export const AuthorizationActionData: ActionPayload[] = [
  { name: 'Đăng nhập', link: '/login' },
  { name: 'Đăng kí', link: '/register' },
];

export const NavigationActionData: ActionPayload[] = [
  { name: 'Trang Chủ', link: '/homepage' },
  { name: 'Về Chúng Tôi', link: '/about_us' },
  { name: 'Khóa Học', link: '/course' },
  { name: 'Giảng viên', link: '/teacher' },
  { name: 'Blog', link: '/blog' },
  { name: 'Tuyển dụng', link: '/recruitment' },
  { name: 'Đăng ký', link: '/register' },
  { name: 'NỀN TẢNG LMS', link: '/lms' },
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
  { name: 'Twitter', link: 'https://twitter.com', image: twitter },
  { name: 'LinkedIn', link: 'https://www.linkedin.com', image: linkedin },
  { name: 'Dribbble', link: 'https://dribbble.com', image: dribbble },
];
export const FooterSocialDataList: SocialPayload[] = [
  {
    name: 'Facebook',
    link: 'https://facebook.com/',
    image: facebook,
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com',
    image: twitter,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/',
    image: linkedin,
  },
  {
    name: 'Pinterest',
    link: 'https://pinterest.com/',
    image: pinterest,
  },

  {
    name: 'Instagram',
    link: 'https://instagram.com/',
    image: instagram,
  },
];

export const HeaderContractDataList: ContractPayload[] = [
  { name: 'Email', image: mail, value: 'bsmart@gmail.com' },
  { name: 'Số Điện Thoại', image: phone, value: '+98 946005077' },
];
export const FooterContractDataList: ContractPayload[] = [
  { name: 'Địa chỉ', image: location, value: '260/19 Tân Binh, Hồ Chí Minh' },
  { name: 'Email', image: mail, value: 'bsmart@gmail.com' },
  { name: 'Số điện thoại', image: phone, value: '+98 946005077' },
];

export default {};
