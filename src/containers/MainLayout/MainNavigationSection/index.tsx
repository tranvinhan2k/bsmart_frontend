import { useLocation } from 'react-router-dom';
import MainNavigation from '~/components/molecules/navigations/MainNavigation';
import {
  HeaderContractDataList,
  HeaderSocialDataList,
  NavigationActionData,
} from '~/constants';

export default function MainNavigationSection() {
  const location = useLocation();
  const pathName = location.pathname;

  const handleSearchValue = (searchValue: string) => {
    // TODO: add feature search value
  };

  return (
    <MainNavigation
      pathName={pathName}
      pages={NavigationActionData}
      contracts={HeaderContractDataList}
      socials={HeaderSocialDataList}
      onSearchCourse={handleSearchValue}
    />
  );
}
