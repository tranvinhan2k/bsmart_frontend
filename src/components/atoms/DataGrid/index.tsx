import { MouseEvent, useState } from 'react';
import { IconButton, MenuList, Popover, MenuItem } from '@mui/material';
import {
  DataGrid as MuiDataGrid,
  DataGridProps,
  GridColumns,
  viVN,
  gridClasses,
  GridColDef,
} from '@mui/x-data-grid';
import MenuIcon from '@mui/icons-material/Menu';
import { alpha, styled } from '@mui/material/styles';

interface MyDataGridProps extends DataGridProps {
  columns: GridColumns<object>;
  rows: object[];
  popoverOptions?: { id: number; label: string; optionFunc: () => void }[];
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
  // const [rowData, setRowData] = useState();
  const openPopover = Boolean(anchorEl);
  const handleActionCellClick = (
    event: MouseEvent<HTMLButtonElement>,
    params: any
  ) => {
    setAnchorEl(event.currentTarget);
    // setRowData(params.row);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  // popover view details
  const [displayRowData, setDisplayRowData] = useState(false);
  const handleDisplayProfile = () => {
    setDisplayRowData(true);
    setAnchorEl(null);
  };

  // popover extra column
  const actionColumn: GridColDef[] = [
    {
      field: 'action',
      headerName: 'Hành động',
      filterable: false,
      renderCell: (params: any) => (
        <IconButton
          onClick={(e: any) => handleActionCellClick(e, params)}
          size="small"
        >
          <MenuIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <StripedDataGrid
        autoHeight
        columns={popoverOptions ? actionColumn.concat(columns) : columns}
        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        {...rest}
      />
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <MenuList>
          {popoverOptions &&
            popoverOptions.map((option) => (
              <MenuItem onClick={option.optionFunc} key={option.id}>
                {option.label}
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
