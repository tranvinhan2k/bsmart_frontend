import { useNavigate } from 'react-router-dom';
import UserCourseItem from '../items/UserCourseItem';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { CourseMenuItemPayload, CoursePayload } from '~/models/type';
import { image } from '~/constants/image';
import { LevelKeys } from '~/models/variables';

interface MentorCourseItemProps {
  item: CourseMenuItemPayload;
}

export default function MentorCourseItem({
  item = {
    courseDescription: '',
    courseName: '',
    id: 0,
    imageAlt: '',
    imageUrl: image.noCourse,
    level: 'BEGINNER',
    courseStatus: 'ALL',
    courseTeacherName: [''],
    subjectName: '',
    totalClass: 0,
    category: {
      id: 0,
      label: '',
      value: '',
    },
    courseCode: '',
    subject: {
      id: 0,
      label: '',
      value: '',
    },
    numOfRating: 0,
    rating: 2,
  },
}: MentorCourseItemProps) {
  const navigate = useNavigate();

  const handleNavigateCourseDetail = () => {
    navigate(
      `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${item.id}`
    );
  };

  return (
    <UserCourseItem
      level={item?.level}
      courseDescription={item.courseDescription}
      courseName={item.courseName}
      imageAlt={item.imageAlt}
      imageUrl={item.imageUrl}
      courseStatus={item.courseStatus}
      onClick={handleNavigateCourseDetail}
      totalClass={item.totalClass}
    />
  );
}
