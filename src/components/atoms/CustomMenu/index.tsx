import {
  ClickAwayListener,
  Grow,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  MenuProps,
  Paper,
  Popper,
} from '@mui/material';
import React from 'react';
import Icon, { IconName } from '../Icon';

export interface CustomMenuItemPayload {
  icon: IconName;
  name: string;
  onClick: () => void;
}

interface Props extends Omit<MenuProps, 'open'> {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: (event: Event | React.SyntheticEvent) => void;
  menuItemData: CustomMenuItemPayload[];
  onToggleOpen: () => void;
}

export default function CustomMenu({
  open,
  anchorEl,
  onClose,
  menuItemData,
  onToggleOpen,
}: Props) {
  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      onToggleOpen();
    } else if (event.key === 'Escape') {
      onToggleOpen();
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (anchorEl && prevOpen.current === true && open === false) {
      anchorEl!.focus();
    }

    prevOpen.current = open;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Popper
      sx={{
        zIndex: 100,
      }}
      open={open}
      anchorEl={anchorEl}
      role={undefined}
      placement="bottom-start"
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom-start' ? 'left top' : 'left bottom',
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
              >
                {menuItemData.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={(e: any) => {
                      item.onClick();
                      onClose(e);
                    }}
                  >
                    <ListItemIcon>
                      <Icon name={item.icon} size="small_20" color="black" />
                    </ListItemIcon>
                    <ListItemText>{item.name}</ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
