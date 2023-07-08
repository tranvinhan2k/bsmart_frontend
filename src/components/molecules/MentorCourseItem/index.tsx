import { Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Color, MetricSize } from '~/assets/variables';
import UserCourseItem from '../UserCourseItem';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { CoursePayload } from '~/models/type';
import { image } from '~/constants/image';
import { addMentorCourse } from '~/redux/courses/slice';
import { DetailCoursePayload } from '~/pages/MentorCourseDetailPage';
import {
  useDispatchGetAllCategories,
  useDispatchGetAllSubjects,
} from '~/hooks';
import { OptionPayload } from '~/models';
import toast from '~/utils/toast';

interface MentorCourseItemProps {
  item: CoursePayload;
  isSkeleton?: boolean;
}

export default function MentorCourseItem({
  item = {
    courseCode: '',
    courseDescription: '',
    courseName: '',
    id: 0,
    images: [
      {
        id: 0,
        name: 'hello',
        status: true,
        type: 'COURSE',
        url: image.noCourse,
      },
    ],
    mentorName: [''],
    subject: {
      id: 0,
      label: '',
      value: '',
    },
    totalClass: 0,
    status: 'REQUESTING',
    category: {
      id: 0,
      label: '',
      value: '',
    },
  },
  isSkeleton = false,
}: MentorCourseItemProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { optionSubjects } = useDispatchGetAllSubjects();

  const handleNavigateCourseDetail = () => {
    const subject = optionSubjects.find(
      (param) => param.id === item.subject.id
    );
    if (!subject) {
      toast.notifyErrorToast('Không tìm thấy môn học của khóa học này');
    } else {
      const params: DetailCoursePayload = {
        code: item.courseCode,
        name: item.courseName,
        description: item.courseDescription,
        status: item.status,
        subjectId: subject,
        categoryId: item.category,
      };
      dispatch(addMentorCourse(params));
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_list}/${item.id}`
      );
    }
  };

  if (isSkeleton) {
    return (
      <Stack
        sx={{
          marginTop: MetricSize.medium_15,
          marginLeft: '10px',
          borderColor: Color.grey,
          borderRadius: MetricSize.small_5,
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Skeleton height={400} />
      </Stack>
    );
  }

  return (
    <UserCourseItem
      courseDescription={item.courseDescription}
      courseName={item.courseName}
      imageAlt="Hình ảnh khóa học"
      imageUrl={item.images?.[0]?.url}
      courseType=""
      courseStatus={item.status}
      onClick={handleNavigateCourseDetail}
    />
  );
}

MentorCourseItem.defaultProps = {
  isSkeleton: false,
};
