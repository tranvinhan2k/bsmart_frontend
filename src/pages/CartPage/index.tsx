import { useEffect } from 'react';
import { Stack, Grid, Typography, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { scrollToTop } from '~/utils/common';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { useQueryGetCart } from '~/hooks';
import { formatMoney } from '~/utils/money';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import { useMutationDeleteCourseFromCart } from '~/hooks/useMutationDeleteCourseFromCart';
import { useMutationUpdateCourseFromCart } from '~/hooks/useMutationUpdateCourseFromCart';
import toast from '~/utils/toast';
import CourseInCart from '~/components/molecules/CourseInCart';
import { RequestCartItem } from '~/api/cart';
import { useMutationPay } from '~/hooks/useMutationPay';

export default function CartPage() {
  const { cart, error, isLoading, refetch } = useQueryGetCart();
  const { mutateAsync: deleteCourse } = useMutationDeleteCourseFromCart();
  const { mutateAsync: updateCourse } = useMutationUpdateCourseFromCart();
  const { mutateAsync: payCart } = useMutationPay();

  const handlePayCart = async () => {
    const id = toast.loadToast('Đang thanh toán giỏ hàng,...');
    try {
      await payCart(Number(cart?.id));
      refetch();
      toast.updateSuccessToast(id, 'Thanh toán thành công');
    } catch (e: any) {
      toast.updateFailedToast(id, `Thanh toán thất bại: ${e.message}`);
    }
  };

  async function handleDeleteCourseFromCart(courseId: number) {
    // eslint-disable-next-line no-restricted-globals
    const isDelete = confirm('Bạn thật sự muốn xóa khóa học này ? ');
    if (isDelete) {
      const id = toast.loadToast('Đang xóa khóa học khỏi giỏ hàng...');
      try {
        await deleteCourse({
          cartItemId: courseId,
          subCourseId: undefined,
        });
        refetch();
        toast.updateSuccessToast(id, 'Bạn đã gỡ khóa học thành công !');
      } catch (e: any) {
        toast.updateFailedToast(id, `Gỡ khóa học thất bại: ${e.message}`);
      }
    }
  }
  async function handlePaymentCourseFromCart(courseId: number) {
    // eslint-disable-next-line no-restricted-globals
    const isDelete = confirm('Xác nhận thanh toán khóa học này ? ');
    if (isDelete) {
      const id = toast.loadToast('Đang thanh toán khóa học...');
      try {
        await payCart(courseId);
        refetch();
        toast.updateSuccessToast(id, 'Bạn đã thanh toán thành công !');
      } catch (e: any) {
        toast.updateFailedToast(id, `Thanh toán thất bại: ${e.message}`);
      }
    }
  }
  const handleUpdateCourseFromCart = async (data: RequestCartItem) => {
    const id = toast.loadToast('Đang cập nhật khóa học khỏi giỏ hàng...');
    try {
      await updateCourse(data);
      refetch();
      toast.updateSuccessToast(id, 'Bạn đã cập nhật giờ học thành công !');
    } catch (e: any) {
      toast.updateFailedToast(id, `Cập nhật giờ học thất bại: ${e.message}`);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'index',
      headerName: 'Số thứ tự',
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: 'course',
      headerName: 'Khóa học',
      minWidth: 700,
      renderCell: (row) => {
        return (
          <CourseInCart row={row.row} onUpdate={handleUpdateCourseFromCart} />
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Chức năng',
      renderCell: (row) => {
        return (
          <Stack sx={{ flexDirection: 'row' }}>
            <IconButton
              onClick={() =>
                handleDeleteCourseFromCart(Number(row.row.cartItemId))
              }
            >
              <Icon name="delete" size="medium" color="orange" />
            </IconButton>
            <IconButton
              onClick={() =>
                handlePaymentCourseFromCart(Number(row.row.cartItemId))
              }
            >
              <Icon name="payment" size="medium" color="orange" />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  useEffect(() => {
    scrollToTop();
  }, []);

  if (error) {
    toast.notifyErrorToast('Lỗi khi tải dữ liệu giỏ hàng của bạn !');
    return (
      <Stack
        sx={{
          minHeight: MetricSize.fullHeight,
          justifyContent: 'center',
          alignItems: 'center',
          paddingX: { xs: MetricSize.medium_15, md: '75px' },
        }}
      >
        <Typography
          sx={{
            paddingTop: MetricSize.medium_15,
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.regular,
            color: Color.red,
          }}
        >
          Đã xảy ra lỗi
        </Typography>
      </Stack>
    );
  }

  if (isLoading) {
    return (
      <Stack
        sx={{
          minHeight: MetricSize.fullHeight,
          justifyContent: 'center',
          alignItems: 'center',
          paddingX: { xs: MetricSize.medium_15, md: '75px' },
        }}
      >
        <Typography
          sx={{
            paddingTop: MetricSize.medium_15,
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.regular,
          }}
        >
          Đang khởi tạo dữ liệu ...
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      sx={{
        minHeight: MetricSize.fullHeight,
        paddingX: { xs: MetricSize.medium_15, md: '75px' },
      }}
    >
      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography
            sx={{
              paddingTop: MetricSize.medium_15,
              fontSize: FontSize.large_35,
              fontFamily: FontFamily.bold,
            }}
          >
            Giỏ Hàng
          </Typography>
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.regular,
              color: Color.grey,
            }}
          >{`Bạn đang có ${cart?.totalItem} khóa học trong giỏ hàng`}</Typography>
          {cart && (
            <DataGrid
              rowHeight={400}
              autoHeight
              sx={{ marginY: MetricSize.medium_15 }}
              rows={cart?.cartItems}
              columns={columns}
              initialState={{
                pagination: {
                  pageSize: 5,
                },
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack sx={{ padding: MetricSize.large_20 }}>
            <Typography
              sx={{
                fontSize: FontSize.small_18,
                fontFamily: FontFamily.medium,
              }}
            >
              Tổng giá tiền
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
                paddingY: MetricSize.medium_15,
                fontSize: FontSize.large_45,
                fontFamily: FontFamily.bold,
              }}
            >
              {formatMoney(cart?.totalPrice || 0)}
            </Typography>
            <Button onClick={handlePayCart} customVariant="normal">
              Thanh Toán
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
