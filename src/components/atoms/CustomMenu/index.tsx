import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
} from '@mui/material';
import Icon, { IconName } from '../Icon';

export interface CustomMenuItemPayload {
  icon: IconName;
  name: string;
  onClick: () => void;
}

interface Props extends Omit<MenuProps, 'open'> {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  menuItemData: CustomMenuItemPayload[];
}

export default function CustomMenu({
  anchorEl,
  onClose,
  menuItemData,
  ...props
}: Props) {
  return (
    <Menu
      {...props}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
      onBlur={onClose}
      onMouseLeave={onClose}
    >
      {menuItemData.map((item, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            item.onClick();
            onClose();
          }}
        >
          <ListItemIcon>
            <Icon name={item.icon} size="small_20" color="black" />
          </ListItemIcon>
          <ListItemText>{item.name}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}
