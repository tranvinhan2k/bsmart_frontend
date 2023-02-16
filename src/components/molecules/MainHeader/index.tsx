import { Stack } from '@mui/material';

import AuthorizationBar from './AuthorizationBar';
import ContractBar from '../ContractBar';
import SocialBar from '../SocialBar';
import SearchBar from './SearchBar';
import { ActionPayload, ContractPayload, SocialPayload } from '~/models';
import { SX_HEADER_CONTAINER } from '~/components/molecules/MainHeader/styles';

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
    <Stack sx={SX_HEADER_CONTAINER}>
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
