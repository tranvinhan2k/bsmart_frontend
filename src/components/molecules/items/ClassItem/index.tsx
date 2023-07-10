import React, { useState } from 'react';
import {
  Stack,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
} from '@mui/material';

import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon, { IconName } from '~/components/atoms/Icon';
import { image } from '~/constants/image';
import { LEVEL_IMAGES } from '~/constants/level';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import globalStyles from '~/styles';
import { formatDate } from '~/utils/date';
import Timetable from '../../Timetable';
import Button from '~/components/atoms/Button';

interface Props {
  id: number;
  code: string;
  startDate: string;
  endDate: string;
  minStudent: number;
  maxStudent: number;
  timetable: {
    dayOfWeekId: number;
    slotId: number;
  }[];
  imageUrl: string;
  onUpdate?: (id: number) => void;
  onDeleteModal?: () => void;
}

const texts = {
  createClassTitle: 'Tạo lớp học mới',
  createClassDescription: 'Thêm lớp học mới cho khóa học hiện tại.',
  generalInfoTitle: 'Thông tin chung',
  priceLabel: 'Giá khóa học',
  courseTypeLabel: 'Hình thức khóa học',
  imageLabel: 'Hình ảnh',
  minStudentLabel: 'Số học sinh tối thiểu',
  maxStudentLabel: 'Số học sinh tối đa',
  levelInfoTitle: 'Trình độ',
  classInfoTitle: 'Thông tin giờ học',
  startDateLabel: 'Ngày mở lớp dự kiến',
  endDateLabel: 'Ngày kết thúc dự kiến',
  numberOfSlotLabel: 'Số buổi học',
  timetableLabel: 'Thời khóa biểu',
  createTimetableButton: 'Tạo thời khóa biểu',
  viewCourseInfoButton: 'Thu gọn lịch học',
  viewTimetableButton: 'Xem lịch học',
  deleteConfirmation: 'Bạn có chắc chắn muốn xóa giờ học này?',
  deleteConfirmationTitle: 'Xác nhận xóa giờ học',
  updateMenuItem: 'Cập nhật',
  deleteMenuItem: 'Xóa',
};

export default function ClassItem({
  id,
  code,
  endDate,
  imageUrl,
  maxStudent,
  minStudent,
  startDate,
  timetable,
  onUpdate,
  onDeleteModal,
}: Props) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDelete = () => {
    if (onUpdate) {
      onUpdate(id);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpen(!open);
    handleClose();
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const appBar: {
    icon: IconName;
    label: string;
    variable: string;
  }[] = [
    {
      icon: 'date',
      label: texts.startDateLabel,
      variable: formatDate(startDate),
    },
    {
      icon: 'date',
      label: texts.endDateLabel,
      variable: formatDate(endDate),
    },
    {
      icon: 'number',
      label: texts.minStudentLabel,
      variable: `${minStudent} học sinh`,
    },
    {
      icon: 'number',
      label: texts.maxStudentLabel,
      variable: `${maxStudent} học sinh`,
    },
  ];

  return (
    <Stack
      sx={{
        background: Color.white,
        border: `0.5px solid ${Color.border}`,
        position: 'relative',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: MetricSize.small_5,
        justifyContent: 'space-between',
      }}
    >
      <Stack sx={{ flexGrow: 1 }}>
        <Stack sx={{ flexDirection: 'row' }}>
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={imageUrl || image.mockClass}
              alt="course"
              sx={{
                borderRadius: MetricSize.small_5,
                margin: 1,
                background: Color.white,
                objectFit: 'cover',
                height: undefined,
                width: '150px',
                aspectRatio: 1,
              }}
            />
          </Stack>

          <Stack
            sx={{
              flexGrow: 1,
              paddingX: 3,
              paddingY: 2,
              justifyContent: 'space-around',
            }}
          >
            <Typography
              sx={{
                fontFamily: FontFamily.bold,
                fontSize: FontSize.medium_28,
              }}
            >
              {`Lớp học #${code}`}
            </Typography>
            <Stack>
              {/* <Stack
                  sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      width: FontSize.small_18,
                      height: undefined,
                      aspectRatio: 1,
                      objectFit: 'contain',
                      marginRight: 1,
                    }}
                    component="img"
                    src={
                      LEVEL_IMAGES[
                        level.value.toUpperCase() as keyof typeof LEVEL_IMAGES
                      ]
                    }
                    alt="level"
                  />
                  <Typography
                    sx={{
                      fontSize: FontSize.small_18,
                      fontFamily: FontFamily.light,
                      color: Color.black,
                    }}
                  >
                    {`${level.label}`}
                  </Typography>
                </Stack> */}
            </Stack>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: 2,
              }}
            >
              {appBar.map((item, index) => (
                <Stack
                  key={index}
                  sx={{
                    flexDirection: 'row',
                    marginRight: 2,
                  }}
                >
                  <Icon color="black" name={item.icon} size="small_20" />
                  <Stack marginLeft={1}>
                    <Typography
                      sx={{
                        fontSize: FontSize.small_14,
                        fontFamily: FontFamily.bold,
                      }}
                    >
                      {`${item.label} `}
                    </Typography>
                    <Typography sx={globalStyles.textLowSmallLight}>
                      {`${item.variable} `}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
            <Box marginTop={1}>
              <Button
                onClick={handleOpen}
                variant="text"
                sx={{
                  ':hover': {
                    textDecoration: 'underline',
                    background: Color.white,
                  },
                }}
                color="primary"
              >
                {open ? texts.viewCourseInfoButton : texts.viewTimetableButton}
              </Button>
            </Box>
          </Stack>
        </Stack>

        <Collapse in={open}>
          <Stack sx={{ paddingX: 2, paddingBottom: 2 }}>
            <Typography sx={globalStyles.textSmallLabel}>
              {texts.classInfoTitle}
            </Typography>
            <Stack marginTop={1}>
              <Timetable data={timetable} />
            </Stack>
          </Stack>
        </Collapse>
      </Stack>

      {onUpdate && onDeleteModal && (
        <Stack
          sx={{
            position: 'absolute',
            right: MetricSize.small_5,
            top: MetricSize.small_5,
          }}
        >
          <IconButton onClick={handleMenu}>
            <Icon name="moreVert" color="black" size="small_20" />
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
            <MenuItem onClick={handleDelete}>{texts.updateMenuItem}</MenuItem>
            <MenuItem onClick={onDeleteModal}>{texts.deleteMenuItem}</MenuItem>
          </Menu>
        </Stack>
      )}
    </Stack>
  );
}
