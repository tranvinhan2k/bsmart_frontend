import {
  Grid,
  Stack,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { Color, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import TextLine from '~/components/atoms/TextLine';
import TextPropLine from '~/components/atoms/texts/TextPropLine';
import { image } from '~/constants/image';
import { LEVEL_LABELS } from '~/constants/level';
import { LevelKeys } from '~/models/variables';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import globalStyles from '~/styles';
import { formatDate } from '~/utils/date';

interface ClassItemProps {
  id: number;
  classItem: DetailCourseClassPayload;
  onUpdate: (id: number) => void;
  onDeleteModal: () => void;
}

export default function ClassItem({
  id,
  classItem,
  onUpdate,
  onDeleteModal,
}: ClassItemProps) {
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
    <Grid
      container
      sx={{
        position: 'relative',
        background: Color.whiteSmoke,
        border: '0.5px solid grey',
        marginBottom: 2,
      }}
    >
      <Grid item xs={12} md={2}>
        <Box
          component="img"
          src={
            classItem.imageUrl
              ? URL.createObjectURL(classItem.imageUrl as any)
              : image.mockClass
          }
          alt="course"
          sx={{
            objectFit: 'fit',
            width: '100%',
            height: '100%',
            background: Color.white,
          }}
        />
      </Grid>
      <Grid item xs={12} md={4} padding={2}>
        <Typography sx={globalStyles.textSmallLabel}>
          Thông tin khóa học
        </Typography>
        <Stack marginY={1}>
          {[
            {
              label: 'Trình độ',
              variable:
                LEVEL_LABELS[classItem.level.value.toUpperCase() as LevelKeys],
            },
            {
              label: 'Ngày bắt đầu dự kiến',
              variable: formatDate(classItem.startDate),
            },
            {
              label: 'Ngày kết thúc dự kiến',
              variable: formatDate(classItem.endDate),
            },
            {
              label: 'Số lượng tối thiểu',
              variable: classItem.minStudent,
            },
            { label: 'Số lượng tối đa', variable: classItem.maxStudent },
          ].map((item) => (
            <TextPropLine
              icon="add"
              label={item.label}
              value={`${item.variable}`}
              key={item.label}
            />
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12} md={4} padding={2}>
        <Typography sx={globalStyles.textSmallLabel}>
          Thông tin giờ học
        </Typography>
        <Stack marginY={1}>
          {classItem.timeInWeekRequests.map((item, index) => (
            <TextPropLine
              key={`${item.dayOfWeekId} ${item.slotId}`}
              label={`Giờ học thứ ${index + 1}`}
              value={`${item.slotId} - ${item.dayOfWeekId}`}
              icon="description"
            />
          ))}
        </Stack>
      </Grid>
      <Grid
        sx={{
          position: 'absolute',
          right: MetricSize.small_5,
          top: MetricSize.small_5,
        }}
      >
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
  );
}
