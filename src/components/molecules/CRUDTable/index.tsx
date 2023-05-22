import {
  Stack,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import CRUDTableHeader from './CRUDTableHeader';
import CRUDTableSearching from './CRUDTableSearching';
import Icon, { IconName } from '~/components/atoms/Icon';
import { FormInputVariant } from '~/models/form';
import { OptionPayload } from '~/models';

export type MenuItemPayload = {
  icon: IconName;
  title: string;
  onCLick: () => void;
};

export type SearchFilterFormInput = {
  variant: FormInputVariant;
  name: string;
  placeholder: string;
  data: OptionPayload[];
};
interface CRUDTableProps {
  title: string;
  columns: GridColDef[];
  rows: any;
  addItemButtonLabel: string;
  menuItemList: MenuItemPayload[];
  searchPlaceholder: string;
  searchFilterFormInputList: SearchFilterFormInput[];
  onAdd: () => void;
  onSearch: (data: any) => void;
}

export default function CRUDTable({
  title,
  columns,
  rows,
  addItemButtonLabel,
  menuItemList,
  searchPlaceholder,
  searchFilterFormInputList,
  onAdd,
  onSearch,
}: CRUDTableProps) {
  const searchValueForm = useForm();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const texts = {
    title,
  };

  const handleClose = () => {
    setAnchorEl(() => null);
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const renderMoreVertMenuIcon = () => {
    return (
      <IconButton onClick={handleMenu}>
        <Icon name="moreVert" size="medium" color="grey" />
      </IconButton>
    );
  };

  const addMoreVertColumns: GridColDef[] = [
    ...columns,
    {
      field: '',
      flex: 1,
      headerName: 'Chức năng',
      renderCell() {
        return renderMoreVertMenuIcon();
      },
    },
  ];

  return (
    <Stack
      sx={{
        height: '100vh',
      }}
    >
      <CRUDTableHeader
        title={texts.title}
        addButtonTitle={addItemButtonLabel}
        onCreate={onAdd}
      />
      <CRUDTableSearching
        searchPlaceholder={searchPlaceholder}
        searchControl={searchValueForm}
        onSearch={onSearch}
        filterFormInputList={searchFilterFormInputList}
      />
      <Stack>
        <DataGrid autoHeight rows={rows} columns={addMoreVertColumns} />
      </Stack>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onMouseLeave={handleClose}
      >
        {menuItemList.map((item) => (
          <MenuItem key={item.title} onClick={item.onCLick}>
            <ListItemIcon>
              <Icon name={item.icon} size="medium" color="black" />
            </ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
}
