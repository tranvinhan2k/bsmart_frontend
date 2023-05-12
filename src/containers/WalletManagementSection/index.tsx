import { useState } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import {
  rowHeightDefault,
  rowsPerPageOptionsDefault,
} from '~/constants/dataGrid';
import { transactionColumns } from '~/dataGridColumns/transaction';
import { useQueryGetTransactions } from '~/hooks/useQueryGetTransactions';
import DataGrid from '~/components/atoms/DataGrid';
import Icon from '~/components/atoms/Icon';
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
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('');

  const { transactions } = useQueryGetTransactions({ page, size, sort });

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
      <Box sx={SX_CONTAINER}>
        {transactions && (
          <DataGrid
            columns={transactionColumns}
            loading={isLoading}
            page={page}
            pageSize={size}
            pagination
            paginationMode="server"
            rowCount={transactions.totalItems}
            rows={transactions.items}
            rowsPerPageOptions={rowsPerPageOptionsDefault}
            sx={SX_WALLET_DATAGRID}
            /*  */
            disableSelectionOnClick
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            getRowHeight={() => 'auto'}
            onPageChange={handleNewPage}
            onPageSizeChange={handleNewSize}
            rowHeight={rowHeightDefault}
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
