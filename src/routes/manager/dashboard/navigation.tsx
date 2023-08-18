import { ManagerNavigationActionLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const ManagerNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    name: 'Quản lí',
    link: '',
    items: [
      {
        id: 0,
        name: 'Báo cáo thống kê',
        icon: 'barChartIcon',
        link: ManagerNavigationActionLink.manage_analytic_manager,
      },
      {
        id: 1,
        name: 'Xử lý yêu cầu',
        icon: 'description',
        link: ManagerNavigationActionLink.manage_request_manager,
      },
      {
        id: 2,
        name: 'Người dùng',
        icon: 'user',
        link: ManagerNavigationActionLink.manage_user_manager,
      },
      {
        id: 3,
        name: 'Khóa học',
        icon: 'coPresent',
        link: ManagerNavigationActionLink.manage_course_manager,
      },
      {
        id: 4,
        name: 'Lớp học',
        icon: 'coPresent',
        link: ManagerNavigationActionLink.manage_class_manager,
      },
      {
        id: 5,
        name: 'Tài chính',
        icon: 'biMoney',
        link: ManagerNavigationActionLink.manage_financial_manager,
      },
      {
        id: 6,
        name: 'Ngân hàng câu hỏi',
        icon: 'question',
        link: ManagerNavigationActionLink.questions_bank,
      },
      {
        id: 7,
        name: 'Mã giới thiệu',
        icon: 'promo',
        link: ManagerNavigationActionLink.promo_code,
      },
    ],
  },
];
