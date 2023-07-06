import {
  MemberNavigationActionLink,
  MentorNavigationLink,
} from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const MemberNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    name: 'Thông tin chung',
    link: MemberNavigationActionLink.edit_profile_personal_info,
  },
  {
    id: 1,
    name: 'Chứng minh thư',
    link: MentorNavigationLink.edit_profile_img,
  },
  {
    id: 2,
    name: 'Mật khẩu',
    link: MentorNavigationLink.edit_profile_password,
  },
  {
    id: 3,
    name: 'Quản lý ví tiền',
    link: MemberNavigationActionLink.wallet_management,
  },
  {
    id: 4,
    name: 'Rút tiền',
    link: MemberNavigationActionLink.withdraw,
  },
  {
    id: 5,
    name: 'Danh sách khóa học',
    link: MemberNavigationActionLink.member_course_list,
  },
];
