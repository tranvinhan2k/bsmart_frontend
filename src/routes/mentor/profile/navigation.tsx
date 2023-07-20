import { MentorNavigationLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const MentorNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    name: 'Hồ sơ cá nhân',
    link: MentorNavigationLink.edit_profile_personal_info,
  },
  {
    id: 1,
    name: 'Hồ sơ giảng dạy',
    link: MentorNavigationLink.edit_profile_mentor_info,
  },
  {
    id: 2,
    name: 'Chứng minh thư',
    link: MentorNavigationLink.edit_profile_img,
  },
  {
    id: 3,
    name: 'Mật khẩu',
    link: MentorNavigationLink.edit_profile_password,
  },
  {
    id: 4,
    name: 'Giao dịch',
    link: MentorNavigationLink.wallet_management,
  },
  {
    id: 5,
    name: 'Rút tiền',
    link: MentorNavigationLink.withdraw,
  },
];
