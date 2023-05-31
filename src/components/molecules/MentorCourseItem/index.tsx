import { Box, Typography, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponseMentorCoursePayload } from '~/api/courses';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CustomModal from '~/components/atoms/Modal';
import { image } from '~/constants/image';
import useCRUDMentorCourse from '~/hooks/useCRUDMentorCourse';
import toast from '~/utils/toast';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import UserCourseItem from '../UserCourseItem';
import { IconName } from '~/components/atoms/Icon';
import UpdateMentorCourse from './UpdateMentorCourse';
import globalStyles from '~/styles';

interface MentorCourseItemProps {
  item?: any;
  isSkeleton?: boolean;
  onClick?: () => void;
}

export default function MentorCourseItem({
  item,
  isSkeleton = false,
  onClick = () => {},
}: MentorCourseItemProps) {
  const navigate = useNavigate();
  const { deleteCourseMutation, requestCourseMutation } = useCRUDMentorCourse();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'DELETE' | 'UPDATE' | 'READ'>('READ');

  const handleNavigateCourseDetail = () => {
    navigate(`/mentor-profile/mentor_course_detail/${item.courseId}`);
  };

  const handleClose = (chooseType?: 'DELETE' | 'UPDATE' | 'READ') => {
    if (chooseType) {
      setType(chooseType);
    }
    setOpen(!open);
  };

  const handleDeleteCourse = async () => {
    const id = toast.loadToast('Đang xóa khóa học');
    try {
      await deleteCourseMutation.mutateAsync(item.subCourseId);
      window.location.reload();
      toast.updateSuccessToast(id, 'Xóa khóa học thành cong');
    } catch (e: any) {
      toast.updateFailedToast(
        id,
        `Xóa khóa học không thành công : ${e.message}`
      );
    }
  };

  const handleUpdateCourse = (data: any) => {};
  const handleSubmitCourse = async () => {
    const id = toast.loadToast('Đang gửi yêu cầu phê duyệt khóa học');
    try {
      await requestCourseMutation.mutateAsync(item.subCourseId);
      window.location.reload();
      toast.updateSuccessToast(id, 'Gửi yêu cầu thành cong');
    } catch (e: any) {
      toast.updateFailedToast(
        id,
        `Gửi yêu cầu không thành công : ${e.message}`
      );
    }
  };

  if (isSkeleton) {
    return (
      <Stack
        sx={{
          marginTop: MetricSize.medium_15,
          marginLeft: '10px',
          borderColor: Color.grey,
          borderRadius: MetricSize.small_5,
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Skeleton height={400} />
      </Stack>
    );
  }

  const menuItemList: {
    id: number;
    title: string;
    icon: IconName;
    onClick: () => void;
    isHide?: boolean;
  }[] = [
    {
      id: 0,
      title: 'Xem chi tiết khóa học',
      icon: 'search',
      onClick: () => handleClose('READ'),
    },
    {
      id: 1,
      title: 'Xóa khóa học',
      icon: 'delete',
      onClick: () => handleClose('DELETE'),
    },
    {
      id: 2,
      title: 'Cập nhật khóa học',
      icon: 'edit',
      onClick: () => handleClose('UPDATE'),
    },
    {
      id: 3,
      title: 'Phê duyệt khóa học',
      icon: 'share',
      onClick: handleSubmitCourse,
      isHide: item.status !== 'REQUESTING',
    },
  ];

  return (
    <>
      <UserCourseItem
        courseDescription={item.courseDescription}
        courseName={item.courseName}
        imageAlt="Hình ảnh khóa học"
        imageUrl={item.imageUrl}
        menuItemList={menuItemList}
      />
      {type === 'DELETE' && (
        <ConfirmDialog
          content="Bạn có chắc chắn muốn xóa khóa học này không ?"
          title="Xác nhận xóa khóa học"
          handleAccept={handleDeleteCourse}
          handleClose={handleClose}
          open={open}
        />
      )}
      {type === 'UPDATE' && (
        <UpdateMentorCourse
          item={item}
          onClose={handleClose}
          onSubmit={handleUpdateCourse}
          open={open}
        />
      )}
      {type === 'READ' && (
        <CustomModal open={open} onClose={handleClose}>
          <Stack>
            <Typography sx={globalStyles.textSubTitle}>
              Chi tiết khóa học
            </Typography>
            {JSON.stringify(item)}
          </Stack>
        </CustomModal>
      )}
    </>
  );
}

MentorCourseItem.defaultProps = {
  isSkeleton: false,
  item: undefined,
  onClick: () => {},
};
