import {
  Box,
  Grid,
  Stack,
  Typography,
  Divider,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import styles from './styles';
import globalStyles from '~/styles';
import { formatMoney } from '~/utils/money';
import { CartItem, CartSubCourse } from '~/api/cart';
import { image } from '~/constants/image';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import TextLine from '~/components/atoms/TextLine';
import Button from '~/components/atoms/Button';
import {
  selectCheckoutItem,
  selectTotalAmount,
} from '~/redux/courses/selector';
import { SubCoursePayload } from '~/models/subCourse';
import { useMutationPay } from '~/hooks/useMutationPay';
import { useMutationPayQuick } from '~/hooks/useMutationPayQuick';
import toast from '~/utils/toast';
import { selectIntroduceCode } from '~/redux/user/selector';

function CheckoutPage() {
  const { mutateAsync } = useMutationPay();
  const { mutateAsync: mutatePayQuick } = useMutationPayQuick();
  const checkOutItem = useSelector(selectCheckoutItem);
  const slTotalAmount = useSelector(selectTotalAmount);
  const slIntroduceCode = useSelector(selectIntroduceCode);

  const [introduceCode, setIntroduceCode] = useState(slIntroduceCode);
  const [text, setText] = useState('');
  if (checkOutItem === null) {
    <Navigate to="/homepage" />;
  }

  const handleCheckOut = async () => {
    const id = toast.loadToast('Đang thanh toán khóa học');
    try {
      if (Array.isArray(checkOutItem)) {
        await mutateAsync(
          checkOutItem.map((item) => ({
            cartItemId: item.cartItemId,
            referralCode: introduceCode,
          }))
        );
      } else {
        await mutatePayQuick({
          subCourseId: checkOutItem?.id || 0,
          referralCode: introduceCode,
        });
      }
      toast.updateSuccessToast(id, 'Thanh toán khóa học thành công !');
    } catch (error: any) {
      toast.updateFailedToast(
        id,
        `Thanh toán khóa học thất bại: ${error.message}`
      );
    }
  };

  const texts = {
    checkOutTitle: 'Xác nhận thanh toán',
    totalPayment: 'Tổng giá tiền',
    introduceCodeTitle: 'Mã giới thiệu',
    paymentTitle: 'Thông tin thanh toán',
    checkoutButton: 'Thanh toán đơn hàng',
    introduceCodeButton: 'Thêm mã giới thiệu',
    orginalPrice: 'Thành tiền',
    discountPrice: 'Giảm giá',
    totalPrice: 'Tổng tiền',
  };

  const values: {
    totalAmount: string;
    totalQuantity: number;
    courseList: (CartSubCourse | null)[];
  } = {
    totalAmount: formatMoney(slTotalAmount),
    totalQuantity: Array.isArray(checkOutItem) ? checkOutItem.length : 1,
    courseList: Array.isArray(checkOutItem)
      ? checkOutItem.map(
          (item) =>
            item.subCourses.find((subCourse) => subCourse.isChosen) || null
        ) || []
      : [
          {
            id: checkOutItem?.subjectId || 0,
            endDateExpected: checkOutItem?.endDateExpected || '',
            isChosen: true,
            level: checkOutItem?.level || '',
            price: checkOutItem?.price || 0,
            startDateExpected: checkOutItem?.startDateExpected || '',
            status: '',
            typeLearn: checkOutItem?.type || '',
          },
        ],
  };

  return (
    <Grid container sx={styles.view}>
      <Grid item xs={12} md={6} sx={styles.viewLeft}>
        <Typography sx={globalStyles.textTitle}>
          {texts.checkOutTitle}
        </Typography>
        <Typography sx={globalStyles.textSubTitle}>
          {texts.totalPayment}
        </Typography>
        <Typography sx={styles.textMoney}>{values.totalAmount}</Typography>
        <Stack
          sx={{
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_18,
            color: Color.grey,
            flexDirection: 'row',
            alignItems: 'center',
            marginY: MetricSize.small_5,
          }}
        >
          <Typography>{values.totalQuantity} khóa học đã chọn.</Typography>
          <Icon name="down" size="small" color="grey" />
        </Stack>
        <Box sx={{ width: '500px' }}>
          {values.courseList.map((item) => (
            <Box key={item.id}>
              <Stack
                sx={{
                  padding: '20px',
                  flexDirection: 'row',
                }}
              >
                <Stack>
                  <Box
                    sx={{
                      alignSelf: 'center',
                      width: '50px',
                      height: '50px',
                      backgroundColor: Color.white,
                      borderRadius: '5px',
                      objectFit: 'contain',
                    }}
                    component="img"
                    src={image.noCourse}
                    alt={item?.id}
                  />
                </Stack>
                <Stack
                  sx={{
                    justifyContent: 'space-between',
                    height: '100%',
                    flexGrow: 1,
                    paddingX: MetricSize.medium_15,
                  }}
                >
                  <Stack
                    sx={{
                      fontFamily: FontFamily.bold,
                      fontSize: FontSize.small_18,
                    }}
                  >
                    {'Khóa học dạy lập trình '}
                  </Stack>
                  <Stack
                    sx={{
                      fontFamily: FontFamily.regular,
                      fontSize: FontSize.small_16,
                    }}
                  >
                    thầy Trung Hiếu
                  </Stack>
                </Stack>
                <Stack>
                  <Typography
                    sx={{
                      fontFamily: FontFamily.medium,
                      fontSize: FontSize.small_18,
                    }}
                  >
                    {formatMoney(item?.price)}
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={styles.viewRight}>
        <Typography sx={globalStyles.textSubTitle}>
          {texts.paymentTitle}
        </Typography>
        <Stack sx={{ marginTop: MetricSize.large_20 }}>
          <TextLine label={texts.orginalPrice} variable={values.totalAmount} />
          {/* <TextLine label={texts.discountPrice} variable={formatMoney(1000)} /> */}
          <Divider sx={{ marginY: MetricSize.small_5 }} />
          <TextLine label={texts.totalPrice} variable={values.totalAmount} />
        </Stack>
        {introduceCode === '' ? (
          <Stack marginTop={2}>
            <Typography sx={globalStyles.textSubTitle}>
              Mã giới thiệu
            </Typography>
            <Stack
              sx={{
                flexDirection: 'row',
                marginTop: 1,
              }}
            >
              <TextField
                label="Mã giới thiệu"
                variant="filled"
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{ flexGrow: 1, height: '100%' }}
              />
              <Button
                variant="contained"
                onClick={() => setIntroduceCode(text)}
              >
                {texts.introduceCodeButton}
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack>
            <TextLine label="Mã giới thiệu" variable={introduceCode} />
          </Stack>
        )}

        <Stack marginTop={2}>
          <Button onClick={handleCheckOut} customVariant="normal">
            {texts.checkoutButton}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
export default CheckoutPage;
