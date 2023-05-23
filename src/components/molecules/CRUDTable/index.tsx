import {
  Stack,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  DataGrid as MuiDataGrid,
  viVN,
  gridClasses,
  GridColDef,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { alpha, styled } from '@mui/material/styles';
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
  isLoading: boolean;
  error: any;
  rows: any;
  addItemButtonLabel: string;
  menuItemList?: MenuItemPayload[];
  searchPlaceholder: string;
  searchFilterFormInputList?: SearchFilterFormInput[];
  setSelectedRow: (selectedRow: any) => void;
  onAdd: () => void;
  onSearch: (data: any) => void;
}

const ODD_OPACITY = 0.2;
const StripedDataGrid = styled(MuiDataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

export default function CRUDTable({
  title,
  isLoading,
  error,
  columns,
  rows,
  addItemButtonLabel,
  menuItemList,
  searchPlaceholder,
  searchFilterFormInputList,
  setSelectedRow,
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

  const handleSelectedRow = (data: any) => {
    setSelectedRow(data.row);
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
        <StripedDataGrid
          onRowClick={handleSelectedRow}
          error={error}
          loading={isLoading}
          autoHeight
          rows={rows}
          columns={addMoreVertColumns}
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
        />
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
        {menuItemList?.map((item) => (
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

CRUDTable.defaultProps = {
  menuItemList: [],
  searchFilterFormInputList: [],
};
