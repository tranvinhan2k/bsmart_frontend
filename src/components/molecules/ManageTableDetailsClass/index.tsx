import { Box, Grid, Stack, Typography } from '@mui/material';
import { useScrollIntoView } from '~/hooks';
import ClassDetailsBasicInfo from './ClassDetailsBasicInfo';
import ClassDetailsCourse from './ClassDetailsCourse';
import ClassDetailsMentor from './ClassDetailsMentor';
import ClassDetailsScroll from './ClassDetailsScroll';
import ClassDetailsStudentList from './ClassDetailsStudentList';
import ClassDetailsTimeInWeek from './ClassDetailsTimeInWeek';
import { SX_BOX_STICKY, SX_REQUEST_TITLE } from './style';

interface ManageTableDetailsClassProps {
  row: any;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableDetailsClass({
  row,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: ManageTableDetailsClassProps) {
  const scrollBasicInfo = useScrollIntoView();
  const scrollMentor = useScrollIntoView();
  const scrollCourse = useScrollIntoView();
  const scrollTimeInWeek = useScrollIntoView();
  const scrollStudentList = useScrollIntoView();

  return (
    <>
      <Box mx={2}>
        <Typography sx={SX_REQUEST_TITLE}>Chi tiết lớp học</Typography>
      </Box>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        columnSpacing={2}
        rowSpacing={1}
        p={2}
      >
        <Grid item sm={12} md={7} lg={8}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <ClassDetailsBasicInfo
              idClass={row.id}
              scrollRef={scrollBasicInfo.ref}
            />
            <ClassDetailsMentor idClass={row.id} scrollRef={scrollMentor.ref} />
            <ClassDetailsCourse idClass={row.id} scrollRef={scrollCourse.ref} />
            <ClassDetailsTimeInWeek
              idClass={row.id}
              scrollRef={scrollTimeInWeek.ref}
            />
            <ClassDetailsStudentList
              idClass={row.id}
              scrollRef={scrollStudentList.ref}
            />
          </Stack>
        </Grid>
        <Grid item sm={12} md={5} lg={4}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            sx={SX_BOX_STICKY}
          >
            {/* <ClassDetailsDate /> */}
            <ClassDetailsScroll
              scrollBasicInfo={scrollBasicInfo.executeScroll}
              scrollMentor={scrollMentor.executeScroll}
              scrollCourse={scrollCourse.executeScroll}
              scrollTimeInWeek={scrollTimeInWeek.executeScroll}
              scrollStudentList={scrollStudentList.executeScroll}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
