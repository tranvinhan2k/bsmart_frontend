import { Stack, Typography } from '@mui/material';

function CheckoutPage() {
  const texts = {
    checkOutTitle: 'Xác nhận thanh toán',
    courseTitle: 'Thông tin khóa học',
    introduceCodeTitle: 'Mã giới thiệu',
    paymentMethodTitle: 'Phương thức thanh toán',
  };
  return (
    <Stack>
      <Typography>{texts.checkOutTitle}</Typography>
    </Stack>
  );
}
export default CheckoutPage;
