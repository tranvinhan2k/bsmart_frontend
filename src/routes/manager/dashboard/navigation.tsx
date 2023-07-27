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
        name: 'Bảng điều khiển',
        icon: 'barChartIcon',
        link: 'Bảng điều khiển',
      },
      {
        id: 1,
        name: 'Người dùng',
        icon: 'user',
        link: '',
        items: [
          {
            id: 0,
            isHide: true,
            icon: 'groups',
            name: 'Danh sách người dùng',
            link: ManagerNavigationActionLink.user_manager,
          },
          {
            id: 1,
            isHide: true,
            icon: 'description',
            name: 'Yêu cầu tạo tài khoản',
            link: ManagerNavigationActionLink.process_register_request_search,
          },
        ],
      },
      {
        id: 2,
        name: 'Khóa học',
        icon: 'coPresent',
        link: '',
        items: [
          {
            id: 0,
            isHide: true,
            icon: 'class',
            name: 'Danh sách khóa học',
            link: ManagerNavigationActionLink.course_search,
          },
          {
            id: 1,
            isHide: true,
            icon: 'description',
            name: 'Yêu cầu tạo khóa học',
            link: ManagerNavigationActionLink.process_create_course_request_search,
          },
        ],
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
            link: ManagerNavigationActionLink.course_search,
          },
        ],
      },
      {
        id: 3,
        name: 'Tài chính',
        icon: 'biMoney',
        link: '',
        items: [
          {
            id: 0,
            isHide: true,
            icon: 'description',
            name: 'Yêu cầu rút tiền',
            link: 'Yêu cầu rút tiền',
          },
        ],
      },
    ],
  },
];
