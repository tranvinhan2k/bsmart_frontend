import { GridColDef } from '@mui/x-data-grid';
import { formatMoney } from '~/utils/money';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';
import TypographyQuickColor from '~/components/atoms/Typography/TypographyQuickColor';

export const transactionColumns: GridColDef[] = [
  {
    field: 'typeName',
    headerName: 'Phân loại',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'statusName',
    headerName: 'Trạng thái',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'diffBalance0',
    headerName: 'Biến động số dư',
    minWidth: 140,
    flex: 1,
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
    flex: 1,
    renderCell: (params) =>
      formatISODateDateToDisplayDateTime(params.row.created),
  },
  {
    field: 'lastModified',
    headerName: 'Cập nhật lần cuối',
    minWidth: 200,
    flex: 1,
    renderCell: (params) =>
      formatISODateDateToDisplayDateTime(params.row.lastModified),
  },
  {
    field: 'createdBy',
    headerName: 'Tạo bởi',
    minWidth: 200,
    flex: 1,
  },
];
