import { useState } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DataGrid from '~/components/atoms/DataGrid';
import Icon from '~/components/atoms/Icon';
import { useQueryGetTransactions } from '~/hooks/useQueryGetTransactions';
import {
  SX_WRAPPER_TITLE,
  SX_CONTAINER,
  SX_FORM_SEARCH_INPUT,
  SX_TITLE,
  SX_FORM_SEARCH_INPUT_ICON_BUTTON,
  SX_WALLET_DATAGRID,
} from './style';

export default function WalletManagementSection() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState('');
  const { transactions } = useQueryGetTransactions({ page, size, sort });
  // console.log('transactions', transactions);
  // const dataMockedRows = {
  //   items: [
  //     { id: 1, name: 'Ei1', money: 10, up: 200, down: 0, total: 10, time: '' },
  //     { id: 2, name: 'Ei2', money: 10, up: 200, down: 0, total: 10, time: '' },
  //     { id: 3, name: 'Ei3', money: 10, up: 200, down: 0, total: 10, time: '' },
  //     { id: 4, name: 'Ei4', money: 10, up: 200, down: 0, total: 10, time: '' },
  //     { id: 5, name: 'Ei5', money: 10, up: 200, down: 0, total: 10, time: '' },
  //     { id: 6, name: 'Ei6', money: 10, up: 200, down: 0, total: 10, time: '' },
  //     { id: 7, name: 'Ei7', money: 10, up: 200, down: 0, total: 10, time: '' },
  //     { id: 8, name: 'Ei8', money: 10, up: 200, down: 0, total: 10, time: '' },
  //     { id: 9, name: 'Ei9', money: 10, up: 200, down: 0, total: 10, time: '' },
  //     { id: 10, name: 'Ei10', money: 10, up: 0, down: 0, total: 10, time: '' },
  //     { id: 11, name: 'Ei11', money: 10, up: 0, down: 0, total: 10, time: '' },
  //   ],
  //   totalItems: 10,
  // };
  // const dataMockedRows = {
  //   items: [
  //     {
  //       id: 0,
  //       afterBalance: 0,
  //       beforeBalance: 10,
  //       created: 200,
  //       createdBy: 0,
  //       lastModified: 10,
  //       lastModifiedBy: 10,
  //       status: 'status',
  //       type: 'type',
  //     },
  //   ],
  //   totalItems: 10,
  // };

  const dataMockedColumns: GridColDef[] = [
    { field: 'type', headerName: 'Phân loại', width: 100 },
    { field: 'status', headerName: 'Trạng thái', width: 100 },
    {
      field: 'diffBalance1',
      renderHeader: () => (
        <>
          <Icon name="up" size="medium" />
          Tăng (vnđ)
        </>
      ),
      width: 150,
      renderCell: (params) => {
        const balance = params.row.afterBalance - params.row.beforeBalance;
        return balance > 0 ? balance : 0;
      },
    },
    {
      field: 'diffBalance2',
      renderHeader: () => (
        <>
          <Icon name="down" size="medium" />
          Giảm (vnđ)
        </>
      ),
      width: 150,
      renderCell: (params) => {
        const balance = params.row.beforeBalance - params.row.afterBalance;
        return balance > 0 ? balance : 0;
      },
    },
    { field: 'created', headerName: 'Ngày tạo', width: 100 },
    { field: 'createdBy', headerName: 'Tạo bởi', width: 100 },
    { field: 'lastModified', headerName: 'Lần chỉnh sửa cuối', width: 200 },
  ];

  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);

  const isLoading = false;

  return (
    <>
      <Box sx={SX_WRAPPER_TITLE}>
        <Typography component="h3" sx={SX_TITLE}>
          Lịch sử giao dịch
        </Typography>
        <Box sx={SX_CONTAINER}>
          <FormControl size="small" fullWidth>
            <TextField
              placeholder="Tìm kiếm giao dịch..."
              size="small"
              sx={SX_FORM_SEARCH_INPUT}
              InputProps={{
                sx: { padding: 0 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton sx={SX_FORM_SEARCH_INPUT_ICON_BUTTON}>
                      <Icon name="search" size="medium" color="white" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>
      </Box>
      <Box height={500} sx={SX_CONTAINER}>
        {transactions && (
          <DataGrid
            /*  */
            loading={isLoading}
            paginationMode="server"
            /*  */
            columns={dataMockedColumns}
            page={page}
            pageSize={size}
            pagination
            rowCount={transactions.totalItems}
            rows={transactions.items}
            rowsPerPageOptions={[10, 20]}
            /*  */
            onPageChange={handleNewPage}
            onPageSizeChange={handleNewSize}
            /*  */
            sx={SX_WALLET_DATAGRID}
            disableSelectionOnClick
          />
        )}
        {!transactions && (
          <Typography component="h3" sx={SX_TITLE}>
            Đang tải bảng
          </Typography>
        )}
      </Box>
    </>
  );
}
