import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ConfigReferralCodeFormDefault, FormInputVariant } from '~/models/form';
import { defaultValueConfigReferralCode } from '~/form/defaultValues';
import { FontFamily } from '~/assets/variables';
import { formatISODateStringToDisplayDateTime } from '~/utils/date';
import { useGetConfigReferralCode } from '~/hooks/config/useGetConfigReferralCode';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaConfigReferralCode } from '~/form/validation';
import {
  useMutationConfigReferralCode,
  UseMutationConfigReferralCodePayload,
} from '~/hooks/config/useMutationConfigReferralCode';
import { toastMsgError } from '~/utils/common';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import sx from './style';
import globalStyles from '~/styles';

interface FormFieldsConfigReferralCodeProps {
  name: string;
  variant: FormInputVariant;
  label: string;
  placeholder?: string;
}
export default function ManageConfigReferralCodeSection() {
  const { configReferralCode, isLoading, refetch } = useGetConfigReferralCode();
  const { mutateAsync } = useMutationConfigReferralCode();

  const title0 = [
    {
      id: 0,
      label: 'Thời gian',
      value: configReferralCode
        ? formatISODateStringToDisplayDateTime(configReferralCode.lastModified)
        : '',
    },
    {
      id: 1,
      label: 'Thực hiện bởi',
      value: configReferralCode ? configReferralCode.lastModifiedBy : '',
    },
  ];

  const resolverConfigReferralCode = useYupValidationResolver(
    validationSchemaConfigReferralCode
  );
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: defaultValueConfigReferralCode,
    resolver: resolverConfigReferralCode,
  });

  useEffect(() => {
    if (configReferralCode) {
      if (configReferralCode.usageLimit)
        defaultValueConfigReferralCode.usageLimit =
          configReferralCode.usageLimit;
      if (configReferralCode.discountPercent)
        defaultValueConfigReferralCode.discountPercent =
          configReferralCode.discountPercent;
      if (configReferralCode.expiredLaterDay)
        defaultValueConfigReferralCode.expiredLaterDay =
          configReferralCode.expiredLaterDay;
      reset(defaultValueConfigReferralCode);
    }
  }, [configReferralCode, reset]);

  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công...';
  const handleSubmitSuccess = async (data: ConfigReferralCodeFormDefault) => {
    const params: UseMutationConfigReferralCodePayload = {
      usageLimit: data.usageLimit,
      discountPercent: data.discountPercent,
      expiredLaterDay: data.expiredLaterDay,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateAsync(params);
      refetch();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: unknown) {
      toast.updateFailedToast(id, toastMsgError(error));
    }
  };

  const formFieldsConfigReferralCode: FormFieldsConfigReferralCodeProps[] = [
    {
      name: 'usageLimit',
      label: 'Số lượt dùng (lượt)',
      placeholder: 'Nhập giới hạn số lượt dùn',
      variant: 'number',
    },
    {
      name: 'discountPercent',
      label: 'Phần trăm giảm (%)',
      placeholder: 'Nhập phần trăm giảm (%)',
      variant: 'number',
    },
    {
      name: 'expiredLaterDay',
      label: 'Thời gian hết hạn sau khi nhận mã (ngày)',
      placeholder: 'Nhập hời gian hết hạn',
      variant: 'number',
    },
  ];

  return (
    <Box padding={3}>
      <Box pb={2}>
        <Typography
          sx={{
            ...globalStyles.textTitle,
            lineHeight: 1,
          }}
        >
          Tùy chỉnh mã giới thiệu
        </Typography>
      </Box>
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        {isLoading ? (
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            mt={2}
          >
            <CircularProgress />
            <Typography>Đang tải</Typography>
          </Stack>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <form onSubmit={handleSubmit(handleSubmitSuccess)}>
                <Grid container columnSpacing={3}>
                  {formFieldsConfigReferralCode.map((field) => (
                    <Grid item xs={12} key={field.name}>
                      <Typography sx={sx.formLabel}>{field.label}</Typography>
                      <FormInput
                        control={control}
                        name={field.name}
                        variant={field.variant}
                        placeholder={field.placeholder}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Box mt={2}>
                  <Button
                    color="miSmartOrange"
                    size="large"
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={!formState.isDirty}
                    sx={{ fontFamily: FontFamily.bold }}
                  >
                    Cập nhật
                  </Button>
                </Box>
              </form>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography sx={sx.formLabel}>
                Thông tin từ lần chỉnh sửa cuối
              </Typography>
              {title0.map((item) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                  mt={2}
                  key={item.id}
                >
                  <Typography sx={sx.helperTitle} align="left">
                    {item.label}:
                  </Typography>
                  <Typography sx={sx.helperValue}>{item.value}</Typography>
                </Stack>
              ))}
            </Grid>
          </Grid>
        )}
      </Stack>
    </Box>
  );
}
