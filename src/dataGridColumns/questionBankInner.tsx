import { GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { transformISODateToDisplayDateTime } from '~/utils/date';

export const questionBankInnerColumns: GridColDef[] = [
  {
    field: 'content',
    headerName: 'Nội dung',
    minWidth: 500,
    flex: 5,
  },
  {
    field: 'version',
    headerName: 'Phiên bản',
    minWidth: 85,
    flex: 1,
  },
  {
    field: 'createdBy',
    headerName: 'Tạo bởi',
    minWidth: 200,
    flex: 2,
    renderCell: (params) => {
      const { name, date } = params.row.createdBy;
      const formattedDate = transformISODateToDisplayDateTime(date);
      return (
        <Box>
          <Typography>{name}</Typography>
          <Typography>{formattedDate}</Typography>
        </Box>
      );
    },
  },
  {
    field: 'noOfComments',
    headerName: 'Bình luận',
    minWidth: 85,
    flex: 1,
  },
  {
    field: 'isCheckingNeed',
    headerName: 'Cần kiểm tra',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'lastUsed',
    headerName: 'Lần sử dụng cuối',
    minWidth: 200,
    flex: 2,
  },
  {
    field: 'modifiedBy',
    headerName: 'Chỉnh sửa bởi',
    minWidth: 200,
    flex: 2,
    renderCell: (params) => {
      const { name, date } = params.row.modifiedBy;
      const formattedDate = transformISODateToDisplayDateTime(date);
      return (
        <Box>
          <Typography>{name}</Typography>
          <Typography>{formattedDate}</Typography>
        </Box>
      );
    },
  },
];
