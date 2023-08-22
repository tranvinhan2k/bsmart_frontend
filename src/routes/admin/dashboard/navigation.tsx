import { AdminNavigationActionLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const AdminNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    link: '',
    name: 'Quản lí',
    items: [
      {
        id: 1,
        icon: 'payment',
        name: 'Quản lí người dùng',
        link: AdminNavigationActionLink.user_manager,
      },
      {
        id: 3,
        icon: 'category',
        isHide: true,
        name: 'Quản lí môn học',
        link: AdminNavigationActionLink.category_manager,
      },
      {
        id: 4,
        icon: 'subject',
        isHide: true,
        name: 'Quản lí ngôn ngũ lập trình',
        link: AdminNavigationActionLink.subject_manager,
      },
    ],
  },
];
