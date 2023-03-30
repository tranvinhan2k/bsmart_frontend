import { Box, Grid, Stack, Typography } from '@mui/material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person2Icon from '@mui/icons-material/Person2';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { defaultValueWithdrawMoney } from '~/form/defaultValues';
import { WITHDRAW_MONEY_FIELDS } from '~/form/schema';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import transactionsApi, {
  WithdrawMoneyProfilePayload,
} from '~/api/transactions';
import { validationSchemaWithdrawMoney } from '~/form/validation';
import { useYupValidationResolver } from '~/hooks';
import Button from '~/components/atoms/Button';
import {
  SX_CONTAINER,
  SX_WITHDRAW_TITLE,
  SX_WITHDRAW_BALANCE,
  SX_WITHDRAW_BALANCE_NUMBER,
  SX_TITLE_NOTE,
  SX_DESC_NOTE,
  SX_NOTE,
} from './style';
import { useQueryGetAllBanks } from '~/hooks/useQueryGetAllBanks';

export default function WithdrawSection() {
  const { banks } = useQueryGetAllBanks();
  const { mutateAsync: mutateWithdrawMoney } = useMutation({
    mutationFn: transactionsApi.withdrawMoney,
  });
  const resolverWithdrawMoney = useYupValidationResolver(
    validationSchemaWithdrawMoney
  );
  const { control, handleSubmit, reset } = useForm({
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
  }, [banks, reset]);

  const handleSubmitSuccess = async (data: any) => {
    const params: WithdrawMoneyProfilePayload = {
      amount: data.amount,
      bankId: data.bankLinking.id,
      bankAccount: data.bankAccount,
      bankAccountOwner: data.bankAccountOwner,
      note: data.note,
    };

    console.log('data', data);
    console.log('params', params);
    const id = toast.loadToast('Đang rút tiền ...');
    try {
      await mutateWithdrawMoney(params);
      toast.updateSuccessToast(id, 'Rút tiền thành công');
    } catch (error: any) {
      toast.updateFailedToast(
        id,
        `Rút tiền không thành công: ${error.message}`
      );
    }
  };

  const WITHDRAW_MONEY_FORM_TEXT = {
    TITLE: 'Rút tiền',
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
        <Typography component="h3" sx={SX_WITHDRAW_TITLE}>
          {WITHDRAW_MONEY_FORM_TEXT.TITLE}
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          my={2}
        >
          <Typography component="p" sx={SX_WITHDRAW_BALANCE}>
            Số dư hiện tại:
          </Typography>
          <Typography sx={SX_WITHDRAW_BALANCE_NUMBER}>300,000 vnđ</Typography>
        </Stack>
        {banks && (
          <form onSubmit={handleSubmit(handleSubmitSuccess)}>
            <Grid container columnSpacing={3}>
              <Grid item xs={12}>
                <Typography>{WITHDRAW_MONEY_FORM_TEXT.AMOUNT.LABEL}</Typography>
                <FormInput
                  control={control}
                  name={WITHDRAW_MONEY_FIELDS.amount}
                  placeholder={WITHDRAW_MONEY_FORM_TEXT.AMOUNT.PLACEHOLDER}
                  variant="number"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>
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
                <Typography>
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
                <Typography>
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
              <Grid item xs={12}>
                <Typography>{WITHDRAW_MONEY_FORM_TEXT.NOTE.LABEL}</Typography>
                <FormInput
                  control={control}
                  name={WITHDRAW_MONEY_FIELDS.note}
                  placeholder={WITHDRAW_MONEY_FORM_TEXT.NOTE.PLACEHOLDER}
                  variant="multiline"
                />
              </Grid>
            </Grid>
            <Button customVariant="normal" type="submit">
              Rút tiền
            </Button>
          </form>
        )}
        {!banks && (
          <Typography component="h4" sx={SX_TITLE_NOTE}>
            Đang tải thông tin
          </Typography>
        )}
      </Box>
      <Box sx={SX_CONTAINER}>
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
      </Box>
    </>
  );
}
