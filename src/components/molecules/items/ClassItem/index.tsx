import {
  Stack,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
} from '@mui/material';
import React, { useState } from 'react';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon, { IconName } from '~/components/atoms/Icon';
import { image } from '~/constants/image';
import { LEVEL_IMAGES } from '~/constants/level';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import globalStyles from '~/styles';
import { formatDate } from '~/utils/date';
import Timetable from '../../Timetable';

interface Props {
  id: number;
  classItem: DetailCourseClassPayload;
  onUpdate?: (id: number) => void;
  onDeleteModal?: () => void;
}

export default function ClassItem({
  id,
  classItem,
  onUpdate,
  onDeleteModal,
}: Props) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleDelete = () => {
    // setOpenDialog(!isOpenDialog);
    if (onUpdate) {
      onUpdate(id);
    }
  };

  const handleClose = () => {
    setAnchorEl(() => null);
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
      label: 'Ngày bắt đầu',
      variable: formatDate(classItem.startDate),
    },
    {
      icon: 'date',
      label: 'Ngày kết thúc',
      variable: formatDate(classItem.endDate),
    },
    {
      icon: 'number',
      label: 'Số lượng tối thiểu',
      variable: `${classItem.minStudent} học sinh`,
    },
    {
      icon: 'number',
      label: 'Số lượng tối đa',
      variable: `${classItem.maxStudent} học sinh`,
    },
  ];

  return (
    <Stack
      sx={{
        background: Color.grey3,
        position: 'relative',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: MetricSize.small_5,
        // border: '0.5px solid grey',
        justifyContent: 'space-between',
      }}
    >
      <Stack sx={{ flexGrow: 1 }}>
        <Collapse in={!open}>
          <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <Stack
              sx={{
                justifyContentl: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={classItem.imageUrl ? classItem.imageUrl : image.mockClass}
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
            <Stack sx={{ flexGrow: 1, paddingX: 3, paddingY: 2 }}>
              <Box>
                <Stack
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
                        classItem.level.value.toUpperCase() as keyof typeof LEVEL_IMAGES
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
                    {`${classItem.level.label}`}
                  </Typography>
                </Stack>
              </Box>
              <Typography
                sx={{
                  fontFamily: FontFamily.bold,
                  fontSize: FontSize.medium_28,
                }}
              >{`Lớp học #${classItem.id}`}</Typography>

              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 2,
                }}
              >
                {appBar.map((item) => (
                  <Stack
                    key={item.icon}
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
            </Stack>
          </Stack>
        </Collapse>

        <Collapse in={open}>
          <Stack sx={{ padding: 1 }}>
            <Typography sx={globalStyles.textSmallLabel}>
              Thông tin giờ học
            </Typography>
            <Stack marginTop={1}>
              <Timetable data={classItem.timeInWeekRequests} />
            </Stack>
          </Stack>
        </Collapse>
      </Stack>
      {onUpdate && onDeleteModal && (
        <Stack
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
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
            <MenuItem onClick={handleOpen}>
              {open ? 'Xem thông tin khóa học' : 'Xem lịch học'}
            </MenuItem>
            <MenuItem onClick={handleDelete}>Cập nhật </MenuItem>
            <MenuItem onClick={onDeleteModal}>Xóa</MenuItem>
          </Menu>
        </Stack>
      )}
    </Stack>
  );
}
