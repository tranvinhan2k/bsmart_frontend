import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { FontFamily } from '~/assets/variables';
import DataGrid from '~/components/atoms/DataGrid';
import { useGetIdFromUrl, useQueryGetDetailSchedule } from '~/hooks';
import { LoadingWrapper } from '~/HOCs';
import { formatISODateDateToDisplayDate } from '~/utils/date';
import { RenderAttendanceStatus } from '~/utils/attendance';

export default function MemberViewAttendance() {
  const classId = useGetIdFromUrl('id');

  const attendanceStudentColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Số thự tự',
      minWidth: 100,
      flex: 0.6,
      sortable: false,
    },
    {
      field: 'date',
      headerName: 'Ngày học',
      minWidth: 100,
      flex: 2,
      sortable: false,
      renderCell: (params) => {
        return (
          <Chip
            color="info"
            size="small"
            label={formatISODateDateToDisplayDate(params.row.date)}
            title={formatISODateDateToDisplayDate(params.row.date)}
          />
        );
      },
    },
    {
      field: 'slotName',
      headerName: 'Giờ học',
      minWidth: 100,
      flex: 2,
      sortable: false,
      renderCell: (params) => {
        return (
          <Chip
            color="warning"
            size="small"
            label={`${params.row.slotName || ''}`}
            title={`${params.row.slotName || ''}`}
          />
        );
      },
    },
    {
      field: 'attendanceStatus',
      headerName: 'Trang thái điểm danh',
      minWidth: 150,
      flex: 2,
      sortable: false,
      renderCell: (params) => {
        return (
          <RenderAttendanceStatus input={`${params.row.isPresent || ''}`} />
        );
      },
    },
    {
      field: 'note',
      headerName: 'Giảng viên ghi chú',
      minWidth: 100,
      sortable: false,
      flex: 4,
    },
  ];

  const {
    classTimeSlots: rows,
    error,
    isLoading,
  } = useQueryGetDetailSchedule(classId);

  const absentReducer = rows?.reduce((total, item) => {
    if (!item.isPresent) {
      return total + 1;
    }
    return total;
  }, 0);

  const presentReducer = rows?.reduce((total, item) => {
    if (item.isPresent) {
      return total + 1;
    }
    return total;
  }, 0);

  const totalReducer = rows?.reduce((total, item) => {
    return total + 1;
  }, 0);

  const tmpTextList1 = [
    {
      id: 0,
      label: 'Đã vắng',
      desc: absentReducer || '',
      size: 12,
      color: '#dc143c',
    },
    {
      id: 1,
      label: 'Đã tham gia',
      desc: `${presentReducer || ''} / ${totalReducer || ''}`,
      size: 6,
      color: '#ffa500',
    },
    {
      id: 2,
      label: 'Tổng buổi học',
      desc: `${totalReducer || ''}`,
      size: 6,
      color: '#4caf50',
    },
  ];

  const classTitle = '';

  return (
    <Stack>
      <Box>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item sm={12} lg={3}>
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 3,
                padding: 2,
              }}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                padding={1}
              >
                <Typography
                  sx={{ fontSize: 20, fontFamily: FontFamily.bold }}
                  align="center"
                >
                  {classTitle}
                </Typography>
              </Stack>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                {tmpTextList1.map((item) => (
                  <Grid item xs={item.size} key={item.id}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={1}
                      sx={{ padding: 1 }}
                    >
                      <Typography
                        sx={{ fontSize: 14, fontFamily: FontFamily.medium }}
                      >
                        {item.label}
                      </Typography>
                      <Typography sx={{ fontSize: 28, color: item.color }}>
                        {item.desc}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          <Grid item sm={12} lg={9}>
            <Box
              sx={{
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <LoadingWrapper isLoading={isLoading} error={error}>
                <DataGrid
                  columns={attendanceStudentColumns}
                  rows={rows || []}
                  density="compact"
                  hideFooter
                  disableColumnFilter
                />
              </LoadingWrapper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
