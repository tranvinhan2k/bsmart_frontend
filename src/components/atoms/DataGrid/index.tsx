import {
  DataGrid as MuiDataGrid,
  DataGridProps as MUIDataGridProps,
  GridColumns,
  viVN,
  gridClasses,
} from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';

interface DataGridProps extends MUIDataGridProps {
  columns: GridColumns<object>;
  rows: object[];
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

export default function DataGrid({ columns, rows, ...rest }: DataGridProps) {
  return (
    <StripedDataGrid
      autoHeight
      columns={columns}
      localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
      rows={rows}
      {...rest}
    />
  );
}
