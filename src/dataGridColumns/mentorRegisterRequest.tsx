import { GridColDef } from '@mui/x-data-grid';
import { transformISODateToDisplayDateTime } from '~/utils/date';
import { formatPhoneNumberVi } from '~/utils/phone';

export const mentorRegisterRequestColumns: GridColDef[] = [
  { field: 'email', headerName: 'Mail', minWidth: 200, flex: 1 },
  { field: 'fullName', headerName: 'Tên', minWidth: 200, flex: 1 },
  {
    field: 'birthDay',
    headerName: 'Ngày sinh',
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      const { birthDay } = params.row;
      const formattedDate = transformISODateToDisplayDateTime(birthDay);
      return formattedDate;
    },
  },
  {
    field: 'phone',
    headerName: 'SĐT',
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      const { phone } = params.row;
      const formattedDate = formatPhoneNumberVi(phone);
      return formattedDate;
    },
  },
];
