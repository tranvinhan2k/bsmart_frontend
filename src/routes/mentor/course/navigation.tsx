import { MentorCourseActionLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const MentorCourseNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    link: MentorCourseActionLink.tutorial,
    name: 'Hướng dẫn',
    icon: 'blankSquareCheckbox',
    classStatus: 'REQUESTING',
  },
  {
    id: 1,
    link: MentorCourseActionLink.information,
    name: 'Thông tin khóa học',
    icon: 'blankSquareCheckbox',
    classStatus: 'ALL',
  },
  {
    id: 2,
    link: MentorCourseActionLink.content,
    name: 'Nội dung khóa học',
    icon: 'blankSquareCheckbox',
    classStatus: 'ALL',
  },
  {
    id: 3,
    link: MentorCourseActionLink.classes,
    name: 'Danh sách lớp học',
    icon: 'blankSquareCheckbox',
    classStatus: 'ALL',
  },
  {
    id: 4,
    link: MentorCourseActionLink.edit_request,
    name: 'Yêu cầu chỉnh sửa',
    icon: 'blankSquareCheckbox',
    classStatus: 'EDITREQUEST',
  },
];
