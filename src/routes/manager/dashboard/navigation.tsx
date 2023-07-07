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
        name: 'Người dùng',
        icon: 'user',
        link: '',
        items: [
          {
            id: 0,
            isHide: true,
            icon: 'groups',
            name: 'Danh sách người dùng',
            link: ManagerNavigationActionLink.account_search,
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
        id: 1,
        name: 'Khóa học',
        icon: 'coPresent',
        link: '',
        items: [
          {
            id: 0,
            isHide: true,
            icon: 'class',
            name: 'Danh sách tất cả khóa học',
            link: ManagerNavigationActionLink.course_search,
          },
          {
            id: 1,
            isHide: true,
            icon: 'description',
            name: 'Danh sách khóa học cần phê duyệt',
            link: ManagerNavigationActionLink.process_create_course_request_search,
          },
        ],
      },
    ],
  },
];
