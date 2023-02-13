import { useState } from 'react';
import MainHeader from '~/components/headers/MainHeader';
import { AuthorizationActionData } from '~/constants';
import { HeaderContractDataList } from '~/constants/contract';
import { HeaderSocialDataList } from '~/constants/socials';

const SEARCH_BAR_LABEL = 'Tìm kiếm khóa học';

export default function MainHeaderSection() {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleChangeText = (changeText: string) => {
    setSearchValue(changeText);
  };

  const handleSearchValue = () => {
    // TODO: add feature search value
  };

  return (
    <MainHeader
      searchLabel={SEARCH_BAR_LABEL}
      searchValue={searchValue}
      authenticationData={AuthorizationActionData}
      socials={HeaderSocialDataList}
      contracts={HeaderContractDataList}
      onChangeText={handleChangeText}
      onSearchText={handleSearchValue}
    />
  );
}
