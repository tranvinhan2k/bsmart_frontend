import { StudentDashboardNavigationActionLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const StudentDashboardNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    icon: 'class',
    name: 'Danh sách lớp học',
    link: StudentDashboardNavigationActionLink.class_list,
  },
  {
    id: 1,
    link: StudentDashboardNavigationActionLink.schedule,
    name: 'Lịch học',
    icon: 'date',
  },
];
