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
  Divider,
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
import globalStyles from '~/styles';
import { useGetIdFromUrl } from '~/hooks';
import { LoadingWrapper } from '~/HOCs';
import ReturnLink from '~/components/atoms/ReturnLink';
import {
  MentorClassActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';

const initattendances: AttendanceMemberTimeSlotPayload[] = [
  {
    id: 0,
    studentId: 2,
    image:
      'https://img2.thuthuatphanmem.vn/uploads/2019/05/06/anh-the-hoc-sinh_100828479.jpg',
    name: 'Trần Vĩ Nhân',
    note: 'Hello',
    isPresent: 'WAIT',
    isHadTakeAttendance: false,
  },
  {
    id: 1,
    studentId: 2,
    image:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/11/mau-anh-the-sac-net-nhat.jpeg',
    name: 'Nguyễn Văn A',
    note: 'Hello',
    isPresent: 'PRESENT',
    isHadTakeAttendance: false,
  },
  {
    id: 2,
    studentId: 2,
    image: 'https://www.uit.edu.vn/sites/vi/files/image_from_word/va.jpeg',
    name: 'Trần Văn B',
    note: 'Hello',
    isPresent: 'ABSENT',
    isHadTakeAttendance: false,
  },
];

export interface AttendanceMemberTimeSlotPayload {
  id: number;
  studentId: number;
  image: string;
  name: string;
  note: string;
  isPresent: 'WAIT' | 'PRESENT' | 'ABSENT';
  isHadTakeAttendance: boolean;
}

export interface AttendanceMemberResponse {
  name: string;
  total: number;
  date: string;
  endTime: string;
  startTime: string;
  slots: AttendanceMemberTimeSlotPayload[];
}

export default function MentorTakeAttendancePage() {
  const classId = useGetIdFromUrl('id');
  const navigate = useNavigate();
  const timetableId = useGetIdFromUrl('timetableId');

  // const { attendances, error, isLoading } = useQueryGetAttendance(
  const { attendances, error, isLoading } = useQueryGetAttendance(
    `${timetableId}`
  );

  // const attendances: AttendanceMemberResponse = {
  //   date: new Date().toISOString(),
  //   startTime: '01:00:00',
  //   endTime: '02:00:00',
  //   name: 'Khóa học dạy lập trình',
  //   slots: initattendances,
  //   total: 10,
  // };

  const mutationResult = useMutationTakeAttendance();

  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);
  const [showImage, setShowImage] = useState(true);
  const [rows, setRows] =
    useState<AttendanceMemberTimeSlotPayload[]>(initattendances);
  const [searchValue, setSearchValue] = useState('');

  const handleOpenImage = (iparam: number) => {
    setOpen(!open);
    setIndex(iparam);
  };

  const handleSetPresent = (id: number, status: PresentStatusKeys) => {
    const tmpAttendances = rows.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          isPresent: item.isPresent === status ? 'WAIT' : status,
        };
      }
      return item;
    });

    setRows(tmpAttendances);
  };

  const handleSearchValue = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleNavigateViewDetail = (studentId: number) => {
    navigate(
      `${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_detail}/${classId}/${MentorClassActionLink.student_detail}/${studentId}`
    );
  };

  const handleAddNote = (note: string, id: number) => {
    const tmpAttendances = rows.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          note,
        };
      }
      return item;
    });

    setRows(tmpAttendances);
  };

  const handleTakeAttendance = async () => {
    const id = toast.loadToast('Đang điểm danh buổi học...');
    try {
      const data = {
        timeTableId: parseInt(`${timetableId}`, 10),
        details:
          rows.map((item: any) => ({
            studentClassId: item.id,
            attendance: item.isPresent === 'PRESENT',
            note: item.note,
          })) || [],
      };
      await mutationResult.mutateAsync(data);
      toast.updateSuccessToast(id, 'Điểm danh thành công !');
    } catch (e: any) {
      toast.updateFailedToast(id, `Điểm danh không thành công: ${e.message}`);
    }
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  // useEffect(() => {
  //   if (attendances) {
  //     setRows(attendances.slots);
  //   }
  // }, [attendances]);

  const timeSlotHour = new Date(attendances?.date || '');
  const timeStartSlotHour = new Date(attendances?.date || '');

  timeSlotHour.setHours(
    parseInt(attendances?.endTime?.split(':')[0] || '', 10),
    parseInt(attendances?.endTime?.split(':')[1] || '', 10)
  );

  timeStartSlotHour.setHours(
    parseInt(attendances?.startTime?.split(':')[0] || '', 10),
    parseInt(attendances?.startTime?.split(':')[1] || '', 10)
  );

  const totalPresentStudent =
    rows.reduce((total: number, item: any) => {
      if (item.isPresent === 'PRESENT') {
        return total + 1;
      }
      return total;
    }, 0) || 0;
  const totalWaitStudent =
    rows.reduce((total: number, item: any) => {
      if (item.isPresent === 'WAIT') {
        return total + 1;
      }
      return total;
    }, 0) || 0;
  const totalAbsentStudent =
    rows.reduce((total: number, item: any) => {
      if (item.isPresent === 'ABSENT') {
        return total + 1;
      }
      return total;
    }, 0) || 0;

  const filterattendances = rows.filter((item: any) =>
    item.name.toLowerCase().includes(searchValue)
  );

  const takeAttendanceAnalysts = [
    {
      id: 0,
      name: 'Tổng số học sinh',
      value: `${attendances?.total || 0}`,
      color: '#eee',
    },
    {
      id: 1,
      name: 'Có mặt',
      value: `${totalPresentStudent || 0}`,
      color: '#eee',
    },
    {
      id: 2,
      name: 'Vắng',
      value: `${totalAbsentStudent || 0}`,
      color: '#eee',
    },
    {
      id: 3,
      name: 'Chưa điểm danh',
      value: `${totalWaitStudent || 0}`,
      color: '#eee',
    },
  ];

  return (
    <Stack
      sx={{
        paddingX: { xs: MetricSize.medium_15, md: MetricSize.large_20 },
        paddingY: MetricSize.large_20,
        borderRadius: MetricSize.small_5,
      }}
    >
      <ReturnLink />
      <Typography sx={globalStyles.textSubTitle}>{`Điểm danh ${formatDate(
        attendances?.date || ''
      )}`}</Typography>

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
            startAdornment: (
              <Icon name="search" size="small_20" color="black" />
            ),
          }}
        />
      </Stack>
      <Box>
        <Stack
          sx={{
            flexDirection: 'row',
          }}
        >
          {takeAttendanceAnalysts.map((item) => {
            return (
              <Stack
                key={item.id}
                sx={{
                  marginY: 1,
                  marginRight: 1,
                }}
              >
                <TextDeclareColumn
                  color={item.color}
                  title={item.name}
                  value={item.value}
                />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <LoadingWrapper
        error={error}
        isLoading={isLoading}
        isEmptyCourse={attendances?.total === 0}
      >
        <Stack
          sx={{
            marginTop: 1,
            width: '100%',
            overflow: 'auto',
          }}
        >
          <Stack
            sx={{
              minWidth: '700px',
            }}
          >
            <Grid
              sx={{
                border: '0.5px solid #eee',
              }}
              container
            >
              <Grid item xs={1}>
                <Typography sx={headerCell}>Id</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={headerCell}>Ảnh</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={headerCell}>Tên</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={headerCell}>Ghi Chú</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={headerCell}>Điểm danh</Typography>
              </Grid>
            </Grid>
            <Stack>
              {filterattendances?.length !== 0 && filterattendances ? (
                filterattendances?.map((item, rowIndex: any) => {
                  return (
                    <AttendanceList
                      key={item.id}
                      item={item}
                      index={rowIndex}
                      isShowImage={showImage}
                      onSetPresent={handleSetPresent}
                      onViewDetail={() => handleNavigateViewDetail(item.id)}
                      onZoomImage={handleOpenImage}
                      onAddNote={handleAddNote}
                    />
                  );
                })
              ) : (
                <Stack
                  sx={{
                    padding: MetricSize.medium_15,
                    border: '0.5px solid #eee',
                  }}
                >
                  <Typography>Không có học sinh nào phù hợp.</Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
        <CustomModal open={open} onClose={() => setOpen(!open)}>
          <Box
            component="img"
            alt="preview_image"
            src={rows[index]?.image}
            sx={{
              height: '90vh',
              width: undefined,
              aspectRatio: 3 / 4,
              objectFit: 'cover',
            }}
          />
        </CustomModal>

        <Stack
          marginTop={2}
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Button onClick={handleTakeAttendance} variant="contained">
            Điểm danh khóa học
          </Button>
        </Stack>
      </LoadingWrapper>
    </Stack>
  );
}
