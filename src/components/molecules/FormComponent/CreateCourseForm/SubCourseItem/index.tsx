import {
  Grid,
  Stack,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useState } from 'react';
import Icon from '~/components/atoms/Icon';
import TextLine from '~/components/atoms/TextLine';
import { LEVEL_LABELS } from '~/constants/level';
import { SubCoursePayload } from '~/models/subCourse';
import { LevelKeys } from '~/models/variables';
import { formatDate } from '~/utils/date';

interface SubCourseItemProps {
  id: number;
  subCourse: SubCoursePayload;
  onUpdate: (id: number) => void;
  onDeleteModal: () => void;
}

export default function SubCourseItem({
  id,
  subCourse,
  onUpdate,
  onDeleteModal,
}: SubCourseItemProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleDelete = () => {
    // setOpenDialog(!isOpenDialog);
    onUpdate(id);
  };

  const handleClose = () => {
    setAnchorEl(() => null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Grid item xs={12}>
      <Stack sx={{ position: 'relative' }}>
        <Grid
          container
          sx={{
            boxShadow: 3,
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <Grid item xs={12} md={1} padding={1}>
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
                variable:
                  LEVEL_LABELS[subCourse.level.toUpperCase() as LevelKeys],
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
          <Grid>
            <IconButton onClick={handleMenu}>
              <Icon name="moreVert" color="black" size="medium" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onMouseLeave={handleClose}
            >
              <MenuItem onClick={handleDelete}>Cập nhật </MenuItem>
              <MenuItem onClick={onDeleteModal}>Xóa</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
