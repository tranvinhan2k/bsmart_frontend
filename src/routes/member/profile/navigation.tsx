import {
  MemberNavigationActionLink,
  MentorNavigationLink,
} from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const MemberNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    name: 'Hồ sơ cá nhân',
    link: MemberNavigationActionLink.edit_profile_personal_info,
  },
  {
    id: 2,
    name: 'Mật khẩu',
    link: MentorNavigationLink.edit_profile_password,
  },
  {
    id: 3,
    name: 'Lịch sử giao dịch',
    link: MemberNavigationActionLink.wallet_management,
  },
];
