import { MemberClassActionLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const MemberClassNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    link: MemberClassActionLink.information,
    name: 'Thông tin lớp học',
    icon: 'class',
    classStatus: 'ALL',
  },
  {
    id: 1,
    link: MemberClassActionLink.mentor,
    name: 'Thông tin giáo viên',
    icon: 'user',
    classStatus: 'ALL',
  },
  {
    id: 2,
    link: MemberClassActionLink.schedule,
    name: 'Lịch học',
    icon: 'date',
    classStatus: 'ALL',
  },
  {
    id: 3,
    link: MemberClassActionLink.activity,
    name: 'Chương trình học',
    icon: 'course',
    classStatus: 'ALL',
  },
  {
    id: 4,
    link: MemberClassActionLink.attendance,
    name: 'Điểm danh',
    icon: 'attendance',
    classStatus: 'ALL',
  },
  {
    id: 5,
    link: MemberClassActionLink.mark_report,
    name: 'Thống kê điểm số',
    icon: 'blog',
    classStatus: 'ALL',
  },
];
