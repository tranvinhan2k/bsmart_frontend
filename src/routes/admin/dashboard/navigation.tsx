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
        link: AdminNavigationActionLink.admin_analytic,
      },
      {
        id: 1,
        icon: 'biMoney',
        isHide: true,
        name: 'Yêu cầu rút tiền',
        link: AdminNavigationActionLink.admin_withdraw_request,
      },
      {
        id: 2,
        name: 'Mã giới thiệu',
        icon: 'promo',
        link: AdminNavigationActionLink.admin_referral_code,
      },
      {
        id: 3,
        name: 'Mẫu đánh giá',
        icon: 'feedback',
        link: AdminNavigationActionLink.admin_feedback,
      },
    ],
  },
];
