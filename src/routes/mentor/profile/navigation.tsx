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
    name: 'CMND/CCCD',
    link: MentorNavigationLink.edit_profile_img,
  },
  {
    id: 3,
    name: 'Mật khẩu',
    link: MentorNavigationLink.edit_profile_password,
  },
  {
    id: 4,
    name: 'Lịch sử giao dịch',
    link: MentorNavigationLink.wallet_management,
  },
  {
    id: 5,
    name: 'Gửi yêu cầu',
    link: MentorNavigationLink.send_request,
  },
];
