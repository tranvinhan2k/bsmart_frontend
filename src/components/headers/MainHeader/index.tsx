import { Stack } from '@mui/material';

import { Colors, MetricSize } from '~/assets/variables';

import AuthorizationBar from './AuthorizationBar';
import ContractBar from '../../common/ContractBar';
import SocialBar from '../../common/SocialBar';
import SearchBar from './SearchBar';
import { ActionPayload, ContractPayload, SocialPayload } from '~/models';

interface MainHeaderProps {
  searchValue: string;
  searchLabel: string;
  socials: SocialPayload[];
  contracts: ContractPayload[];
  authenticationData: ActionPayload[];
  onChangeText: (changeText: string) => void;
  onSearchText: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function MainHeader({
  searchValue,
  searchLabel,
  contracts,
  socials,
  authenticationData,
  onChangeText,
  onSearchText,
  onLoginClick,
  onRegisterClick,
}: MainHeaderProps) {
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
      <SocialBar socials={socials} />
      <ContractBar contracts={contracts} />
      <SearchBar
        label={searchLabel}
        value={searchValue}
        onChange={onChangeText}
        onSubmit={onSearchText}
      />

      <AuthorizationBar
        loginData={authenticationData[0]}
        registerData={authenticationData[1]}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
      />
    </Stack>
  );
}
