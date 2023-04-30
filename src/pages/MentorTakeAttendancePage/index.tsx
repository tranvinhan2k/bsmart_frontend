import { useEffect } from 'react';
import { Box, Grid, Typography, Stack } from '@mui/material';
import { scrollToTop } from '~/utils/common';
import MentorTakeAttendance from '~/components/molecules/AttendanceManagement/MentorTakeAttendance';
import { SX_TITTLE, SX_TITTLE_SUB, SX_TITTLE_ITEM } from './style';

export default function MentorTakeAttendancePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const tmpTitleList = [
    { id: 0, title: 'Lớp', titleSub: '???' },
    { id: 1, title: 'Buổi thứ', titleSub: '27/30' },
    { id: 2, title: 'Thông tin phụ ???', titleSub: '???' },
    { id: 3, title: 'Thông tin phụ ???', titleSub: '???' },
  ];

  return (
    <Box pt={2} pr={15} pl={15}>
      <Grid container spacing={2}>
        {tmpTitleList.map((item) => (
          <Grid item xs={3} key={item.id}>
            <Box sx={SX_TITTLE_ITEM}>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                p={2}
              >
                <Typography sx={SX_TITTLE}>{item.title}</Typography>
                <Typography sx={SX_TITTLE_SUB}>{item.titleSub}</Typography>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box py={2}>
        <MentorTakeAttendance />
      </Box>
    </Box>
  );
}
