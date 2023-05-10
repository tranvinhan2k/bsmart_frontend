import { Grid, Stack, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Color } from '~/assets/variables';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import Icon from '~/components/atoms/Icon';
import TextLine from '~/components/atoms/TextLine';
import { image } from '~/constants/image';
import { LEVEL_LABELS } from '~/constants/level';
import { useQueryGetImage } from '~/hooks';
import { SubCoursePayload } from '~/models/subCourse';
import { formatDate } from '~/utils/date';

interface SubCourseItemProps {
  id: number;
  subCourse: SubCoursePayload;
  onDelete: (id: number) => void;
}

export default function SubCourseItem({
  id,
  subCourse,
  onDelete,
}: SubCourseItemProps) {
  const [isOpenDialog, setOpenDialog] = useState<boolean>(false);

  console.log(subCourse.level);

  function handleDelete() {
    // setOpenDialog(!isOpenDialog);
    onDelete(id);
  }

  // const handleConfirm = () => {
  //   onDelete(id);
  //   setOpenDialog(!isOpenDialog);
  // };
  // const handleCancel = () => {
  //   setOpenDialog(!isOpenDialog);
  // };

  return (
    <Grid item xs={12}>
      {/* <ConfirmDialog
        open={isOpenDialog}
        title="Xác nhận xóa khóa học phụ"
        content="Bạn có chắc xóa khóa học này ?"
        handleAccept={handleConfirm}
        handleClose={handleCancel}
      /> */}
      <Stack sx={{ position: 'relative' }}>
        <Stack
          onClick={() => handleDelete()}
          sx={{
            opacity: 0,
            borderRadius: '10px',
            background: `${Color.orange}AA`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            width: 'calc(100%-10px)',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'opacity .5s ease-out',
            '&:hover': {
              opacity: 1,
              cursor: 'pointer',
            },
          }}
        >
          <Icon name="edit" size="ex_large" color="white" />
        </Stack>
        <Grid
          container
          sx={{
            boxShadow: 3,
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <Grid item xs={12} md={2} padding={1}>
            <Box
              component="img"
              src={
                subCourse.imageId
                  ? URL.createObjectURL(subCourse.imageId as any)
                  : ''
              }
              alt="course"
              sx={{ objectFit: 'contain', width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} md={5} padding={1}>
            <Typography>Thông tin khóa học</Typography>
            {[
              { label: 'Tên khóa học phụ', variable: subCourse.subCourseTile },
              {
                label: 'Trình độ',
                variable: LEVEL_LABELS[subCourse.level.toUpperCase() as any],
              },
              {
                label: 'Ngày bắt đầu dự kiến',
                variable: formatDate(subCourse.startDateExpected),
              },
              {
                label: 'Ngày kết thúc dự kiến',
                variable: formatDate(subCourse.endDateExpected),
              },
              {
                label: 'Số lượng tối thiểu',
                variable: subCourse.minStudent,
              },
              { label: 'Số lượng tối đa', variable: subCourse.maxStudent },
            ].map((item) => (
              <TextLine
                label={item.label}
                variable={`${item.variable}`}
                key={item.label}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={5} padding={1}>
            <Typography>Thông tin giờ học</Typography>
            {subCourse.timeInWeekRequests.map((item, index) => (
              <TextLine
                key={`${item.dayInWeek.id} ${item.slot.id}`}
                label={`Giờ học thứ ${index + 1}`}
                variable={`${item.slot.label} - ${item.dayInWeek.label}`}
              />
            ))}
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
