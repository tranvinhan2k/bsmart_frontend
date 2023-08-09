import { Box, Grid, Stack, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './styles';
import globalStyles from '~/styles';
import { formatMoney } from '~/utils/money';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import TextLine from '~/components/atoms/TextLine';
import Button from '~/components/atoms/Button';
import {
  selectCheckoutItem,
  selectTotalAmount,
} from '~/redux/courses/selector';
import { useMutationPay } from '~/hooks/useMutationPay';
import { useMutationPayQuick } from '~/hooks/useMutationPayQuick';
import toast from '~/utils/toast';
import {
  selectIntroduceCode,
  selectWebsocketMessage,
} from '~/redux/user/selector';
import FormInput from '~/components/atoms/FormInput';
import { useEffectScrollToTop, useYupValidationResolver } from '~/hooks';
import { DetailCourseClassPayload } from '../MentorCourseDetailPage';
import localEnvironment from '~/utils/localEnvironment';
import { validationIntroduce } from '~/form/validation';
import { closeUrl, openNewBrowserUrl } from '~/utils/window';
import ReturnLink from '~/components/atoms/ReturnLink';

function CheckoutPage() {
  const resolver = useYupValidationResolver(validationIntroduce);
  const { control, handleSubmit } = useForm({
    resolver,
  });
  const { mutateAsync } = useMutationPay();
  const { mutateAsync: mutatePayQuick } = useMutationPayQuick();
  const checkOutItem = useSelector(selectCheckoutItem);
  const slTotalAmount = useSelector(selectTotalAmount);
  const slIntroduceCode = useSelector(selectIntroduceCode);

  const [introduceCode, setIntroduceCode] = useState<string | undefined>(
    slIntroduceCode
  );

  useEffectScrollToTop();

  const selectWebsocket = useSelector(selectWebsocketMessage);

  if (selectWebsocket.data.entity === 'TRANSACTION') {
    closeUrl();
  }

  if (checkOutItem === null) {
    return <Navigate to="/homepage" />;
  }

  const onSubmit = (data: any) => {
    setIntroduceCode(data.introduce);
  };

  const handleCheckOut = async () => {
    // const id = toast.loadToast('Đang thanh toán khóa học');
    try {
      if (Array.isArray(checkOutItem)) {
        await mutateAsync(
          checkOutItem.map((item) => ({
            cartItemId: item.cartItemId,
            subCourseId: item.id,
            referralCode: introduceCode || '',
          }))
        );
      } else {
        const response = await mutatePayQuick({
          clazzId: checkOutItem?.id || 0,
          returnURL: `${localEnvironment.SERVER_LINK_NO_API}/dashboard/classes/detail/0/information`,
        });
        const url = response.paymentUrl;
        openNewBrowserUrl(url);
      }
      // toast.updateSuccessToast(id, 'Thanh toán khóa học thành công !');
    } catch (error: any) {
      toast.notifyErrorToast(`Thanh toán khóa học thất bại: ${error.message}`);
    }
  };

  const texts = {
    checkOutTitle: 'Xác nhận thanh toán',
    totalPayment: 'Tổng giá tiền',
    introduceCodeTitle: 'Mã giới thiệu',
    paymentTitle: 'Thông tin thanh toán',
    checkoutButton: 'Thanh toán đơn hàng',
    introduceCodeButton: 'Thêm',
    orginalPrice: 'Thành tiền',
    discountPrice: 'Giảm giá',
    totalPrice: 'Tổng tiền',
  };

  const values: {
    totalAmount: string;
    totalQuantity: number;
    courseList: DetailCourseClassPayload[];
  } = {
    totalAmount: formatMoney(slTotalAmount, true),
    totalQuantity: Array.isArray(checkOutItem) ? checkOutItem.length : 1,
    courseList: Array.isArray(checkOutItem)
      ? checkOutItem.map((item) => ({
          id: item.id,
          code: '',
          endDate: '',
          imageAlt: '',
          imageUrl: '',
          maxStudent: 0,
          minStudent: 0,
          numberOfSlot: 0,
          price: 0,
          startDate: '',
          status: 'ALL',
          timeInWeekRequests: [],
          purchase: false,
        }))
      : [checkOutItem],
  };

  return selectWebsocket.status === 'OK' ? (
    <Stack
      padding={4}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>{selectWebsocket.data.viTitle}</Typography>
      <Typography>{selectWebsocket.data.viContent}</Typography>
      <ReturnLink />
    </Stack>
  ) : (
    <Grid container sx={styles.view}>
      <Grid item xs={12} md={8} sx={styles.viewLeft}>
        <Stack
          sx={{
            padding: 3,
            background: Color.white,
            borderRadius: MetricSize.small_5,
            marginRight: 2,
          }}
        >
          <Typography sx={globalStyles.textTitle}>
            {texts.checkOutTitle}
          </Typography>
          <Typography sx={globalStyles.textSubTitle}>
            {texts.totalPayment}
          </Typography>
          <Typography sx={styles.textMoney}>
            {values.totalAmount}
            <span
              style={{
                paddingLeft: MetricSize.small_5,
                fontSize: FontSize.medium_24,
              }}
            >
              VND
            </span>
          </Typography>
          <Stack
            sx={{
              color: Color.grey,
              flexDirection: 'row',
              alignItems: 'center',
              marginY: MetricSize.small_5,
            }}
          >
            <Typography sx={globalStyles.textLowSmallLight}>
              {values.totalQuantity} khóa học đã chọn.
            </Typography>
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
                      component="img"
                      src={item.imageUrl}
                      alt={item?.imageAlt}
                      sx={{
                        alignSelf: 'center',
                        width: '50px',
                        height: '50px',
                        backgroundColor: Color.white,
                        borderRadius: '5px',
                        objectFit: 'contain',
                      }}
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
                      {item.code}
                    </Stack>
                  </Stack>
                  <Stack>
                    <Typography
                      sx={{
                        fontFamily: FontFamily.medium,
                        fontSize: FontSize.small_18,
                      }}
                    >
                      {formatMoney(item?.price || 0)}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider />
              </Box>
            ))}
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4} sx={styles.viewRight}>
        <Stack
          sx={{
            position: 'sticky',
            top: '90px',
            background: Color.white,
            borderRadius: MetricSize.small_5,
            padding: 3,
          }}
        >
          <Typography sx={globalStyles.textSubTitle}>
            {texts.paymentTitle}
          </Typography>
          <Stack sx={{ marginTop: MetricSize.large_20 }}>
            <TextLine
              label={texts.orginalPrice}
              variable={values.totalAmount}
            />
            {/* <TextLine label={texts.discountPrice} variable={formatMoney(1000)} /> */}
            <Divider sx={{ marginY: MetricSize.small_5 }} />
            <TextLine label={texts.totalPrice} variable={values.totalAmount} />
          </Stack>
          {!introduceCode ? (
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
                <FormInput
                  control={control}
                  name="introduce"
                  placeholder="Thêm mã giới thiệu"
                />
                <Button
                  sx={{
                    marginLeft: 1,
                    height: '35px',
                  }}
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                >
                  {texts.introduceCodeButton}
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Stack>
              <TextLine
                label="Mã giới thiệu"
                variable={`${introduceCode || ''}`}
              />
            </Stack>
          )}
          <Stack marginTop={2}>
            <Button
              color="secondary"
              sx={{
                color: Color.white,
              }}
              onClick={handleCheckOut}
              variant="contained"
            >
              {texts.checkoutButton}
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
export default CheckoutPage;
