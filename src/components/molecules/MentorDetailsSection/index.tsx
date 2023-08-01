import { Grid, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NavigationLink } from '~/constants/routeLink';
import { useGetMentorDetails } from '~/hooks/mentorProfile/useGetMentorDetails';
import MentorDetailsDescribe from './MentorDetailsDescribe';
import MentorDetailsFeaturedCourseList from './MentorDetailsFeaturedCourseList';
import MentorDetailsHeader from './MentorDetailsHeader';
import MentorDetailsRight from './MentorDetailsRight';

export default function MentorDetailsSection() {
  const { id } = useParams();
  const { mentorDetails, isLoading, isError } = useGetMentorDetails(Number(id));

  const navigate = useNavigate();

  useEffect(() => {
    if ((!mentorDetails && !isLoading) || isError) {
      navigate(`/${NavigationLink.mentor_menu}`);
    }
  }, [mentorDetails, navigate, isLoading, isError]);

  return mentorDetails ? (
    <Stack>
      <Grid
        container
        sx={{
          gridAutoFlow: 'dense',
          paddingX: 10,
          paddingY: 10,
        }}
      >
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={8}>
            <MentorDetailsHeader />
            <MentorDetailsDescribe />
            <MentorDetailsFeaturedCourseList />
          </Grid>
          <Grid item xs={4}>
            <MentorDetailsRight />
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  ) : null;
}
