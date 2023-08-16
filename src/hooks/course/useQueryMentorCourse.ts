import { MentorDetailCoursePayload } from '~/pages/MentorCourseDetailPage';
import { useQueryGetMentorCourses } from './useQueryGetMentorCourses';

export default function useQueryMentorCourse(id: number) {
  const { courses, error, isLoading, refetch } = useQueryGetMentorCourses({
    page: 0,
  });
  const tmpCourse = courses?.find((item) => item.id === id);
  const course: MentorDetailCoursePayload = {
    code: tmpCourse?.courseCode || '',
    categoryId: tmpCourse?.category || {
      id: 0,
      label: '',
      value: '',
    },
    description: tmpCourse?.courseDescription || '',
    level: tmpCourse?.level || 'BEGINNER',
    name: tmpCourse?.courseName || '',
    status: tmpCourse?.courseStatus || 'ALL',
    subjectId: tmpCourse?.subject || {
      id: 0,
      label: '',
      value: '',
    },
  };
  return {
    course,
    error,
    isLoading,
    refetch,
  };
}
