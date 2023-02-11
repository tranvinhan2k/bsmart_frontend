import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { courses } from './mockData';
import {
  SX_BOX,
  SX_FIFTH_LAYER_TYPOGRAPHY_H2,
  SX_COURSE_IMG_CONTAINER,
  SX_COURSE_IMG,
} from './style';

export default function Section5StandoutCourses() {
  return (
    <Box sx={SX_BOX}>
      <Box sx={{ position: 'relative', textAlign: 'center' }} px={16}>
        <Typography component="h2" sx={SX_FIFTH_LAYER_TYPOGRAPHY_H2}>
          Khoá học tiêu biểu
        </Typography>
        <Grid container spacing={2}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={3} key={course.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="img_course"
                  height="140"
                  image={course.img_course}
                />
                <Box sx={{ position: 'relative' }}>
                  <Box sx={SX_COURSE_IMG_CONTAINER}>
                    <Box
                      component="img"
                      sx={SX_COURSE_IMG}
                      alt="img"
                      src={course.img_teacher}
                    />
                  </Box>
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.desc}
                  </Typography>
                </CardContent>
                <Rating name="read-only" value={5} readOnly />
                <CardActions>
                  <Button size="small" fullWidth>
                    Tham gia
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
