import { Box, Grid, Stack, Typography } from '@mui/material';
import { attendanceMember } from '~/constants/dataMocked';
import { FontFamily } from '~/assets/variables';
import columns from '~/constants/columns';
import DataGrid from '~/components/atoms/DataGrid';
import globalStyles from '~/styles';

export default function MemberViewAttendance() {
  const tmpTextList1 = [
    { id: 0, label: 'Đã vắng', desc: '1', size: 12, color: '#dc143c' },
    { id: 1, label: 'Đã tham gia', desc: '1 / 8', size: 6, color: '#ffa500' },
    {
      id: 2,
      label: 'Tổng buổi học',
      desc: '2 / 8',
      size: 6,
      color: '#4caf50',
    },
  ];

  const classTitle =
    'Khóa học dành cho nhà phát triển Java hoàn chỉnh - Làm chủ Java từ con số không';

  return (
    <Stack>
      <Typography sx={globalStyles.textTitle}>Điểm danh</Typography>
      <Box mt={4}>
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
              {/* <Grid item xs={12}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                  padding={1}
                >
                  <Typography sx={{ fontSize: 15 }}>
                    Buổi học tiếp theo
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    padding={1}
                  >
                    <Chip color="default" size="small" label="3" title="3" />
                    <Chip
                      color="info"
                      size="small"
                      label={formatISODateStringToDisplayDate(
                        '2000-06-29T11:56:01.510Z'
                      )}
                      title={formatISODateStringToDisplayDate(
                        '2000-06-29T11:56:01.510Z'
                      )}
                    />
                    <Chip
                      color="error"
                      size="small"
                      label="5 (17:45-20:00)"
                      title="5 (17:45-20:00)"
                    />
                  </Stack>
                </Stack>
              </Grid> */}
              <DataGrid
                columns={columns.attendanceStudentColumns}
                rows={attendanceMember.items}
                density="compact"
                hideFooter
                disableColumnFilter
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
