import { useEffect, useState } from 'react';
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

export default function CartPage() {
  const { cart, isLoading, handleDispatch, error } = useDispatchGetCart();
  const { mutateAsync: deleteCourse } = useMutationDeleteCourseFromCart();
  const { mutateAsync: updateCourse } = useMutationUpdateCourseFromCart();
  const { text, setText } = useState('');
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
                <Icon name="delete" size="medium" color="orange" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  const renderNoRow = () => {
    return (
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Box component="img" alt="no empty" src={image.emptyCart} />

        <Typography
          sx={{
            paddingTop: MetricSize.medium_15,
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.regular,
          }}
        >
          Không có hàng trong giỏ
        </Typography>
      </Stack>
    );
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  if (error) {
    return (
      <Stack
        sx={{
          minHeight: MetricSize.fullHeight,
          justifyContent: 'center',
          alignItems: 'center',
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
          Đã xảy ra lỗi. Vui lòng thử lại
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
        }}
      >
        Đang tải...
      </Stack>
    );
  }

  return (
    <Stack
      sx={{
        minHeight: MetricSize.fullHeight,
      }}
    >
      <Grid container>
        <Grid
          sx={{
            paddingRight: MetricSize.medium_15,
            paddingLeft: { xs: MetricSize.medium_15, md: '75px' },
          }}
          item
          xs={12}
          md={8}
        >
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
              loading={isLoading}
              rowHeight={160}
              components={{
                NoRowsOverlay: renderNoRow,
                NoResultsOverlay: renderNoRow,
              }}
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
          <CarouselCourse label="Khóa học tiêu biểu" items={CommonCourse} />
        </Grid>
        <Grid
          sx={{
            backgroundColor: Color.whiteSmoke,
            paddingRight: { xs: MetricSize.medium_15, md: '75px' },
          }}
          item
          xs={12}
          md={4}
        >
          <Stack sx={{ padding: MetricSize.large_20 }}>
            <Typography
              sx={{
                fontSize: FontSize.small_18,
                fontFamily: FontFamily.bold,
              }}
            >
              Tổng giá tiền
            </Typography>
            <Typography
              sx={{
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
            <Stack marginTop={3}>
              <Divider />
              <IntroduceCodeInput />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
