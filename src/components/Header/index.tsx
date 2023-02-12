import { Stack } from '@mui/material';
import { useState } from 'react';

import { AuthorizationActionData } from '~/constants';

import { Colors, MetricSize } from '~/assets/variables';

import AuthorizationBar from './AuthorizationBar';
import ContractBar from '../common/ContractBar';
import SocialBar from '../common/SocialBar';
import SearchBar from './SearchBar';
import { HeaderSocialDataList } from '~/constants/socials';
import { HeaderContractDataList } from '~/constants/contract';

const SEARCH_BAR_LABEL = 'Tìm kiếm khóa học';

export default function Header() {
  const [searchValue, setSearchValue] = useState<string>('');

  const hanldeChangeText = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchValue = () => {
    // TODO: add feature search value
  };

  return (
    <Stack
      sx={{
        flex: 1,
        background: Colors.navy,
        color: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingX: MetricSize.extraLarge,
      }}
    >
      <SocialBar socials={HeaderSocialDataList} />
      <ContractBar contracts={HeaderContractDataList} />
      <SearchBar
        label={SEARCH_BAR_LABEL}
        value={searchValue}
        onChange={hanldeChangeText}
        onSubmit={handleSearchValue}
      />
      <AuthorizationBar
        loginData={AuthorizationActionData.login}
        registerData={AuthorizationActionData.register}
      />
    </Stack>
  );
}
