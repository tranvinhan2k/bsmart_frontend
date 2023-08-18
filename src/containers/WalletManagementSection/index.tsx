import { Box, Typography } from '@mui/material';
import { SX_FORM, SX_FORM_TITLE } from './style';
import { useGetMentorTransactions } from '~/hooks';
import { LoadingWrapper } from '~/HOCs';
import RevenueChart from '~/pages/admin/AdminManagerRevenuePage/RevenueChart';

export default function WalletManagementSection() {
  // const { transactions } = useQueryGetTransactions({ page, size, sort });
  const { data: transactions, error, isLoading } = useGetMentorTransactions();

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        Lịch sử giao dịch
      </Typography>

      <Box mt={1}>
        <LoadingWrapper isLoading={isLoading} error={error}>
          <RevenueChart data={transactions || []} />
        </LoadingWrapper>
      </Box>
    </Box>
  );
}
