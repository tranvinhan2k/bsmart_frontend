import { GridColDef } from '@mui/x-data-grid';
import { formatMoney } from '~/utils/money';
import { transformISODateToDisplayDateTime } from '~/utils/date';
import TypographyQuickColor from '~/components/atoms/Typography/TypographyQuickColor';

export const transactionColumns: GridColDef[] = [
  {
    field: 'typeName',
    headerName: 'Phân loại',
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'statusName',
    headerName: 'Trạng thái',
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'diffBalance0',
    headerName: 'Biến động số dư',
    minWidth: 140,
    headerAlign: 'center',
    align: 'right',
    renderCell: (params) => {
      const balance = params.row.afterBalance - params.row.beforeBalance;
      const formattedBalance = formatMoney(balance);
      return balance > 0 ? (
        <TypographyQuickColor customVariant="green">
          +{formattedBalance}
        </TypographyQuickColor>
      ) : (
        <TypographyQuickColor customVariant="red">
          {formattedBalance}
        </TypographyQuickColor>
      );
    },
  },
  {
    field: 'created',
    headerName: 'Ngày tạo',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const result = transformISODateToDisplayDateTime(params.row.created);
      return result;
    },
  },
  {
    field: 'lastModified',
    headerName: 'Cập nhật lần cuối',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const result = transformISODateToDisplayDateTime(params.row.lastModified);
      return result;
    },
  },
  {
    field: 'createdBy',
    headerName: 'Tạo bởi',
    width: 200,
    headerAlign: 'center',
    align: 'center',
  },
];
