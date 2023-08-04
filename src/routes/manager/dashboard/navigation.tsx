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
        link: 'Báo cáo thống kê',
      },
      {
        id: 1,
        name: 'Người dùng',
        icon: 'user',
        link: ManagerNavigationActionLink.manage_user_manager,
      },
      {
        id: 2,
        name: 'Khóa học',
        icon: 'coPresent',
        link: ManagerNavigationActionLink.manage_course_manager,
      },
      {
        id: 3,
        name: 'Lớp học',
        icon: 'coPresent',
        link: '',
        items: [
          {
            id: 0,
            isHide: true,
            icon: 'class',
            name: 'Danh sách lớp học',
            link: ManagerNavigationActionLink.manage_class_manager,
          },
          {
            id: 1,
            isHide: true,
            icon: 'class',
            name: 'temp_feedback_class_detail',
            link: 'temp_feedback_class_detail',
          },
        ],
      },
      {
        id: 4,
        name: 'Tài chính',
        icon: 'biMoney',
        link: 'Tài chính',
      },
      {
        id: 5,
        name: 'Xử lý yêu cầu',
        icon: 'description',
        link: ManagerNavigationActionLink.manage_request_manager,
      },
    ],
  },
];
