import MainNavigation from '~/components/navigations/MainNavigation';
import { NavigationActionData } from '~/constants';

export default function MainNavigationSection() {
  return <MainNavigation pages={NavigationActionData} />;
}
