import { AuthorizationALink, NavigationLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const AuthorizationActionData: ActionPayload[] = [
  {
    id: 0,
    name: 'Đăng nhập',
    link: AuthorizationALink.log_in,
  },
  {
    id: 1,
    name: 'Đăng kí',
    link: AuthorizationALink.register,
  },
];

export const NavigationActionData: ActionPayload[] = [
  {
    id: 0,
    name: 'Trang Chủ',
    link: NavigationLink.homepage,
  },
  {
    id: 1,
    name: 'Về Chúng Tôi',
    link: NavigationLink.about_us,
  },
  {
    id: 2,
    name: 'Khóa Học',
    link: NavigationLink.course_menu,
  },
  {
    id: 3,
    isHide: true,
    name: 'Hồ sơ cá nhân giáo viên',
    link: NavigationLink.mentor_profile,
  },
  // {
  //   id: 4,
  //   name: 'Blog',
  //   link: NavigationLink.blog,
  // },
  {
    id: 5,
    isHide: true,
    name: 'Tuyển dụng',
    link: NavigationLink.recruitment,
  },
  {
    id: 6,
    isHide: true,
    name: 'Đăng ký',
    link: NavigationLink.register,
  },
  {
    id: 7,
    isHide: true,
    name: 'Đăng nhập',
    link: NavigationLink.login,
  },
  {
    id: 8,
    isHide: true,
    name: 'Chi Tiết Khóa Học',
    link: NavigationLink.course_menu_details,
  },
  {
    id: 9,
    name: 'Nền tảng LMS',
    link: NavigationLink.lms,
  },
  {
    id: 10,
    isHide: true,
    name: 'Hoạt động',
    link: NavigationLink.annotation,
  },
  {
    id: 11,
    isHide: true,
    name: 'Đăng kí khóa học',
    link: NavigationLink.buy_course,
  },
  {
    id: 12,
    isHide: true,
    name: 'Chi Tiết Blog',
    link: NavigationLink.blog_details,
  },
  {
    id: 13,
    isHide: true,
    name: 'Hồ sơ cá nhân học sinh',
    link: NavigationLink.member_details,
  },
  {
    id: 14,
    isHide: true,
    name: 'Feedback',
    link: NavigationLink.feedback,
  },
  {
    id: 15,
    name: 'Giảng viên',
    link: NavigationLink.mentor_menu,
  },
  {
    id: 16,
    isHide: true,
    name: 'Giỏ Hàng',
    link: NavigationLink.cart,
  },
  {
    id: 17,
    isHide: true,
    name: 'Liên hệ',
    link: NavigationLink.contact,
  },
  {
    id: 18,
    isHide: true,
    name: 'Thanh Toán',
    link: NavigationLink.check_out,
  },
  {
    id: 19,
    isHide: true,
    name: 'Xác nhận khóa học',
    link: NavigationLink.confirm_email,
  },
  {
    id: 20,
    isHide: true,
    name: 'Quản lí học tập',
    link: NavigationLink.dashboard,
  },
];
