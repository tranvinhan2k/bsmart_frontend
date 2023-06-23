/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import {
  Stack,
  Typography,
  Grid,
  Box,
  Switch,
  FormControlLabel,
  TextField,
} from '@mui/material';
import Countdown from 'react-countdown';
import { useNavigate, useParams } from 'react-router-dom';
import { headerCell } from './style';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import Button from '~/components/atoms/Button';
import CustomModal from '~/components/atoms/CustomModal';
import { scrollToTop } from '~/utils/common';
import { useQueryGetAttendance } from '~/hooks/useQueryGetAttendance';
import { image } from '~/constants/image';
import { useManageClass } from '~/hooks/useManageClass';
import { formatDate } from '~/utils/date';
import AttendanceList from './AttendanceList';
import { useMutationTakeAttendance } from '~/hooks/useMutationTakeAttendance';
import toast from '~/utils/toast';
import { PresentStatusKeys } from '~/models/variables';
import TextDeclareColumn from '~/components/atoms/TextDeclareColumn';

// const initRows = [
//   {
//     id: 0,
//     image:
//       'https://img2.thuthuatphanmem.vn/uploads/2019/05/06/anh-the-hoc-sinh_100828479.jpg',
//     name: 'Trần Vĩ Nhân',
//     note: 'Hello',
//     isPresent: 'WAIT',
//   },
//   {
//     id: 1,
//     image:
//       'https://khoinguonsangtao.vn/wp-content/uploads/2022/11/mau-anh-the-sac-net-nhat.jpeg',
//     name: 'Nguyễn Văn A',
//     note: 'Hello',
//     isPresent: 'PRESENT',
//   },
//   {
//     id: 2,
//     image: 'https://www.uit.edu.vn/sites/vi/files/image_from_word/va.jpeg',
//     name: 'Trần Văn B',
//     note: 'Hello',
//     isPresent: 'ABSENT',
//   },
// ];

