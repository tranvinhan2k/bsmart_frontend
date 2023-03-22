import { useLocation, useNavigate } from 'react-router-dom';
import BreadcrumbNavigation from '~/components/molecules/navigations/BreadcrumbNavigation';
import { NavigationActionData } from '~/constants';
import { ActionPayload } from '~/models';

export default function BreadcrumbNavigationSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  let navigationAction = NavigationActionData.find(
    (item) => item.link === pathName
  );
  if (pathName.includes('course-detail')) {
    // eslint-disable-next-line prefer-destructuring
    navigationAction = NavigationActionData[2];
  }
  if (!navigationAction) return null;

  const isHomePage = navigationAction === NavigationActionData[0];

  const breadcrumbs: ActionPayload[] = [
    NavigationActionData[0],
    navigationAction,
  ];

  if (pathName.includes('course-detail')) {
    breadcrumbs.push({
      id: 0,
      name: 'Chi Tiết Khóa Học',
      link: pathName,
    });
  }
  const handleViewCourse = () => {
    navigate('/course');
  };

  return (
    <BreadcrumbNavigation
      isHomePage={isHomePage}
      breadcrumbs={breadcrumbs}
      onViewCourse={handleViewCourse}
    />
  );
}
