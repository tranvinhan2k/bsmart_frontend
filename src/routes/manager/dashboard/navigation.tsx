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
        link: '',
        items: [
          {
            id: 0,
            isHide: true,
            icon: 'groups',
            name: 'Danh sách người dùng',
            link: ManagerNavigationActionLink.manage_user_manager,
          },
          {
            id: 1,
            isHide: true,
            icon: 'description',
            name: 'Yêu cầu mở tài khoản',
            link: ManagerNavigationActionLink.manage_register_request_manager,
          },
          {
            id: 2,
            isHide: true,
            icon: 'description',
            name: 'Yêu cầu mở thêm môn dạy của giảng viên',
            link: ManagerNavigationActionLink.manage_mentor_profile_update_request,
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
            link: ManagerNavigationActionLink.manage_course_manager,
          },
          {
            id: 1,
            isHide: true,
            icon: 'description',
            name: 'Yêu cầu tạo khóa học',
            link: ManagerNavigationActionLink.manage_course_create_request_manager,
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
            link: ManagerNavigationActionLink.manage_class_manager,
          },
        ],
      },
      {
        id: 4,
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
