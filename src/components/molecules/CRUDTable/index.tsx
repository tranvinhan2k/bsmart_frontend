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

interface CRUDTableProps {
  title: string;
  columns: GridColDef[];
  rows: any;
  addItemButtonLabel: string;
  menuItemList: { icon: IconName; title: string; onCLick: () => void }[];
  searchPlaceholder: string;
  searchFilterFormInputList: {
    variant: FormInputVariant;
    name: string;
    placeholder: string;
    data: OptionPayload[];
  }[];
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
        height: '700px',
        padding: 2,
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
      <Stack
        sx={{
          height: '700px',
        }}
      >
        <DataGrid rows={rows} columns={addMoreVertColumns} />
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
          <MenuItem key={item.title} onClick={handleClose}>
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
