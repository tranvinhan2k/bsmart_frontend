import { Stack, IconButton, Box } from '@mui/material';

import AuthorizationBar from './AuthorizationBar';
import ContractBar from '../ContractBar';
import SocialBar from '../SocialBar';
import { ActionPayload, ContractPayload, SocialPayload } from '~/models';
import { SX_HEADER_CONTAINER } from './styles';
import SearchBar from '~/components/atoms/SearchBar';
import localEnvironment from '~/utils/localEnvironment';
import mentor from '~/assets/images/avatar-mentor-1.jpg';
import { IconSize } from '~/assets/variables';

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
  const token = localStorage.getItem(localEnvironment.ASYNC_STORAGE_TOKEN_NAME);
  const handleLogOut = () => {
    localStorage.removeItem(localEnvironment.ASYNC_STORAGE_TOKEN_NAME);
  };
  return (
    <Stack sx={SX_HEADER_CONTAINER}>
      <SocialBar color="white" socials={socials} />
      <ContractBar color="white" contracts={contracts} />
      <SearchBar
        color="white"
        placeholder={searchLabel}
        onSubmit={onSearchText}
      />

      {!token ? (
        <AuthorizationBar
          color="white"
          loginData={authenticationData[0]}
          registerData={authenticationData[1]}
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
        />
      ) : (
        <IconButton onClick={handleLogOut}>
          <Box
            sx={{
              width: IconSize.large,
              height: IconSize.large,
              objectFit: 'contain',
              borderRadius: 1000,
            }}
            component="img"
            src={mentor}
            alt="authentication"
          />
        </IconButton>
      )}
    </Stack>
  );
}
