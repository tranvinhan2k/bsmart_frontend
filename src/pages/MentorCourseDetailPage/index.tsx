import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import useCRUDMentorCourse from '~/hooks/useCRUDMentorCourse';

export default function MentorCourseDetailPage() {
  const { id } = useParams();
  const {
    data,
    deleteCourseMutation,
    error,
    isLoading,
    refetch,
    requestCourseMutation,
    updateCourseMutation,
  } = useCRUDMentorCourse(parseInt(`${id}`, 10));
  console.log(data);

  return <Stack>{JSON.stringify(data)}</Stack>;
}
