import { Stack, IconButton, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomMenu from '~/components/atoms/CustomMenu';
import { NavigationLink } from '~/constants/routeLink';
import { useLogOut, useMenuItem } from '~/hooks';

interface Props {
  title: string;
  srcImage: string;
}

export function AvatarMenu({ title, srcImage }: Props) {
  const navigate = useNavigate();

  const { handleHookLogOut } = useLogOut();

  const { anchorRef, handleClose, handleToggle, open } = useMenuItem();

  const handleLogOut = () => {
    handleHookLogOut();
    handleToggle();
  };

  const handleProfile = () => {
    handleToggle();
  };

  const handleHomePage = () => {
    navigate(`/${NavigationLink.homepage}`);
  };

  return (
    <Box>
      <IconButton ref={anchorRef} onClick={handleToggle}>
        <Avatar
          alt={title}
          src={srcImage}
          sx={{
            height: '30px',
            width: '30px',
          }}
        />
      </IconButton>
      <CustomMenu
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        onToggleOpen={handleToggle}
        menuItemData={[
          {
            icon: 'home',
            name: 'Trang chủ',
            onClick: handleHomePage,
          },
          {
            icon: 'account',
            name: 'Mật khẩu',
            onClick: handleProfile,
          },
          {
            icon: 'logOut',
            name: 'Đăng xuất',
            onClick: handleLogOut,
          },
        ]}
      />
    </Box>
  );
}
