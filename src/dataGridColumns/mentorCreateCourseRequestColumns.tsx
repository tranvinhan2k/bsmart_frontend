import { GridColDef } from '@mui/x-data-grid';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';
import { formatMoney } from '~/utils/money';

export const mentorCreateCourseRequestColumns: GridColDef[] = [
  { field: 'email', headerName: 'Mail', minWidth: 200, flex: 1 },
  { field: 'name', headerName: 'Tên', minWidth: 200, flex: 1 },
  {
    field: 'createDate',
    headerName: 'Ngày tạo',
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      const { createDate } = params.row;
      const formattedDate = formatISODateDateToDisplayDateTime(createDate);
      return formattedDate;
    },
  },
  {
    field: 'startDate',
    headerName: 'Ngày bắt đầu',
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      const { startDate } = params.row;
      const formattedDate = formatISODateDateToDisplayDateTime(startDate);
      return formattedDate;
    },
  },
  {
    field: 'endDate',
    headerName: 'Ngày kết thúc',
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      const { endDate } = params.row;
      const formattedDate = formatISODateDateToDisplayDateTime(endDate);
      return formattedDate;
    },
  },
  {
    field: 'classLevel',
    headerName: 'Trình độ',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'unitPrice',
    headerName: 'Học phí',
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      const { unitPrice } = params.row;
      const formattedDate = formatMoney(unitPrice);
      return formattedDate;
    },
  },
  { field: 'numberStudent', headerName: 'HS hiện có', minWidth: 200, flex: 1 },
  {
    field: 'maxNumberStudent',
    headerName: 'HS tối đa',
    minWidth: 200,
    flex: 1,
  },
];
