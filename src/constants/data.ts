import { ContractPayload, SocialPayload, ActionPayload } from '~/models';
import { AddressDataPayload } from '~/models/address';

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
