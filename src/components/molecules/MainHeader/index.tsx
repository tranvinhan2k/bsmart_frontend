import { Stack } from '@mui/material';

import AuthorizationBar from './AuthorizationBar';
import ContractBar from '../ContractBar';
import SocialBar from '../SocialBar';
import { ActionPayload, ContractPayload, SocialPayload } from '~/models';
import { SX_HEADER_CONTAINER } from './styles';
import SearchBar from '~/components/atoms/SearchBar';

interface MainHeaderProps {
  searchLabel: string;
  socials: SocialPayload[];
  contracts: ContractPayload[];
  authenticationData: ActionPayload[];
  onSearchText: (searchValue: string) => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function MainHeader({
  searchLabel,
  contracts,
  socials,
  authenticationData,
  onSearchText,
  onLoginClick,
  onRegisterClick,
}: MainHeaderProps) {
  return (
    <Stack sx={SX_HEADER_CONTAINER}>
      <SocialBar color="white" socials={socials} />
      <ContractBar color="white" contracts={contracts} />
      <SearchBar
        color="white"
        placeholder={searchLabel}
        onSubmit={onSearchText}
      />

      <AuthorizationBar
        color="white"
        loginData={authenticationData[0]}
        registerData={authenticationData[1]}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
      />
    </Stack>
  );
}
