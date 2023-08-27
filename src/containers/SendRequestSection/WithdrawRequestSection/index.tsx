import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Person2Icon from '@mui/icons-material/Person2';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
  Box,
  Button as MuiButton,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import transactionsApi, {
  WithdrawMoneyProfilePayload,
} from '~/api/transactions';
import { defaultValueWithdrawMoney } from '~/form/defaultValues';
import { FontFamily } from '~/assets/variables';
import { formatMoney } from '~/utils/money';
import { toastMsgError } from '~/utils/common';
import { useDispatchProfile, useYupValidationResolver } from '~/hooks';
import { useQueryGetAllBanks } from '~/hooks/useQueryGetAllBanks';
import { validationSchemaWithdrawMoney } from '~/form/validation';
import { WITHDRAW_MONEY_FIELDS } from '~/form/schema';
import CoinLabel from '~/components/atoms/CoinLabel';
import FormInput from '~/components/atoms/FormInput';
import globalStyles from '~/styles';
import toast from '~/utils/toast';
import { SX_CONTAINER, SX_FORM_LABEL, SX_TITLE_NOTE } from './style';

export default function WithdrawRequestSection() {
  const { profile, handleDispatch } = useDispatchProfile();
  const { banks } = useQueryGetAllBanks();
  const { mutateAsync: mutateWithdrawMoney } = useMutation({
    mutationFn: transactionsApi.withdrawMoney,
  });
  const resolverWithdrawMoney = useYupValidationResolver(
    validationSchemaWithdrawMoney
  );
  const { control, handleSubmit, reset, setError } = useForm({
    defaultValues: defaultValueWithdrawMoney,
    resolver: resolverWithdrawMoney,
  });

  const formData = [
    { id: 1, placeholder: 'Nhập số tiền', icon: <LocalAtmIcon /> },
    { id: 2, placeholder: 'Ngân hàng', icon: <AccountBalanceIcon /> },
    { id: 3, placeholder: 'Số tài khoản', icon: <AccountCircleIcon /> },
    { id: 4, placeholder: 'Chủ tài khoản', icon: <Person2Icon /> },
    { id: 5, placeholder: 'Ghi chú', icon: <StickyNote2Icon /> },
    { id: 6, placeholder: 'Mã xác thực', icon: <VpnKeyIcon /> },
  ];

  useEffect(() => {
    if (banks) {
      const defaults = defaultValueWithdrawMoney;
      if (banks && banks.length > 0) {
        defaults.bankLinking = {
          id: banks[0].id,
          bin: banks[0].bin,
          code: banks[0].code,
          logo: banks[0].logo,
          lookupSupported: banks[0].lookupSupported,
          name: banks[0].name,
          shortName: banks[0].shortName,
          transferSupported: banks[0].transferSupported,
        };
        reset(defaults);
      }
    }
  }, [banks, reset]);

  const handleSubmitSuccess = async (data: any) => {
    const params: WithdrawMoneyProfilePayload = {
      amount: data.amount,
      bankId: data.bankLinking.id,
      bankAccount: data.bankAccount,
      bankAccountOwner: data.bankAccountOwner,
    };

    const id = toast.loadToast('Đang gửi yêu cầu rút tiền ...');
    try {
      await mutateWithdrawMoney(params);
      toast.updateSuccessToast(id, 'Gửi yêu cầu rút tiền thành công');
      reset();
    } catch (error: unknown) {
      toast.updateFailedToast(id, toastMsgError(error));
    }
  };

  const WITHDRAW_MONEY_FORM_TEXT = {
    TITLE: 'Yêu cầu rút tiền',
    AMOUNT: {
      LABEL: 'Số tiền muốn rút (vnđ)',
      PLACEHOLDER: 'Nhập Số tiền muốn rút',
    },
    BANK_LINKING: {
      LABEL: 'Ngân hàng',
      PLACEHOLDER: 'Chọn Ngân hàng',
    },
    BANK_ACCOUNT: {
      LABEL: 'Số tài khoản ngân hàng',
      PLACEHOLDER: 'Nhập Số tài khoản ngân hàng',
    },
    BANK_ACCOUNT_OWNER: {
      LABEL: 'Tên chủ khoản',
      PLACEHOLDER: 'Nhập Tên chủ khoản',
    },
    NOTE: {
      LABEL: 'Ghi chú',
      PLACEHOLDER: 'Nhập Ghi chú',
    },
    BUTTON_TEXT: 'Rút tiền',
  };

  return (
    <>
      <Box sx={SX_CONTAINER}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Typography sx={globalStyles.textSmallLabel}>
            Số dư hiện tại:
          </Typography>
          <CoinLabel value={profile.wallet.balance || 0} />
        </Stack>
        {banks && (
          <form onSubmit={handleSubmit(handleSubmitSuccess)}>
            <Grid container columnSpacing={3}>
              <Grid item xs={12}>
                <Typography sx={SX_FORM_LABEL}>
                  {WITHDRAW_MONEY_FORM_TEXT.AMOUNT.LABEL}
                </Typography>
                <FormInput
                  control={control}
                  name={WITHDRAW_MONEY_FIELDS.amount}
                  placeholder={WITHDRAW_MONEY_FORM_TEXT.AMOUNT.PLACEHOLDER}
                  variant="price"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={SX_FORM_LABEL}>
                  {WITHDRAW_MONEY_FORM_TEXT.BANK_LINKING.LABEL}
                </Typography>
                <FormInput
                  control={control}
                  name={WITHDRAW_MONEY_FIELDS.bankLinking}
                  placeholder={
                    WITHDRAW_MONEY_FORM_TEXT.BANK_LINKING.PLACEHOLDER
                  }
                  variant="dropdownBanks"
                  banks={banks}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={SX_FORM_LABEL}>
                  {WITHDRAW_MONEY_FORM_TEXT.BANK_ACCOUNT.LABEL}
                </Typography>
                <FormInput
                  control={control}
                  name={WITHDRAW_MONEY_FIELDS.bankAccount}
                  placeholder={
                    WITHDRAW_MONEY_FORM_TEXT.BANK_ACCOUNT.PLACEHOLDER
                  }
                  variant="text"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={SX_FORM_LABEL}>
                  {WITHDRAW_MONEY_FORM_TEXT.BANK_ACCOUNT_OWNER.LABEL}
                </Typography>
                <FormInput
                  control={control}
                  name={WITHDRAW_MONEY_FIELDS.bankAccountOwner}
                  placeholder={
                    WITHDRAW_MONEY_FORM_TEXT.BANK_ACCOUNT_OWNER.PLACEHOLDER
                  }
                  variant="text"
                />
              </Grid>
            </Grid>
            <Box mt={4}>
              <MuiButton
                color="miSmartOrange"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ fontFamily: FontFamily.bold }}
              >
                Gửi yêu cầu
              </MuiButton>
            </Box>
          </form>
        )}
        {!banks && (
          <Typography component="h4" sx={SX_TITLE_NOTE}>
            Đang tải thông tin
          </Typography>
        )}
      </Box>
      {/* <Box sx={SX_CONTAINER}>
        <Typography component="h4" sx={SX_TITLE_NOTE}>
          *Lưu ý:
        </Typography>
        <Typography component="p" sx={SX_DESC_NOTE}>
          1 trong 2 trường hợp gặp phải khi bạn không thể rút hết số dư còn lại
          là:
        </Typography>
        <Typography component="p" sx={SX_NOTE}>
          Trường hợp 1:
        </Typography>
        <Typography component="p" sx={SX_NOTE}>
          Trường hợp 2:
        </Typography>
      </Box> */}
    </>
  );
}
