import { AdminNavigationActionLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const AdminNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    name: 'Chỉnh sửa thông tin',
    link: AdminNavigationActionLink.admin,
  },
  {
    id: 1,
    name: 'Quản lý ví tiền',
    link: AdminNavigationActionLink.wallet_management,
  },
  {
    id: 2,
    isHide: true,
    name: 'Quản lí đánh giá',
    link: AdminNavigationActionLink.feedback_manager,
  },
  {
    id: 3,
    isHide: true,
    name: 'Quản lí môn học',
    link: AdminNavigationActionLink.subject_manager,
  },
  {
    id: 4,
    isHide: true,
    name: 'Quản lí ngôn ngũ lập trình',
    link: AdminNavigationActionLink.category_manager,
  },
];
