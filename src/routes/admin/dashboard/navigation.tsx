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
        name: 'Báo cáo thống kê',
        icon: 'barChartIcon',
        link: AdminNavigationActionLink.analytic,
      },
      {
        id: 1,
        icon: 'payment',
        name: 'Quản lí người dùng',
        link: AdminNavigationActionLink.user_manager,
      },
      {
        id: 2,
        icon: 'category',
        isHide: true,
        name: 'Quản lí môn học',
        link: AdminNavigationActionLink.category_manager,
      },
      {
        id: 3,
        icon: 'subject',
        isHide: true,
        name: 'Quản lí ngôn ngữ lập trình',
        link: AdminNavigationActionLink.subject_manager,
      },
      {
        id: 4,
        icon: 'biMoney',
        isHide: true,
        name: 'Yêu cầu rút tiền',
        link: AdminNavigationActionLink.withdraw_request,
      },
    ],
  },
];
