import { useState } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
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
import Button from '~/components/atoms/Button';
import { useBoolean } from '~/hooks/useBoolean';
import CustomModal from '~/components/atoms/CustomModal';
import globalStyles from '~/styles';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import {
  useDeposit,
  useDispatchProfile,
  useGetMentorTransactions,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import CoinLabel from '~/components/atoms/CoinLabel';
import FormInput from '~/components/atoms/FormInput';
import { validationPaymentPrice } from '~/form/validation';
import { formatMoney } from '~/utils/money';
import { handleConsoleError } from '~/utils/common';
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
