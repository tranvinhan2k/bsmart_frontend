import {
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
  GridColumns,
  viVN,
} from '@mui/x-data-grid';
import { MouseEvent, useState } from 'react';
import Icon, { IconName } from '../Icon';

export type MenuItemPayload = {
  icon: IconName;
  title: string;
  onCLick: () => void;
};
interface MyDataGridProps extends DataGridProps {
  columns: GridColumns<object>;
  rows: object[];
  popoverOptions?: MenuItemPayload[];
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

export default function DataGrid({
  columns,
  rows,
  popoverOptions,
  ...rest
}: MyDataGridProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpen = (e: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(() => null);

  const extraActionColumn: GridColDef[] = [
    {
      field: 'action',
      headerName: '',
      minWidth: 50,
      flex: 1,
      filterable: false,
      sortable: false,
      renderCell: () => (
        <IconButton onClick={handleOpen}>
          <Icon name="moreVert" size="small_20" color="black" />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <StripedDataGrid
        autoHeight
        columns={popoverOptions ? columns.concat(extraActionColumn) : columns}
        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        {...rest}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        keepMounted
        anchorOrigin={{
          vertical: 'bottom',
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
    </>
  );
}

DataGrid.defaultProps = {
  popoverOptions: undefined,
};
