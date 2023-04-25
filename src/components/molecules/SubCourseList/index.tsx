import { Stack, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { PagingFilterPayload } from '~/models';
import { SubCoursePayload } from '~/models/subCourse';
import { FontFamily, FontSize } from '~/assets/variables';
import { useMutationPayQuick } from '~/hooks/useMutationPayQuick';
import toast from '~/utils/toast';
import { useMutationAddCourseToCart } from '~/hooks';
import { RequestCartItem } from '~/api/cart';
import CarouselCourseDetailSubCourse from '../CarouselCourseDetailSubCourse';
import SubCourseModal from '../modals/SubCourseModal';
import { toggleAddToCart } from '~/redux/user/slice';

interface SubCourseListProps {
  courseId: number | undefined;
  data: PagingFilterPayload<SubCoursePayload>;
}

export default function SubCourseList({ courseId, data }: SubCourseListProps) {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [item, setItem] = React.useState<SubCoursePayload | undefined>();

  const dispatch = useDispatch();
  const { mutateAsync } = useMutationPayQuick();
  const { mutateAsync: addToCartMutationAsync } = useMutationAddCourseToCart();
  const handleSubCourse = async (subCourseId: number) => {
    const id = toast.loadToast('Đang thêm khóa học..');
    try {
      await mutateAsync(subCourseId);
      toast.updateSuccessToast(id, 'Đăng kí khóa học mới thành công');
    } catch (error: any) {
      toast.updateFailedToast(
        id,
        `Đăng kí khóa học thất bại: ${error.message}`
      );
    }
  };
  const handleSubCourseAddToCart = async (subCourseId: number) => {
    const id = toast.loadToast('Đang thêm khóa học vào giỏ hàng..');
    try {
      const params: RequestCartItem = {
        cartItemId: courseId,
        subCourseId,
      };
      await addToCartMutationAsync(params);
      dispatch(toggleAddToCart(true));
      toast.updateSuccessToast(id, 'Thêm khóa học mới thành công');
    } catch (error: any) {
      toast.updateFailedToast(id, `Thêm khóa học thất bại: ${error.message}`);
    }
  };
  const handleVisible = () => {
    setVisible(!visible);
  };
  const handleOpenModal = (chooseItem: SubCoursePayload) => {
    setVisible(!visible);
    setItem(chooseItem);
  };
  return (
    <Stack>
      <Typography
        sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
      >
        Hãy chọn loại khóa học bạn muốn tham gia
      </Typography>
      <Grid container>
        <CarouselCourseDetailSubCourse
          items={data.items}
          onPayQuick={handleSubCourse}
          onAddToCart={handleOpenModal}
        />
        <SubCourseModal
          visible={visible}
          item={item}
          onClose={handleVisible}
          onAddToCart={handleSubCourseAddToCart}
          onPayQuick={handleSubCourse}
        />
      </Grid>
    </Stack>
  );
}
