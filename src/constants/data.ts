import twitter from '~/assets/images/icons8_twitter_26px.png';
import linkedin from '~/assets/images/icons8_linkedin_26px.png';
import dribbble from '~/assets/images/icons8_dribbble_26px.png';
import mail from '~/assets/images/icons8_mail_52px.png';
import phone from '~/assets/images/icons8_phone_52px.png';
import { ContractPayload, SocialPayload, ActionPayload } from '~/models';

export const SocialDataList: SocialPayload[] = [
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
    name: 'Dribbble',
    link: 'https://dribbble.com/',
    image: dribbble,
  },
];

export const ContractDataList: ContractPayload[] = [
  { name: 'Email', image: mail, value: 'bsmart@gmail.com' },
  { name: 'Phone', image: phone, value: '+98 946005077' },
];

export const AuthorizationActionData: {
  login: ActionPayload;
  register: ActionPayload;
} = {
  login: {
    name: 'Đăng nhập',
    link: '/login',
  },
  register: {
    name: 'Đăng kí',
    link: '/register',
  },
};
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
];
