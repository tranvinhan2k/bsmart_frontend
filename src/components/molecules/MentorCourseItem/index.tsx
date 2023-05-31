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
  const { deleteCourseMutation, refetch } = useCRUDMentorCourse(item.courseId);
  const [open, setOpen] = useState(false);

  const handleNavigateCourseDetail = () => {
    navigate(`/mentor-profile/mentor_course_detail/${item.courseId}`);
  };

  const handleClose = () => {
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

  return (
    <>
      <UserCourseItem
        courseDescription={item.courseDescription}
        courseName={item.courseName}
        imageAlt="Hình ảnh khóa học"
        imageUrl={item.imageUrl}
      />
      <ConfirmDialog
        content="Bạn có chắc chắn muốn xóa khóa học này không ?"
        title="Xác nhận xóa khóa học"
        handleAccept={handleDeleteCourse}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
}

MentorCourseItem.defaultProps = {
  isSkeleton: false,
  item: undefined,
  onClick: () => {},
};
