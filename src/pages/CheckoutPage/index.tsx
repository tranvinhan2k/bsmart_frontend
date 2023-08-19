import {
  Box,
  Grid,
  Stack,
  Typography,
  Divider,
  Checkbox,
  Slide,
  Slider,
  Switch,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
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
import { selectProfile, selectWebsocketMessage } from '~/redux/user/selector';
import FormInput from '~/components/atoms/FormInput';
import {
  useDispatchGetAllDayOfWeeks,
  useDispatchGetAllSlots,
  useEffectScrollToTop,
  useGetDuplicateTimeSlot,
  useGetPromoCode,
  useYupValidationResolver,
} from '~/hooks';
import { DetailCourseClassPayload } from '../MentorCourseDetailPage';
import { validationIntroduce } from '~/form/validation';
import { closeUrl, openNewBrowserUrl } from '~/utils/window';
import {
  MemberDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import CustomModal from '~/components/atoms/CustomModal';
import { useBoolean } from '~/hooks/useBoolean';
import { LoadingWrapper } from '~/HOCs';
import { formatStringToNumber } from '~/utils/number';

export interface IntroduceCodePayload {
  id: number;
  code: string;
  percent: number;
  classId: number;
  courseId: number;
}

function CheckoutPage() {
  const profile = useSelector(selectProfile);
  const coin = profile?.wallet?.balance || 0;
  const [timeSlot, setTimeSlot] = useState<{ id: number; code: string }[]>([]);
  const { value: isSameTimeSlot, toggle: toggleSameTimeSLot } =
    useBoolean(false);
  const { value: isPromoCode, toggle: togglePromoCode } = useBoolean(false);
  const { value: isUseToken, toggle: toggleUseToken } = useBoolean(false);
  const resolver = useYupValidationResolver(validationIntroduce);
  const { control, handleSubmit, reset } = useForm({
    resolver,
  });
  const { mutateAsync } = useMutationPay();
  const { mutateAsync: mutatePayQuick } = useMutationPayQuick();
  const checkOutItem = useSelector(selectCheckoutItem);
  const slTotalAmount = useSelector(selectTotalAmount);
  const { slots } = useDispatchGetAllSlots();
  const { dayOfWeeks } = useDispatchGetAllDayOfWeeks();

  const {
    data: introduceCodes,
    error: errorIntroduceCodeList,
    isLoading: isIntroduceCodeLoading,
  } = useGetPromoCode();

  const { mutateAsync: handleGetTimeSlot } = useGetDuplicateTimeSlot();

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

  const numberOfAmountAfterSale =
    slTotalAmount - (selectIntroduceCode?.percent || 0) * slTotalAmount;
  const numberOfCoinUse =
    numberOfAmountAfterSale > coin ? coin : numberOfAmountAfterSale;
  const numberOfTotalValue =
    numberOfAmountAfterSale -
    // eslint-disable-next-line no-nested-ternary
    (isUseToken ? numberOfCoinUse : 0);

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
          referalCode: introduceCode?.code || '',
          type: 'BANKING',
          useWallet: isUseToken,
        });
        const url = response?.metadata?.paymentUrl || '';
        openNewBrowserUrl(url);
      }
      // toast.updateSuccessToast(id, 'Thanh toán khóa học thành công !');
    } catch (error: any) {
      toast.notifyErrorToast(`Thanh toán khóa học thất bại: ${error.message}`);
    }
  };

  const handleCheckSameTimeSlot = async () => {
    const timeSlots = await handleGetTimeSlot(checkOutItem?.id || 0);
    const isHaveSameTimeSlot = timeSlots?.length !== 0;
    if (isHaveSameTimeSlot) {
      setTimeSlot(timeSlots);
      toggleSameTimeSLot();
    } else {
      handleCheckOut();
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
                    <Typography>Mã môn học</Typography>
                    <Stack
                      sx={{
                        fontFamily: FontFamily.bold,
                        fontSize: FontSize.small_18,
                      }}
                    >
                      {item.code}
                    </Stack>
                    <Stack
                      sx={{
                        marginTop: 1,
                      }}
                    >
                      <Typography>Giờ học</Typography>
                      {item.timeInWeekRequests.map((subItem, index) => (
                        <Stack
                          sx={{
                            marginTop: index !== 0 ? 1 : 0,
                            border: '1px solid #ddd',
                            borderRadius: MetricSize.small_5,
                            padding: 1,
                            fontFamily: FontFamily.light,
                            fontSize: FontSize.small_14,
                          }}
                          key={index}
                        >
                          <Stack>
                            {dayOfWeeks.find(
                              (dow) => dow.id === subItem.dayOfWeekId
                            )?.name || ''}
                          </Stack>
                          <Stack>
                            {`${
                              slots.find((slot) => slot.id === subItem.slotId)
                                ?.startTime
                            } - ${
                              slots.find((slot) => slot.id === subItem.slotId)
                                ?.endTime
                            }`}
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                  <Stack>
                    <Typography>Giá tiền</Typography>
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
            {introduceCode && (
              <TextLine
                label="Promo Code"
                variable={`- ${formatMoney(
                  slTotalAmount * (introduceCode?.percent || 1)
                )}`}
              />
            )}
            {isUseToken && (
              <TextLine
                label="BS"
                variable={`- ${formatMoney(numberOfCoinUse, true)}`}
              />
            )}

            {/* <TextLine label={texts.discountPrice} variable={formatMoney(1000)} /> */}
            <Divider sx={{ marginY: MetricSize.small_5 }} />
            <TextLine
              label={texts.totalPrice}
              variable={formatMoney(numberOfTotalValue)}
            />
            {isUseToken && (
              <TextLine
                label="BS"
                variable={`${formatMoney(numberOfCoinUse, true)} BS`}
              />
            )}
          </Stack>
          <CustomModal
            open={isSameTimeSlot}
            onClose={toggleSameTimeSLot}
            title="Khóa học trùng giờ"
          >
            <Stack>
              <FormHelperText
                error
                sx={{
                  fontSize: FontSize.small_18,
                }}
              >
                Khóa học đã chọn đang trùng giờ với
                {'  '}
                {timeSlot.map((item, index) => (
                  <Link
                    key={index}
                    to={`/${NavigationLink.dashboard}/${MemberDashboardNavigationActionLink.class_detail}/${item.id}`}
                    style={{
                      color: Color.red,
                      fontFamily: FontFamily.bold,
                      textDecoration: 'underline',
                    }}
                  >
                    {`${
                      index !== 0 ? ',' : ''
                    } Lớp học ${item.code.toUpperCase()} `}
                  </Link>
                ))}
                . Bạn có xác nhận muốn tiếp tục thanh toán không ?
              </FormHelperText>
              <Stack
                marginTop={1}
                sx={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    handleCheckOut();
                    toggleSameTimeSLot();
                  }}
                >
                  Tiếp tục thanh toán
                </Button>
                <Button
                  onClick={toggleSameTimeSLot}
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
          </CustomModal>
          {!introduceCode ? (
            <Stack>
              <Button
                sx={{
                  marginTop: 1,
                }}
                variant="contained"
                color="success"
                onClick={togglePromoCode}
              >
                Thêm mã giới thiệu
              </Button>
              <CustomModal
                open={isPromoCode}
                onClose={togglePromoCode}
                title="Mã giới thiệu"
              >
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
          <Stack
            marginTop={1}
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Switch
              checked={isUseToken}
              onChange={() => {
                toggleUseToken();
              }}
              disabled={!(profile.wallet?.balance > 0)}
            />
            <Typography>{`Dùng ${formatMoney(
              coin,
              true
            )} BS vào đơn hàng ?`}</Typography>
          </Stack>
          {!(profile.wallet?.balance > 0) && (
            <FormHelperText>
              Bạn chưa có BS để sử dụng chức năng này
            </FormHelperText>
          )}
          <Stack marginTop={1}>
            <Button
              color="secondary"
              sx={{
                color: Color.white,
              }}
              onClick={handleCheckSameTimeSlot}
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
