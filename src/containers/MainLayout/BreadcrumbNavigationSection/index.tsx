import { useLocation, useNavigate } from 'react-router-dom';
import BreadcrumbNavigation from '~/components/molecules/navigations/BreadcrumbNavigation';
import { NavigationLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';
import { NavigationActionData } from '~/routes/navigators';

export default function BreadcrumbNavigationSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  let navigationAction = NavigationActionData.find((item) => {
    const link = item.link.split('/')[0];
    const pathNameLink = pathName.replace('/', '').split('/')[0];
    return link === pathNameLink;
  });
  if (pathName.includes('mentor-detail')) {
    // eslint-disable-next-line prefer-destructuring
    navigationAction = NavigationActionData[14];
  }
  if (pathName.includes('course-detail')) {
    // eslint-disable-next-line prefer-destructuring
    navigationAction = NavigationActionData[2];
  }
  if (!navigationAction) return null;

  const isHomePage = navigationAction === NavigationActionData[0];
  const isDashboard = navigationAction === NavigationActionData[20];

  const breadcrumbs: ActionPayload[] = [
    NavigationActionData[0],
    navigationAction,
  ];

  if (pathName.includes('mentor-detail')) {
    breadcrumbs.push({
      id: 0,
      name: 'Chi Tiết Giáo Viên',
      link: pathName,
    });
  }

  if (pathName.includes('course-detail')) {
    breadcrumbs.push({
      id: 0,
      name: 'Chi Tiết Khóa Học',
      link: pathName,
    });
  }
  const handleViewCourse = () => {
    navigate(NavigationLink.course_menu);
  };

  return (
    <BreadcrumbNavigation
      isHomePage={isHomePage}
      isDashboard={isDashboard}
      breadcrumbs={breadcrumbs}
      onViewCourse={handleViewCourse}
    />
  );
}
