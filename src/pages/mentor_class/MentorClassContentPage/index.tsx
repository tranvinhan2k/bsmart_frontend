import { Box, Stack } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassContext } from '~/HOCs/context/ClassContext';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import TextTitle from '~/components/atoms/texts/TextTitle';
import Content from '~/components/molecules/Content';
import {
  MentorCourseActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import globalStyles from '~/styles';

interface Props {
  courseId: number;
}

export default function MemberClassContentPage({ courseId }: Props) {
  const { detailClass } = useContext(ClassContext);
  const navigate = useNavigate();
  const handleNavigateCourseContent = () => {
    navigate(
      `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}`
    );
  };

  return (
    <Stack>
      <TextTitle title="Nội dung lớp học" />
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <Content courseId={courseId} sections={detailClass?.activities || []} />
        <Box>
          <Button
            onClick={handleNavigateCourseContent}
            startIcon={<Icon name="edit" size="small_20" color="white" />}
            variant="contained"
          >
            Sửa nội dung khóa học
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
