import { AdminNavigationActionLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const AdminNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    link: '',
    name: 'Quản lí',
    items: [
      {
        id: 0,
        icon: 'account',
        name: 'Chỉnh sửa thông tin',
        link: AdminNavigationActionLink.admin,
      },
      {
        id: 1,
        icon: 'payment',
        name: 'Quản lý ví tiền',
        link: AdminNavigationActionLink.wallet_management,
      },
      {
        id: 2,
        icon: 'feedback',
        isHide: true,
        name: 'Quản lí đánh giá',
        link: AdminNavigationActionLink.feedback_manager,
      },
      {
        id: 3,
        icon: 'category',
        isHide: true,
        name: 'Quản lí môn học',
        link: AdminNavigationActionLink.subject_manager,
      },
      {
        id: 4,
        icon: 'subject',
        isHide: true,
        name: 'Quản lí ngôn ngũ lập trình',
        link: AdminNavigationActionLink.category_manager,
      },
    ],
  },
];
