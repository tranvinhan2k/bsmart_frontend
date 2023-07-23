import { Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import TextTitle from '~/components/atoms/texts/TextTitle';
import Content from '~/components/molecules/Content';
import {
  MentorCourseActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';

interface Props {
  courseId: number;
}

export default function MemberClassContentPage({ courseId }: Props) {
  const navigate = useNavigate();
  const handleNavigateCourseContent = () => {
    navigate(
      `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${courseId}/${MentorCourseActionLink.content}`
    );
  };

  return (
    <Stack>
      <TextTitle title="Nội dung lớp học" />
      <Content
        courseId={courseId}
        sections={[
          {
            id: 0,
            name: 'Giới thiệu',
            authorizeClasses: [],
            created: '',
            createdBy: '',
            lastModified: '',
            lastModifiedBy: '',
            parentActivityId: 1,
            subActivities: [
              {
                id: 0,
                name: 'Giới thiệu',
                authorizeClasses: [],
                created: '',
                createdBy: '',
                lastModified: '',
                lastModifiedBy: '',
                parentActivityId: 1,
                subActivities: [],
                type: 'LESSON',
                visible: true,
              },
              {
                id: 1,
                name: 'Kiểm tra 15 phút',
                authorizeClasses: [],
                created: '',
                createdBy: '',
                lastModified: '',
                lastModifiedBy: '',
                parentActivityId: 1,
                subActivities: [],
                type: 'QUIZ',
                visible: true,
              },
              {
                id: 2,
                name: 'Tài liệu về pointer trong C#',
                authorizeClasses: [],
                created: '',
                createdBy: '',
                lastModified: '',
                lastModifiedBy: '',
                parentActivityId: 1,
                subActivities: [],
                type: 'RESOURCE',
                visible: true,
              },
              {
                id: 3,
                name: 'Tính số nguyên bằng ngôn ngữ C#',
                authorizeClasses: [],
                created: '',
                createdBy: '',
                lastModified: '',
                lastModifiedBy: '',
                parentActivityId: 1,
                subActivities: [],
                type: 'ASSIGNMENT',
                visible: true,
              },
            ],
            type: 'LESSON',
            visible: true,
          },
          {
            id: 0,
            name: 'Giới thiệu',
            authorizeClasses: [],
            created: '',
            createdBy: '',
            lastModified: '',
            lastModifiedBy: '',
            parentActivityId: 1,
            subActivities: [
              {
                id: 0,
                name: 'Giới thiệu',
                authorizeClasses: [],
                created: '',
                createdBy: '',
                lastModified: '',
                lastModifiedBy: '',
                parentActivityId: 1,
                subActivities: [],
                type: 'LESSON',
                visible: true,
              },
            ],
            type: 'LESSON',
            visible: true,
          },
          {
            id: 0,
            name: 'Giới thiệu',
            authorizeClasses: [],
            created: '',
            createdBy: '',
            lastModified: '',
            lastModifiedBy: '',
            parentActivityId: 1,
            subActivities: [
              {
                id: 0,
                name: 'Giới thiệu',
                authorizeClasses: [],
                created: '',
                createdBy: '',
                lastModified: '',
                lastModifiedBy: '',
                parentActivityId: 1,
                subActivities: [],
                type: 'LESSON',
                visible: true,
              },
            ],
            type: 'LESSON',
            visible: true,
          },
        ]}
      />
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
  );
}
