import { Box, Divider, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import InputGroup, { InputData } from '~/components/atoms/FormInput/InputGroup';
import { validationIntroduceCodeInformation } from '~/form/validation';
import { useTryCatch, useYupValidationResolver } from '~/hooks';
import { useChangePromoCode } from '~/hooks/useChangePromoCode';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';

export default function ManagerPromoCodePage() {
  const resolver = useYupValidationResolver(validationIntroduceCodeInformation);
  const { control, formState, handleSubmit } = useForm({ resolver });
  const { mutateAsync } = useChangePromoCode();
  const { handleTryCatch } = useTryCatch('thay đổi thông tin mã giới thiệu');
  const inputList: InputData[] = [
    {
      label: 'Số lượt dùng',
      name: 'usageLimit',
      placeholder: 'Nhập số lượt được dùng mã giới thiệu',
      variant: 'number',
    },
    {
      label: 'Phần trăm được giảm (%)',
      name: 'discountPercent',
      placeholder: 'Nhập phần trăm giảm giá của mã',
      variant: 'number',
    },
    {
      label: 'Ngày hết hạn',
      name: 'expiredLaterDay',
      placeholder: 'Nhập ngày hết hạn sử dụng mã',
      variant: 'date',
    },
  ];

  const onSubmit = async (data: {
    usageLimit: number;
    discountPercent: number;
    expiredLaterDay: string;
  }) => {
    await handleTryCatch(() => mutateAsync(data));
  };

  return (
    <Stack padding={3}>
      <Typography sx={globalStyles.textSubTitle}>
        Quản lí thông tin mã giới thiệu
      </Typography>
      <Divider />
      <Stack marginTop={1}>
        <InputGroup control={control} inputList={inputList} />
      </Stack>
      <Box marginTop={1}>
        <Button
          onClick={handleSubmit(onSubmit, handleConsoleError)}
          disabled={!formState.isDirty}
          variant="contained"
        >
          Lưu thay đổi
        </Button>
      </Box>
    </Stack>
  );
}
