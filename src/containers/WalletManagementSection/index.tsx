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
  const resolver = useYupValidationResolver(validationPaymentPrice);
  const { control, handleSubmit, setError } = useForm({
    resolver,
  });

  const { mutateAsync } = useDeposit();
  const { handleTryCatch } = useTryCatch('gửi yêu cầu rút tiền');
  const { profile, handleDispatch } = useDispatchProfile();
  const { value, toggle } = useBoolean(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('');

  // const { transactions } = useQueryGetTransactions({ page, size, sort });
  const { data: transactions, error, isLoading } = useGetMentorTransactions();

  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);

  const onSubmit = async (data: { price: number }) => {
    if (data.price >= profile.wallet.balance) {
      setError('price', {
        type: 'custom',
        message: `Số tiền muốn rút phải nhỏ hơn số xu cũa bạn: ${formatMoney(
          profile.wallet.balance,
          true
        )} BS`,
      });
    } else {
      await handleTryCatch(async () => {
        await mutateAsync(data.price);
        await handleDispatch();
        toggle();
      });
    }
  };

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        Lịch sử giao dịch
      </Typography>
      <Stack mt={1} sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button
          variant="contained"
          sx={{
            minWidth: '160px',
            marginRight: 1,
            background: Color.tertiary,
            color: Color.white,
          }}
          onClick={toggle}
        >
          <Typography
            sx={{
              fontFamily: FontFamily.bold,
              fontSize: FontSize.small_14,
              color: Color.white,
            }}
          >
            Yêu cầu rút tiền
          </Typography>
        </Button>
      </Stack>
      <Box mt={1}>
        <LoadingWrapper isLoading={isLoading} error={error}>
          <RevenueChart data={transactions || []} />
        </LoadingWrapper>
      </Box>
      <CustomModal open={value} onClose={toggle} title="Yêu cầu rút tiền">
        <Stack
          sx={{
            minWidth: '50vw',
          }}
        >
          <Typography sx={globalStyles.textSmallLabel}>
            Số tiền hiện có
          </Typography>
          <CoinLabel value={profile.wallet.balance || 0} />
          <Stack
            sx={{ flexDirection: 'row', alignItems: 'flex-start' }}
            marginTop={1}
          >
            <FormInput
              placeholder="Nhập số tiền bạn muốn rút"
              variant="price"
              control={control}
              name="price"
            />
            <Button
              sx={{
                marginLeft: 1,
              }}
              variant="contained"
              onClick={handleSubmit(onSubmit, handleConsoleError)}
            >
              Rút tiền
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </Box>
  );
}
