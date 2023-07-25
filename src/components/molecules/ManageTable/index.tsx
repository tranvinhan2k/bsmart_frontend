import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import {
  DataGrid as MuiDataGrid,
  DataGridProps,
  gridClasses,
  GridColDef,
  GridRowIdGetter,
  GridValidRowModel,
  viVN,
} from '@mui/x-data-grid';
import { MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Color, FontFamily } from '~/assets/variables';
import Icon, { IconName } from '~/components/atoms/Icon';
import { OptionPayload } from '~/models';
import { FormInputVariant } from '~/models/form';
import globalStyles from '~/styles';
import ManageTableSearching from './ManageTableSearching';

const ODD_OPACITY = 0.2;
const StripedDataGrid = styled(MuiDataGrid)(({ theme }) => ({
  '.MuiDataGrid-columnHeadersInner': {
    background: Color.white4,
  },
  '.MuiDataGrid-columnHeaderTitle': {
    color: Color.navy,
    textTransform: 'uppercase',
    fontSize: '12px',
    fontFamily: FontFamily.bold,
  },
  '.MuiDataGrid-overlay': {
    ...globalStyles.textLowSmallLight,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`& .${gridClasses.row}.even`]: {
    transition: 'all 500ms ease',
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
interface CRUDTableProps extends DataGridProps {
  columns: GridColDef[];
  isLoading?: boolean;
  error?: any;
  rows: any;
  menuItemList?: MenuItemPayload[];
  searchFilterFormInputList?: SearchFilterFormInput[];
  setSelectedRow?: (selectedRow: any) => void;
  onSearch?: (data: any) => void;
  getRowId?: GridRowIdGetter<GridValidRowModel>;
  popoverOptions?: MenuItemPayload[];
  searchHandler: {
    searchPlaceholder: string;
    searchButtonLabel: string;
  };
  page: number;
  pageSize: number;
  totalItems: number;
  handleNewPage: (data: number) => void;
  handleNewSize: (data: number) => void;
}

export default function CRUDTable({
  isLoading = false,
  error = null,
  columns,
  rows = [],
  menuItemList,
  searchFilterFormInputList,
  setSelectedRow,
  onSearch,
  getRowId,
  popoverOptions,
  searchHandler,
  page,
  pageSize,
  totalItems,
  handleNewPage,
  handleNewSize,
  ...props
}: CRUDTableProps) {
  const searchValueForm = useForm();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpen = (e: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(() => null);

  const handleSelectedRow = (data: any) => {
    if (setSelectedRow) setSelectedRow(data.row);
  };

  const extraActionColumn: GridColDef[] = [
    {
      field: 'action',
      headerName: '',
      minWidth: 50,
      flex: 0.5,
      align: 'center',
      filterable: false,
      sortable: false,
      renderCell: () => (
        <IconButton onClick={handleOpen}>
          <Icon name="menu" size="small_20" color="black" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box
      sx={{
        background: Color.white,
      }}
    >
      {onSearch && (
        <ManageTableSearching
          searchPlaceholder={searchHandler.searchPlaceholder}
          searchControl={searchValueForm}
          onSearch={onSearch}
          filterFormInputList={searchFilterFormInputList}
        />
      )}
      <StripedDataGrid
        {...props}
        autoHeight
        columns={popoverOptions ? extraActionColumn.concat(columns) : columns}
        loading={isLoading}
        // error={error}
        onPageChange={handleNewPage}
        onPageSizeChange={handleNewSize}
        page={page}
        pageSize={pageSize}
        pagination
        paginationMode="server"
        rowCount={totalItems}
        // rowHeight={rowHeightDefault}
        rows={rows}
        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
        onRowClick={handleSelectedRow}
      />
      <Popover
        keepMounted
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <MenuList>
          {popoverOptions &&
            popoverOptions.map((item) => (
              <MenuItem
                key={item.title}
                onClick={() => {
                  item.onCLick();
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <Icon name={item.icon} size="small" color="black" />
                </ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </MenuItem>
            ))}
        </MenuList>
      </Popover>
    </Box>
  );
}

CRUDTable.defaultProps = {
  menuItemList: [],
  searchFilterFormInputList: [],
  getRowId: undefined,
  isLoading: false,
  error: null,
  onSearch: () => {},
  setSelectedRow: undefined,
  popoverOptions: [],
};