export default function MentorTakeAttendancePage() {
  const navigate = useNavigate();
  const param = useParams();

  const { attendances } = useQueryGetAttendance(`${param.id}`);
  const mutationResult = useMutationTakeAttendance();

  const attendanceInformation = attendances?.timeTableResponse;

  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);
  const [rows, setRows] = useState<any>([]);
  const [showImage, setShowImage] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const handleOpenImage = (iparam: number) => {
    setOpen(!open);
    setIndex(iparam);
  };

  const handleSetPresent = (id: number, status: PresentStatusKeys) => {
    const tmpRows = rows?.map((item: any) => {
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

  const handleSearchValue = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleNavigateViewDetail = () => {
    navigate('/mentor-profile/view-member-attendance');
  };

  const handleAddNote = (note: string, id: number) => {
    const tmpRows = rows?.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          note,
        };
      }
      return item;
    });
    setRows(tmpRows);
  };

  const handleTakeAttendance = async () => {
    const id = toast.loadToast('Đang điểm danh buổi học...');
    try {
      const data = {
        timeTableId: parseInt(`${param.id}`, 10),
        details: rows.map((item: any) => ({
          studentClassId: item.id,
          attendance: item.isPresent === 'PRESENT',
          note: item.note,
        })),
      };
      await mutationResult.mutateAsync(data);
      toast.updateSuccessToast(id, 'Điểm danh thành công !');
    } catch (error: any) {
      toast.updateFailedToast(
        id,
        `Điểm danh không thành công: ${error.message}`
      );
    }
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const initRows = attendances?.attendanceResponses?.items?.map(
      (studentSlot: any) => ({
        id: studentSlot.student.id,
        isPresent: studentSlot.attendance ? 'PRESENT' : 'WAIT',
        name: studentSlot.student.name,
        image: studentSlot.avatar || image.noAvatar,
        note: studentSlot.note,
      })
    );

    setRows(initRows);
  }, [attendances]);

  const timeSlotHour = new Date(attendanceInformation?.date);
  const timeStartSlotHour = new Date(attendanceInformation?.date);

  if (attendanceInformation?.slot) {
    timeSlotHour.setHours(
      parseInt(attendanceInformation.slot.endTime.split(':')[0], 10),
      parseInt(attendanceInformation.slot.endTime.split(':')[1], 10)
    );
    timeStartSlotHour.setHours(
      parseInt(attendanceInformation.slot.startTime.split(':')[0], 10),
      parseInt(attendanceInformation.slot.startTime.split(':')[1], 10)
    );
  }

  const totalPresentStudent =
    rows?.reduce((total: number, item: any) => {
      if (item.isPresent === 'PRESENT') {
        return total + 1;
      }
      return total;
    }, 0) || 0;
  const totalWaitStudent =
    rows?.reduce((total: number, item: any) => {
      if (item.isPresent === 'WAIT') {
        return total + 1;
      }
      return total;
    }, 0) || 0;
  const totalAbsentStudent =
    rows?.reduce((total: number, item: any) => {
      if (item.isPresent === 'ABSENT') {
        return total + 1;
      }
      return total;
    }, 0) || 0;

  const filterRows = rows?.filter((item: any) =>
    item.name.toLowerCase().includes(searchValue)
  );

  const takeAttendanceAnalysts = [
    {
      id: 0,
      name: 'Tổng số học sinh',
      value: `${attendances?.attendanceResponses?.totalItems || 0}`,
      color: '#0079FF',
    },
    {
      id: 1,
      name: 'Có mặt',
      value: `${totalPresentStudent || 0}`,
      color: '#00DFA2',
    },
    {
      id: 2,
      name: 'Vắng',
      value: `${totalAbsentStudent || 0}`,
      color: '#FF0060',
    },
    {
      id: 3,
      name: 'Chưa điểm danh',
      value: `${totalWaitStudent || 0}`,
      color: '#F6FA70',
    },
  ];

  return (
    <Stack
      sx={{
        paddingX: { xs: MetricSize.medium_15, md: MetricSize.large_20 },
        background: Color.white,
        paddingY: MetricSize.large_20,
        borderRadius: MetricSize.small_5,
      }}
    >
      <Stack
        sx={{
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Stack>
          <Typography>Điểm danh</Typography>
          <Typography
            sx={{
              fontSize: FontSize.medium_28,
              fontFamily: FontFamily.regular,
              color: Color.orange,
            }}
          >{`${attendanceInformation?.slot?.name} - Ngày ${formatDate(
            attendanceInformation?.date
          )}`}</Typography>
          <FormControlLabel
            control={
              <Switch
                color="secondary"
                checked={showImage}
                onChange={() => {
                  setShowImage(!showImage);
                }}
              />
            }
            label="Hiển thị hình ảnh"
          />
        </Stack>
        <Stack
          sx={{
            justifyContent: 'flex-start',
            alignItems: { xs: 'flex-start', md: 'flex-end', marginTop: 2 },
          }}
        >
          <Typography>Thời gian còn lại</Typography>
          <Typography
            sx={{
              fontSize: FontSize.medium_28,
              fontFamily: FontFamily.regular,
              color: Color.blue,
              textAlign: 'end',
            }}
          >
            {attendanceInformation && Date.now() <= timeSlotHour.getTime() ? (
              Date.now() < timeStartSlotHour.getTime() ? (
                <span>Chưa tới giờ điểm danh</span>
              ) : (
                <Countdown date={timeSlotHour.getTime()} />
              )
            ) : (
              <span>Đã hết thời gian điểm danh</span>
            )}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        sx={{
          paddingY: MetricSize.small_5,
        }}
      >
        <TextField
          value={searchValue}
          onChange={handleSearchValue}
          placeholder="Thêm tên học sinh cần tìm kiếm"
          InputProps={{
            startAdornment: <Icon name="search" size="medium" color="black" />,
          }}
        />
      </Stack>
      <Stack
        sx={{
          marginTop: 2,
          borderRadius: MetricSize.small_10,
          boxShadow: 2,
          width: '100%',
          overflow: 'auto',
        }}
      >
        <Grid
          sx={{
            border: '0.5px solid #eee',
          }}
          container
        >
          <Grid sx={headerCell} item xs={1}>
            Id
          </Grid>
          <Grid sx={headerCell} item xs={3}>
            Ảnh
          </Grid>
          <Grid sx={headerCell} item xs={2}>
            Tên
          </Grid>
          <Grid sx={headerCell} item xs={4}>
            Ghi Chú
          </Grid>
          <Grid sx={headerCell} item xs={2}>
            Điểm danh
          </Grid>
        </Grid>
        <Stack>
          {filterRows?.length !== 0 && filterRows ? (
            filterRows?.map((item: any, rowIndex: any) => {
              return (
                <AttendanceList
                  key={item.id}
                  item={item}
                  index={rowIndex}
                  isShowImage={showImage}
                  onSetPresent={handleSetPresent}
                  onViewDetail={handleNavigateViewDetail}
                  onZoomImage={handleOpenImage}
                  onAddNote={handleAddNote}
                />
              );
            })
          ) : (
            <Stack
              sx={{ padding: MetricSize.medium_15, border: '0.5px solid #eee' }}
            >
              <Typography>Không có học sinh nào phù hợp.</Typography>
            </Stack>
          )}
        </Stack>
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
      <Grid
        container
        spacing={2}
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexGrow: 1,
          height: '100%',
          paddingTop: MetricSize.large_20,
        }}
      >
        {takeAttendanceAnalysts.map((item) => {
          return (
            <Grid key={item.id} item xs={6} md={3}>
              <TextDeclareColumn
                color={item.color}
                title={item.name}
                value={item.value}
              />
            </Grid>
          );
        })}
      </Grid>
      <Stack
        marginTop={2}
        sx={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Button onClick={handleTakeAttendance} customVariant="horizonForm">
          Điểm danh khóa học
        </Button>
      </Stack>
    </Stack>
  );
}
