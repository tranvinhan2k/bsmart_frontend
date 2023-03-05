import {
  DataGrid as MuiDataGrid,
  DataGridProps as MUIDataGridProps,
  GridColumns,
  viVN,
} from '@mui/x-data-grid';

interface DataGridProps extends MUIDataGridProps {
  columns: GridColumns<object>;
  rows: object[];
}

export default function DataGrid({ columns, rows, ...rest }: DataGridProps) {
  return (
    <MuiDataGrid
      columns={columns}
      rows={rows}
      localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
      {...rest}
    />
  );
}
