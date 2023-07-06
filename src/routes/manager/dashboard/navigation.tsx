import { ManagerNavigationActionLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const ManagerNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    name: 'Chỉnh sửa thông tin',
    link: ManagerNavigationActionLink.manager,
  },
  {
    id: 1,
    isHide: true,
    name: 'Danh sách tất cả tài khoản',
    link: ManagerNavigationActionLink.account_search,
  },
  {
    id: 2,
    isHide: true,
    name: 'Danh sách tài khoản cần phê duyệt',
    link: ManagerNavigationActionLink.process_register_request_search,
  },
  {
    id: 3,
    isHide: true,
    name: 'Manager phê duyệt tạo tài khoản',
    link: ManagerNavigationActionLink.process_register_request_details,
  },
  {
    id: 4,
    isHide: true,
    name: 'Danh sách tất cả khóa học',
    link: ManagerNavigationActionLink.course_search,
  },
  {
    id: 5,
    isHide: true,
    name: 'Danh sách khóa học cần phê duyệt',
    link: ManagerNavigationActionLink.process_create_course_request_search,
  },
  {
    id: 6,
    isHide: true,
    name: 'Manager phê duyệt tạo khóa học',
    link: ManagerNavigationActionLink.process_create_course_request_details,
  },
];
