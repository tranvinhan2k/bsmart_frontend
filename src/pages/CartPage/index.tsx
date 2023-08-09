import { useEffect } from 'react';
import {
  Stack,
  Grid,
  Typography,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { scrollToTop } from '~/utils/common';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { formatMoney } from '~/utils/money';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import { useMutationDeleteCourseFromCart } from '~/hooks/useMutationDeleteCourseFromCart';
import { useMutationUpdateCourseFromCart } from '~/hooks/useMutationUpdateCourseFromCart';
import toast from '~/utils/toast';
import CourseInCart from '~/components/molecules/CourseInCart';
import { RequestCartItem } from '~/api/cart';
import { addCheckoutItem } from '~/redux/courses/slice';
import { useDispatchGetCart } from '~/hooks';
import { image } from '~/constants/image';
import CarouselCourse from '~/components/molecules/CarouselCourse';
import { CommonCourse } from '~/constants';
import IntroduceCodeInput from './IntroduceCodeInput';
import globalStyles from '~/styles';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';

export default function CartPage() {
  const { cart, isLoading, handleDispatch, error } = useDispatchGetCart();
  const { mutateAsync: deleteCourse } = useMutationDeleteCourseFromCart();
  const { mutateAsync: updateCourse } = useMutationUpdateCourseFromCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePayCart = () => {
    dispatch(
      addCheckoutItem({
        checkOutCourses: cart?.cartItems,
        totalAmount: cart?.totalPrice,
      })
    );
    navigate('/check_out');
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
        handleDispatch();
        toast.updateSuccessToast(id, 'Bạn đã gỡ khóa học thành công !');
      } catch (e: any) {
        toast.updateFailedToast(id, `Gỡ khóa học thất bại: ${e.message}`);
      }
    }
  }

  const handleUpdateCourseFromCart = async (data: RequestCartItem) => {
    const id = toast.loadToast('Đang cập nhật khóa học khỏi giỏ hàng...');
    try {
      await updateCourse(data);
      toast.updateSuccessToast(id, 'Bạn đã cập nhật giờ học thành công !');
    } catch (e: any) {
      toast.updateFailedToast(id, `Cập nhật giờ học thất bại: ${e.message}`);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'index',
      headerName: 'Số thứ tự',
      flex: 1,
      headerAlign: 'center',
      headerClassName: 'header',
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: 'course',
      headerName: 'Khóa học',
      flex: 5,
      headerClassName: 'header',
      renderCell: (row) => {
        return (
          <CourseInCart row={row.row} onUpdate={handleUpdateCourseFromCart} />
        );
      },
    },
    {
      field: 'price',
      headerName: 'Giá tiền',
      headerClassName: 'header',
      flex: 1,
      renderCell: (row) => {
        return formatMoney(500000);
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Thao tác',
      headerClassName: 'header',
      flex: 1,
      renderCell: (row) => {
        return (
          <Stack sx={{ flexDirection: 'row' }}>
            <Tooltip title="Xóa khóa học">
              <IconButton
                onClick={() =>
                  handleDeleteCourseFromCart(Number(row.row.cartItemId))
                }
              >
                <Icon name="delete" size="medium" color="tertiary" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack
      sx={{
        borderRadius: MetricSize.small_5,
        background: Color.white,
        padding: 2,
        marginY: 4,
        marginX: { xs: 4, md: 10 },
        height: 1000,
      }}
    >
      <Typography sx={globalStyles.textSubTitle}>Giỏ Hàng</Typography>
      <Typography sx={globalStyles.textSmallLight}>{`Bạn đang có ${
        cart?.totalItem || 0
      } khóa học trong giỏ hàng`}</Typography>
      {cart && (
        <DataGrid
          error={error}
          loading={isLoading}
          rowHeight={160}
          sx={{
            marginY: MetricSize.medium_15,
            height: 160 * 3 + 80,
            '&.header': {
              color: Color.blue,
            },
          }}
          rows={cart?.cartItems}
          columns={columns}
          initialState={{
            pagination: {
              pageSize: 5,
            },
          }}
        />
      )}
      <Box marginY={2}>
        <Button onClick={handlePayCart} variant="contained">
          Thanh toán giỏ hàng
        </Button>
      </Box>
      <CarouselCourse label="Khóa học tiêu biểu" />
    </Stack>
  );
}
