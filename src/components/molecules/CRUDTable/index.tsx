import {
  Stack,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  DataGrid as MuiDataGrid,
  viVN,
  gridClasses,
  GridColDef,
  GridRowIdGetter,
  GridValidRowModel,
  DataGridProps,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { alpha, styled } from '@mui/material/styles';
import CRUDTableHeader from './CRUDTableHeader';
import CRUDTableSearching from './CRUDTableSearching';
import Icon, { IconName } from '~/components/atoms/Icon';
import { FormInputVariant } from '~/models/form';
import { OptionPayload } from '~/models';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import globalStyles from '~/styles';

export type MenuItemPayload = {
  icon: IconName;
  title: string;
  onCLick: () => void;
};

export type SearchFilterFormInput = {
  variant: FormInputVariant;
  name: string;
  placeholder: string;
  data?: OptionPayload[];
};
type CRUDTableProps<T> = DataGridProps & {
  title?: string;
  columns: GridColDef[];
  isLoading?: boolean;
  error?: any;
  rows: T[];
  addItemButtonLabel?: string;
  menuItemList?: MenuItemPayload[];
  searchPlaceholder?: string;
  searchFilterFormInputList?: SearchFilterFormInput[];
  setSelectedRow?: (selectedRow: T) => void;
  onAdd?: () => void;
  onSearch?: (data: any) => void;
  getRowId?: GridRowIdGetter<GridValidRowModel>;
};

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

export default function CRUDTable<T>({
  title = '',
  isLoading = false,
  error = null,
  columns,
  rows = [],
  addItemButtonLabel = '',
  menuItemList,
  searchPlaceholder = '',
  searchFilterFormInputList,
  setSelectedRow,
  onAdd,
  onSearch,
  getRowId,
  ...props
}: CRUDTableProps<T>) {
  const searchValueForm = useForm();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const texts = {
    title,
  };

  const handleClose = () => {
    setAnchorEl(() => null);
  };

  const handleSelectedRow = (data: any) => {
    if (setSelectedRow) {
      setSelectedRow(data.row);
    }
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const renderMoreVertMenuIcon = () => {
    return (
      <IconButton onClick={handleMenu}>
        <Icon name="moreVert" size="small_20" color="black" />
      </IconButton>
    );
  };

  const addMoreVertColumns: GridColDef[] =
    menuItemList?.length !== 0
      ? [
          ...columns,
          {
            field: '',
            width: 150,
            // flex: 1,
            headerName: 'Chức năng',
            renderCell() {
              return renderMoreVertMenuIcon();
            },
          },
        ]
      : columns;

  return (
    <Stack
      sx={{
        borderRadius: MetricSize.small_5,
      }}
    >
      {onAdd ? (
        <CRUDTableHeader
          title={texts.title || ''}
          addButtonTitle={addItemButtonLabel}
          onCreate={onAdd}
        />
      ) : (
        <Typography sx={globalStyles.textTitle}>{title}</Typography>
      )}
      {onSearch && (
        <CRUDTableSearching
          searchPlaceholder={searchPlaceholder}
          searchControl={searchValueForm}
          onSearch={onSearch}
          filterFormInputList={searchFilterFormInputList}
        />
      )}
      <Stack
        sx={{
          minHeight: '700px',
          background: Color.white,
        }}
      >
        <StripedDataGrid
          {...props}
          onRowClick={handleSelectedRow}
          error={error}
          loading={isLoading}
          rows={rows}
          columns={addMoreVertColumns}
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
          getRowId={getRowId ?? getRowId}
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
      </Menu>
    </Stack>
  );
}

CRUDTable.defaultProps = {
  menuItemList: [],
  searchFilterFormInputList: [],
  onAdd: undefined,
  getRowId: undefined,
  isLoading: false,
  error: null,
  addItemButtonLabel: '',
  searchPlaceholder: '',
  onSearch: undefined,
  setSelectedRow: undefined,
};
