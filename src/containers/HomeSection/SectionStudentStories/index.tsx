import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { storyOfStudentList } from '~/constants/dataMocked';
import { SX } from './style';

export default function SectionStudentStories() {
  return (
    <Box sx={SX.BOX}>
      <Box sx={SX.CONTAINER} px={16}>
        <Typography component="h2" sx={SX.H2}>
          Câu chuyện của học sinh
        </Typography>
        <Grid container spacing={2}>
          {storyOfStudentList.map((story) => (
            <Grid item xs={12} sm={6} md={3} key={story.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="img_story"
                  height="140"
                  image={story.img}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {story.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {story.field}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {story.desc}
                  </Typography>
                </CardContent>
                <Rating name="read-only" value={5} readOnly />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
