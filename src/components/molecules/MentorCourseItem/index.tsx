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
    <Stack
      sx={{
        marginTop: MetricSize.medium_15,
        marginLeft: '10px',
        boxShadow: 3,
        borderColor: Color.grey,
        borderRadius: MetricSize.small_5,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: MetricSize.medium_15,
      }}
    >
      <Stack>
        <Box
          loading="lazy"
          component="img"
          sx={{
            objectFit: 'fill',
            width: '100%',
            height: '300px',
            borderRadius: MetricSize.small_5,
          }}
          src={item?.imageUrl || image.noCourse}
          alt={item?.images?.[0]?.name}
        />
        <Stack sx={{ paddingX: MetricSize.medium_15 }}>
          <Typography
            sx={{
              fontSize: FontSize.medium_28,
              fontWeight: 'bold',
              fontFamily: FontFamily.bold,
            }}
          >
            {item.courseName || ''}
          </Typography>
          {/* <Typography
            sx={{
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.light,
              color: Color.grey,
            }}
          >{`Mentor ${item.mentorName[0]}`}</Typography> */}
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.light,
              color: Color.grey,
            }}
          >
            {item.courseDescription}
          </Typography>
        </Stack>
      </Stack>

      <Stack padding={1}>
        <Stack marginTop={1}>
          <Button onClick={handleNavigateCourseDetail} customVariant="normal">
            Xem chi tiết
          </Button>
        </Stack>
        <Stack marginTop={1}>
          <Button onClick={handleClose} customVariant="normal">
            Xóa khóa học
          </Button>
        </Stack>
      </Stack>

      <ConfirmDialog
        content="Bạn có chắc chắn muốn xóa khóa học này không ?"
        title="Xác nhận xóa khóa học"
        handleAccept={handleDeleteCourse}
        handleClose={handleClose}
        open={open}
      />
    </Stack>
  );
}

MentorCourseItem.defaultProps = {
  isSkeleton: false,
  item: undefined,
  onClick: () => {},
};
