import { Stack } from '@mui/material';
import { useContext } from 'react';
import { useMutationAddSection, useTryCatch } from '~/hooks';
import AddSection from '~/containers/MentorCourseDetailSection/AddSection';
import Sections from '~/containers/MentorCourseDetailSection/Sections';
import { CourseContext } from '~/HOCs/context/CourseContext';
import { isAllowUpdateActivity } from '~/assets/variables';

export default function MentorCourseContentPage() {
  const { course, content, courseId, refetchContent, refetchPercent } =
    useContext(CourseContext);
  const status = course?.status || 'ALL';
  const addCourseSection = useMutationAddSection();

  const addContentSection = useTryCatch('thêm học phần');

  const handleRefetch = async () => {
    await refetchPercent();
    await refetchContent();
  };

  const handleAddNewSection = async (name: string) => {
    await addContentSection.handleTryCatch(async () => {
      await addCourseSection.mutateAsync({
        courseId,
        name,
        visible: true,
        parentActivityId: undefined,
        authorizeClasses: [],
      });
      await handleRefetch();
    });
  };

  return (
    <Stack>
      <Sections status={status} content={content} />
      {isAllowUpdateActivity(status) && (
        <AddSection onAdd={handleAddNewSection} />
      )}
    </Stack>
  );
}
