import { useLocation } from 'react-router-dom';
import MainNavigation from '~/components/molecules/navigations/MainNavigation';
import { NavigationActionData } from '~/constants';

export default function MainNavigationSection() {
  const location = useLocation();
  const pathName = location.pathname;
  return <MainNavigation pathName={pathName} pages={NavigationActionData} />;
}
