/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  Stack,
  Typography,
  Grid,
  Box,
  IconButton,
  Switch,
  FormControlLabel,
  Tooltip,
} from '@mui/material';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import globalStyles from '~/styles';
import { headerCell } from './style';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import Button from '~/components/atoms/Button';
import CustomModal from '~/components/atoms/CustomModal';
import { scrollToTop } from '~/utils/common';

const initRows = [
  {
    id: 0,
    image:
      'https://img2.thuthuatphanmem.vn/uploads/2019/05/06/anh-the-hoc-sinh_100828479.jpg',
    name: 'Trần Vĩ Nhân',
    slotLeft: 6,
    isPresent: 'WAIT',
  },
  {
    id: 1,
    image:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/11/mau-anh-the-sac-net-nhat.jpeg',
    name: 'Nguyễn Văn A',
    slotLeft: 3,
    isPresent: 'PRESENT',
  },
  {
    id: 2,
    image: 'https://www.uit.edu.vn/sites/vi/files/image_from_word/va.jpeg',
    name: 'Trần Văn B',
    slotLeft: 1,
    isPresent: 'ABSENT',
  },
];

export type PresentStatus = 'WAIT' | 'PRESENT' | 'ABSENT';

export default function MentorTakeAttendancePage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);
  const [rows, setRows] = useState<any>(initRows);
  const [showImage, setShowImage] = useState(true);
  const handleOpenImage = (param: number) => {
    setOpen(!open);
    setIndex(param);
  };

  const handleSetPresent = (id: number, status: PresentStatus) => {
    const tmpRows = rows.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          isPresent: item.isPresent === status ? 'WAIT' : status,
        };
      }
      return item;
    });
    setRows(tmpRows);
  };

  const handleNavigateViewDetail = () => {
    navigate('/mentor-profile/view-member-attendance');
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack>
      <Stack
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Stack>
          <Typography>Điểm danh</Typography>
          <Typography sx={globalStyles.textTitle}>Lớp LTV 12</Typography>
          <Typography>Slot 1 - Ngày 7/6/2023</Typography>
        </Stack>
        <Stack sx={{ alignItems: 'flex-end' }}>
          <Typography>Thời gian còn lại</Typography>
          <Typography sx={{ ...globalStyles.textTitle, color: Color.red }}>
            <Countdown date={Date.now() + 10000} />
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={showImage}
                onChange={() => {
                  setShowImage(!showImage);
                }}
                name="jason"
              />
            }
            label="Hiển thị hình ảnh"
          />
        </Stack>
      </Stack>
      <Stack
        sx={{
          marginTop: 2,
          borderRadius: MetricSize.small_10,
        }}
      >
        <Grid
          sx={{
            border: '0.5px solid #eee',
          }}
          container
        >
          <Grid sx={headerCell} item md={1}>
            Id
          </Grid>
          <Grid sx={headerCell} item md={4}>
            Ảnh
          </Grid>
          <Grid sx={headerCell} item md={3}>
            Tên
          </Grid>
          <Grid sx={headerCell} item md={2}>
            Số slot còn lại
          </Grid>
          <Grid sx={headerCell} item md={2}>
            Điểm danh
          </Grid>
        </Grid>
        {rows.map((item: any, rowIndex: any) => {
          return (
            <Grid
              key={item.id}
              sx={{
                alignItems: 'center',
                transition: 'background 1s, height 1s',
                borderBottom: '3px solid #eee',
                background:
                  item.isPresent === 'PRESENT'
                    ? `${Color.green}55`
                    : item.isPresent === 'ABSENT'
                    ? `${Color.red}55`
                    : rowIndex % 2 === 0
                    ? Color.white2
                    : Color.whiteSmoke,
              }}
              container
            >
              <Grid sx={headerCell} item md={1}>
                {item.id}
              </Grid>
              <Grid sx={headerCell} item md={4}>
                <Button
                  sx={{
                    padding: MetricSize.medium_15,
                    borderRadius: showImage ? MetricSize.medium_15 : 1000,
                  }}
                  onClick={() => handleOpenImage(rowIndex)}
                >
                  <Tooltip title="Nhấn để phóng to hình ảnh">
                    <Box
                      sx={{
                        height: showImage ? '240px' : '50px',
                        width: showImage ? '180px' : '50px',
                        objectFit: 'fill',
                        borderRadius: showImage ? MetricSize.medium_15 : 1000,
                      }}
                      component="img"
                      alt="avatar"
                      src={item?.image}
                    />
                  </Tooltip>
                </Button>
              </Grid>
              <Grid md={3}>
                <Typography
                  sx={{
                    marginLeft: '10px',
                    fontSize: FontSize.small_18,
                    fontFamily: FontFamily.medium,
                    color: Color.black,
                  }}
                >
                  {item.name}
                </Typography>
              </Grid>
              <Grid sx={headerCell} item md={2}>
                {`${item.slotLeft} buổi còn lại`}
              </Grid>
              <Grid sx={headerCell} item md={2}>
                <Stack
                  sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Tooltip title="Điểm danh">
                    <IconButton
                      onClick={() => handleSetPresent(item.id, 'PRESENT')}
                    >
                      <Icon
                        name={
                          item.isPresent === 'PRESENT'
                            ? 'checkCircleFill'
                            : 'checkCircle'
                        }
                        color="green"
                        size="medium"
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Đánh vắng">
                    <IconButton
                      onClick={() => handleSetPresent(item.id, 'ABSENT')}
                    >
                      <Icon
                        name={
                          item.isPresent === 'ABSENT'
                            ? 'xCircleFill'
                            : 'xCircle'
                        }
                        color="red"
                        size="medium"
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xem chi tiết">
                    <IconButton onClick={handleNavigateViewDetail}>
                      <Icon name="viewDetail" color="black" size="medium" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Grid>
            </Grid>
          );
        })}
      </Stack>
      <CustomModal open={open} onClose={() => setOpen(!open)}>
        <Box
          component="img"
          alt="preview_image"
          src={rows?.[index]?.image}
          sx={{
            height: '90vh',
            width: '100%',
            objectFit: 'contain',
          }}
        />
      </CustomModal>

      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
            height: '100%',
            paddingTop: MetricSize.medium_15,
            paddingRight: MetricSize.medium_15,
          }}
        >
          <Typography>Tổng số học sinh: 30</Typography>
          <Typography>Có mặt: 26</Typography>
          <Typography>Vắng: 2</Typography>
          <Typography>Chưa điêm danh: 2</Typography>
        </Stack>
        <Stack
          marginTop={2}
          sx={{
            alignSelf: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Button customVariant="horizonForm">Điểm danh khóa học</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
