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
        name: 'Xử lý yêu cầu',
        icon: 'description',
        link: ManagerNavigationActionLink.manager_request,
      },
      {
        id: 1,
        name: 'Người dùng',
        icon: 'user',
        link: ManagerNavigationActionLink.manager_user,
      },
      {
        id: 2,
        name: 'Khóa học',
        icon: 'coPresent',
        link: ManagerNavigationActionLink.manager_course,
      },
      {
        id: 3,
        name: 'Lớp học',
        icon: 'coPresent',
        link: ManagerNavigationActionLink.manager_class,
      },
      {
        id: 4,
        icon: 'category',
        name: 'Lĩnh vực',
        link: ManagerNavigationActionLink.manager_category,
      },
      {
        id: 5,
        icon: 'subject',
        name: 'Môn học',
        link: ManagerNavigationActionLink.manager_subject,
      },
    ],
  },
];
