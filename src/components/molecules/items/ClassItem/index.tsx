import React, { useState } from 'react';
import {
  Stack,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
  FormHelperText,
} from '@mui/material';

import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon, { IconName } from '~/components/atoms/Icon';
import { image } from '~/constants/image';
import globalStyles from '~/styles';
import { formatDate } from '~/utils/date';
import Timetable from '../../Timetable';
import Button from '~/components/atoms/Button';
import { formatMoney } from '~/utils/money';
import { ClassStatusKeys } from '~/models/variables';
import Tag from '~/components/atoms/Tag';
import { ClassStatusList } from '~/constants';

interface Props {
  id: number;
  code: string;
  startDate: string;
  status: ClassStatusKeys | undefined;
  endDate: string;
  minStudent: number;
  maxStudent: number;
  timetable: {
    dayOfWeekId: number;
    slotId: number;
  }[];
  imageUrl: string;
  price: number;
  onUpdate?: (id: number) => void;
  onDeleteModal?: () => void;
}

const texts = {
  createClassTitle: 'Tạo lớp học mới',
  createClassDescription: 'Thêm lớp học mới cho khóa học hiện tại.',
  generalInfoTitle: 'Thông tin chung',
  priceLabel: 'Giá khóa học trên một học sinh',
  courseTypeLabel: 'Hình thức khóa học',
  imageLabel: 'Hình ảnh',
  minStudentLabel: 'Số học sinh tối thiểu',
  maxStudentLabel: 'Số học sinh tối đa',
  levelInfoTitle: 'Trình độ',
  classInfoTitle:
    'Thời khóa biểu mặc định hàng tuần từ thứ 2 đến thứ 7 hàng tuần',
  startDateLabel: 'Ngày mở lớp dự kiến',
  endDateLabel: 'Ngày kết thúc dự kiến',
  numberOfSlotLabel: 'Số buổi học',
  timetableLabel:
    'Thời khóa biểu mặc định hàng tuần từ thứ 2 đến thứ 7 hàng tuần',
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
  status,
  endDate,
  imageUrl,
  maxStudent,
  price,
  minStudent,
  startDate,
  timetable,
  onUpdate,
  onDeleteModal,
}: Props) {
  console.log('onUpdate', JSON.stringify(onUpdate), onUpdate);
  console.log('onDelete', JSON.stringify(onDeleteModal));

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
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
      icon: 'price',
      label: texts.priceLabel,
      variable: formatMoney(price),
    },
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

  const statusLabel = ClassStatusList.find((item) => {
    return item.value === status;
  })?.label;

  return (
    <Stack
      sx={{
        background: Color.white,
        border: `0.5px solid ${Color.border}`,
        position: 'relative',
        flexDirection: { xs: 'column', md: 'row' },
        flexWrap: 'wrap',
        flexGrow: 1,
        borderRadius: MetricSize.small_5,
        justifyContent: 'space-between',
      }}
    >
      <Stack>
        <Stack sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
          <Box
            component="img"
            src={!loaded ? imageUrl : image.noCourse}
            onError={() => setLoaded(true)}
            alt="course"
            sx={{
              borderRadius: MetricSize.small_5,
              border: '1px solid #eee',
              margin: 1,
              background: Color.white,
              objectFit: 'cover',
              height: '300px',
              width: undefined,
              aspectRatio: 1,
            }}
          />

          <Stack
            sx={{
              paddingX: 2,
              paddingY: 2,
              justifyContent: 'space-around',
            }}
          >
            {status && (
              <Box>
                <Tag color="whiteSmoke" title={statusLabel || ''} />
              </Box>
            )}
            <Typography
              sx={{
                fontFamily: FontFamily.bold,
                fontSize: FontSize.medium_28,
              }}
            >
              {`Lớp học mã ${code}`}
            </Typography>
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
            <FormHelperText>
              Thông tin các buổi học trong một tuần bất kì của bạn
            </FormHelperText>
            <Stack marginTop={1}>
              <Timetable data={timetable} />
            </Stack>
          </Stack>
        </Collapse>
      </Stack>

      {onUpdate !== undefined && (
        <Stack
          sx={{
            position: 'absolute',
            right: { xs: MetricSize.medium_15, md: MetricSize.small_5 },
            top: { xs: MetricSize.medium_15, md: MetricSize.small_5 },
          }}
        >
          <IconButton
            sx={{
              background: Color.white,
              boxShadow: 1,
            }}
            onClick={handleMenu}
          >
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
