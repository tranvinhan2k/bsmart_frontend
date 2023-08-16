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
  [`& .${gridClasses.row}.odd`]: {
    transition: 'all 500ms ease',
    backgroundColor: theme.palette.grey[100],
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
interface ManageTableProps extends DataGridProps {
  columns: GridColDef[];
  rows: any;
  error?: any;
  isLoading?: boolean;
  onPageChange: (data: number) => void;
  onPageSizeChange: (data: number) => void;
  page: number;
  pageSize: number;
  popoverOptions?: MenuItemPayload[];
  setSelectedRow?: (selectedRow: any) => void;
  totalItems: number;
  searchHandler: {
    searchPlaceholder: string;
    onSearch: (data: any) => void;
  };
  getRowId?: GridRowIdGetter<GridValidRowModel>;
  menuItemList?: MenuItemPayload[];
  searchFilterFormInputList?: SearchFilterFormInput[];
}

export default function ManageTable({
  columns,
  rows = [],
  error = null,
  onPageChange,
  onPageSizeChange,
  isLoading = false,
  page,
  pageSize,
  popoverOptions,
  setSelectedRow,
  totalItems,
  searchHandler: { searchPlaceholder, onSearch },
  getRowId,
  menuItemList,
  searchFilterFormInputList,
  ...props
}: ManageTableProps) {
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
      width: 50,
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
          searchPlaceholder={searchPlaceholder}
          searchControl={searchValueForm}
          onSearch={onSearch}
          filterFormInputList={searchFilterFormInputList}
        />
      )}
      <StripedDataGrid
        {...props}
        autoHeight
        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
        pagination
        paginationMode="server"
        //
        columns={popoverOptions ? extraActionColumn.concat(columns) : columns}
        rows={rows}
        //
        error={error}
        loading={isLoading}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onRowClick={handleSelectedRow}
        page={page}
        pageSize={pageSize}
        rowCount={totalItems}
        // styling
        // getRowClassName={(params) =>
        //   params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        // }
        getRowHeight={() => 'auto'}
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 0.75,
          },
        }}
      />
      <Popover
        keepMounted
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
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

ManageTable.defaultProps = {
  menuItemList: [],
  searchFilterFormInputList: [],
  getRowId: undefined,
  error: null,
  isLoading: false,
  popoverOptions: undefined,
  setSelectedRow: undefined,
};
