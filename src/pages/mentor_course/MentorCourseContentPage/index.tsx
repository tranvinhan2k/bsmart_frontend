import { useState } from 'react';
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { PostActivityCoursePayload } from '~/models';
import {
  useMutationAddSection,
  useMutationDeleteContent,
  useMutationUpdateContent,
  useQueryGetCourseContent,
  useTryCatch,
} from '~/hooks';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';
import { formatStringToNumber } from '~/utils/number';
import AddSection from '~/containers/MentorCourseDetailSection/AddSection';
import Sections from '~/containers/MentorCourseDetailSection/Sections';

export default function MentorCourseContentPage() {
  const { id } = useParams();
  const courseId = formatStringToNumber(id);

  const [open, setOpen] = useState(false);
  const addCourseSection = useMutationAddSection();

  const deleteCourseContent = useMutationDeleteContent();
  const deleteContent = useTryCatch('xóa nội dung');

  const {
    data: content,
    error,
    isLoading,
    refetch,
  } = useQueryGetCourseContent(courseId);
  const addContentSection = useTryCatch('thêm học phần');

  const handleAddNewSection = async (name: string) => {
    await addContentSection.handleTryCatch(async () => {
      await addCourseSection.mutateAsync({
        courseId,
        name,
        visible: true,
        parentActivityId: undefined,
        authorizeClasses: [],
      });
    });

    await refetch();
  };

  const handleAddNewModule = async (sectionId: number, name: string) => {
    const section = content?.find((item) => item.id === sectionId);
    await refetch();
  };

  const handleCloseConfirm = () => {
    setOpen(!open);
  };

  const handleDeleteContent = () => {
    deleteContent.handleTryCatch(async () =>
      deleteCourseContent.mutateAsync(id)
    );
    handleCloseConfirm();
  };

  return (
    <Stack>
      <LoadingWrapper error={error} isLoading={isLoading}>
        <Sections content={content} onAddNew={handleAddNewModule} />
      </LoadingWrapper>
      <AddSection onAdd={handleAddNewSection} />
    </Stack>
  );
}
