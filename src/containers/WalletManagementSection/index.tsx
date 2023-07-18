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
  SX_FORM,
  SX_FORM_LABEL,
  SX_FORM_TITLE,
  SX_CONTAINER,
  SX_FORM_SEARCH_INPUT,
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
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        Lịch sử giao dịch
      </Typography>
      <Box mt={5}>
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
      <Box mt={4}>
        {transactions && (
          <DataGrid
            columns={transactionColumns}
            loading={isLoading}
            onPageChange={handleNewPage}
            onPageSizeChange={handleNewSize}
            page={page}
            pageSize={size}
            pagination
            paginationMode="server"
            rowCount={transactions.totalItems}
            rows={transactions.items}
            rowsPerPageOptions={rowsPerPageOptionsDefault}
            /*  */
            density="compact"
            disableSelectionOnClick
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            getRowHeight={() => 'auto'}
            rowHeight={rowHeightDefault}
            /*  */
            sx={SX_WALLET_DATAGRID}
          />
        )}
        {!transactions && (
          <Typography component="h3" sx={SX_FORM_TITLE}>
            Đang tải bảng
          </Typography>
        )}
      </Box>
    </Box>
  );
}
