import { Typography, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponseMentorCoursePayload } from '~/api/courses';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CustomModal from '~/components/atoms/CustomModal';
import { image } from '~/constants/image';
import useCRUDMentorCourse from '~/hooks/useCRUDMentorCourse';
import toast from '~/utils/toast';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import UserCourseItem from '../UserCourseItem';
import { IconName } from '~/components/atoms/Icon';
import globalStyles from '~/styles';
import { useMutationUploadImage } from '~/hooks';
import UpdateMentorCourse from './UpdateMentorCourse';
import { MentorNavigationActionData } from '~/constants';

interface MentorCourseItemProps {
  item?: any;
  isSkeleton?: boolean;
  onClick?: () => void;
  refetch: () => void;
}

export default function MentorCourseItem({
  item,
  isSkeleton = false,
  onClick = () => {},
  refetch,
}: MentorCourseItemProps) {
  const navigate = useNavigate();
  const { deleteCourseMutation, requestCourseMutation, updateCourseMutation } =
    useCRUDMentorCourse();
  const uploadImageMutation = useMutationUploadImage();
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
      await refetch();
      handleClose();
      toast.updateSuccessToast(id, 'Xóa khóa học thành cong');
    } catch (e: any) {
      toast.updateFailedToast(
        id,
        `Xóa khóa học không thành công : ${e.message}`
      );
    }
  };

  const handleUpdateCourse = async (data: any) => {
    const id = toast.loadToast('Đang cập nhật khóa học');

    try {
      let imageId;

      if (data.imageUrl instanceof File) {
        const formData = new FormData();
        formData.append('type', 'COURSE');
        formData.append('file', data.imageUrl);
        const imageResponse = await uploadImageMutation.mutateAsync(formData);

        imageId = imageResponse.id;
      }

      const configParam = {
        courseCode: data.courseCode,
        courseName: data.courseName,
        courseDescription: data.courseDescription,
        categoryId: data.categoryId.id,
        subjectId: data.subjectId.id,
        subCourseTitle: data.subCourseTitle,
        price: data.price,
        startDateExpected: data.startDateExpected,
        endDateExpected: data.endDateExpected,
        minStudent: data.minStudent,
        maxStudent: data.maxStudent,
        numberOfSlot: data.numberOfSlot,
        imageId: data.imageUrl instanceof File ? imageId : undefined,
        type: data.type.value,
        level: data?.level?.id || 'BEGINNER',
        timeInWeekRequests: data.timeInWeekRequests.map(
          (timeInWeekItem: any) => ({
            dayOfWeekId: timeInWeekItem.dayInWeek.id,
            slotId: timeInWeekItem.slot.id,
          })
        ),
        id: item.subCourseId,
      };

      await updateCourseMutation.mutateAsync(configParam as any);
      await refetch();
      handleClose();

      toast.updateSuccessToast(id, 'Cập nhật khóa học thành công');
    } catch (error: any) {
      toast.updateFailedToast(
        id,
        `Cập nhật khóa học thất bại: ${error.message}`
      );
    }
    handleClose();
  };
  const handleSubmitCourse = async () => {
    const id = toast.loadToast('Đang gửi yêu cầu phê duyệt khóa học');
    try {
      await requestCourseMutation.mutateAsync(item.subCourseId);
      toast.updateSuccessToast(id, 'Gửi yêu cầu thành cong');
    } catch (e: any) {
      toast.updateFailedToast(
        id,
        `Gửi yêu cầu không thành công : ${e.message}`
      );
    }
  };

  const handleCreateCourse = () => {
    navigate(
      `/mentor-profile/${MentorNavigationActionData[3].items?.[0].link}/${item.courseId}`
    );
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

  const handleX = () => {
    handleClose('READ');
    handleNavigateCourseDetail();
  };
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
      onClick: handleX,
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
      title: 'Tạo nội dung khóa học',
      icon: 'add',
      onClick: handleCreateCourse,
      isHide: item.status !== 'REQUESTING',
    },
    {
      id: 4,
      title: 'Gửi yêu cầu phê duyệt',
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
        courseType={item.courseType}
        courseStatus={item.status}
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
