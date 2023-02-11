import { Stack } from '@mui/material';
import { useState } from 'react';

import {
  AuthorizationActionData,
  ContractDataList,
  SocialDataList,
} from '~/constants';

import { Colors } from '~/assets/variables';

import AuthorizationBar from './AuthorizationBar';
import ContractBar from './ContractBar';
import SocialBar from './SocialBar';
import SearchBar from './SearchBar';

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
      }}
    >
      <SocialBar socials={SocialDataList} />
      <ContractBar contracts={ContractDataList} />
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
