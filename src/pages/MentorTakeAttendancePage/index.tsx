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
import { useNavigate, useParams } from 'react-router-dom';
import globalStyles from '~/styles';
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

export type PresentStatus = 'WAIT' | 'PRESENT' | 'ABSENT';

export default function MentorTakeAttendancePage() {
  const navigate = useNavigate();
  const param = useParams();

  const { attendances } = useQueryGetAttendance(`${param.id}`);
  const mutationResult = useMutationTakeAttendance();
  const { classDetails, attendanceQueryData } = useManageClass({
    id: parseInt(param.classId || '', 10),
  });
  const attendanceInformation = attendanceQueryData?.data?.items?.find(
    (item: any) => item.id === parseInt(`${param.id}`, 10)
  );

  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);
  const [rows, setRows] = useState<any>([]);
  const [showImage, setShowImage] = useState(true);
  console.log(
    'classDetails',
    classDetails,
    attendanceQueryData.data,
    attendances,
    attendanceInformation
  );

  const handleOpenImage = (iparam: number) => {
    setOpen(!open);
    setIndex(iparam);
  };

  const handleSetPresent = (id: number, status: PresentStatus) => {
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

  console.log(rows);

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
    const initRows = attendances?.items?.map((studentSlot: any) => ({
      id: studentSlot.student.id,
      isPresent: studentSlot.attendance ? 'PRESENT' : 'WAIT',
      name: studentSlot.student.name,
      image: studentSlot.avatar || image.noAvatar,
      note: studentSlot.note,
    }));

    setRows(initRows);
  }, [attendances]);

  const timeSlotHour = new Date(attendanceInformation?.date);
  const timeStartSlotHour = new Date(attendanceInformation?.date);
  console.log('date', timeSlotHour?.toDateString());

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
  console.log(timeSlotHour?.getTime());

  const totalPresentStudent = rows?.reduce((total: number, item: any) => {
    if (item.isPresent === 'PRESENT') {
      return total + 1;
    }
    return total;
  }, 0);
  const totalWaitStudent = rows?.reduce((total: number, item: any) => {
    if (item.isPresent === 'WAIT') {
      return total + 1;
    }
    return total;
  }, 0);
  const totalAbsentStudent = rows?.reduce((total: number, item: any) => {
    if (item.isPresent === 'ABSENT') {
      return total + 1;
    }
    return total;
  }, 0);

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
          <Typography sx={globalStyles.textTitle}>
            {classDetails?.subCourseName}
          </Typography>
          <Typography>{`${
            attendanceInformation?.slot?.name
          } - Ngày ${formatDate(attendanceInformation?.date)}`}</Typography>
        </Stack>
        <Stack sx={{ alignItems: 'flex-end' }}>
          <Typography>Thời gian còn lại</Typography>
          <Typography
            sx={{
              ...globalStyles.textTitle,
              color: Color.red,
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
            Ghi Chú
          </Grid>
          <Grid sx={headerCell} item md={2}>
            Điểm danh
          </Grid>
        </Grid>
        {rows?.map((item: any, rowIndex: any) => {
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
          <Typography>{`Tổng số học sinh: ${attendances?.totalItems}`}</Typography>
          <Typography>{`Có mặt: ${totalPresentStudent}`}</Typography>
          <Typography>{`Vắng: ${totalAbsentStudent}`}</Typography>
          <Typography>{`Chưa điểm danh: ${totalWaitStudent}`}</Typography>
        </Stack>
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
    </Stack>
  );
}
