import { Box, Grid, Stack, Typography, Divider, Checkbox } from '@mui/material';
import { useState } from 'react';
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
import { selectWebsocketMessage } from '~/redux/user/selector';
import FormInput from '~/components/atoms/FormInput';
import {
  useEffectScrollToTop,
  useGetPromoCode,
  useYupValidationResolver,
} from '~/hooks';
import { DetailCourseClassPayload } from '../MentorCourseDetailPage';
import { validationIntroduce } from '~/form/validation';
import { closeUrl, openNewBrowserUrl } from '~/utils/window';
import { NavigationLink } from '~/constants/routeLink';
import CustomModal from '~/components/atoms/CustomModal';
import { useBoolean } from '~/hooks/useBoolean';
import { LoadingWrapper } from '~/HOCs';

export interface IntroduceCodePayload {
  id: number;
  code: string;
  percent: number;
  classId: number;
  courseId: number;
}

function CheckoutPage() {
  const { value, toggle } = useBoolean(false);
  const resolver = useYupValidationResolver(validationIntroduce);
  const { control, handleSubmit, reset } = useForm({
    resolver,
  });
  const { mutateAsync } = useMutationPay();
  const { mutateAsync: mutatePayQuick } = useMutationPayQuick();
  const checkOutItem = useSelector(selectCheckoutItem);
  const slTotalAmount = useSelector(selectTotalAmount);

  const {
    data: introduceCodes,
    error: errorIntroduceCodeList,
    isLoading: isIntroduceCodeLoading,
  } = useGetPromoCode();

  const introduceCodeList = introduceCodes?.filter(
    (item) => item.classId === checkOutItem?.id
  );

  const [introduceCode, setIntroduceCode] = useState<IntroduceCodePayload>();
  const [selectIntroduceCode, setSelectIntroduceCode] =
    useState<IntroduceCodePayload>();

  useEffectScrollToTop();

  const selectWebsocket = useSelector(selectWebsocketMessage);

  if (selectWebsocket.data.entity === 'TRANSACTION') {
    closeUrl();
    return <Navigate to={`/${NavigationLink.payment_report}`} />;
  }

  if (checkOutItem === null) {
    return <Navigate to="/homepage" />;
  }

  const onSubmit = (data: any) => {
    const submitIntroduceCode = introduceCodeList?.find(
      (item) => item.code === data.introduce
    );
    if (submitIntroduceCode) {
      setIntroduceCode(submitIntroduceCode);
      setSelectIntroduceCode(submitIntroduceCode);
      toast.notifySuccessToast('Đã thêm mã giới thiệu');
      reset();
    } else {
      toast.notifyErrorToast('Không tìm thấy mã giới thiệu này');
    }
  };

  const handleCheckOut = async () => {
    // const id = toast.loadToast('Đang thanh toán khóa học');
    try {
      if (Array.isArray(checkOutItem)) {
        await mutateAsync(
          checkOutItem.map((item) => ({
            cartItemId: item.cartItemId,
            subCourseId: item.id,
            referralCode: introduceCode?.code || '',
          }))
        );
      } else {
        const response = await mutatePayQuick({
          clazzId: checkOutItem?.id || 0,
          referalCode: '',
          type: 'BANKING',
        });
        const url = response?.metadata?.paymentUrl || '';
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
    totalQuantity: 1,
    courseList: checkOutItem ? [checkOutItem] : [],
  };

  return (
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
            <Stack>
              <Button
                sx={{
                  marginTop: 1,
                }}
                variant="contained"
                color="success"
                onClick={toggle}
              >
                Thêm mã giới thiệu
              </Button>
              <CustomModal open={value} onClose={toggle} title="Mã giới thiệu">
                <Stack>
                  <Typography sx={globalStyles.textSmallLabel}>
                    Thêm mã giới thiệu
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
                  <Typography marginTop={1} sx={globalStyles.textSmallLabel}>
                    Mã giới thiệu có sẵn
                  </Typography>
                  <Stack>
                    <Stack
                      sx={{
                        overflow: 'auto',
                        height: '330px',
                        paddingRight: 1,
                      }}
                    >
                      <LoadingWrapper
                        error={errorIntroduceCodeList}
                        isLoading={isIntroduceCodeLoading}
                        isEmptyCourse={introduceCodeList?.length === 0}
                      >
                        {introduceCodeList?.map((item, index) => {
                          return (
                            <Stack
                              key={index}
                              sx={{
                                flexDirection: 'row',
                                marginTop: 1,
                                boxShadow: 1,
                                background: Color.white4,
                                borderRadius: MetricSize.small_5,
                              }}
                            >
                              <Stack
                                sx={{
                                  background: Color.green,
                                  borderTopLeftRadius: MetricSize.small_5,
                                  borderBottomLeftRadius: MetricSize.small_5,
                                }}
                              >
                                <Stack
                                  padding={1}
                                  sx={{
                                    fontSize: FontSize.small_16,
                                    fontFamily: FontFamily.dosis,
                                    color: Color.white,
                                    width: '100px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: undefined,
                                    textAlign: 'center',
                                    aspectRatio: 1,
                                  }}
                                >
                                  MÃ GIỚI THIỆU
                                </Stack>
                              </Stack>
                              <Stack
                                padding={1}
                                sx={{
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  flexGrow: 1,
                                }}
                              >
                                <Stack
                                  sx={{
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: FontSize.small_16,
                                      fontFamily: FontFamily.dosis,
                                    }}
                                  >
                                    {item.code}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: FontSize.small_16,
                                      fontFamily: FontFamily.dosis,
                                    }}
                                  >
                                    {`${item.percent * 100} %`}
                                  </Typography>
                                </Stack>
                                <Stack>
                                  <Checkbox
                                    checked={
                                      (selectIntroduceCode as any)?.code ===
                                      item.code
                                    }
                                    onChange={() => {
                                      if (selectIntroduceCode?.id === item.id) {
                                        setSelectIntroduceCode(undefined);
                                        setIntroduceCode(undefined);
                                      } else {
                                        setSelectIntroduceCode(item);
                                      }
                                    }}
                                  />
                                </Stack>
                              </Stack>
                            </Stack>
                          );
                        })}
                      </LoadingWrapper>
                    </Stack>
                    <Stack
                      marginTop={1}
                      sx={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Button
                        onClick={() => setIntroduceCode(selectIntroduceCode)}
                        variant="contained"
                        color="success"
                      >
                        Xác nhận
                      </Button>
                      <Button
                        onClick={toggle}
                        sx={{
                          marginLeft: 1,
                        }}
                        variant="contained"
                        color="error"
                      >
                        Hủy bỏ
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </CustomModal>
            </Stack>
          ) : (
            <Stack>
              <TextLine
                label="Mã giới thiệu"
                variable={`${introduceCode.code || ''}`}
              />
              <Button
                onClick={() => {
                  setIntroduceCode(undefined);
                }}
                variant="contained"
                color="error"
                sx={{
                  marginTop: 1,
                }}
              >
                Chọn lại mã giới thiệu
              </Button>
            </Stack>
          )}
          <Stack marginTop={1}>
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
