import { useLocation, useNavigate } from 'react-router-dom';
import BreadcrumbNavigation from '~/components/molecules/navigations/BreadcrumbNavigation';
import { NavigationActionData } from '~/constants';
import { ActionPayload } from '~/models';

export default function BreadcrumbNavigationSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  const navigationAction = NavigationActionData.find(
    (item) => item.link === pathName
  );
  if (!navigationAction) return null;

  const isHomePage = navigationAction === NavigationActionData[0];

  const breadcrumbs: ActionPayload[] = [
    NavigationActionData[0],
    navigationAction,
  ];

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
