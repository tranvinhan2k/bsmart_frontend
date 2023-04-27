import { GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { transformISODateToDisplayDateTime } from '~/utils/date';

export const questionBankInnerColumns: GridColDef[] = [
  {
    field: 'content',
    headerName: 'Nội dung',
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'version',
    headerName: 'Phiên bản',
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'createdBy',
    headerName: 'Tạo bởi',
    minWidth: 300,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const { name, date } = params.row.createdBy;
      const formattedDate = transformISODateToDisplayDateTime(date);
      return (
        <Box justifyContent="flex-start">
          <Typography>{name}</Typography>
          <Typography>{formattedDate}</Typography>
        </Box>
      );
    },
  },
  {
    field: 'noOfComments',
    headerName: 'Bình luận',
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'isCheckingNeed',
    headerName: 'Cần kiểm tra',
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'lastUsed',
    headerName: 'Lần sử dụng cuối',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'modifiedBy',
    headerName: 'Chỉnh sửa bởi',
    minWidth: 300,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const { name, date } = params.row.modifiedBy;
      const formattedDate = transformISODateToDisplayDateTime(date);
      return (
        <Box justifyContent="flex-start">
          <Typography>{name}</Typography>
          <Typography>{formattedDate}</Typography>
        </Box>
      );
    },
  },
];
