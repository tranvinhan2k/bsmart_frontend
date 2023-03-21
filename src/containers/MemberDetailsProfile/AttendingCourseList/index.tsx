import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SX_WRAPPER, SX_TITLE } from './style';
// import CourseLearningItem from '~/components/molecules/CourseLearningItem/index';

export default function AttendingCourseList() {
  const navigation = useNavigate();
  const handleNavigateCourseDetail = (id: string) => {
    navigation(`course-detail/${id}`);
  };

  return (
    <Box sx={SX_WRAPPER}>
      <Typography component="h4" sx={SX_TITLE}>
        Các khóa học đã tham gia
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={5}
      >
        {/* {CourseList.map((item) => (
          <Grid item xs={12} sm={12} md={12} lg={6} key={item.id}>
            <CourseLearningItem
              item={item}
              onClick={() => handleNavigateCourseDetail(`${item.id}`)}
            />
          </Grid>
        ))} */}
      </Grid>
    </Box>
  );
}
